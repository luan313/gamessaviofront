import { Star } from "lucide-react"

export function FavoriteGames() {
  // Agora estamos puxando as imagens direto da sua pasta public
  // Certifique-se que os nomes dos arquivos lá na pasta public estão iguais a estes:
  const games = [
    {
      name: "The Last of Us Part I",
      // O computador entende que "/" é a pasta public
      cover: "/tlou.png", 
      rating: "10/10"
    },
    {
      name: "God of War Ragnarök",
      cover: "/gow.jpg",
      rating: "10/10"
    },
    {
      name: "Red Dead Redemption 2",
      cover: "/rdr2.png",
      rating: "10/10"
    },
    {
      name: "Grand Theft Auto V",
      cover: "/gta.png",
      rating: "10/10"
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