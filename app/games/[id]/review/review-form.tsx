'use client'

import { NavHeader } from '@/components/nav-header'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Loader2, ArrowLeft } from 'lucide-react'
import { useRouter, useParams } from 'next/navigation'
import { GameBackend } from '@/types/game'
import Link from 'next/link'
import { StarRating } from '../../../../components/review/star-rating'
import { GameInfoCard } from '../../../../components/review/game-info-card'
import { useReviewForm } from '../../../../components/review/use-review-form'

interface ReviewFormClientProps {
  Game: GameBackend
}

export default function ReviewFormClient({ Game }: ReviewFormClientProps) {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string

  const {
    rating,
    setRating,
    comment,
    setComment,
    submitting,
    handleSubmit
  } = useReviewForm(id)

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <NavHeader />

      <div className="relative flex-1">
        <div
          className="absolute inset-0 bg-cover bg-center blur-xl opacity-30 pointer-events-none fixed"
          style={{ backgroundImage: `url(${Game.imagem_capa || "/placeholder.svg"})` }}
        />
        <div className="absolute inset-0 bg-background/60 pointer-events-none fixed" />

        <main className="container mx-auto px-4 py-8 relative z-10">
          <div className="max-w-4xl mx-auto">
            <Link href={`/games/${id}`} className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6 transition-colors">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar para o jogo
            </Link>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <GameInfoCard game={Game} />

              <div className="md:col-span-2">
                <Card className="border-primary/20 shadow-lg backdrop-blur-sm bg-card/80">
                  <CardHeader>
                    <CardTitle className="text-2xl">Escrever Avaliação</CardTitle>
                    <CardDescription>
                      O que você achou de {Game.nome}? Sua opinião ajuda outros jogadores.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-8">
                      <div className="space-y-4">
                        <Label className="text-base font-semibold">Sua nota</Label>
                        <StarRating rating={rating} onRatingChange={setRating} />
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
