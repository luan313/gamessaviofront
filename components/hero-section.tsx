"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, Star, Info, ChevronRight } from "lucide-react"

interface HeroGame {
    id: string
    title: string
    description: string
    image: string
    rating: number
    genres: string[]
}

const heroGames: HeroGame[] = [
    {
        id: "1",
        title: "Elden Ring",
        description: "Levante-se, Maculado, e seja guiado pela graça para brandir o poder do Anel Prístino e tornar-se um Lorde Prístino nas Terras Intermédias.",
        image: "https://wallpapers.com/images/hd/elden-ring-background-sldehv6nt81wv0x1.jpg",
        rating: 9.8,
        genres: ["RPG", "Open World"],
    },
    {
        id: "2",
        title: "Cyberpunk 2077",
        description: "Cyberpunk 2077 é uma história de ação e aventura de mundo aberto ambientada em Night City, uma megalópole obcecada por poder, glamour e biomodificação.",
        image: "https://wallpapers.com/images/hd/elden-ring-background-sldehv6nt81wv0x1.jpg",
        rating: 9.0,
        genres: ["RPG", "Sci-Fi"],
    },
    {
        id: "3",
        title: "Baldur's Gate 3",
        description: "Reúna seu grupo e volte aos Reinos Esquecidos em uma história de amizade e traição, sacrifício e sobrevivência, e a atração do poder absoluto.",
        image: "https://wallpapers.com/images/hd/elden-ring-background-sldehv6nt81wv0x1.jpg",
        rating: 9.9,
        genres: ["RPG", "Strategy"],
    },
]

export function HeroSection() {
    const [currentIndex, setCurrentIndex] = useState(0)

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % heroGames.length)
        }, 8000)
        return () => clearInterval(timer)
    }, [])

    const game = heroGames[currentIndex]

    return (
        <section className="relative h-[600px] w-full overflow-hidden">
            {/* Background Images */}
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
                        className="object-cover"
                        priority={index === 0}
                        onError={(e) => {
                            e.currentTarget.src = `/placeholder.svg?height=1080&width=1920&query=${encodeURIComponent(g.title)}`
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-r from-background via-background/40 to-transparent" />
                </div>
            ))}

            {/* Content */}
            <div className="relative h-full container mx-auto px-4 flex flex-col justify-end pb-20 md:justify-center md:pb-0">
                <div className="max-w-2xl space-y-6 animate-in slide-in-from-bottom-10 fade-in duration-700">
                    <div className="flex items-center gap-2">
                        {game.genres.map((genre) => (
                            <Badge key={genre} variant="secondary" className="bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border-white/10">
                                {genre}
                            </Badge>
                        ))}
                        <div className="flex items-center gap-1 text-yellow-400 font-bold text-sm bg-black/40 backdrop-blur-md px-2 py-0.5 rounded-full">
                            <Star className="h-3 w-3 fill-current" />
                            {game.rating}
                        </div>
                    </div>

                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter text-white drop-shadow-2xl">
                        {game.title}
                    </h1>

                    <p className="text-lg md:text-xl text-gray-200 line-clamp-3 max-w-xl drop-shadow-md">
                        {game.description}
                    </p>

                    <div className="flex flex-wrap gap-4 pt-4">
                        <Button size="lg" className="h-12 px-8 text-base font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/20">
                            <Play className="mr-2 h-5 w-5 fill-current" />
                            Ver Detalhes
                        </Button>
                        <Button size="lg" variant="outline" className="h-12 px-8 text-base font-bold border-white/20 bg-white/5 hover:bg-white/10 text-white backdrop-blur-sm">
                            <Info className="mr-2 h-5 w-5" />
                            Mais Informações
                        </Button>
                    </div>
                </div>
            </div>

            {/* Indicators */}
            <div className="absolute bottom-8 right-4 md:right-12 flex gap-2 z-10">
                {heroGames.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`h-1.5 rounded-full transition-all duration-300 ${index === currentIndex ? "w-8 bg-blue-500" : "w-2 bg-white/30 hover:bg-white/50"
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </section>
    )
}
