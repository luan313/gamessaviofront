import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Star, ThumbsUp, MessageSquare, Quote } from 'lucide-react'
import Link from 'next/link'

interface ReviewCardProps {
  id: string
  userName: string
  userAvatar: string
  rating: number
  comment: string
  createdAt: string
  likes?: number
  isOwnReview?: boolean
  gameImage?: string
}

export function ReviewCard({
  id,
  userName,
  userAvatar,
  rating,
  comment,
  createdAt,
  likes = 0,
  isOwnReview = false,
  gameImage,
}: ReviewCardProps) {

  // ATUALIZAÇÃO AQUI:
  // 1. Removi o 'animate-pulse' (piscada) do 10, mas mantive o 'shadow' (brilho fixo).
  // 2. Mudei as cores para ficarem elegantes.
  const getBadgeStyle = (score: number) => {
    if (score === 10) return "bg-yellow-500 text-black border-yellow-400 shadow-[0_0_15px_rgba(234,179,8,0.6)]"
    if (score >= 8) return "bg-green-600 text-white border-green-400 shadow-[0_0_10px_rgba(34,197,94,0.4)]"
    return "bg-gray-700 text-gray-300 border-gray-600"
  }
  
  const badgeClass = getBadgeStyle(rating)
  
  // ATUALIZAÇÃO AQUI: Troquei "RECOMENDADO" por "MUITO BOM"
  const badgeLabel = rating === 10 ? "OBRA-PRIMA" : rating >= 8 ? "MUITO BOM" : "ANÁLISE"

  return (
    <Card className="group relative overflow-hidden border-0 bg-[#0A0A0B] mb-4">
      {/* IMAGEM DE FUNDO */}
      {gameImage && (
        <>
          <div className="absolute inset-0">
            <img src={gameImage} alt="Fundo" className="h-full w-full object-cover opacity-60 transition-transform duration-700 group-hover:scale-105" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-black/60" />
        </>
      )}

      {/* CONTEÚDO */}
      <CardContent className="relative z-10 pt-6">
        <div className="flex gap-4">
          <Avatar className="h-12 w-12 ring-2 ring-white/10 shadow-lg">
            <AvatarImage src={userAvatar} alt={userName} />
            <AvatarFallback>{userName.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          
          <div className="flex-1 space-y-2">
            <div className="flex justify-between items-start">
              <div>
                <Link href="#" className="font-bold text-lg text-white hover:text-blue-400 transition-colors">
                  {userName}
                </Link>
                <div className="flex items-center gap-3 mt-1">
                  <div className="flex items-center gap-1 bg-white/10 px-2 py-0.5 rounded border border-white/10">
                    <Star className={`h-4 w-4 ${rating >= 9 ? 'text-yellow-500 fill-yellow-500' : 'text-blue-500 fill-blue-500'}`} />
                    <span className="font-bold text-white">{rating}</span>
                  </div>
                  
                  {/* Selo (Badge) Corrigido */}
                  <span className={`text-[10px] font-black px-2 py-0.5 rounded border tracking-wider ${badgeClass}`}>
                    {badgeLabel}
                  </span>
                  
                  <span className="text-xs text-gray-400">• {createdAt}</span>
                </div>
              </div>
              {isOwnReview && (
                <Button variant="outline" size="sm" className="bg-transparent border-white/20 text-white hover:bg-white/10">Editar</Button>
              )}
            </div>
            
            <div className="relative pl-3 border-l-2 border-white/20">
              <Quote className="absolute -left-1 -top-2 h-6 w-6 text-white/10 -z-10 transform -scale-x-100" />
              <p className="text-gray-200 italic font-medium">"{comment}"</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}