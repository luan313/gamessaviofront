import { api } from "@/lib/axios"
import { GameBackend } from "@/types/game"

export const GameService = {
    getHypedGames: async (qtd: number = 10): Promise<GameBackend[]> => {
        const response = await api.get(`/game/hyped-games?qtd=${qtd}`)
        return response.data["items"]
    }
}
