import { cookies } from "next/headers"
import { MonitoramentoService } from "@/services/monitoramento"
import WatchlistClient from "./watchlist-client"
import { redirect } from "next/navigation"

export default async function WatchlistPage() {
  const cookieStore = await cookies()
  const token = cookieStore.get("token")?.value

  if (!token) {
    redirect("/login")
  }

  let watchlistGames = []

  try {
    const data = await MonitoramentoService.getMonitoramentos(token)
    watchlistGames = data.map((item: any) => ({
      id: item.id,
      gameId: item.game_id,
      gameName: item.game?.nome || "Jogo Desconhecido",
      gameCover: item.game?.imagem_capa || "/placeholder-game.jpg",
      currentPrice: item.game?.last_price || 0,
      targetPrice: item.preco_alvo,
      lowestPrice: item.game?.lowest_price || 0,
      addedDate: new Date(item.created_at).toLocaleDateString(),
    }))
  } catch (error) {
    console.error("Failed to fetch watchlist:", error)
  }

  return <WatchlistClient initialGames={watchlistGames} />
}
