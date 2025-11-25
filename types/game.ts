export interface GameBackend {
    id: string
    nome: string
    imagem_capa: string | null
    nota_media: number | null
    last_price: number | null
    data_lancamento: string | null
    hype: number
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
