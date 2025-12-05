import { api } from "@/lib/axios"

export const MonitoramentoService = {
    async getMonitoramentos(token?: string) {
        const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {}
        const response = await api.get("/monitoramentos/get_my_monitoramentos", config)
        return response.data
    },

    async addMonitoramento(gameId: string, targetPrice: number) {
        const response = await api.post("/monitoramentos/create", {
            game_id: gameId,
            preco_alvo: targetPrice
        })
        return response.data
    },

    async deleteMonitoramento(monitoramentoId: string) {
        const response = await api.delete(`/monitoramentos/${monitoramentoId}`)
        return response.data
    },

    async updateMonitoramento(monitoramentoId: string, targetPrice: number) {
        const response = await api.patch(`/monitoramentos/${monitoramentoId}`, {
            preco_alvo: targetPrice
        })
        return response.data
    }
}