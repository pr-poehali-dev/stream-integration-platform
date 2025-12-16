import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface StreamerProfileProps {
  name: string;
  avatar: string;
  rating: number;
  followers: number;
  bio: string;
  socials: {
    youtube?: string;
    twitch?: string;
    telegram?: string;
    vk?: string;
  };
}

export const StreamerProfile = ({
  name,
  avatar,
  rating,
  followers,
  bio,
  socials
}: StreamerProfileProps) => {
  return (
    <div className="bg-card border border-border rounded-lg p-6 animate-fade-in">
      <div className="flex flex-col md:flex-row gap-6 items-start">
        <Avatar className="w-24 h-24 border-4 border-primary/30">
          <AvatarImage src={avatar} alt={name} />
          <AvatarFallback className="text-2xl">{name[0]}</AvatarFallback>
        </Avatar>
        
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-3 mb-2">
            <h2 className="text-2xl font-bold">{name}</h2>
            <Badge className="bg-primary text-primary-foreground">
              <Icon name="Star" size={14} className="mr-1 fill-current" />
              {rating.toFixed(1)}
            </Badge>
          </div>
          
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
            <div className="flex items-center gap-1">
              <Icon name="Users" size={16} />
              <span>{followers.toLocaleString()} подписчиков</span>
            </div>
          </div>
          
          <p className="text-foreground/90 mb-4">{bio}</p>
          
          <div className="flex flex-wrap gap-2">
            {socials.youtube && (
              <Button variant="outline" size="sm" className="gap-2" asChild>
                <a href={socials.youtube} target="_blank" rel="noopener noreferrer">
                  <Icon name="Youtube" size={16} />
                  YouTube
                </a>
              </Button>
            )}
            {socials.twitch && (
              <Button variant="outline" size="sm" className="gap-2" asChild>
                <a href={socials.twitch} target="_blank" rel="noopener noreferrer">
                  <Icon name="Twitch" size={16} />
                  Twitch
                </a>
              </Button>
            )}
            {socials.telegram && (
              <Button variant="outline" size="sm" className="gap-2" asChild>
                <a href={socials.telegram} target="_blank" rel="noopener noreferrer">
                  <Icon name="Send" size={16} />
                  Telegram
                </a>
              </Button>
            )}
            {socials.vk && (
              <Button variant="outline" size="sm" className="gap-2" asChild>
                <a href={socials.vk} target="_blank" rel="noopener noreferrer">
                  <Icon name="Share2" size={16} />
                  VK
                </a>
              </Button>
            )}
          </div>
        </div>
        
        <Button size="lg" className="bg-primary hover:bg-primary/90">
          <Icon name="UserPlus" size={18} className="mr-2" />
          Подписаться
        </Button>
      </div>
    </div>
  );
};
