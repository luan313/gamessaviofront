import { api } from "@/lib/axios"
import { GameBackend } from "@/types/game"
import { PaginatedResponse } from "@/types/paginated"
import { CategoriaLite } from "@/types/categoria"

export const CategoriaService = {
    async getCategories(): Promise<CategoriaLite[]> {
        const response = await api.get("/categoria/com-jogos")
        return response.data
    },

    async getGamesByCategoryId(id: string, page: number = 1, limit: number = 10): Promise<PaginatedResponse<GameBackend>> {
        const response = await api.get(`/categoria/${id}/jogos?page=${page}&size=${limit}`)
        return response.data
    }
}