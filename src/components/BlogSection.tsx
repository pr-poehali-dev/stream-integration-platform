import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: Date;
  readTime: number;
  tags: string[];
}

interface BlogSectionProps {
  posts: BlogPost[];
}

export const BlogSection = ({ posts }: BlogSectionProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold flex items-center gap-2">
        <Icon name="BookOpen" size={24} className="text-primary" />
        Блог стримера
      </h3>

      <div className="grid gap-4">
        {posts.map((post) => (
          <Card 
            key={post.id} 
            className="p-6 bg-card border-border hover:border-primary/30 transition-all cursor-pointer group animate-fade-in"
          >
            <div className="flex items-start justify-between gap-4 mb-3">
              <h4 className="text-lg font-semibold group-hover:text-primary transition-colors">
                {post.title}
              </h4>
              <div className="flex items-center gap-2 text-sm text-muted-foreground whitespace-nowrap">
                <Icon name="Clock" size={14} />
                <span>{post.readTime} мин</span>
              </div>
            </div>

            <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
              {post.excerpt}
            </p>

            <div className="flex items-center justify-between">
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
              
              <span className="text-xs text-muted-foreground">
                {new Date(post.date).toLocaleDateString('ru-RU', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}
              </span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
