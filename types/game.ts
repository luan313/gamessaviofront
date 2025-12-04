export interface Category {
    categoria: {
        id: string
        nome: string
    }
}

export interface Platform {
    plataforma: {
        id: string
        nome: string
        slug: string
    }
}

export interface GameBackend {
    id: string
    nome: string
    slug: string | null
    descricao: string | null
    imagem_capa: string | null
    data_lancamento: string | null
    metacritic: number | null
    nota_media: number | null
    last_price: number | null
    isthereanydeal_id: string | null
    deal_url: string | null
    store_name: string | null
    hype: number | null
    updated_at: string | null
    categorias: Category[]
    plataformas: Platform[]
}

export interface GameFrontend {
    id: string
    name: string
    coverImage: string
    averageRating: number
    currentPrice: number
    categories: string[]
    releaseYear: string
}


export interface WatchlistGame {
  id: string
  gameId: string
  gameName: string
  gameCover: string
  currentPrice: number
  targetPrice: number
  lowestPrice: number
  addedDate: string
}