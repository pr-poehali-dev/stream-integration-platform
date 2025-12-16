import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';
import { useState, useEffect } from 'react';

interface Giveaway {
  id: string;
  title: string;
  description: string;
  prize: string;
  endTime: Date;
  participants: number;
  maxParticipants: number;
  requirements: string[];
}

interface GiveawaySectionProps {
  giveaways: Giveaway[];
}

export const GiveawaySection = ({ giveaways }: GiveawaySectionProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold flex items-center gap-2">
        <Icon name="Gift" size={24} className="text-primary" />
        Розыгрыши
      </h3>
      
      <div className="grid gap-4">
        {giveaways.map((giveaway) => (
          <GiveawayCard key={giveaway.id} giveaway={giveaway} />
        ))}
      </div>
    </div>
  );
};

const GiveawayCard = ({ giveaway }: { giveaway: Giveaway }) => {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date().getTime();
      const end = new Date(giveaway.endTime).getTime();
      const distance = end - now;

      if (distance < 0) {
        setTimeLeft('Завершён');
        return;
      }

      const hours = Math.floor(distance / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft(`${hours}ч ${minutes}м ${seconds}с`);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [giveaway.endTime]);

  const participationPercent = (giveaway.participants / giveaway.maxParticipants) * 100;

  return (
    <Card className="p-6 bg-gradient-to-br from-card to-card/50 border-primary/20 hover:border-primary/40 transition-all animate-fade-in">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h4 className="text-lg font-semibold mb-1">{giveaway.title}</h4>
          <p className="text-sm text-muted-foreground">{giveaway.description}</p>
        </div>
        <Badge className="bg-primary/20 text-primary border-primary/30">
          <Icon name="Trophy" size={14} className="mr-1" />
          {giveaway.prize}
        </Badge>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Участников</span>
          <span className="font-semibold">{giveaway.participants} / {giveaway.maxParticipants}</span>
        </div>
        <Progress value={participationPercent} className="h-2" />
      </div>

      <div className="space-y-2 mb-4">
        <p className="text-sm font-medium">Условия участия:</p>
        <ul className="space-y-1">
          {giveaway.requirements.map((req, idx) => (
            <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
              <Icon name="CheckCircle2" size={16} className="text-primary mt-0.5 flex-shrink-0" />
              <span>{req}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div className="flex items-center gap-2 text-sm">
          <Icon name="Clock" size={16} className="text-muted-foreground" />
          <span className="font-medium text-foreground">{timeLeft}</span>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <Icon name="Sparkles" size={16} className="mr-2" />
          Участвовать
        </Button>
      </div>
    </Card>
  );
};
