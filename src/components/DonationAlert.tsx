import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';

interface Donation {
  id: number;
  donor_name: string;
  amount: number;
  message?: string;
}

interface DonationAlertProps {
  streamerId: number;
}

export const DonationAlert = ({ streamerId }: DonationAlertProps) => {
  const [alerts, setAlerts] = useState<Donation[]>([]);
  const [lastCheckTime, setLastCheckTime] = useState(Date.now());

  useEffect(() => {
    const checkNewDonations = async () => {
      try {
        const response = await fetch(
          `https://functions.poehali.dev/ca7d4a05-6576-4a0a-95eb-428321ed00c8?streamer_id=${streamerId}`
        );
        const data = await response.json();
        
        if (data.donations && data.donations.length > 0) {
          const newDonations = data.donations.filter((don: any) => {
            const donationTime = new Date(don.created_at).getTime();
            return donationTime > lastCheckTime && don.status === 'succeeded';
          });

          if (newDonations.length > 0) {
            newDonations.forEach((donation: any) => {
              const donationData: Donation = {
                id: donation.id,
                donor_name: donation.donor_name,
                amount: donation.amount,
                message: donation.message
              };

              setAlerts((prev) => [...prev, donationData]);
              playDonationSound(donation.amount);

              setTimeout(() => {
                setAlerts((prev) => prev.filter((a) => a.id !== donation.id));
              }, 8000);
            });

            setLastCheckTime(Date.now());
          }
        }
      } catch (error) {
        console.error('Failed to check donations:', error);
      }
    };

    const interval = setInterval(checkNewDonations, 5000);
    checkNewDonations();

    return () => clearInterval(interval);
  }, [streamerId, lastCheckTime]);

  const playDonationSound = (amount: number) => {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    const frequency = amount > 1000 ? 800 : amount > 500 ? 600 : 400;
    oscillator.frequency.value = frequency;
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);
  };

  if (alerts.length === 0) return null;

  return (
    <div className="fixed top-24 right-8 z-50 space-y-4 max-w-sm">
      {alerts.map((alert) => (
        <Card
          key={alert.id}
          className="animate-slide-in-right bg-gradient-to-r from-primary/90 to-secondary/90 backdrop-blur-lg border-primary shadow-2xl overflow-hidden"
        >
          <div className="p-6 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 animate-pulse" />
            
            <div className="relative z-10 flex items-start gap-4">
              <Avatar className="w-16 h-16 border-4 border-white/30 shadow-lg">
                <AvatarImage src="https://cdn.poehali.dev/projects/d4aeb513-7824-4365-8682-6dce03f094c9/files/0479d6e8-29a2-42fc-bfc3-c8251fdb2d60.jpg" />
                <AvatarFallback className="bg-primary text-primary-foreground text-lg font-bold">
                  {alert.donor_name[0].toUpperCase()}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <Icon name="Heart" size={20} className="text-white animate-bounce" />
                  <h3 className="text-white font-bold text-lg">Новый донат!</h3>
                </div>
                
                <p className="text-white/90 font-semibold text-xl mb-2">
                  {alert.donor_name}
                </p>
                
                <div className="bg-white/20 rounded-lg px-3 py-2 mb-2">
                  <p className="text-white font-bold text-2xl flex items-center gap-2">
                    <Icon name="DollarSign" size={20} />
                    {alert.amount} ₽
                  </p>
                </div>

                {alert.message && (
                  <p className="text-white/80 text-sm italic line-clamp-2 bg-black/20 rounded p-2">
                    "{alert.message}"
                  </p>
                )}
              </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
              <div className="h-full bg-white animate-shrink-width" />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};
