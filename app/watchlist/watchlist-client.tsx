"use client"

import { NavHeader } from '@/components/nav-header'
import { WatchlistItem } from '@/components/watchlist-item'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Bell, TrendingDown, DollarSign, Target } from 'lucide-react'
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { AddGameModal } from "@/components/add-game-modal"
import { WatchlistGame } from '@/types/game'


interface WatchlistClientProps {
    initialGames: WatchlistGame[]
}

export default function WatchlistClient({ initialGames }: WatchlistClientProps) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [watchlistGames, setWatchlistGames] = useState<WatchlistGame[]>(initialGames)
    const [stats, setStats] = useState({
        totalWatched: 0,
        belowTarget: 0,
        potentialSavings: 0,
    })

    useEffect(() => {
        setWatchlistGames(initialGames)
        setStats({
            totalWatched: initialGames.length,
            belowTarget: initialGames.filter((g: WatchlistGame) => g.currentPrice <= g.targetPrice).length,
            potentialSavings: initialGames.reduce((acc: number, g: WatchlistGame) => {
                const saving = g.currentPrice - g.lowestPrice
                return acc + (saving > 0 ? saving : 0)
            }, 0),
        })
    }, [initialGames])

    const refreshData = () => {
        setLoading(true)
        router.refresh()
        setTimeout(() => setLoading(false), 1000)
    }

    return (
        <div className="min-h-screen bg-background">
            <NavHeader />

            <main className="container mx-auto px-4 py-8">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">Minha Watchlist</h1>
                        <p className="text-muted-foreground">
                            Monitore os preços dos seus jogos favoritos
                        </p>
                    </div>
                    <AddGameModal onSuccess={refreshData}>
                        <Button>
                            <Bell className="h-4 w-4 mr-2" />
                            Adicionar Jogo
                        </Button>
                    </AddGameModal>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Jogos Monitorados</CardTitle>
                            <Target className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.totalWatched}</div>
                            <p className="text-xs text-muted-foreground">
                                Total na sua watchlist
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Abaixo da Meta</CardTitle>
                            <TrendingDown className="h-4 w-4 text-accent" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-accent">{stats.belowTarget}</div>
                            <p className="text-xs text-muted-foreground">
                                Jogos no preço desejado
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Economia Potencial</CardTitle>
                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">${stats.potentialSavings.toFixed(2)}</div>
                            <p className="text-xs text-muted-foreground">
                                Vs. preço mais baixo histórico
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {watchlistGames.length > 0 ? (
                    <div className="space-y-4">
                        {watchlistGames.map((game) => (
                            <WatchlistItem key={game.id} {...game} onActionComplete={refreshData} />
                        ))}
                    </div>
                ) : (
                    <Card>
                        <CardContent className="flex flex-col items-center justify-center py-12">
                            <Bell className="h-16 w-16 text-muted-foreground mb-4" />
                            <h3 className="text-xl font-semibold mb-2">Nenhum jogo monitorado</h3>
                            <p className="text-muted-foreground text-center mb-6">
                                Comece a adicionar jogos à sua watchlist para monitorar preços
                            </p>
                            <AddGameModal onSuccess={refreshData}>
                                <Button>Adicionar Primeiro Jogo</Button>
                            </AddGameModal>
                        </CardContent>
                    </Card>
                )}
            </main>
        </div>
    )
}
