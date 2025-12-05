import ReviewFormClient from "./review-form"
import { GameService } from '@/services/game-service'

interface ReviewPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function ReviewPage({ params }: ReviewPageProps) {
  const { id } = await params
  const game = await GameService.getGameById(id)

  return <ReviewFormClient Game={game} />
}