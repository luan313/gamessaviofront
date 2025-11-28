'use client'

import { NavHeader } from '@/components/nav-header'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Star, Loader2, ArrowLeft } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { GameService } from '@/services/game-service'
import { AvaliacaoService } from '@/services/avaliacao-service'
import { GameBackend } from '@/types/game'
import { useToast } from '@/components/ui/use-toast'
import Image from 'next/image'
import Link from 'next/link'

export default function ReviewGamePage() {
  const router = useRouter()
  const params = useParams()
  const { toast } = useToast()
  const id = params.id as string

  const [game, setGame] = useState<GameBackend | null>(null)
  const [loading, setLoading] = useState(true)
  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [comment, setComment] = useState('')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const gameData = await GameService.getGameById(id)
        setGame(gameData)
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
      fetchGame()
    }
  }, [id, toast])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const token = localStorage.getItem('token')
    if (!token) {
      toast({
        title: "Login necessário",
        description: "Você precisa estar logado para avaliar um jogo.",
        variant: "destructive"
      })
      router.push('/login')
      return
    }

    if (rating === 0) {
      toast({
        title: "Atenção",
        description: "Por favor, selecione uma nota para o jogo.",
        variant: "destructive"
      })
      return
    }

    setSubmitting(true)
    try {
      await AvaliacaoService.createAvaliacao({
        nota: rating,
        comentario: comment,
        game_id: id
      })

      toast({
        title: "Sucesso!",
        description: "Sua avaliação foi publicada.",
      })

      router.push(`/games/${id}`)
    } catch (error) {
      console.error(error)
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao publicar sua avaliação.",
        variant: "destructive"
      })
    } finally {
      setSubmitting(false)
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
    <div className="min-h-screen bg-background flex flex-col">
      <NavHeader />

      <div className="relative flex-1">
        <div
          className="absolute inset-0 bg-cover bg-center blur-xl opacity-30 pointer-events-none fixed"
          style={{ backgroundImage: `url(${game.imagem_capa || "/placeholder.svg"})` }}
        />
        <div className="absolute inset-0 bg-background/60 pointer-events-none fixed" />

        <main className="container mx-auto px-4 py-8 relative z-10">
          <div className="max-w-4xl mx-auto">
            <Link href={`/games/${id}`} className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6 transition-colors">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar para o jogo
            </Link>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-1 space-y-4">
                <div className="relative w-full aspect-[3/4] rounded-lg overflow-hidden shadow-2xl border-2 border-primary/10">
                  <Image
                    src={game.imagem_capa || "/placeholder.svg"}
                    alt={game.nome}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="text-center md:text-left">
                  <h1 className="text-2xl font-bold">{game.nome}</h1>
                  <p className="text-sm text-muted-foreground mt-1">
                    {game.data_lancamento ? new Date(game.data_lancamento).getFullYear() : ""} • {game.store_name}
                  </p>
                </div>
              </div>

              <div className="md:col-span-2">
                <Card className="border-primary/20 shadow-lg backdrop-blur-sm bg-card/80">
                  <CardHeader>
                    <CardTitle className="text-2xl">Escrever Avaliação</CardTitle>
                    <CardDescription>
                      O que você achou de {game.nome}? Sua opinião ajuda outros jogadores.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-8">
                      {/* Rating */}
                      <div className="space-y-4">
                        <Label className="text-base font-semibold">Sua nota</Label>
                        <div className="flex flex-col items-center p-6 bg-secondary/20 rounded-lg border border-border/50">
                          <div className="flex items-center gap-1 sm:gap-2 mb-2">
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
                              <button
                                key={value}
                                type="button"
                                onClick={() => setRating(value)}
                                onMouseEnter={() => setHoveredRating(value)}
                                onMouseLeave={() => setHoveredRating(0)}
                                className="group relative p-1 focus:outline-none"
                              >
                                <Star
                                  className={`h-6 w-6 sm:h-8 sm:w-8 transition-all duration-200 ${value <= (hoveredRating || rating)
                                      ? 'fill-primary text-primary scale-110 drop-shadow-[0_0_8px_rgba(255,165,0,0.5)]'
                                      : 'text-muted-foreground/30 hover:text-primary/50'
                                    }`}
                                />
                              </button>
                            ))}
                          </div>
                          <div className="h-6 text-center">
                            {(hoveredRating || rating) > 0 && (
                              <span className="text-lg font-bold text-primary animate-in fade-in slide-in-from-bottom-2">
                                {hoveredRating || rating}/10
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="comment" className="text-base font-semibold">
                          Seu comentário
                        </Label>
                        <Textarea
                          id="comment"
                          placeholder="Conte o que você achou da jogabilidade, gráficos, história..."
                          className="min-h-[200px] resize-none bg-background/50 focus:bg-background transition-colors"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        />
                        <div className="flex justify-end">
                          <span className="text-xs text-muted-foreground">
                            {comment.length} caracteres
                          </span>
                        </div>
                      </div>

                      <div className="flex gap-3 pt-4">
                        <Button
                          type="button"
                          size="lg"
                          variant="outline"
                          onClick={() => router.back()}
                          className="flex-1"
                          disabled={submitting}
                        >
                          Cancelar
                        </Button>
                        <Button
                          type="submit"
                          size="lg"
                          disabled={rating === 0 || submitting}
                          className="flex-[2] font-bold"
                        >
                          {submitting ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Publicando...
                            </>
                          ) : (
                            'Publicar Avaliação'
                          )}
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
