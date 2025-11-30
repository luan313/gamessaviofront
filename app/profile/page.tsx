"use client"

import { NavHeader } from '@/components/nav-header'
import { ReviewCard } from '@/components/review-card'
import { GameCard } from '@/components/game-card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'


// --- SEUS COMPONENTES EXISTENTES ---
// Mantive os caminhos que você me mandou, pois parecem estar funcionando
import { ProfileHeader } from '@/components/profile/profile-header'
import { ProfileStats } from '@/components/profile/profile-stats'
import { RecentActivity } from '@/components/profile/recent-activity'
import { AchievementsList } from '@/components/profile/achievements-list'

// --- OS NOVOS COMPONENTES (Que criamos agora) ---
// O "./" significa que o computador vai procurar na mesma pasta que este arquivo
import { FavoriteGames } from '@/components/profile/favorite-games'
import { ProfileTabs } from '@/components/profile/profile-tabs'

// DADOS DO USUÁRIO (Mantive os seus)
const userData = {
  name: 'João Silva',
  username: 'joaosilva',
  avatar: '/diverse-user-avatars.png',
  bio: 'Gamer apaixonado por RPGs e jogos indie. Sempre procurando as melhores ofertas e novas aventuras.',
  joinDate: 'Janeiro 2023',
  level: 42,
  xp: 8450,
  maxXp: 10000,
  location: "São Paulo, BR",
  website: "twitch.tv/joaosilva",
  stats: {
    totalReviews: 45,
    averageRating: 8.2,
    gamesWatched: 12,
    followersCount: 234,
    achievements: 15,
    hoursPlayed: 1250
  },
}


const userReviews = [
  {
    id: '1',
    userName: 'João Silva',
    userAvatar: '/diverse-user-avatars.png',
    rating: 10,
    comment: 'Uma obra-prima absoluta. A narrativa é envolvente, os personagens são profundos e o gameplay é impecável.',
    createdAt: 'há 2 dias',
    likes: 24,
    isOwnReview: true,
  },
  {
    id: '2',
    userName: 'João Silva',
    userAvatar: '/diverse-user-avatars.png',
    rating: 9,
    comment: 'Jogo incrível com gráficos de última geração e história emocionante.',
    createdAt: 'há 5 dias',
    likes: 18,
    isOwnReview: true,
  },
  {
    id: '3',
    userName: 'João Silva',
    userAvatar: '/diverse-user-avatars.png',
    rating: 8,
    comment: 'Muito bom, mas com alguns problemas de performance.',
    createdAt: 'há 1 semana',
    likes: 12,
    isOwnReview: true,
  },
]

const watchedGames = [
  { id: '7', name: 'Hollow Knight', coverImage: '/hollow-knight-game-cover.jpg', averageRating: 9.0, currentPrice: 7.49, priceDown: true, categories: ['Plataforma', 'Indie'] },
  { id: '8', name: 'Hades', coverImage: '/hades-game-cover.png', averageRating: 9.1, currentPrice: 12.49, priceDown: true, categories: ['Roguelike', 'Ação'] },
  { id: '11', name: 'GTA VI', coverImage: '/gta-6-game-cover.jpg', averageRating: 8.0, currentPrice: 69.99, categories: ['Ação', 'Aventura'] },
  { id: '6', name: 'Cyberpunk 2077', coverImage: '/cyberpunk-game-cover.png', averageRating: 8.5, currentPrice: 29.99, categories: ['RPG', 'Ação'] },
]

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-[#0A0A0B] text-foreground font-sans">
      <NavHeader />

      <main className="pb-20">
        
        {/* 1. O HEADER (Já estava aqui) */}
        <ProfileHeader user={userData} />

        {/* 2. O NOVO MENU DE ABAS (Fica logo abaixo do header) */}
        <ProfileTabs />

        <div className="container mx-auto px-4 mt-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

            {/* --- COLUNA DA ESQUERDA (LATERAL) --- */}
            {/* Ocupa 4 de 12 colunas no PC */}
            <div className="lg:col-span-4 space-y-8">
              <section>
                <h2 className="text-xl font-bold text-white mb-4">Estatísticas</h2>
                <ProfileStats stats={userData.stats} />
              </section>

              <div className="bg-secondary/5 rounded-xl p-6 border border-white/5 space-y-6">
                <AchievementsList />
                <div className="h-px bg-white/5" />
                <RecentActivity />
              </div>
            </div>

            {/* --- COLUNA DA DIREITA (CONTEÚDO PRINCIPAL) --- */}
            {/* Ocupa 8 de 12 colunas no PC */}
            <div className="lg:col-span-8 space-y-10">
              
              {/* 3. A NOVA GALERIA DE JOGOS FAVORITOS */}
              <FavoriteGames />

              {/* TABS ANTIGAS (Avaliações vs Monitorados) */}
              <Tabs defaultValue="reviews" className="w-full">
                <div className="flex items-center justify-between mb-6">
                  <TabsList className="bg-secondary/10 border border-white/5 p-1 h-auto">
                    <TabsTrigger
                      value="reviews"
                      className="data-[state=active]:bg-blue-600 data-[state=active]:text-white px-6 py-2 rounded-md transition-all"
                    >
                      Avaliações
                    </TabsTrigger>
                    <TabsTrigger
                      value="watchlist"
                      className="data-[state=active]:bg-blue-600 data-[state=active]:text-white px-6 py-2 rounded-md transition-all"
                    >
                      Monitorados
                    </TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="reviews" className="space-y-6 mt-0">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold text-white">Minhas Avaliações</h2>
                    <Badge variant="secondary" className="bg-blue-500/10 text-blue-400 border-blue-500/20">
                      {userData.stats.totalReviews} avaliações
                    </Badge>
                  </div>
                  <div className="grid gap-4">
                    {userReviews.map((review) => (
                      <ReviewCard key={review.id} {...review} />
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="watchlist" className="space-y-6 mt-0">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold text-white">Jogos Monitorados</h2>
                    <Badge variant="secondary" className="bg-purple-500/10 text-purple-400 border-purple-500/20">
                      {userData.stats.gamesWatched} jogos
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {watchedGames.map((game) => (
                      <GameCard key={game.id} {...game} />
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}