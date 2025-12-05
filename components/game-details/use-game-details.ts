import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useToast } from '@/components/ui/use-toast'
import { GameService } from '@/services/game-service'
import { AvaliacaoService } from '@/services/avaliacao-service'
import { MonitoramentoService } from '@/services/monitoramento'
import { GameBackend } from '@/types/game'

export function useGameDetails(id: string) {
    const router = useRouter()
    const { toast } = useToast()

    const [game, setGame] = useState<GameBackend | null>(null)
    const [reviews, setReviews] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [targetPrice, setTargetPrice] = useState('')
    const [addingToWatchlist, setAddingToWatchlist] = useState(false)
    const [isNavigatingToReview, setIsNavigatingToReview] = useState(false)

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

    const handleReviewClick = () => {
        setIsNavigatingToReview(true)
        router.push(`/games/${id}/review`)
    }

    return {
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
    }
}
