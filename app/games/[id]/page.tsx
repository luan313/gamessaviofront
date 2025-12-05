'use client'

import { useParams } from 'next/navigation'
import { NavHeader } from '@/components/nav-header'
import { Loader2 } from 'lucide-react'
import { useGameDetails } from '@/components/game-details/use-game-details'
import { GameHeader } from '@/components/game-details/game-header'
import { GameDescription } from '@/components/game-details/game-description'
import { GamePlatforms } from '@/components/game-details/game-platforms'
import { GameReviews } from '@/components/game-details/game-reviews'
import { GameStats } from '@/components/game-details/game-stats'
import { PriceCard } from '@/components/game-details/price-card'
import { GameInfoList } from '@/components/game-details/game-info-list'

export default function GameDetailsPage() {
  const params = useParams()
  const id = params.id as string
  const {
    game,
    reviews,
    loading,
    targetPrice,
    setTargetPrice,
    addingToWatchlist,
    isNavigatingToReview,
    calculateMediaNote,
    handleAddToWatchlist,
    handleReviewClick
  } = useGameDetails(id)

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
        <GameHeader game={game} />

        <div className="container mx-auto px-4 mt-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <GameDescription description={game.descricao} />
              <GamePlatforms platforms={game.plataformas} />
              <GameReviews
                gameId={game.id}
                reviews={reviews}
                isNavigatingToReview={isNavigatingToReview}
                onReviewClick={handleReviewClick}
              />
            </div>

            <div className="space-y-6">
              <GameStats game={game} averageRating={calculateMediaNote()} />

              <PriceCard
                game={game}
                targetPrice={targetPrice}
                setTargetPrice={setTargetPrice}
                onAddToWatchlist={handleAddToWatchlist}
                addingToWatchlist={addingToWatchlist}
              />

              <GameInfoList game={game} />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
