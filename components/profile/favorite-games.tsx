import { Star } from "lucide-react"

export function FavoriteGames() {
  const games: any[] = [] // Empty for now

  return (
    <div className="space-y-4 mb-8">
      <h3 className="text-xl font-bold text-white flex items-center gap-2">
        <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
        Favoritos da Estante
      </h3>

      <div className="grid grid-cols-1 gap-4 py-8 bg-white/5 rounded-xl border border-white/5 border-dashed text-center">
        <p className="text-gray-500 text-sm">Nenhum jogo favorito ainda.</p>
      </div>
    </div>
  )
}