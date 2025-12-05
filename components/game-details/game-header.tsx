import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { GameBackend } from '@/types/game'

interface GameHeaderProps {
    game: GameBackend
}

export function GameHeader({ game }: GameHeaderProps) {
    return (
        <div className="relative w-full min-h-[400px] lg:h-[500px] overflow-hidden">
            <div
                className="absolute inset-0 bg-cover bg-center blur-xl opacity-50 scale-110"
                style={{ backgroundImage: `url(${game.imagem_capa || "/placeholder.svg"})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />

            <div className="container mx-auto px-4 h-full flex items-end pb-8 relative z-10 pt-24 lg:pt-0">
                <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center md:items-end w-full text-center md:text-left">
                    <div className="relative w-40 md:w-64 aspect-[3/4] rounded-lg overflow-hidden shadow-2xl border-4 border-background shrink-0">
                        <Image
                            src={game.imagem_capa || "/placeholder.svg"}
                            alt={game.nome}
                            fill
                            className="object-cover"
                        />
                    </div>

                    <div className="flex-1 mb-2 w-full">
                        <div className="flex flex-wrap gap-2 mb-3 justify-center md:justify-start">
                            {game.categorias?.map((cat) => (
                                <Badge key={cat.categoria.id} variant="secondary" className="bg-primary/20 hover:bg-primary/30 text-primary-foreground">
                                    {cat.categoria.nome}
                                </Badge>
                            ))}
                        </div>

                        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 text-foreground drop-shadow-lg leading-tight">{game.nome}</h1>

                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground items-center justify-center md:justify-start">
                            {game.store_name && (
                                <Badge variant="outline" className="bg-background/50 backdrop-blur-sm border-border">
                                    {game.store_name}
                                </Badge>
                            )}
                            {game.data_lancamento && (
                                <span className="flex items-center gap-1 text-muted-foreground">
                                    📅 {new Date(game.data_lancamento).toLocaleDateString()}
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
