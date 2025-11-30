import { api } from "@/lib/axios"
import { GameBackend } from "@/types/game"
import { PaginatedResponse } from "@/types/paginated"

export const CategoriaService = {
    async getCategories() {
        const response = await api.get("/categoria/com-jogos")
        return response.data
    },

    async getGamesByCategoryId(id: string, page: number = 1, limit: number = 20): Promise<PaginatedResponse<GameBackend>> {
        const response = await api.get(`/categoria/${id}/jogos?page=${page}&limit=${limit}`)
        return response.data
    }
}