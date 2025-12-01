import { api } from "@/lib/axios"
import { CreateAvaliacao } from "@/types/avaliacao"
import { Avaliacao } from "@/types/avaliacao"

export const AvaliacaoService = {
    getLastFive: async (): Promise<Avaliacao[]> => {
        const response = await api.get("/avaliacoes/last-five-avaliations")
        return response.data
    },

    getReviewsByGameId: async (gameId: string, page: number = 1, size: number = 10) => {
        const response = await api.get(`/avaliacoes/game/${gameId}?page=${page}&size=${size}`)
        return response.data
    },

    createAvaliacao: async (avaliacao: CreateAvaliacao) => {
        const response = await api.post("/avaliacoes", avaliacao)
        return response.data
    },

    getUserReviews: async (): Promise<Avaliacao[]> => {
        const response = await api.get("/avaliacoes/my-avaliations")
        return response.data
    }
}
