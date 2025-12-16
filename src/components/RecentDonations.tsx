import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import Icon from '@/components/ui/icon';

interface Donation {
  id: number;
  donor_name: string;
  amount: number;
  message?: string;
  created_at: string;
  status: string;
}

interface RecentDonationsProps {
  streamerId: number;
}

export const RecentDonations = ({ streamerId }: RecentDonationsProps) => {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const response = await fetch(
          `https://functions.poehali.dev/ca7d4a05-6576-4a0a-95eb-428321ed00c8?streamer_id=${streamerId}`
        );
        const data = await response.json();
        
        if (data.donations) {
          setDonations(data.donations.filter((d: Donation) => d.status === 'succeeded'));
        }
      } catch (error) {
        console.error('Failed to fetch donations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDonations();
    const interval = setInterval(fetchDonations, 10000);

    return () => clearInterval(interval);
  }, [streamerId]);

  const totalAmount = donations.reduce((sum, d) => sum + d.amount, 0);

  return (
    <Card className="border-border">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Icon name="Heart" size={20} className="text-primary" />
              Последние донаты
            </CardTitle>
            <CardDescription>
              Всего собрано: <span className="font-bold text-primary">{totalAmount.toLocaleString()} ₽</span>
            </CardDescription>
          </div>
          {loading && (
            <Icon name="Loader2" size={18} className="animate-spin text-muted-foreground" />
          )}
        </div>
      </CardHeader>
      <CardContent>
        {donations.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Icon name="Inbox" size={48} className="mx-auto mb-2 opacity-50" />
            <p>Пока нет донатов</p>
            <p className="text-sm">Будь первым!</p>
          </div>
        ) : (
          <ScrollArea className="h-[400px] pr-4">
            <div className="space-y-3">
              {donations.map((donation, index) => (
                <div
                  key={donation.id}
                  className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-all hover:scale-[1.02]"
                >
                  <Avatar className="w-10 h-10 border-2 border-primary/30">
                    <AvatarImage src="https://cdn.poehali.dev/projects/d4aeb513-7824-4365-8682-6dce03f094c9/files/0479d6e8-29a2-42fc-bfc3-c8251fdb2d60.jpg" />
                    <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                      {donation.donor_name[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-semibold text-sm">{donation.donor_name}</p>
                      {index === 0 && (
                        <Badge className="bg-primary/20 text-primary border-primary/30 text-xs">
                          <Icon name="Sparkles" size={10} className="mr-1" />
                          Новый
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-2 mb-1">
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                        <Icon name="DollarSign" size={12} className="mr-1" />
                        {donation.amount} ₽
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {new Date(donation.created_at).toLocaleString('ru-RU', {
                          day: '2-digit',
                          month: '2-digit',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>

                    {donation.message && (
                      <p className="text-xs text-muted-foreground italic bg-black/20 rounded p-2 mt-1">
                        "{donation.message}"
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
};
