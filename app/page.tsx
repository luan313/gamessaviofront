import { NavHeader } from "@/components/nav-header"

import { HeroSection } from "@/components/hero-section"
import { ActivityFeed } from "@/components/activity-feed"
import { Button } from "@/components/ui/button"
import { TrendingUp, DollarSign, Activity, Sparkles } from "lucide-react"
import { GameSection } from "@/components/home/game-section"
import { GameFrontend, GameBackend } from "@/types/game"
import { GameService } from "@/services/game-service"
import { AvaliacaoService } from "@/services/avaliacao-service"
import { Avaliacao } from "@/types/avaliacao"

export default async function HomePage() {
  let heroGamesData: GameBackend[] = []
  let topRatedGamesData: GameBackend[] = []
  let avaliacoesData: Avaliacao[] = []

  try {
    const [hero, top, reviews] = await Promise.all([
      GameService.getHypedGames(5),
      GameService.getHypedGames(10),
      AvaliacaoService.getLastFive()
    ])
    heroGamesData = hero
    topRatedGamesData = top
    avaliacoesData = reviews
  } catch (error) {
    console.error("Failed to fetch data for home page:", error)
  }

  const heroGames = heroGamesData.map((g: GameBackend) => ({
    id: g.id,
    title: g.nome,
    description: g.descricao || "Sem descrição disponível.",
    image: g.imagem_capa || "/placeholder.svg",
    rating: g.nota_media || 0,
    genres: g.categorias?.map((c: any) => c.categoria.nome) || [],
    price: g.last_price,
    dealUrl: g.deal_url,
    storeName: g.store_name
  }))

  const topRatedGames: GameFrontend[] = topRatedGamesData.map((game: GameBackend) => ({
    id: game.id,
    name: game.nome,
    coverImage: game.imagem_capa || "/placeholder-game.jpg",
    averageRating: game.nota_media || 0,
    currentPrice: game.last_price || 0,
    categories: ["Trending"],
    releaseYear: game.data_lancamento
      ? new Date(game.data_lancamento).getFullYear().toString()
      : "N/A",
  }))

  const bestPriceGames = [...topRatedGames].reverse().map((g) => ({
    ...g,
    priceDown: true,
    discount: Math.floor(Math.random() * 50 + 10)
  }))

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-blue-500/30">
      <NavHeader />

      <main className="pb-20">
        <HeroSection games={heroGames} />

        <div className="container mx-auto px-4 space-y-16 mt-8 lg:-mt-10 relative z-10">
          <GameSection
            title="Jogos em Alta"
            icon={TrendingUp}
            color="blue"
            href="/games?sort=rating"
            linkText="Ver todos"
            games={topRatedGames}
          />

          <GameSection
            title="Ofertas Imperdíveis"
            icon={DollarSign}
            color="green"
            href="/games?sort=price"
            linkText="Ver ofertas"
            games={bestPriceGames}
          />

          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,2.2fr)_minmax(0,1.2fr)] gap-8">
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400 backdrop-blur-sm border border-purple-500/20">
                  <Activity className="h-5 w-5" />
                </div>
                <h2 className="text-2xl font-bold tracking-tight text-foreground">
                  Atividade da Comunidade
                </h2>
              </div>
              <ActivityFeed avaliacoes={avaliacoesData} />
            </section>

            <div
              className="h-72 flex flex-col justify-center items-center gap-4 rounded-2xl p-6 bg-cover bg-center border border-border text-center"
              style={{ backgroundImage: "url('jgs5.jpg')" }}
            >
              <div className="space-y-4 bg-black/60 rounded-2xl px-4 py-3 backdrop-blur-sm">
                <div className="mx-auto w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white">
                  <Sparkles className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-white">Descubra sua próxima aventura</h3>
                <p className="text-sm text-gray-200">
                  Veja qual estilo de jogo mais combina com você!
                </p>
              </div>

              <Button
                asChild
                className="w-full bg-white text-black hover:bg-gray-200 font-bold mt-3"
              >
                <a
                  href="https://pt.quizur.com/quiz/qual-estilo-de-jogo-mais-combina-com-voce-PteI"
                  target="_blank"
                  rel="noreferrer"
                >
                  Começar Quiz
                </a>
              </Button>
            </div>

          </div>
        </div>
      </main>
    </div>
  )
}
