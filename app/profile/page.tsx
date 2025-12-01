"use client"

import { useState, useEffect } from 'react'
import { NavHeader } from '@/components/nav-header'
import { ReviewCard } from '@/components/review-card'
import { GameCard } from '@/components/game-card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ProfileHeader, UserProfile } from '@/components/profile/profile-header'
import { ProfileStats } from '@/components/profile/profile-stats'
import { RecentActivity } from '@/components/profile/recent-activity'
import { AchievementsList } from '@/components/profile/achievements-list'
import { FavoriteGames } from '@/components/profile/favorite-games'
import { ProfileTabs } from '@/components/profile/profile-tabs'
import { EditProfileDialog } from '@/components/profile/edit-profile-dialog'
import { UserService } from '@/services/user'
import { MonitoramentoService } from '@/services/monitoramento'
import { AvaliacaoService } from '@/services/avaliacao-service'
import { GameFrontend } from '@/types/game'

const initialUserData: UserProfile = {
  name: '',
  username: '',
  avatar: '/diverse-user-avatars.png',
  joinDate: '',
  stats: {
    totalReviews: 0,
    gamesWatched: 0,
    followersCount: 0,
    achievements: 0,
  },
}

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [user, setUser] = useState<UserProfile>(initialUserData)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [watchedGames, setWatchedGames] = useState<GameFrontend[]>([])
  const [reviews, setReviews] = useState<any[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userData, monitoramentos, userAvaliacoes] = await Promise.all([
          UserService.getUser(),
          MonitoramentoService.getMonitoramentos(),
          AvaliacaoService.getUserReviews()
        ])

        // Process Watched Games
        const games: GameFrontend[] = monitoramentos.map((m: any) => ({
          id: m.game.id,
          name: m.game.nome,
          coverImage: m.game.imagem_capa || "/placeholder-game.jpg",
          averageRating: m.game.nota_media || 0,
          currentPrice: m.game.last_price || 0,
          categories: m.game.categorias?.map((c: any) => c.categoria.nome) || [],
          releaseYear: m.game.data_lancamento ? new Date(m.game.data_lancamento).getFullYear().toString() : "N/A"
        }))
        setWatchedGames(games)

        // Process Reviews
        const mappedReviews = userAvaliacoes.map((review) => ({
          id: review.id,
          userName: userData.nome,
          userAvatar: '/diverse-user-avatars.png',
          rating: review.nota,
          comment: review.comentario,
          createdAt: new Date().toLocaleDateString(), // Placeholder date
          likes: 0,
          isOwnReview: true,
          gameName: review.game.nome,
          gameImage: review.game.imagem_capa
        }))
        setReviews(mappedReviews)

        // Update User Profile
        setUser({
          name: userData.nome,
          username: userData.email.split('@')[0],
          avatar: '/diverse-user-avatars.png',
          joinDate: new Date(userData.created_at).toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' }),
          stats: {
            gamesWatched: games.length,
            totalReviews: mappedReviews.length,
            followersCount: 0,
            achievements: 0
          }
        })

      } catch (error) {
        console.error("Error fetching profile data:", error)
      }
    }
    fetchData()
  }, [])

  const handleSaveProfile = (updatedData: Partial<UserProfile>) => {
    setUser((prev) => ({ ...prev, ...updatedData }))
  }

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <NavHeader />

      <main className="pb-20">

        <ProfileHeader user={user} onEditClick={() => setIsEditDialogOpen(true)} />
        <EditProfileDialog
          open={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
          user={user}
          onSave={handleSaveProfile}
        />

        <ProfileTabs activeTab={activeTab} onTabChange={setActiveTab} />

        <div className="container mx-auto px-4 mt-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

            <div className="lg:col-span-4 space-y-8">
              <section>
                <h2 className="text-xl font-bold text-foreground mb-4">Estatísticas</h2>
                <ProfileStats stats={user.stats} />
              </section>

              <div className="bg-card rounded-xl p-6 border border-border space-y-6">
                <AchievementsList />
                <div className="h-px bg-border" />
                <RecentActivity />
              </div>
            </div>

            <div className="lg:col-span-8 space-y-10">
              {activeTab === "overview" && (
                <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <FavoriteGames />
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h2 className="text-2xl font-bold text-foreground">Últimas Avaliações</h2>
                      <Button
                        variant="link"
                        className="text-blue-400 hover:text-blue-300"
                        onClick={() => setActiveTab("reviews")}
                      >
                        Ver todas
                      </Button>
                    </div>
                    <div className="grid gap-4">
                      {reviews.length > 0 ? (
                        reviews.slice(0, 2).map((review) => (
                          <ReviewCard key={review.id} {...review} />
                        ))
                      ) : (
                        <p className="text-muted-foreground">Nenhuma avaliação feita ainda.</p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "games" && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold text-foreground">Jogos Monitorados</h2>
                    <Badge variant="secondary" className="bg-purple-500/10 text-purple-400 border-purple-500/20">
                      {user.stats.gamesWatched} jogos
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {watchedGames.map((game) => (
                      <GameCard key={game.id} {...game} />
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "reviews" && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold text-foreground">Minhas Avaliações</h2>
                    <Badge variant="secondary" className="bg-blue-500/10 text-blue-400 border-blue-500/20">
                      {user.stats.totalReviews} avaliações
                    </Badge>
                  </div>
                  <div className="grid gap-4">
                    {reviews.map((review) => (
                      <ReviewCard key={review.id} {...review} />
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "achievements" && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <h2 className="text-2xl font-bold text-foreground mb-4">Conquistas Desbloqueadas</h2>
                  <div className="bg-card rounded-xl p-12 border border-border text-center flex flex-col items-center justify-center gap-4">
                    <div className="h-16 w-16 bg-yellow-500/10 rounded-full flex items-center justify-center border border-yellow-500/20">
                      <span className="text-3xl">🏆</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground mb-2">Em Breve</h3>
                      <p className="text-muted-foreground max-w-md mx-auto">
                        O sistema de conquistas e troféus está sendo preparado. Continue jogando e avaliando para desbloquear recompensas no futuro!
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}