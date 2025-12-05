import { Card, CardContent } from '@/components/ui/card'
import { GameBackend } from '@/types/game'

interface GameStatsProps {
    game: GameBackend
    averageRating: number
}

export function GameStats({ game, averageRating }: GameStatsProps) {
    return (
        <div className="grid grid-cols-2 gap-4">
            <Card className="bg-card/50 backdrop-blur-sm">
                <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                    <div className="text-3xl font-bold text-primary mb-1">{averageRating || "-"}</div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wider">Nota Média</div>
                </CardContent>
            </Card>
            <Card className="bg-card/50 backdrop-blur-sm">
                <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                    <div className={`text-3xl font-bold mb-1 ${game.metacritic && game.metacritic >= 75 ? 'text-green-500' : game.metacritic && game.metacritic >= 50 ? 'text-yellow-500' : 'text-muted-foreground'}`}>
                        {game.metacritic || "-"}
                    </div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wider">Metacritic</div>
                </CardContent>
            </Card>
            <Card className="bg-card/50 backdrop-blur-sm col-span-2">
                <CardContent className="p-4 flex items-center justify-between">
                    <div className="flex flex-col">
                        <span className="text-xs text-muted-foreground uppercase tracking-wider">Hype Score</span>
                        <span className="text-2xl font-bold">{game.hype || 0}</span>
                    </div>
                    <div className="h-2 flex-1 mx-4 bg-secondary rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-orange-500 to-red-600"
                            style={{ width: `${Math.min((game.hype || 0), 100)}%` }}
                        />
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
