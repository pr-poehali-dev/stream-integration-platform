import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';

interface StreamCardProps {
  id: string;
  title: string;
  streamerName: string;
  streamerAvatar: string;
  thumbnail: string;
  viewerCount: number;
  category: string;
  isLive: boolean;
}

export const StreamCard = ({
  title,
  streamerName,
  streamerAvatar,
  thumbnail,
  viewerCount,
  category,
  isLive
}: StreamCardProps) => {
  return (
    <Card className="group overflow-hidden bg-card border-border hover:border-primary/50 transition-all duration-300 hover:scale-[1.02] cursor-pointer">
      <div className="relative aspect-video overflow-hidden">
        <img 
          src={thumbnail} 
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {isLive && (
          <Badge className="absolute top-3 left-3 bg-destructive text-destructive-foreground font-semibold">
            <Icon name="Radio" size={12} className="mr-1" />
            LIVE
          </Badge>
        )}
        <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-sm px-2 py-1 rounded-md flex items-center gap-1 text-sm">
          <Icon name="Eye" size={14} />
          <span className="font-medium">{viewerCount.toLocaleString()}</span>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex gap-3">
          <Avatar className="w-10 h-10 border-2 border-primary/20">
            <AvatarImage src={streamerAvatar} alt={streamerName} />
            <AvatarFallback>{streamerName[0]}</AvatarFallback>
          </Avatar>
          
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
              {title}
            </h3>
            <p className="text-sm text-muted-foreground mt-1">{streamerName}</p>
            <Badge variant="secondary" className="mt-2 text-xs">
              {category}
            </Badge>
          </div>
        </div>
      </div>
    </Card>
  );
};
