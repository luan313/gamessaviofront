"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, Star, Info, ChevronRight, ShoppingCart, ExternalLink } from "lucide-react"

import { GameService } from "@/services/game-service"

interface HeroGame {
    id: string
    title: string
    description: string
    image: string
    rating: number
    genres: string[]
    price: number | null
    dealUrl: string | null
    storeName: string | null
}

export function HeroSection() {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [heroGames, setHeroGames] = useState<HeroGame[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchGames = async () => {
            try {
                const games = await GameService.getHypedGames(5)
                const mappedGames = games.map(g => ({
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
                setHeroGames(mappedGames)
            } catch (error) {
                console.error("Error fetching hero games:", error)
            } finally {
                setLoading(false)
            }
        }
        fetchGames()
    }, [])

    useEffect(() => {
        if (heroGames.length === 0) return
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % heroGames.length)
        }, 8000)
        return () => clearInterval(timer)
    }, [heroGames.length])

    if (loading || heroGames.length === 0) {
        return <div className="h-[600px] w-full bg-background animate-pulse" />
    }

    const game = heroGames[currentIndex]

    return (
        <section className="relative h-[600px] w-full overflow-hidden bg-background">
            {heroGames.map((g, index) => (
                <div
                    key={g.id}
                    className={`absolute inset-0 transition-opacity duration-1000 ${index === currentIndex ? "opacity-100" : "opacity-0"
                        }`}
                >
                    <Image
                        src={g.image}
                        alt={g.title}
                        fill
                        className="object-cover blur-2xl opacity-40 scale-110" // Scale to hide blur edges
                        priority={index === 0}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
                </div>
            ))}

            <div className="relative h-full container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full items-center pt-20 pb-12 lg:py-0">
                    <div className="lg:col-span-7 flex flex-col justify-center items-center lg:items-start text-center lg:text-left space-y-6 z-10 order-2 lg:order-1">
                        <div className="flex items-center gap-2 animate-in slide-in-from-bottom-5 fade-in duration-700 justify-center lg:justify-start">
                            {game.genres.map((genre) => (
                                <Badge key={genre} variant="secondary" className="bg-secondary/50 hover:bg-secondary/80 text-foreground backdrop-blur-md border-border">
                                    {genre}
                                </Badge>
                            ))}
                            <div className="flex items-center gap-1 text-yellow-600 dark:text-yellow-400 font-bold text-sm bg-background/60 backdrop-blur-md px-2 py-0.5 rounded-full border border-border">
                                <Star className="h-3 w-3 fill-current" />
                                {game.rating.toFixed(1)}
                            </div>
                        </div>

                        <h1 className="text-3xl md:text-5xl lg:text-7xl font-black tracking-tighter text-foreground drop-shadow-2xl animate-in slide-in-from-bottom-5 fade-in duration-700 delay-100">
                            {game.title}
                        </h1>


                        <div className="flex flex-wrap gap-4 pt-4 animate-in slide-in-from-bottom-5 fade-in duration-700 delay-300 justify-center lg:justify-start">
                            <Link href={`/games/${game.id}`}>
                                <Button size="lg" className="h-10 md:h-12 px-6 md:px-8 text-sm md:text-base font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/20">
                                    <Play className="mr-2 h-4 w-4 md:h-5 md:w-5 fill-current" />
                                    Ver Detalhes
                                </Button>
                            </Link>

                            {game.dealUrl && (
                                <Link href={game.dealUrl} target="_blank" rel="noopener noreferrer">
                                    <Button size="lg" variant="outline" className="h-10 md:h-12 px-6 md:px-8 text-sm md:text-base font-bold border-green-500/30 bg-green-500/10 hover:bg-green-500/20 text-green-400 backdrop-blur-sm">
                                        <ShoppingCart className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                                        Ver Oferta
                                        {game.price !== null && (
                                            <span className="ml-2 bg-green-500/20 px-2 py-0.5 rounded text-sm hidden sm:inline-block">
                                                {game.price === 0 ? "Grátis" : `R$ ${game.price.toFixed(2)}`}
                                            </span>
                                        )}
                                        <ExternalLink className="ml-2 h-3 w-3 opacity-50" />
                                    </Button>
                                </Link>
                            )}
                        </div>
                    </div>

                    <div className="lg:col-span-5 flex justify-center items-center relative h-[250px] md:h-[350px] lg:h-[450px] order-1 lg:order-2">
                        {heroGames.map((g, index) => (
                            <div
                                key={g.id}
                                className={`absolute w-[180px] h-[240px] md:w-[240px] md:h-[320px] lg:w-[300px] lg:h-[400px] transition-all duration-700 ease-out transform ${index === currentIndex
                                    ? "opacity-100 translate-x-0 scale-100 rotate-0 z-10"
                                    : "opacity-0 translate-x-12 scale-95 rotate-6 z-0"
                                    }`}
                            >
                                <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl shadow-black/50 border border-border group">
                                    <Image
                                        src={g.image}
                                        alt={g.title}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="absolute bottom-8 right-4 md:right-12 flex gap-2 z-20">
                {heroGames.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`h-1.5 rounded-full transition-all duration-300 ${index === currentIndex ? "w-8 bg-blue-500" : "w-2 bg-muted hover:bg-muted-foreground"
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </section>
    )
}
