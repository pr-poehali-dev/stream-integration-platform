import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RecentDonations } from '@/components/RecentDonations';

interface User {
  id: number;
  email: string;
  username: string;
}

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const userData = localStorage.getItem('user');
    
    if (!token || !userData) {
      navigate('/login');
      return;
    }
    
    setUser(JSON.parse(userData));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    navigate('/');
  };

  if (!user) return null;

  const stats = [
    { label: 'Просмотры', value: '12.5K', change: '+15%', icon: 'Eye', color: 'text-primary' },
    { label: 'Подписчики', value: '2.3K', change: '+8%', icon: 'Users', color: 'text-secondary' },
    { label: 'Донаты', value: '₽45K', change: '+22%', icon: 'DollarSign', color: 'text-green-500' },
    { label: 'Эфирное время', value: '142ч', change: '+12%', icon: 'Clock', color: 'text-orange-500' }
  ];

  const recentStreams = [
    { id: 1, title: 'CS2 Ранговая игра', viewers: 2400, duration: '3ч 25м', date: '15.12.2024' },
    { id: 2, title: 'Dota 2 Калибровка', viewers: 1850, duration: '4ч 10м', date: '14.12.2024' },
    { id: 3, title: 'Valorant с подписчиками', viewers: 3200, duration: '2ч 45м', date: '13.12.2024' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-card border-b border-border backdrop-blur-lg bg-card/80">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Icon name="Radio" size={28} className="text-primary" />
            <h1 className="text-2xl font-bold">StreamHub</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={handleLogout}>
              <Icon name="LogOut" size={18} className="mr-2" />
              Выйти
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="w-20 h-20 border-2 border-primary">
              <AvatarImage src="https://cdn.poehali.dev/projects/d4aeb513-7824-4365-8682-6dce03f094c9/files/0479d6e8-29a2-42fc-bfc3-c8251fdb2d60.jpg" />
              <AvatarFallback>{user.username[0].toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-3xl font-bold">{user.username}</h2>
              <p className="text-muted-foreground">{user.email}</p>
            </div>
          </div>
          
          <Button className="bg-primary hover:bg-primary/90">
            <Icon name="Video" size={18} className="mr-2" />
            Начать стрим
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="border-border hover:border-primary/30 transition-all">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.label}
                </CardTitle>
                <Icon name={stat.icon as any} size={18} className={stat.color} />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stat.value}</div>
                <Badge className="mt-2 bg-primary/10 text-primary border-primary/30">
                  <Icon name="TrendingUp" size={12} className="mr-1" />
                  {stat.change}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="streams" className="space-y-6">
          <TabsList className="bg-muted">
            <TabsTrigger value="streams" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Icon name="Video" size={16} className="mr-2" />
              Стримы
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Icon name="BarChart3" size={16} className="mr-2" />
              Аналитика
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Icon name="Settings" size={16} className="mr-2" />
              Настройки
            </TabsTrigger>
          </TabsList>

          <TabsContent value="streams">
            <Card className="border-border">
              <CardHeader>
                <CardTitle>Последние трансляции</CardTitle>
                <CardDescription>История ваших стримов за последние 7 дней</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentStreams.map((stream) => (
                    <div key={stream.id} className="flex items-center justify-between p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                          <Icon name="PlayCircle" size={24} className="text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{stream.title}</h3>
                          <p className="text-sm text-muted-foreground">{stream.date} • {stream.duration}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <Badge variant="outline">
                          <Icon name="Eye" size={14} className="mr-1" />
                          {stream.viewers.toLocaleString()}
                        </Badge>
                        <Button variant="ghost" size="sm">
                          <Icon name="MoreVertical" size={18} />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="grid gap-6">
              <Card className="border-border">
                <CardHeader>
                  <CardTitle>Рост аудитории</CardTitle>
                  <CardDescription>Динамика подписчиков за последние 30 дней</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-muted-foreground">YouTube</span>
                        <span className="text-sm font-semibold">+156 подписчиков</span>
                      </div>
                      <Progress value={75} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-muted-foreground">Twitch</span>
                        <span className="text-sm font-semibold">+89 фолловеров</span>
                      </div>
                      <Progress value={45} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-muted-foreground">Telegram</span>
                        <span className="text-sm font-semibold">+234 подписчика</span>
                      </div>
                      <Progress value={90} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardHeader>
                  <CardTitle>Популярный контент</CardTitle>
                  <CardDescription>Топ категорий игр по просмотрам</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { game: 'Counter-Strike 2', views: 45600, percentage: 38 },
                      { game: 'Dota 2', views: 32400, percentage: 27 },
                      { game: 'Valorant', views: 28900, percentage: 24 },
                      { game: 'PUBG', views: 13100, percentage: 11 }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">{item.game}</span>
                            <span className="text-sm text-muted-foreground">{item.views.toLocaleString()} views</span>
                          </div>
                          <Progress value={item.percentage} className="h-1.5" />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <RecentDonations streamerId={1} />
            </div>
          </TabsContent>

          <TabsContent value="settings">
            <Card className="border-border">
              <CardHeader>
                <CardTitle>Настройки профиля</CardTitle>
                <CardDescription>Управление вашим профилем стримера</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                  <div className="flex items-center gap-3">
                    <Icon name="User" size={20} className="text-primary" />
                    <div>
                      <p className="font-medium">Профиль стримера</p>
                      <p className="text-sm text-muted-foreground">Редактировать информацию о себе</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <Icon name="Settings" size={16} className="mr-2" />
                    Настроить
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                  <div className="flex items-center gap-3">
                    <Icon name="Link" size={20} className="text-primary" />
                    <div>
                      <p className="font-medium">Социальные сети</p>
                      <p className="text-sm text-muted-foreground">Подключите YouTube, Twitch, Telegram</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <Icon name="Plus" size={16} className="mr-2" />
                    Добавить
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                  <div className="flex items-center gap-3">
                    <Icon name="Bell" size={20} className="text-primary" />
                    <div>
                      <p className="font-medium">Уведомления</p>
                      <p className="text-sm text-muted-foreground">Настройте оповещения о событиях</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <Icon name="Settings" size={16} className="mr-2" />
                    Настроить
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Dashboard;