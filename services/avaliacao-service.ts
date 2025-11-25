import { api } from "@/lib/axios"
import { Avaliacao } from "@/types/avaliacao"

export const AvaliacaoService = {
    getLastFive: async (): Promise<Avaliacao[]> => {
        const response = await api.get("/avaliacoes/last-five-avaliations")
        return response.data
    }
}
