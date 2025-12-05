import { GameService } from "@/services/game-service"
import { CategoriaService } from "@/services/categoria"
import { GameBackend, GameFrontend } from "@/types/game"
import { CategoriaLite } from "@/types/categoria"
import GamesPage from "./game-client"

interface PageProps {
  searchParams: Promise<{
    search?: string
    category?: string
    page?: string
  }>
}

export default async function GameClient({ searchParams }: PageProps) {
  const params = await searchParams
  const currentPage = Number(params.page) || 1
  const searchTerm = params.search || ''
  const selectedCategory = params.category || 'all'

  let gamesData: GameBackend[] = []
  let totalPages = 1

  try {
    if (searchTerm) {
      gamesData = await GameService.searchGames(searchTerm)
      totalPages = 1
    } else if (selectedCategory !== 'all') {
      const response = await CategoriaService.getGamesByCategoryId(selectedCategory, currentPage, 15)
      gamesData = response.items
      totalPages = response.pages
    } else {
      const response = await GameService.getAllGames(currentPage, 15)
      gamesData = response.items
      totalPages = response.pages
    }
  } catch (error) {
    console.error("Erro ao buscar jogos:", error)
  }

  const mappedGames: GameFrontend[] = gamesData.map((game) => ({
    id: game.id,
    name: game.nome,
    coverImage: game.imagem_capa || "/placeholder-game.jpg",
    averageRating: game.nota_media || 0,
    currentPrice: game.last_price || 0,
    categories: game.categorias?.map(c => c.categoria.nome) || [],
    releaseYear: game.data_lancamento
      ? new Date(game.data_lancamento).getFullYear().toString()
      : "N/A",
  }))


  let categories: CategoriaLite[] = []
  try {
    categories = await CategoriaService.getCategories()
  } catch (error) {
    console.error("Erro ao buscar categorias:", error)
  }

  return (
    <GamesPage
      initialGames={mappedGames}
      initialCategories={categories}
      initialTotalPages={totalPages}
      initialCurrentPage={currentPage}
      initialSearchTerm={searchTerm}
      initialCategory={selectedCategory}
    />
  )
}