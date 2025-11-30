"use client"

import { NavHeader } from '@/components/nav-header'
import { ReviewCard } from '@/components/review-card'
// Seus componentes de UI padrões
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'

// --- AQUI ESTÁ A CORREÇÃO ---
// Usando '@' para buscar lá na pasta components/profile, onde os arquivos realmente estão.
import { ProfileHeader } from '@/components/profile/profile-header'
import { ProfileStats } from '@/components/profile/profile-stats'
import { RecentActivity } from '@/components/profile/recent-activity'
import { AchievementsList } from '@/components/profile/achievements-list'
import { FavoriteGames } from '@/components/profile/favorite-games'
import { ProfileTabs } from '@/components/profile/profile-tabs'

// DADOS FICTÍCIOS
const userData = {
  name: 'João Silva',
  username: 'joaosilva_gamer',
  avatar: 'https://github.com/shadcn.png',
  level: 12,
  bio: 'Entusiasta de RPGs e mundos abertos. Buscando a platina em tudo que jogo.',
  location: 'São Paulo, BR',
  website: 'twitch.tv/joaosilva',
  xp: 3500,
  maxXp: 5000,
  stats: {
    totalReviews: 45,
    averageRating: 9.2,
    gamesWatched: 12,
    followersCount: 850,
    achievements: 15,
  },
}

const userReviews = [
  {
    id: '1',
    userName: 'João Silva',
    userAvatar: 'https://github.com/shadcn.png',
    rating: 10,
    comment: 'Uma obra-prima absoluta. A narrativa é envolvente, os personagens são profundos e o gameplay é impecável.',
    createdAt: 'há 2 dias',
    likes: 24,
    isOwnReview: true,
    gameImage: '/tlou.png' // Imagem do Last of Us
  },
  {
    id: '2',
    userName: 'João Silva',
    userAvatar: 'https://github.com/shadcn.png',
    rating: 10,
    comment: 'Jogo incrível com gráficos de última geração e história emocionante.',
    createdAt: 'há 5 dias',
    likes: 18,
    isOwnReview: true,
    gameImage: '/gow.jpg' // Imagem do God of War Ragnarok
  },
  {
    id: '3',
    userName: 'João Silva',
    userAvatar: 'https://github.com/shadcn.png',
    rating: 10,
    comment: 'Muito bom, mas com alguns problemas de performance.',
    createdAt: 'há 1 semana',
    likes: 12,
    isOwnReview: true,
    gameImage: '/rdr2.png' // Imagem do Red Dead 2
  },
]

export default function UserProfilePage() {
  return (
    <div className="min-h-screen bg-[#020617] text-white"> 
      
      <NavHeader />
      
      <main className="pb-20">
        
        {/* 1. CABEÇALHO */}
        <ProfileHeader user={userData} />

        {/* 2. MENU DE ABAS */}
        <ProfileTabs />

        <div className="container mx-auto px-4 mt-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* --- COLUNA ESQUERDA (30%) --- */}
            <div className="lg:col-span-4 space-y-8">
              <ProfileStats stats={userData.stats} />
              <AchievementsList />
              <RecentActivity />
            </div>

            {/* --- COLUNA DIREITA (70%) --- */}
            <div className="lg:col-span-8 space-y-10">
              
              {/* Galeria 3D */}
              <FavoriteGames />

              {/* Avaliações */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold flex items-center gap-2">
                    Minhas Avaliações
                    <span className="text-sm bg-blue-600 text-white px-2 py-0.5 rounded-full">
                      {userReviews.length} avaliações
                    </span>
                  </h3>
                </div>

                <div className="space-y-4">
                  {userReviews.map((review) => (
                    <div key={review.id} className="opacity-90 hover:opacity-100 transition-opacity">
                      <ReviewCard {...review} />
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      </main>
    </div>
  )
}