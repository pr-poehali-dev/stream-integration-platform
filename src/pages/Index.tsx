import { StreamCard } from '@/components/StreamCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { Link } from 'react-router-dom';

const Index = () => {
  const featuredStreams = [
    {
      id: '1',
      title: 'ЛЕГЕНДАРНЫЙ РЕЙТИНГ В CS2 | КАМБЕК ИЗ НИЗ',
      streamerName: 'ProGamer_XZ',
      streamerAvatar: 'https://cdn.poehali.dev/projects/d4aeb513-7824-4365-8682-6dce03f094c9/files/0479d6e8-29a2-42fc-bfc3-c8251fdb2d60.jpg',
      thumbnail: 'https://cdn.poehali.dev/projects/d4aeb513-7824-4365-8682-6dce03f094c9/files/18651222-b567-4256-b2e9-99244092c0fa.jpg',
      viewerCount: 12547,
      category: 'Counter-Strike 2',
      isLive: true
    },
    {
      id: '2',
      title: 'Dota 2 - Покоряем Иммортал',
      streamerName: 'DotaMaster',
      streamerAvatar: 'https://cdn.poehali.dev/projects/d4aeb513-7824-4365-8682-6dce03f094c9/files/0479d6e8-29a2-42fc-bfc3-c8251fdb2d60.jpg',
      thumbnail: 'https://cdn.poehali.dev/projects/d4aeb513-7824-4365-8682-6dce03f094c9/files/18651222-b567-4256-b2e9-99244092c0fa.jpg',
      viewerCount: 8234,
      category: 'Dota 2',
      isLive: true
    },
    {
      id: '3',
      title: 'Valorant Rankeds | Новый сезон',
      streamerName: 'ValKing',
      streamerAvatar: 'https://cdn.poehali.dev/projects/d4aeb513-7824-4365-8682-6dce03f094c9/files/0479d6e8-29a2-42fc-bfc3-c8251fdb2d60.jpg',
      thumbnail: 'https://cdn.poehali.dev/projects/d4aeb513-7824-4365-8682-6dce03f094c9/files/18651222-b567-4256-b2e9-99244092c0fa.jpg',
      viewerCount: 6891,
      category: 'Valorant',
      isLive: true
    },
    {
      id: '4',
      title: 'PUBG | Соло сквад челлендж',
      streamerName: 'BattleRoyale',
      streamerAvatar: 'https://cdn.poehali.dev/projects/d4aeb513-7824-4365-8682-6dce03f094c9/files/0479d6e8-29a2-42fc-bfc3-c8251fdb2d60.jpg',
      thumbnail: 'https://cdn.poehali.dev/projects/d4aeb513-7824-4365-8682-6dce03f094c9/files/18651222-b567-4256-b2e9-99244092c0fa.jpg',
      viewerCount: 5432,
      category: 'PUBG',
      isLive: true
    },
    {
      id: '5',
      title: 'Стратегии в League of Legends',
      streamerName: 'LoLPro',
      streamerAvatar: 'https://cdn.poehali.dev/projects/d4aeb513-7824-4365-8682-6dce03f094c9/files/0479d6e8-29a2-42fc-bfc3-c8251fdb2d60.jpg',
      thumbnail: 'https://cdn.poehali.dev/projects/d4aeb513-7824-4365-8682-6dce03f094c9/files/18651222-b567-4256-b2e9-99244092c0fa.jpg',
      viewerCount: 4567,
      category: 'League of Legends',
      isLive: true
    },
    {
      id: '6',
      title: 'Speedrun классики - Half-Life 2',
      streamerName: 'SpeedRunner',
      streamerAvatar: 'https://cdn.poehali.dev/projects/d4aeb513-7824-4365-8682-6dce03f094c9/files/0479d6e8-29a2-42fc-bfc3-c8251fdb2d60.jpg',
      thumbnail: 'https://cdn.poehali.dev/projects/d4aeb513-7824-4365-8682-6dce03f094c9/files/18651222-b567-4256-b2e9-99244092c0fa.jpg',
      viewerCount: 3210,
      category: 'Speedrun',
      isLive: true
    }
  ];

  const categories = [
    { name: 'Все', icon: 'Grid3x3' },
    { name: 'CS2', icon: 'Target' },
    { name: 'Dota 2', icon: 'Sword' },
    { name: 'Valorant', icon: 'Crosshair' },
    { name: 'PUBG', icon: 'Users' },
    { name: 'LoL', icon: 'Shield' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-card border-b border-border backdrop-blur-lg bg-card/80">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <Icon name="Radio" size={32} className="text-primary" />
              <h1 className="text-3xl font-bold">StreamHub</h1>
            </div>
            
            <div className="flex items-center gap-3">
              <Button variant="outline">
                <Icon name="User" size={18} className="mr-2" />
                Войти
              </Button>
              <Button className="bg-primary hover:bg-primary/90">
                <Icon name="Video" size={18} className="mr-2" />
                Начать стрим
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <Icon name="Search" size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input 
                placeholder="Поиск стримов, стримеров, игр..." 
                className="pl-10 bg-muted border-border"
              />
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <section className="mb-12 relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/20 via-secondary/20 to-primary/10 p-8 md:p-12 border border-primary/20">
          <div className="relative z-10">
            <Badge className="mb-4 bg-primary/20 text-primary border-primary/30">
              <Icon name="Sparkles" size={14} className="mr-1" />
              Новая платформа
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              Твоя персональная<br />стрим-площадка
            </h2>
            <p className="text-lg text-foreground/80 mb-6 max-w-2xl">
              Стримь с любых платформ, веди блог, общайся с аудиторией и проводи розыгрыши — всё в одном месте
            </p>
            <div className="flex flex-wrap gap-3">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                <Icon name="Rocket" size={20} className="mr-2" />
                Начать стримить
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/stream">
                  <Icon name="Play" size={20} className="mr-2" />
                  Смотреть демо
                </Link>
              </Button>
            </div>
          </div>
          <div className="absolute right-0 top-0 w-1/3 h-full opacity-10">
            <img 
              src="https://cdn.poehali.dev/projects/d4aeb513-7824-4365-8682-6dce03f094c9/files/f193ca52-680b-478d-9024-d5dc20fb56cf.jpg"
              alt="background"
              className="w-full h-full object-cover"
            />
          </div>
        </section>

        <section className="mb-8">
          <Tabs defaultValue="all" className="w-full">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Популярные трансляции</h2>
              <TabsList className="bg-muted">
                {categories.map((cat) => (
                  <TabsTrigger 
                    key={cat.name} 
                    value={cat.name.toLowerCase()}
                    className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  >
                    <Icon name={cat.icon as any} size={16} className="mr-2" />
                    {cat.name}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            <TabsContent value="все" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredStreams.map((stream) => (
                  <Link key={stream.id} to="/stream">
                    <StreamCard {...stream} />
                  </Link>
                ))}
              </div>
            </TabsContent>

            {categories.slice(1).map((cat) => (
              <TabsContent key={cat.name} value={cat.name.toLowerCase()} className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {featuredStreams
                    .filter((s) => s.category.toLowerCase().includes(cat.name.toLowerCase()))
                    .map((stream) => (
                      <Link key={stream.id} to="/stream">
                        <StreamCard {...stream} />
                      </Link>
                    ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </section>

        <section className="grid md:grid-cols-3 gap-6 mt-16">
          <div className="p-6 bg-card border border-border rounded-xl hover:border-primary/30 transition-all">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
              <Icon name="Tv" size={24} className="text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Интеграция платформ</h3>
            <p className="text-muted-foreground">
              Стримьте с YouTube, Twitch или загружайте записи напрямую
            </p>
          </div>

          <div className="p-6 bg-card border border-border rounded-xl hover:border-primary/30 transition-all">
            <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
              <Icon name="Gift" size={24} className="text-secondary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Розыгрыши</h3>
            <p className="text-muted-foreground">
              Автоматические розыгрыши с отслеживанием участников
            </p>
          </div>

          <div className="p-6 bg-card border border-border rounded-xl hover:border-primary/30 transition-all">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
              <Icon name="Heart" size={24} className="text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Донаты</h3>
            <p className="text-muted-foreground">
              Принимайте поддержку от зрителей удобно и быстро
            </p>
          </div>
        </section>
      </main>

      <footer className="mt-16 border-t border-border bg-card/50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Icon name="Radio" size={24} className="text-primary" />
              <span className="font-semibold">StreamHub</span>
              <span className="text-muted-foreground">© 2024</span>
            </div>
            
            <nav className="flex gap-6 text-sm">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                О платформе
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Правила
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Поддержка
              </a>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
