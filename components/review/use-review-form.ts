import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useToast } from '@/components/ui/use-toast'
import { AvaliacaoService } from '@/services/avaliacao-service'

export function useReviewForm(gameId: string) {
    const router = useRouter()
    const { toast } = useToast()

    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')
    const [submitting, setSubmitting] = useState(false)

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
                game_id: gameId
            })

            toast({
                title: "Sucesso!",
                description: "Sua avaliação foi publicada.",
            })

            router.push(`/games/${gameId}`)
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

    return {
        rating,
        setRating,
        comment,
        setComment,
        submitting,
        handleSubmit
    }
}
