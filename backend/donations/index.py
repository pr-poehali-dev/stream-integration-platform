import json
import os
import uuid
from typing import Dict, Any
import psycopg2
from psycopg2.extras import RealDictCursor
from urllib import request
import base64

def get_db_connection():
    return psycopg2.connect(os.environ['DATABASE_URL'])

def create_yookassa_payment(amount: float, description: str, return_url: str) -> Dict[str, Any]:
    shop_id = os.environ.get('YOOKASSA_SHOP_ID')
    secret_key = os.environ.get('YOOKASSA_SECRET_KEY')
    
    if not shop_id or not secret_key:
        raise Exception('ЮKassa не настроена')
    
    idempotence_key = str(uuid.uuid4())
    
    payment_data = {
        'amount': {
            'value': f'{amount:.2f}',
            'currency': 'RUB'
        },
        'confirmation': {
            'type': 'redirect',
            'return_url': return_url
        },
        'capture': True,
        'description': description
    }
    
    auth_string = f'{shop_id}:{secret_key}'
    auth_bytes = base64.b64encode(auth_string.encode('utf-8')).decode('utf-8')
    
    req = request.Request(
        'https://api.yookassa.ru/v3/payments',
        data=json.dumps(payment_data).encode('utf-8'),
        headers={
            'Authorization': f'Basic {auth_bytes}',
            'Idempotence-Key': idempotence_key,
            'Content-Type': 'application/json'
        },
        method='POST'
    )
    
    with request.urlopen(req, timeout=10) as response:
        return json.loads(response.read().decode('utf-8'))

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Обработка донатов: создание платежа и получение истории
    Args: event - dict с httpMethod, body (streamer_id, amount, donor_name, message)
          context - object с атрибутами request_id, function_name
    Returns: HTTP response с payment_url или списком донатов
    '''
    method: str = event.get('httpMethod', 'POST')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-Auth-Token',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    try:
        if method == 'POST':
            body = json.loads(event.get('body', '{}'))
            
            streamer_id = body.get('streamer_id')
            amount = float(body.get('amount', 0))
            donor_name = body.get('donor_name', 'Аноним').strip()
            donor_email = body.get('donor_email', '').strip()
            message = body.get('message', '').strip()
            return_url = body.get('return_url', 'https://streamhub.com/thanks')
            
            if not streamer_id or amount <= 0:
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Неверные параметры доната'})
                }
            
            if amount < 10:
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Минимальная сумма доната 10 ₽'})
                }
            
            conn = get_db_connection()
            cur = conn.cursor(cursor_factory=RealDictCursor)
            
            cur.execute("SELECT display_name FROM streamers WHERE id = %s", (streamer_id,))
            streamer = cur.fetchone()
            
            if not streamer:
                return {
                    'statusCode': 404,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Стример не найден'})
                }
            
            description = f'Донат для {streamer["display_name"]} от {donor_name}'
            
            payment = create_yookassa_payment(amount, description, return_url)
            payment_id = payment.get('id')
            confirmation_url = payment.get('confirmation', {}).get('confirmation_url')
            
            cur.execute(
                """INSERT INTO donations 
                   (streamer_id, donor_name, donor_email, amount, message, payment_id, payment_status) 
                   VALUES (%s, %s, %s, %s, %s, %s, %s) 
                   RETURNING id""",
                (streamer_id, donor_name, donor_email or None, amount, message or None, payment_id, 'pending')
            )
            donation_id = cur.fetchone()['id']
            conn.commit()
            
            cur.close()
            conn.close()
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({
                    'success': True,
                    'donation_id': donation_id,
                    'payment_url': confirmation_url,
                    'payment_id': payment_id
                }),
                'isBase64Encoded': False
            }
        
        elif method == 'GET':
            params = event.get('queryStringParameters') or {}
            streamer_id = params.get('streamer_id')
            
            if not streamer_id:
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Не указан streamer_id'})
                }
            
            conn = get_db_connection()
            cur = conn.cursor(cursor_factory=RealDictCursor)
            
            cur.execute(
                """SELECT id, donor_name, amount, message, payment_status, created_at, paid_at
                   FROM donations 
                   WHERE streamer_id = %s 
                   ORDER BY created_at DESC 
                   LIMIT 50""",
                (streamer_id,)
            )
            donations = cur.fetchall()
            
            result = []
            for don in donations:
                result.append({
                    'id': don['id'],
                    'donor_name': don['donor_name'],
                    'amount': float(don['amount']),
                    'message': don['message'],
                    'status': don['payment_status'],
                    'created_at': don['created_at'].isoformat() if don['created_at'] else None,
                    'paid_at': don['paid_at'].isoformat() if don['paid_at'] else None
                })
            
            cur.close()
            conn.close()
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'donations': result}),
                'isBase64Encoded': False
            }
        
        else:
            return {
                'statusCode': 405,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Method not allowed'})
            }
    
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': f'Ошибка: {str(e)}'}),
            'isBase64Encoded': False
        }
