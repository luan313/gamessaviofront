import { Card, CardContent } from "@/components/ui/card"
import { Star, MessageSquare, Users, Eye, Trophy, Gamepad2 } from "lucide-react"

interface ProfileStatsProps {
    stats: {
        totalReviews: number
        averageRating: number
        gamesWatched: number
        followersCount: number
        achievements?: number
        hoursPlayed?: number
    }
}

export function ProfileStats({ stats }: ProfileStatsProps) {
    const statItems = [
        {
            label: "Avaliações",
            value: stats.totalReviews,
            icon: MessageSquare,
            color: "text-blue-400",
            bg: "bg-blue-500/10",
            border: "border-blue-500/20"
        },
        {
            label: "Nota Média",
            value: stats.averageRating,
            icon: Star,
            color: "text-yellow-400",
            bg: "bg-yellow-500/10",
            border: "border-yellow-500/20"
        },
        {
            label: "Monitorados",
            value: stats.gamesWatched,
            icon: Eye,
            color: "text-purple-400",
            bg: "bg-purple-500/10",
            border: "border-purple-500/20"
        },
        {
            label: "Seguidores",
            value: stats.followersCount,
            icon: Users,
            color: "text-green-400",
            bg: "bg-green-500/10",
            border: "border-green-500/20"
        },
        {
            label: "Conquistas",
            value: stats.achievements || 12, // Mock default
            icon: Trophy,
            color: "text-orange-400",
            bg: "bg-orange-500/10",
            border: "border-orange-500/20"
        },
        {
            label: "Jogos",
            value: 48, // Mock default
            icon: Gamepad2,
            color: "text-pink-400",
            bg: "bg-pink-500/10",
            border: "border-pink-500/20"
        }
    ]

    return (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
            {statItems.map((item, index) => (
                <Card key={index} className={`border ${item.border} bg-secondary/5 hover:bg-secondary/10 transition-colors`}>
                    <CardContent className="p-4 flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${item.bg} ${item.color}`}>
                            <item.icon className="h-5 w-5" />
                        </div>
                        <div>
                            <div className="text-xl font-bold text-white leading-none">{item.value}</div>
                            <div className="text-xs text-muted-foreground mt-1">{item.label}</div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}
