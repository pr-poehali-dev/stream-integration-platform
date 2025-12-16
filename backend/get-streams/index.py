import json
import os
from urllib import request, parse
from typing import Dict, Any, List

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Получает список живых стримов с YouTube по категориям игр
    Args: event - dict с httpMethod, queryStringParameters (game)
          context - object с атрибутами request_id, function_name
    Returns: HTTP response с массивом стримов
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    if method != 'GET':
        return {
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    api_key = os.environ.get('YOUTUBE_API_KEY')
    if not api_key:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'YouTube API key not configured'})
        }
    
    params = event.get('queryStringParameters') or {}
    game_query = params.get('game', 'gaming')
    
    game_mapping = {
        'cs2': 'Counter-Strike 2',
        'dota2': 'Dota 2',
        'valorant': 'Valorant',
        'pubg': 'PUBG',
        'lol': 'League of Legends',
        'gaming': 'gaming live'
    }
    
    search_query = game_mapping.get(game_query.lower(), game_query)
    
    url = 'https://www.googleapis.com/youtube/v3/search?' + parse.urlencode({
        'part': 'snippet',
        'type': 'video',
        'eventType': 'live',
        'q': search_query,
        'maxResults': '12',
        'order': 'viewCount',
        'key': api_key,
        'relevanceLanguage': 'ru',
        'videoCategoryId': '20'
    })
    
    try:
        req = request.Request(url)
        with request.urlopen(req, timeout=10) as response:
            data = json.loads(response.read().decode('utf-8'))
        
        streams = []
        for item in data.get('items', []):
            snippet = item.get('snippet', {})
            video_id = item.get('id', {}).get('videoId')
            
            if not video_id:
                continue
            
            stream_data = {
                'id': video_id,
                'title': snippet.get('title', 'Без названия'),
                'streamerName': snippet.get('channelTitle', 'Неизвестный'),
                'thumbnail': snippet.get('thumbnails', {}).get('high', {}).get('url', ''),
                'category': search_query,
                'isLive': True,
                'embedUrl': f'https://www.youtube.com/embed/{video_id}?autoplay=1&mute=0'
            }
            streams.append(stream_data)
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'streams': streams}),
            'isBase64Encoded': False
        }
    
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': f'Failed to fetch streams: {str(e)}'}),
            'isBase64Encoded': False
        }
