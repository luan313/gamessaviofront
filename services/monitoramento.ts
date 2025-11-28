import { api } from "@/lib/axios"

export const MonitoramentoService = {
    async getMonitoramentos(token: string) {
        const response = await api.get("/monitoramentos/get_my_monitoramentos", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data
    },

    async addMonitoramento(token: string, gameId: string, targetPrice: number) {
        const response = await api.post("/monitoramentos/create", {
            game_id: gameId,
            preco_alvo: targetPrice
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data
    },

    async deleteMonitoramento(token: string, monitoramentoId: string) {
        const response = await api.delete(`/monitoramentos/${monitoramentoId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data
    },

    async updateMonitoramento(token: string, monitoramentoId: string, targetPrice: number) {
        const response = await api.patch(`/monitoramentos/${monitoramentoId}`, {
            preco_alvo: targetPrice
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data
    }
}