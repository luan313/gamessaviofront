export interface User {
    nome: string
}

export interface Game {
    nome: string
    id: string
    imagem_capa: string
}

export interface Avaliacao {
    id: string
    comentario: string
    nota: number
    user: User
    game: Game
}
