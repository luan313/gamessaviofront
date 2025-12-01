export interface Categoria {
    id: string
    nome: string
    slug: string
    descricao: string
    count: number
    cover: string
}

export interface CategoriaLite {
    id: string
    nome: string
    qtd_jogos: number
    imagem_capa: string
}