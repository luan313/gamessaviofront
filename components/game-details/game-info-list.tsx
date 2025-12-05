import { Card, CardContent } from '@/components/ui/card'
import { GameBackend } from '@/types/game'

interface GameInfoListProps {
    game: GameBackend
}

export function GameInfoList({ game }: GameInfoListProps) {
    return (
        <Card>
            <CardContent className="p-4 space-y-3 text-sm">
                <div className="flex justify-between py-2 border-b border-border/50">
                    <span className="text-muted-foreground">Desenvolvedora</span>
                    <span className="font-medium">N/A</span>
                </div>
                <div className="flex justify-between py-2 border-b border-border/50">
                    <span className="text-muted-foreground">Lançamento</span>
                    <span className="font-medium">{game.data_lancamento ? new Date(game.data_lancamento).toLocaleDateString() : "N/A"}</span>
                </div>
                <div className="flex justify-between py-2">
                    <span className="text-muted-foreground">Última atualização</span>
                    <span className="font-medium">{game.updated_at ? new Date(game.updated_at).toLocaleDateString() : "N/A"}</span>
                </div>
            </CardContent>
        </Card>
    )
}
