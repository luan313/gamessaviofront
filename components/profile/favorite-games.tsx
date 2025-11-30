import { Star } from "lucide-react"

export function FavoriteGames() {
  // Aqui estão os jogos das fotos que você mandou
  const games = [
    {
      name: "The Last of Us Part I",
      cover: "https://image.api.playstation.com/vulcan/ap/rnd/202206/0720/eEHRH9Z5l153o71131i2f53u.png", // Link direto da capa
      rating: "Masterpiece"
    },
    {
      name: "God of War Ragnarök",
      cover: "https://image.api.playstation.com/vulcan/ap/rnd/202207/1210/4xJ8XB3bi888QTLZYdl7Oi0s.png",
      rating: "Incrível"
    },
    {
      name: "Red Dead Redemption 2",
      cover: "https://image.api.playstation.com/vulcan/ap/rnd/202009/2418/B4iR108hXzW9D70Lz32oI1aO.png",
      rating: "Lendário"
    },
    {
      name: "God of War (2018)",
      cover: "https://image.api.playstation.com/vulcan/img/rnd/202010/2217/ax0V5XBxnhNkbmY31AdrbQ24.png",
      rating: "Épico"
    }
  ]

  return (
    <div className="space-y-4 mb-8">
      <h3 className="text-xl font-bold text-white flex items-center gap-2">
        <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
        Favoritos da Estante
      </h3>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {games.map((game, index) => (
          <div key={index} className="group relative cursor-pointer perspective-1000">
            {/* Efeito de brilho atrás da capa */}
            <div className="absolute inset-0 bg-blue-600/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* A Capa do Jogo */}
            <div className="relative aspect-[3/4] rounded-lg overflow-hidden border border-white/10 shadow-lg transition-all duration-500 ease-out transform group-hover:-translate-y-2 group-hover:rotate-x-12 group-hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)]">
              <img 
                src={game.cover} 
                alt={game.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              {/* Degradê preto na parte de baixo para ler o nome */}
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
                 <p className="text-white font-bold text-sm leading-tight">{game.name}</p>
                 <p className="text-yellow-400 text-xs font-medium">{game.rating}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}