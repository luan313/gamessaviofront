import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Share2, Edit, Users, MessageSquare, Gamepad2 } from 'lucide-react'

export interface UserProfile {
  name: string;
  username: string;
  avatar: string;
  joinDate: string;
  bio: string;
  location: string;
  website: string;
  
  stats: {
    followersCount: number;
    totalReviews: number;
    gamesWatched: number;
    achievements: number;
  };
}

interface ProfileHeaderProps {
  user: UserProfile
  onEditClick: () => void
}

export function ProfileHeader({ user, onEditClick }: ProfileHeaderProps) {
  return (
    <div className="relative w-full">
      <div className="h-64 w-full bg-gradient-to-r from-slate-900 via-purple-950 to-slate-900 overflow-hidden">
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="container mx-auto px-4">
        <div className="relative -mt-20 mb-6 flex items-start gap-6">

          <div className="relative shrink-0 group">
            <div className="absolute inset-0 bg-blue-500 rounded-full blur-2xl opacity-50 group-hover:opacity-75 transition-opacity duration-500" />

            <Avatar className="relative h-40 w-40 border-4 border-[#0A0A0B] shadow-2xl">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>{user.name.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
          </div>

          <div className="flex-1 pt-24 space-y-4">

            <div className="flex items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-white drop-shadow-[0_0_5px_rgba(255,255,255,0.3)]">
                  {user.name}
                </h1>
                <p className="text-muted-foreground font-medium">@{user.username}</p>
                <p className="text-sm text-gray-500 mt-1">Membro desde {user.joinDate}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="gap-2 bg-white/5 border-white/10 text-white hover:bg-white/10 hover:border-white/30 transition-all">
                  <Share2 className="h-4 w-4" />
                  Compartilhar
                </Button>
                {/* <Button
                  size="sm"
                  className="gap-2 bg-blue-600 hover:bg-blue-500 text-white border-0 shadow-lg shadow-blue-900/20 transition-all rounded-full px-6"
                  onClick={onEditClick}
                >
                  <Edit className="h-4 w-4" />
                  Editar Perfil
                </Button> */}
              </div>
            </div>

            <div className="flex items-center gap-12 py-5 border-t border-white/10 mt-4">
              <div className="flex flex-col hover:scale-105 transition-transform cursor-default">
                <span className="text-3xl font-bold text-white flex items-center gap-2 drop-shadow-md">
                  {user.stats.followersCount}
                  <Users className="h-5 w-5 text-blue-400" />
                </span>
                <span className="text-xs text-muted-foreground uppercase tracking-wider font-bold">Seguidores</span>
              </div>

              <div className="flex flex-col hover:scale-105 transition-transform cursor-default">
                <span className="text-3xl font-bold text-white flex items-center gap-2 drop-shadow-md">
                  {user.stats.totalReviews}
                  <MessageSquare className="h-5 w-5 text-purple-400" />
                </span>
                <span className="text-xs text-muted-foreground uppercase tracking-wider font-bold">Avaliações</span>
              </div>

              <div className="flex flex-col hover:scale-105 transition-transform cursor-default">
                <span className="text-3xl font-bold text-white flex items-center gap-2 drop-shadow-md">
                  {user.stats.gamesWatched}
                  <Gamepad2 className="h-5 w-5 text-green-400" />
                </span>
                <span className="text-xs text-muted-foreground uppercase tracking-wider font-bold">Jogos Monitorados</span>
              </div>

              <div className="flex flex-col hover:scale-105 transition-transform cursor-default">
                <span className="text-3xl font-bold text-white flex items-center gap-2 drop-shadow-md">
                  {user.stats.achievements}
                  <span className="text-2xl">🏆</span>
                </span>
                <span className="text-xs text-muted-foreground uppercase tracking-wider font-bold">Conquistas</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}