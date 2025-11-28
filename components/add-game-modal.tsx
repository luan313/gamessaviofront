"use client"

import { useState, useEffect, useRef } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Search, Plus, Loader2, X } from "lucide-react"
import { GameService } from "@/services/game-service"
import { MonitoramentoService } from "@/services/monitoramento"
import { GameBackend } from "@/types/game"
import { useToast } from "@/components/ui/use-toast"

interface AddGameModalProps {
    children: React.ReactNode
    onSuccess: () => void
}

export function AddGameModal({ children, onSuccess }: AddGameModalProps) {
    const [open, setOpen] = useState(false)
    const [step, setStep] = useState<"search" | "price">("search")
    const [searchQuery, setSearchQuery] = useState("")
    const [searchResults, setSearchResults] = useState<GameBackend[]>([])
    const [loading, setLoading] = useState(false)
    const [selectedGame, setSelectedGame] = useState<GameBackend | null>(null)
    const [targetPrice, setTargetPrice] = useState("")
    const [submitting, setSubmitting] = useState(false)
    const isSubmittingRef = useRef(false)
    const { toast } = useToast()

    useEffect(() => {
        const timer = setTimeout(() => {
            if (searchQuery.length >= 3) {
                handleSearch()
            }
        }, 500)

        return () => clearTimeout(timer)
    }, [searchQuery])

    const handleSearch = async () => {
        if (!searchQuery) return
        setLoading(true)
        try {
            const results = await GameService.searchGames(searchQuery)
            setSearchResults(results)
        } catch (error) {
            console.error("Error searching games:", error)
        } finally {
            setLoading(false)
        }
    }

    const handleSelectGame = (game: GameBackend) => {
        setSelectedGame(game)
        setStep("price")
        setTargetPrice(game.last_price ? game.last_price.toString() : "")
    }

    const handleSubmit = async () => {
        if (!selectedGame || !targetPrice || isSubmittingRef.current) return

        const token = localStorage.getItem("token")
        if (!token) {
            toast({
                title: "Erro",
                description: "Você precisa estar logado para adicionar jogos.",
                variant: "destructive",
            })
            return
        }

        setSubmitting(true)
        isSubmittingRef.current = true
        try {
            await MonitoramentoService.addMonitoramento(selectedGame.id, parseFloat(targetPrice))
            toast({
                title: "Sucesso!",
                description: "Jogo adicionado à sua watchlist.",
            })
            setOpen(false)
            resetModal()
            onSuccess()
        } catch (error) {
            console.error("Error adding to watchlist:", error)
            toast({
                title: "Erro",
                description: "Não foi possível adicionar o jogo. Tente novamente.",
                variant: "destructive",
            })
        } finally {
            setSubmitting(false)
            isSubmittingRef.current = false
        }
    }

    const resetModal = () => {
        setStep("search")
        setSearchQuery("")
        setSearchResults([])
        setSelectedGame(null)
        setTargetPrice("")
    }

    return (
        <Dialog open={open} onOpenChange={(val) => {
            setOpen(val)
            if (!val) resetModal()
        }}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Adicionar Jogo à Watchlist</DialogTitle>
                </DialogHeader>

                {step === "search" ? (
                    <div className="space-y-4 py-4">
                        <div className="relative">
                            <Search
                                className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground cursor-pointer hover:text-primary transition-colors"
                                onClick={handleSearch}
                            />
                            <Input
                                placeholder="Buscar jogo..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        handleSearch()
                                    }
                                }}
                                className="pl-10"
                                autoFocus
                            />
                        </div>

                        <div className="max-h-[300px] overflow-y-auto space-y-2">
                            {loading && (
                                <div className="flex justify-center py-4">
                                    <Loader2 className="h-6 w-6 animate-spin text-primary" />
                                </div>
                            )}

                            {!loading && searchResults.length === 0 && searchQuery.length >= 3 && (
                                <p className="text-center text-muted-foreground py-4">Nenhum jogo encontrado.</p>
                            )}

                            {searchResults.map((game) => (
                                <div
                                    key={game.id}
                                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent cursor-pointer transition-colors"
                                    onClick={() => handleSelectGame(game)}
                                >
                                    <div className="h-12 w-8 bg-muted rounded overflow-hidden flex-shrink-0">
                                        {game.imagem_capa ? (
                                            <img src={game.imagem_capa} alt={game.nome} className="h-full w-full object-cover" />
                                        ) : (
                                            <div className="h-full w-full bg-secondary" />
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-medium truncate">{game.nome}</h4>
                                        <p className="text-xs text-muted-foreground">
                                            {game.data_lancamento ? new Date(game.data_lancamento).getFullYear() : "N/A"}
                                        </p>
                                    </div>
                                    <Button size="icon" variant="ghost" className="h-8 w-8">
                                        <Plus className="h-4 w-4" />
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="space-y-6 py-4">
                        <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                            <div className="h-16 w-12 bg-muted rounded overflow-hidden flex-shrink-0">
                                {selectedGame?.imagem_capa && (
                                    <img src={selectedGame.imagem_capa} alt={selectedGame.nome} className="h-full w-full object-cover" />
                                )}
                            </div>
                            <div>
                                <h3 className="font-bold">{selectedGame?.nome}</h3>
                                <p className="text-sm text-muted-foreground">Defina o preço alvo para alerta</p>
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="ml-auto"
                                onClick={() => setStep("search")}
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="target-price">Preço Alvo (R$)</Label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">R$</span>
                                <Input
                                    id="target-price"
                                    type="number"
                                    step="0.01"
                                    placeholder="0.00"
                                    className="pl-10"
                                    value={targetPrice}
                                    onChange={(e) => setTargetPrice(e.target.value)}
                                    autoFocus
                                />
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Preço atual: {selectedGame?.last_price ? `R$ ${selectedGame.last_price.toFixed(2)}` : "Indisponível"}
                            </p>
                        </div>

                        <div className="flex justify-end gap-2">
                            <Button variant="outline" onClick={() => setStep("search")}>
                                Voltar
                            </Button>
                            <Button onClick={handleSubmit} disabled={submitting || !targetPrice}>
                                {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Adicionar à Watchlist
                            </Button>
                        </div>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    )
}
