import { StreamerProfile } from '@/components/StreamerProfile';
import { StreamChat } from '@/components/StreamChat';
import { GiveawaySection } from '@/components/GiveawaySection';
import { DonationSection } from '@/components/DonationSection';
import { BlogSection } from '@/components/BlogSection';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { useSearchParams } from 'react-router-dom';

const StreamPage = () => {
  const [searchParams] = useSearchParams();
  const videoId = searchParams.get('videoId') || 'dQw4w9WgXcQ';
  const streamer = {
    name: 'ProGamer_XZ',
    avatar: 'https://cdn.poehali.dev/projects/d4aeb513-7824-4365-8682-6dce03f094c9/files/0479d6e8-29a2-42fc-bfc3-c8251fdb2d60.jpg',
    rating: 4.8,
    followers: 125400,
    bio: 'Профессиональный стример и киберспортсмен. Играю в CS2, Dota 2, Valorant. Стримлю каждый день с 18:00 по МСК.',
    socials: {
      youtube: 'https://youtube.com',
      twitch: 'https://twitch.tv',
      telegram: 'https://t.me',
      vk: 'https://vk.com'
    }
  };

  const chatMessages = [
    {
      id: '1',
      userName: 'ProGamer_XZ',
      userAvatar: 'https://cdn.poehali.dev/projects/d4aeb513-7824-4365-8682-6dce03f094c9/files/0479d6e8-29a2-42fc-bfc3-c8251fdb2d60.jpg',
      message: 'Всем привет! Сегодня играем в рейтинг, качаем до Global Elite!',
      timestamp: new Date(Date.now() - 300000),
      isStreamer: true
    },
    {
      id: '2',
      userName: 'GamerBoy123',
      userAvatar: 'https://cdn.poehali.dev/projects/d4aeb513-7824-4365-8682-6dce03f094c9/files/0479d6e8-29a2-42fc-bfc3-c8251fdb2d60.jpg',
      message: 'Огонь! Первый на стриме 🔥',
      timestamp: new Date(Date.now() - 240000)
    },
    {
      id: '3',
      userName: 'TopViewer',
      userAvatar: 'https://cdn.poehali.dev/projects/d4aeb513-7824-4365-8682-6dce03f094c9/files/0479d6e8-29a2-42fc-bfc3-c8251fdb2d60.jpg',
      message: 'Покажешь билды для соло очереди?',
      timestamp: new Date(Date.now() - 180000)
    }
  ];

  const giveaways = [
    {
      id: '1',
      title: 'Раздача игр Steam',
      description: 'Разыгрываю 3 игры на выбор стоимостью до 2000₽',
      prize: '3 x Steam',
      endTime: new Date(Date.now() + 3600000 * 24),
      participants: 847,
      maxParticipants: 1000,
      requirements: [
        'Подписаться на канал',
        'Быть активным зрителем (минимум 10 часов просмотра)',
        'Написать в чате кодовое слово "STEAM2024"'
      ]
    },
    {
      id: '2',
      title: 'Игровая периферия',
      description: 'Разыгрываю игровую мышку и клавиатуру от спонсора',
      prize: 'Мышка + Клава',
      endTime: new Date(Date.now() + 3600000 * 48),
      participants: 1243,
      maxParticipants: 2000,
      requirements: [
        'Подписка на всех соцсетях',
        'Репост розыгрыша',
        'Оставить комментарий под постом'
      ]
    }
  ];

  const topDonations = [
    {
      id: '1',
      userName: 'MegaDonator',
      userAvatar: 'https://cdn.poehali.dev/projects/d4aeb513-7824-4365-8682-6dce03f094c9/files/0479d6e8-29a2-42fc-bfc3-c8251fdb2d60.jpg',
      amount: 5000,
      message: 'За лучший контент!',
      timestamp: new Date()
    },
    {
      id: '2',
      userName: 'ProSupporter',
      userAvatar: 'https://cdn.poehali.dev/projects/d4aeb513-7824-4365-8682-6dce03f094c9/files/0479d6e8-29a2-42fc-bfc3-c8251fdb2d60.jpg',
      amount: 3000,
      message: 'Спасибо за стримы!',
      timestamp: new Date()
    },
    {
      id: '3',
      userName: 'FanGirl777',
      userAvatar: 'https://cdn.poehali.dev/projects/d4aeb513-7824-4365-8682-6dce03f094c9/files/0479d6e8-29a2-42fc-bfc3-c8251fdb2d60.jpg',
      amount: 2500,
      message: 'Лучший стример!',
      timestamp: new Date()
    }
  ];

  const blogPosts = [
    {
      id: '1',
      title: 'Как я попал в топ-100 игроков CS2',
      excerpt: 'Делюсь своими секретами тренировок и тактиками, которые помогли мне достичь высокого рейтинга всего за 3 месяца.',
      date: new Date(Date.now() - 86400000 * 2),
      readTime: 8,
      tags: ['CS2', 'Гайд', 'Тактика']
    },
    {
      id: '2',
      title: 'Обзор нового патча Dota 2',
      excerpt: 'Разбираю все изменения последнего обновления и рассказываю, какие герои сейчас в мете.',
      date: new Date(Date.now() - 86400000 * 5),
      readTime: 12,
      tags: ['Dota 2', 'Патч', 'Мета']
    },
    {
      id: '3',
      title: 'Лучшая периферия для киберспорта 2024',
      excerpt: 'Подробный обзор игровых девайсов, которые я использую для стримов и турниров.',
      date: new Date(Date.now() - 86400000 * 7),
      readTime: 10,
      tags: ['Обзор', 'Железо', 'Девайсы']
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-card border-b border-border backdrop-blur-lg bg-card/80">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Icon name="Radio" size={28} className="text-primary" />
            <h1 className="text-2xl font-bold">StreamHub</h1>
          </div>
          
          <nav className="hidden md:flex items-center gap-6">
            <a href="/" className="text-sm font-medium hover:text-primary transition-colors">
              Главная
            </a>
            <a href="#" className="text-sm font-medium hover:text-primary transition-colors">
              Категории
            </a>
            <a href="#" className="text-sm font-medium hover:text-primary transition-colors">
              Сообщество
            </a>
          </nav>

          <Button variant="outline">
            <Icon name="User" size={18} className="mr-2" />
            Войти
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <StreamerProfile {...streamer} />
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <div className="aspect-video bg-black rounded-lg overflow-hidden mb-6 relative">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
              <Badge className="absolute top-4 left-4 bg-destructive text-destructive-foreground z-10">
                <Icon name="Circle" size={8} className="mr-2 fill-current" />
                LIVE
              </Badge>
            </div>

            <div className="space-y-8">
              <BlogSection posts={blogPosts} />
              <GiveawaySection giveaways={giveaways} />
            </div>
          </div>

          <div className="space-y-6">
            <div className="lg:sticky lg:top-24">
              <StreamChat messages={chatMessages} />
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2"></div>
          <DonationSection topDonations={topDonations} />
        </div>
      </main>
    </div>
  );
};

export default StreamPage;