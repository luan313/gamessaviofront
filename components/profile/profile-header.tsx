import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { MapPin, Link as LinkIcon, Share2, Edit, Star, Users, MessageSquare } from 'lucide-react'

export interface UserProfile {
  name: string;
  username: string;
  avatar: string;
  level: number;
  bio: string;
  location?: string;
  website?: string;
  xp: number;
  maxXp: number;
  stats: {
    followersCount: number;
    totalReviews: number;
    averageRating: number;
    gamesWatched: number;
    achievements: number;
  };
}

interface ProfileHeaderProps {
  user: UserProfile
}

export function ProfileHeader({ user }: ProfileHeaderProps) {
  return (
    <div className="relative w-full">
      {/* Imagem de Capa - Mais escura para destacar o neon */}
      <div className="h-64 w-full bg-gradient-to-r from-slate-900 via-purple-950 to-slate-900 overflow-hidden">
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="container mx-auto px-4">
        <div className="relative -mt-20 mb-6 flex items-start gap-6">
          
          {/* Avatar com EFEITO NEON (Glow) */}
          <div className="relative shrink-0 group">
            {/* Essa div cria o brilho colorido atrás da foto */}
            <div className="absolute inset-0 bg-blue-500 rounded-full blur-2xl opacity-50 group-hover:opacity-75 transition-opacity duration-500" />
            
            <Avatar className="relative h-40 w-40 border-4 border-[#0A0A0B] shadow-2xl">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>{user.name.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            
            {/* Badge de Nível com sombra brilhante */}
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-yellow-400 text-black font-extrabold px-3 py-1 rounded-full text-sm border-4 border-[#0A0A0B] shadow-[0_0_15px_rgba(250,204,21,0.6)]">
              Lvl {user.level}
            </div>
          </div>

          {/* Informações do Usuário */}
          <div className="flex-1 pt-24 space-y-4">
            
            <div className="flex items-center justify-between gap-4">
              <div>
                {/* Nome com leve brilho no texto */}
                <h1 className="text-3xl font-bold text-white drop-shadow-[0_0_5px_rgba(255,255,255,0.3)]">
                  {user.name}
                </h1>
                <p className="text-muted-foreground font-medium">@{user.username}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="gap-2 bg-white/5 border-white/10 text-white hover:bg-white/10 hover:border-white/30 transition-all">
                  <Share2 className="h-4 w-4" />
                  Compartilhar
                </Button>
                <Button size="sm" className="gap-2 bg-blue-600 hover:bg-blue-500 text-white border-0 shadow-[0_0_15px_rgba(37,99,235,0.5)] hover:shadow-[0_0_25px_rgba(37,99,235,0.7)] transition-all">
                  <Edit className="h-4 w-4" />
                  Editar Perfil
                </Button>
              </div>
            </div>

            <div className="space-y-2 max-w-4xl">
              <p className="text-gray-300 leading-relaxed text-lg">{user.bio}</p>
              
              <div className="flex gap-6 text-sm text-gray-400">
                {user.location && (
                  <div className="flex items-center gap-1.5 hover:text-white transition-colors">
                    <MapPin className="h-4 w-4 text-blue-500" />
                    <span>{user.location}</span>
                  </div>
                )}
                {user.website && (
                  <div className="flex items-center gap-1.5 hover:text-blue-400 transition-colors cursor-pointer group">
                    <LinkIcon className="h-4 w-4 text-blue-500 group-hover:shadow-[0_0_10px_blue]" />
                    <span>{user.website}</span>
                  </div>
                )}
              </div>
            </div>

            {/* ÁREA SOCIAL */}
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
                  {user.stats.averageRating}
                  <Star className="h-5 w-5 text-yellow-400 fill-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]" />
                </span>
                <span className="text-xs text-muted-foreground uppercase tracking-wider font-bold">Nota Média</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Barra de Progresso de XP - ESTILO NEON */}
        <div className="pb-8 w-full max-w-4xl">
          <div className="flex justify-between text-xs font-bold mb-2 text-muted-foreground uppercase tracking-wider">
            <span className="text-blue-300 drop-shadow">Progresso do Nível</span>
            <span className="text-white drop-shadow">{user.xp} <span className="text-gray-500">/</span> {user.maxXp} XP</span>
          </div>
          <div className="h-4 bg-black/40 rounded-full overflow-hidden border border-white/5 box-border p-0.5">
            <div 
              className="h-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 rounded-full transition-all duration-1000 ease-out shadow-[0_0_20px_rgba(168,85,247,0.6)]" 
              style={{ width: `${(user.xp / user.maxXp) * 100}%` }}
            />
          </div>
        </div>

      </div>
    </div>
  )
}