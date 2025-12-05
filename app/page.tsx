import { NavHeader } from "@/components/nav-header"
import { GameCard } from "@/components/game-card"
import { HeroSection } from "@/components/hero-section"
import { ActivityFeed } from "@/components/activity-feed"
import { FeaturedLists } from "@/components/featured-lists"
import { Button } from "@/components/ui/button"
import { ArrowRight, TrendingUp, DollarSign, Activity, List, Sparkles } from "lucide-react"
import Link from "next/link"
import { GameCarousel } from "@/components/game-carousel"
import { GameFrontend, GameBackend } from "@/types/game"
import { GameService } from "@/services/game-service"
import { AvaliacaoService } from "@/services/avaliacao-service"

export default async function HomePage() {
  const [heroGamesData, topRatedGamesData, avaliacoesData] = await Promise.all([
    GameService.getHypedGames(5),
    GameService.getHypedGames(10),
    AvaliacaoService.getLastFive()
  ])

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
          <section>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 backdrop-blur-sm border border-blue-500/20">
                  <TrendingUp className="h-5 w-5" />
                </div>
                <h2 className="text-2xl font-bold tracking-tight text-foreground">Jogos em Alta</h2>
              </div>
              <Link
                href="/games?sort=rating"
                className="text-sm font-medium text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
              >
                Ver todos <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <GameCarousel>
              {topRatedGames.map((game) => (
                <div key={game.id} className="w-[180px] md:w-[200px] flex-shrink-0">
                  <GameCard {...game} />
                </div>
              ))}
            </GameCarousel>
          </section>

          <section>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-green-500/10 text-green-400 backdrop-blur-sm border border-green-500/20">
                  <DollarSign className="h-5 w-5" />
                </div>
                <h2 className="text-2xl font-bold tracking-tight text-foreground">Ofertas Imperdíveis</h2>
              </div>
              <Link
                href="/games?sort=price"
                className="text-sm font-medium text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
              >
                Ver ofertas <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <GameCarousel>
              {bestPriceGames.map((game) => (
                <div key={game.id} className="w-[180px] md:w-[200px] flex-shrink-0">
                  <GameCard {...game} priceDown />
                </div>
              ))}
            </GameCarousel>
          </section>

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
