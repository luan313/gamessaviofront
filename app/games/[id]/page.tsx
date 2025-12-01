'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { NavHeader } from '@/components/nav-header'
import { ReviewCard } from '@/components/review-card'
import { PriceHistoryChart } from '@/components/price-history-chart'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Star, DollarSign, TrendingDown, Bell, ExternalLink, Loader2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { GameService } from '@/services/game-service'
import { AvaliacaoService } from '@/services/avaliacao-service'
import { MonitoramentoService } from '@/services/monitoramento'
import { GameBackend } from '@/types/game'
import { useToast } from '@/components/ui/use-toast'

export default function GameDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const id = params.id as string

  const [game, setGame] = useState<GameBackend | null>(null)
  const [reviews, setReviews] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [targetPrice, setTargetPrice] = useState('')
  const [addingToWatchlist, setAddingToWatchlist] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [gameData, reviewsData] = await Promise.all([
          GameService.getGameById(id),
          AvaliacaoService.getReviewsByGameId(id)
        ])
        setGame(gameData)
        setReviews(reviewsData.items || [])
      } catch (error) {
        console.error("Failed to fetch game data", error)
        toast({
          title: "Erro",
          description: "Não foi possível carregar os dados do jogo.",
          variant: "destructive"
        })
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchData()
    }
  }, [id, toast])

  const calculateMediaNote = () => {
    if (reviews.length === 0) return 0
    const totalNotes = reviews.reduce((acc, review) => acc + review.nota, 0)
    return totalNotes / reviews.length
  }

  const handleAddToWatchlist = async () => {
    const token = localStorage.getItem('token')
    if (!token) {
      router.push('/login')
      return
    }

    if (!targetPrice) {
      toast({
        title: "Atenção",
        description: "Defina um preço alvo.",
        variant: "destructive"
      })
      return
    }

    setAddingToWatchlist(true)
    try {
      await MonitoramentoService.addMonitoramento(id, parseFloat(targetPrice))
      toast({
        title: "Sucesso",
        description: "Jogo adicionado ao monitoramento!",
      })
      setTargetPrice('')
    } catch (error) {
      console.error(error)
      toast({
        title: "Erro",
        description: "Erro ao adicionar monitoramento. Verifique se já não está monitorando este jogo.",
        variant: "destructive"
      })
    } finally {
      setAddingToWatchlist(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <NavHeader />
        <div className="flex-1 flex justify-center items-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </div>
    )
  }

  if (!game) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <NavHeader />
        <div className="flex-1 flex justify-center items-center">
          <p className="text-muted-foreground">Jogo não encontrado.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <NavHeader />

      <main className="pb-12">
        <div className="relative w-full min-h-[400px] lg:h-[500px] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center blur-xl opacity-50 scale-110"
            style={{ backgroundImage: `url(${game.imagem_capa || "/placeholder.svg"})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />

          <div className="container mx-auto px-4 h-full flex items-end pb-8 relative z-10 pt-24 lg:pt-0">
            <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center md:items-end w-full text-center md:text-left">
              <div className="relative w-40 md:w-64 aspect-[3/4] rounded-lg overflow-hidden shadow-2xl border-4 border-background shrink-0">
                <Image
                  src={game.imagem_capa || "/placeholder.svg"}
                  alt={game.nome}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex-1 mb-2 w-full">
                <div className="flex flex-wrap gap-2 mb-3 justify-center md:justify-start">
                  {game.categorias?.map((cat) => (
                    <Badge key={cat.categoria.id} variant="secondary" className="bg-primary/20 hover:bg-primary/30 text-primary-foreground">
                      {cat.categoria.nome}
                    </Badge>
                  ))}
                </div>

                <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 text-foreground drop-shadow-lg leading-tight">{game.nome}</h1>

                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground items-center justify-center md:justify-start">
                  {game.store_name && (
                    <Badge variant="outline" className="bg-background/50 backdrop-blur-sm border-border">
                      {game.store_name}
                    </Badge>
                  )}
                  {game.data_lancamento && (
                    <span className="flex items-center gap-1 text-muted-foreground">
                      📅 {new Date(game.data_lancamento).toLocaleDateString()}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 mt-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">

              <section className="prose prose-invert max-w-none">
                <h2 className="text-2xl font-bold mb-4">Sobre o Jogo</h2>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                  {game.descricao || "Sem descrição disponível."}
                </p>
              </section>

              {game.plataformas && game.plataformas.length > 0 && (
                <section>
                  <h3 className="text-lg font-semibold mb-3">Plataformas</h3>
                  <div className="flex flex-wrap gap-2">
                    {game.plataformas.map((p) => (
                      <Badge key={p.plataforma.id} variant="outline" className="px-3 py-1">
                        {p.plataforma.nome}
                      </Badge>
                    ))}
                  </div>
                </section>
              )}

              <section>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">Avaliações da Comunidade</h2>
                  <Link href={`/games/${game.id}/review`}>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Star className="h-4 w-4" />
                      Escrever Avaliação
                    </Button>
                  </Link>
                </div>

                <div className="space-y-4">
                  {reviews.length > 0 ? (
                    reviews.map((review: any) => (
                      <ReviewCard
                        key={review.id}
                        id={review.id}
                        userName={review.user?.nome || "Usuário"}
                        userAvatar="/diverse-user-avatars.png"
                        rating={review.nota}
                        comment={review.comentario}
                        createdAt={new Date(review.created_at).toLocaleDateString()}
                        likes={0}
                      />
                    ))
                  ) : (
                    <div className="text-center py-12 bg-muted/30 rounded-lg border border-dashed">
                      <Star className="h-12 w-12 text-muted-foreground mx-auto mb-3 opacity-20" />
                      <p className="text-muted-foreground">Este jogo ainda não tem avaliações.</p>
                      <Link href={`/games/${game.id}/review`} className="text-primary hover:underline text-sm mt-2 inline-block">
                        Seja o primeiro a avaliar!
                      </Link>
                    </div>
                  )}
                </div>
              </section>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <Card className="bg-card/50 backdrop-blur-sm">
                  <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                    <div className="text-3xl font-bold text-primary mb-1">{calculateMediaNote() || "-"}</div>
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
                        onClick={handleAddToWatchlist}
                        disabled={addingToWatchlist}
                      >
                        {addingToWatchlist ? <Loader2 className="h-4 w-4 animate-spin" /> : <Bell className="h-4 w-4" />}
                        Adicionar à Watchlist
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

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
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
