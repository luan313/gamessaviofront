import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { DollarSign, Bell, ExternalLink, Loader2 } from 'lucide-react'
import { GameBackend } from '@/types/game'

interface PriceCardProps {
    game: GameBackend
    targetPrice: string
    setTargetPrice: (price: string) => void
    onAddToWatchlist: () => void
    addingToWatchlist: boolean
}

export function PriceCard({ game, targetPrice, setTargetPrice, onAddToWatchlist, addingToWatchlist }: PriceCardProps) {
    return (
        <Card className="border-primary/20 shadow-lg shadow-primary/5 overflow-hidden">
            <div className="h-1 w-full bg-gradient-to-r from-primary to-purple-600" />
            <CardHeader>
                <CardTitle className="flex items-center justify-between">
                    <span>Preço Atual</span>
                    <span className="text-3xl font-bold text-green-400">
                        ${game.last_price?.toFixed(2) || "N/A"}
                    </span>
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                {game.deal_url && (
                    <a href={game.deal_url} target="_blank" rel="noopener noreferrer" className="block">
                        <Button size="lg" className="w-full gap-2 bg-green-600 hover:bg-green-700 text-white font-bold">
                            <DollarSign className="h-5 w-5" />
                            Comprar Agora
                            <ExternalLink className="h-4 w-4 ml-auto opacity-50" />
                        </Button>
                    </a>
                )}

                <div className="pt-4 border-t border-border">
                    <div className="flex items-center gap-2 mb-4">
                        <Bell className="h-5 w-5 text-primary" />
                        <span className="font-semibold">Monitorar Preço</span>
                    </div>

                    <div className="space-y-3">
                        <div className="space-y-1.5">
                            <Label htmlFor="target-price" className="text-xs text-muted-foreground">
                                Avise-me quando chegar a:
                            </Label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                                <Input
                                    id="target-price"
                                    type="number"
                                    placeholder="0.00"
                                    step="0.01"
                                    className="pl-7"
                                    value={targetPrice}
                                    onChange={(e) => setTargetPrice(e.target.value)}
                                />
                            </div>
                        </div>

                        <Button
                            variant="secondary"
                            className="w-full gap-2"
                            onClick={onAddToWatchlist}
                            disabled={addingToWatchlist}
                        >
                            {addingToWatchlist ? <Loader2 className="h-4 w-4 animate-spin" /> : <Bell className="h-4 w-4" />}
                            Adicionar à Watchlist
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
