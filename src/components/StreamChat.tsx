import { Card } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import Icon from '@/components/ui/icon';
import { useState } from 'react';

interface ChatMessage {
  id: string;
  userName: string;
  userAvatar: string;
  message: string;
  timestamp: Date;
  isStreamer?: boolean;
}

interface StreamChatProps {
  messages: ChatMessage[];
}

export const StreamChat = ({ messages }: StreamChatProps) => {
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      console.log('Sending message:', newMessage);
      setNewMessage('');
    }
  };

  return (
    <Card className="h-full flex flex-col bg-card border-border">
      <div className="p-4 border-b border-border">
        <h3 className="font-semibold flex items-center gap-2">
          <Icon name="MessageSquare" size={20} />
          Чат стрима
        </h3>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className="flex gap-3 animate-fade-in">
              <Avatar className="w-8 h-8 border border-border">
                <AvatarImage src={msg.userAvatar} alt={msg.userName} />
                <AvatarFallback className="text-xs">{msg.userName[0]}</AvatarFallback>
              </Avatar>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2 mb-1">
                  <span className={`font-medium text-sm ${msg.isStreamer ? 'text-primary' : 'text-foreground'}`}>
                    {msg.userName}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {new Date(msg.timestamp).toLocaleTimeString('ru-RU', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </span>
                </div>
                <p className="text-sm text-foreground/90 break-words">{msg.message}</p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="p-4 border-t border-border">
        <div className="flex gap-2">
          <Input
            placeholder="Написать в чат..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            className="bg-muted"
          />
          <Button 
            onClick={handleSendMessage}
            className="bg-primary hover:bg-primary/90"
          >
            <Icon name="Send" size={18} />
          </Button>
        </div>
      </div>
    </Card>
  );
};
