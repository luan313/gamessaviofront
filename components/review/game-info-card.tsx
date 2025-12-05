import Image from 'next/image'
import { GameBackend } from '@/types/game'

interface GameInfoCardProps {
    game: GameBackend
}

export function GameInfoCard({ game }: GameInfoCardProps) {
    return (
        <div className="md:col-span-1 space-y-4">
            <div className="relative w-full aspect-[3/4] rounded-lg overflow-hidden shadow-2xl border-2 border-primary/10">
                <Image
                    src={game.imagem_capa || "/placeholder.svg"}
                    alt={game.nome}
                    fill
                    className="object-cover"
                />
            </div>
            <div className="text-center md:text-left">
                <h1 className="text-2xl font-bold">{game.nome}</h1>
                <p className="text-sm text-muted-foreground mt-1">
                    {game.data_lancamento ? new Date(game.data_lancamento).getFullYear() : ""} • {game.store_name}
                </p>
            </div>
        </div>
    )
}
