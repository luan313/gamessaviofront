"use client"

import { NavHeader } from "@/components/nav-header"
import { GameCard } from "@/components/game-card"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tag, ArrowRight, Sparkles, TrendingUp, DollarSign } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { api } from "@/lib/axios"

interface GameBackend {
  id: string
  nome: string
  imagem_capa: string | null
  nota_media: number | null
  last_price: number | null
  data_lancamento: string | null
  hype: number
}

interface GameFrontend {
  id: string
  name: string
  coverImage: string
  averageRating: number
  currentPrice: number
  categories: string[]
  releaseYear: string
}

const bestPriceGames = [
  {
    id: "7",
    name: "Hollow Knight",
    coverImage: "/hollow-knight-game-cover.jpg",
    averageRating: 9.0,
    currentPrice: 7.49,
    priceDown: true,
    categories: ["Plataforma", "Indie"],
    releaseYear: "2017",
  },
  {
    id: "8",
    name: "Hades",
    coverImage: "/hades-game-cover.png",
    averageRating: 9.1,
    currentPrice: 12.49,
    priceDown: true,
    categories: ["Roguelike", "Ação"],
    releaseYear: "2020",
  },
  {
    id: "9",
    name: "Stardew Valley",
    coverImage: "/stardew-valley-game-cover.png",
    averageRating: 9.3,
    currentPrice: 9.99,
    priceDown: true,
    categories: ["Simulação", "Indie"],
    releaseYear: "2016",
  },
  {
    id: "10",
    name: "Celeste",
    coverImage: "/celeste-game-cover.jpg",
    averageRating: 8.9,
    currentPrice: 4.99,
    priceDown: true,
    categories: ["Plataforma", "Indie"],
    releaseYear: "2018",
  },
  {
    id: "11",
    name: "Dead Cells",
    coverImage: "/placeholder.svg?key=ws18i",
    averageRating: 8.9,
    currentPrice: 12.99,
    priceDown: true,
    categories: ["Roguelike", "Ação"],
    releaseYear: "2018",
  },
]

const mostWatchedGames = [
  {
    id: "12",
    name: "GTA VI",
    coverImage: "/gta-6-game-cover.jpg",
    averageRating: 0,
    currentPrice: 69.99,
    categories: ["Ação", "Aventura"],
    releaseYear: "2025",
  },
  {
    id: "13",
    name: "Starfield",
    coverImage: "/starfield-game-cover.png",
    averageRating: 7.8,
    currentPrice: 69.99,
    categories: ["RPG", "Ficção"],
    releaseYear: "2023",
  },
  {
    id: "14",
    name: "Metaphor: ReFantazio",
    coverImage: "/placeholder.svg?key=0iylj",
    averageRating: 0,
    currentPrice: 69.99,
    categories: ["RPG"],
    releaseYear: "2024",
  },
]

const featuredCategories = [
  { name: "RPG", count: 1234, color: "from-blue-600 to-indigo-600", icon: "⚔️" },
  { name: "Ação", count: 2156, color: "from-sky-500 to-blue-600", icon: "💥" },
  { name: "Aventura", count: 1876, color: "from-indigo-500 to-violet-600", icon: "🗺️" },
  { name: "Indie", count: 3421, color: "from-cyan-500 to-blue-500", icon: "🎨" },
]

export default function HomePage() {
  const [topRatedGames, setTopRatedGames] = useState<GameFrontend[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchTopGames() {
      try {
        const response = await api.get("/game/hyped-games/6")
        const data: GameBackend[] = response.data

        const mappedGames: GameFrontend[] = data.map((game) => ({
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

        setTopRatedGames(mappedGames)
      } catch (error) {
        console.error("Erro ao carregar jogos:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchTopGames()
  }, [])

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-foreground">
      <NavHeader />

      <main className="pb-20 space-y-12">
        <section className="relative pt-8 pb-12 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-blue-500/10 blur-[100px] rounded-full pointer-events-none" />

          <div className="container mx-auto px-4 relative z-10">
            <div className="relative rounded-2xl overflow-hidden bg-[url('/jogos5.png')] bg-cover bg-center p-6 md:p-12 lg:p-16 text-center md:text-left shadow-2xl">
              {/*<div className="absolute inset-0 bg-black/60" />*/}

              <div className="max-w-2xl relative z-10 mx-auto md:mx-0">
                <Badge
                  variant="secondary"
                  className="mb-4 bg-blue-500/10 text-blue-400 border-blue-500/20 backdrop-blur-md px-3 py-1 text-sm"
                >
                  <Sparkles className="h-3 w-3 mr-2 fill-current" />
                  Nova plataforma Beta
                </Badge>

                <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight leading-tight">
                  Seu universo de jogos em{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400">
                    um só lugar
                  </span>
                </h1>

                <p className="text-lg md:text-xl text-muted-foreground mb-8 text-balance leading-relaxed">
                  Avalie, critique e acompanhe o preço dos seus jogos favoritos. A comunidade para quem vive
                  o mundo dos games.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                  <Link href="/games" className="w-full sm:w-auto">
                    <Button
                      size="lg"
                      className="w-full sm:w-auto h-12 px-8 text-base font-bold bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-500/20 transition-all hover:scale-105"
                    >
                      Explorar Jogos
                    </Button>
                  </Link>
                  <Link href="/signup" className="w-full sm:w-auto">
                    <Button
                      size="lg"
                      variant="outline"
                      className="w-full sm:w-auto h-12 px-8 text-base font-bold border-white/10 hover:bg-white/5 transition-all bg-transparent"
                    >
                      Criar Conta Grátis
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6 px-1">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
                <TrendingUp className="h-5 w-5" />
              </div>
              <h2 className="text-xl md:text-2xl font-bold tracking-tight">Jogos mais Hypados</h2>
            </div>
            <Link
              href="/games?sort=rating"
              className="text-sm font-medium text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors"
            >
              Ver todos <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="flex overflow-x-auto pb-6 -mx-4 px-4 gap-4 md:grid md:grid-cols-3 lg:grid-cols-6 md:gap-4 md:pb-0 md:mx-0 snap-x snap-mandatory scrollbar-hide">
            {topRatedGames.map((game) => (
              <div key={game.id} className="min-w-[160px] md:min-w-0 snap-center">
                <GameCard {...game} />
              </div>
            ))}
          </div>
        </section>

        <section className="bg-secondary/20 py-12">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-6 px-1">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-green-500/10 text-green-400">
                  <DollarSign className="h-5 w-5" />
                </div>
                <h2 className="text-xl md:text-2xl font-bold tracking-tight">Ofertas Imperdíveis</h2>
              </div>
              <Link
                href="/games?sort=price"
                className="text-sm font-medium text-green-400 hover:text-green-300 flex items-center gap-1 transition-colors"
              >
                Ver ofertas <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="flex overflow-x-auto pb-6 -mx-4 px-4 gap-4 md:grid md:grid-cols-3 lg:grid-cols-5 md:gap-4 md:pb-0 md:mx-0 snap-x snap-mandatory scrollbar-hide">
              {bestPriceGames.map((game) => (
                <div key={game.id} className="min-w-[180px] md:min-w-0 snap-center">
                  <GameCard {...game} />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-6 px-1">
            <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
              <Tag className="h-5 w-5" />
            </div>
            <h2 className="text-xl md:text-2xl font-bold tracking-tight">Navegue por Gênero</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {featuredCategories.map((category) => (
              <Link key={category.name} href={`/categories/${category.name.toLowerCase()}`}>
                <Card className="group relative overflow-hidden border-none h-32 md:h-40 cursor-pointer transition-all hover:scale-[1.02] hover:shadow-xl">
                  {/* Background Gradient */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-80 group-hover:opacity-100 transition-opacity`}
                  />

                  {/* Content */}
                  <CardContent className="relative h-full flex flex-col justify-between p-5 text-white">
                    <div className="text-4xl">{category.icon}</div>
                    <div>
                      <CardTitle className="mb-1 text-lg font-bold">{category.name}</CardTitle>
                      <CardDescription className="text-white/80 text-xs font-medium bg-black/20 inline-block px-2 py-0.5 rounded-full backdrop-blur-sm">
                        {category.count} jogos
                      </CardDescription>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        <div className="h-6 md:hidden"></div>
      </main>
    </div>
  )
}
