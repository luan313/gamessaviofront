import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ReviewCard } from '@/components/review-card'
import { Star, Loader2 } from 'lucide-react'

interface GameReviewsProps {
    gameId: string
    reviews: any[]
    isNavigatingToReview: boolean
    onReviewClick: () => void
}

export function GameReviews({ gameId, reviews, isNavigatingToReview, onReviewClick }: GameReviewsProps) {
    return (
        <section>
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Avaliações da Comunidade</h2>
                <Button
                    variant="outline"
                    size="sm"
                    className="gap-2"
                    onClick={onReviewClick}
                    disabled={isNavigatingToReview}
                >
                    {isNavigatingToReview ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                        <Star className="h-4 w-4" />
                    )}
                    Escrever Avaliação
                </Button>
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
                        <Button
                            variant="link"
                            className="text-primary hover:underline text-sm mt-2 h-auto p-0"
                            onClick={onReviewClick}
                            disabled={isNavigatingToReview}
                        >
                            {isNavigatingToReview && <Loader2 className="h-3 w-3 animate-spin mr-2" />}
                            Seja o primeiro a avaliar!
                        </Button>
                    </div>
                )}
            </div>
        </section>
    )
}
