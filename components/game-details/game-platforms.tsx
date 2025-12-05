import { Badge } from '@/components/ui/badge'
import { GameBackend } from '@/types/game'

interface GamePlatformsProps {
    platforms: GameBackend['plataformas']
}

export function GamePlatforms({ platforms }: GamePlatformsProps) {
    if (!platforms || platforms.length === 0) return null

    return (
        <section>
            <h3 className="text-lg font-semibold mb-3">Plataformas</h3>
            <div className="flex flex-wrap gap-2">
                {platforms.map((p) => (
                    <Badge key={p.plataforma.id} variant="outline" className="px-3 py-1">
                        {p.plataforma.nome}
                    </Badge>
                ))}
            </div>
        </section>
    )
}
