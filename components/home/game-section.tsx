import Link from "next/link"
import { ArrowRight, LucideIcon } from "lucide-react"
import { GameCarousel } from "@/components/game-carousel"
import { GameCard, GameCardProps } from "@/components/game-card"

interface GameSectionProps {
    title: string
    icon: LucideIcon
    color: "blue" | "green"
    href: string
    linkText: string
    games: GameCardProps[]
}

export function GameSection({
    title,
    icon: Icon,
    color,
    href,
    linkText,
    games,
}: GameSectionProps) {
    const colorStyles = {
        blue: "bg-blue-500/10 text-blue-400 border-blue-500/20",
        green: "bg-green-500/10 text-green-400 border-green-500/20",
    }

    return (
        <section>
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg backdrop-blur-sm border ${colorStyles[color]}`}>
                        <Icon className="h-5 w-5" />
                    </div>
                    <h2 className="text-2xl font-bold tracking-tight text-foreground">{title}</h2>
                </div>
                <Link
                    href={href}
                    className="text-sm font-medium text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
                >
                    {linkText} <ArrowRight className="h-4 w-4" />
                </Link>
            </div>

            <GameCarousel>
                {games.map((game) => (
                    <div key={game.id} className="w-[180px] md:w-[200px] flex-shrink-0">
                        <GameCard {...game} />
                    </div>
                ))}
            </GameCarousel>
        </section>
    )
}
