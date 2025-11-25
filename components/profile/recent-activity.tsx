import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Gamepad2, Star, MessageSquare } from "lucide-react"

export function RecentActivity() {
    const activities = [
        {
            id: 1,
            type: "review",
            game: "Elden Ring",
            action: "avaliou com 10/10",
            time: "2h atrás",
            icon: Star,
            color: "text-yellow-500"
        },
        {
            id: 2,
            type: "play",
            game: "Cyberpunk 2077",
            action: "jogou por 4 horas",
            time: "5h atrás",
            icon: Gamepad2,
            color: "text-blue-500"
        },
        {
            id: 3,
            type: "comment",
            game: "Hollow Knight",
            action: "comentou na review de @maria",
            time: "1d atrás",
            icon: MessageSquare,
            color: "text-green-500"
        },
        {
            id: 4,
            type: "achievement",
            game: "God of War",
            action: "desbloqueou 'Matador de Deuses'",
            time: "2d atrás",
            icon: Gamepad2,
            color: "text-purple-500"
        }
    ]

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Gamepad2 className="h-5 w-5 text-blue-400" />
                Atividade Recente
            </h3>

            <div className="space-y-4">
                {activities.map((activity) => (
                    <div key={activity.id} className="flex gap-3 items-start group">
                        <div className="relative mt-1">
                            <div className="h-2 w-2 rounded-full bg-blue-500 ring-4 ring-blue-500/20" />
                            <div className="absolute top-3 left-1 w-0.5 h-full bg-white/10 -z-10 group-last:hidden" />
                        </div>

                        <div className="flex-1 bg-white/5 p-3 rounded-lg border border-white/5 hover:bg-white/10 transition-colors">
                            <div className="flex justify-between items-start">
                                <p className="text-sm text-gray-200">
                                    <span className={`font-bold ${activity.color}`}>{activity.game}</span> • {activity.action}
                                </p>
                                <span className="text-xs text-muted-foreground whitespace-nowrap">{activity.time}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
