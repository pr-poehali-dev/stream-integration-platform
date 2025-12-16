import { Card } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import { useState } from 'react';

interface Donation {
  id: string;
  userName: string;
  userAvatar: string;
  amount: number;
  message: string;
  timestamp: Date;
}

interface DonationSectionProps {
  topDonations: Donation[];
}

export const DonationSection = ({ topDonations }: DonationSectionProps) => {
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');

  const quickAmounts = [100, 300, 500, 1000];

  return (
    <div className="space-y-6">
      <Card className="p-6 bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Icon name="Heart" size={24} className="text-primary" />
          Поддержать стримера
        </h3>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Сумма доната</label>
            <div className="flex gap-2 mb-3">
              {quickAmounts.map((value) => (
                <Button
                  key={value}
                  variant="outline"
                  size="sm"
                  onClick={() => setAmount(value.toString())}
                  className={amount === value.toString() ? 'border-primary bg-primary/10' : ''}
                >
                  {value} ₽
                </Button>
              ))}
            </div>
            <Input
              type="number"
              placeholder="Или введите свою сумму"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="bg-card"
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Сообщение (необязательно)</label>
            <Textarea
              placeholder="Оставьте сообщение стримеру..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="bg-card resize-none"
              rows={3}
            />
          </div>

          <Button className="w-full bg-primary hover:bg-primary/90" size="lg">
            <Icon name="CreditCard" size={18} className="mr-2" />
            Отправить донат
          </Button>
        </div>
      </Card>

      <Card className="p-6 bg-card border-border">
        <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Icon name="TrendingUp" size={20} className="text-secondary" />
          Топ донатеров
        </h4>

        <div className="space-y-3">
          {topDonations.map((donation, index) => (
            <div
              key={donation.id}
              className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-3 flex-1">
                <div className="relative">
                  <Avatar className="w-10 h-10 border-2 border-primary/30">
                    <AvatarImage src={donation.userAvatar} alt={donation.userName} />
                    <AvatarFallback>{donation.userName[0]}</AvatarFallback>
                  </Avatar>
                  {index < 3 && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-primary rounded-full flex items-center justify-center text-xs font-bold">
                      {index + 1}
                    </div>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm">{donation.userName}</p>
                  {donation.message && (
                    <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
                      {donation.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="text-right">
                <p className="font-bold text-primary">{donation.amount} ₽</p>
                <p className="text-xs text-muted-foreground">
                  {new Date(donation.timestamp).toLocaleDateString('ru-RU')}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
