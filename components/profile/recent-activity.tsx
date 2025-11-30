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
            color: "text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]"
        },
        {
            id: 2,
            type: "play",
            game: "Cyberpunk 2077",
            action: "jogou por 4 horas",
            time: "5h atrás",
            icon: Gamepad2,
            color: "text-blue-400 drop-shadow-[0_0_8px_rgba(96,165,250,0.5)]"
        },
        {
            id: 3,
            type: "comment",
            game: "Hollow Knight",
            action: "comentou na review de @maria",
            time: "1d atrás",
            icon: MessageSquare,
            color: "text-green-400 drop-shadow-[0_0_8px_rgba(74,222,128,0.5)]"
        },
        {
            id: 4,
            type: "achievement",
            game: "God of War",
            action: "desbloqueou 'Matador de Deuses'",
            time: "2d atrás",
            icon: Gamepad2,
            color: "text-purple-400 drop-shadow-[0_0_8px_rgba(192,132,252,0.5)]"
        }
    ]

    return (
        <div className="space-y-6 p-4 bg-black/20 rounded-xl border border-white/5">
            <h3 className="text-xl font-bold text-white flex items-center gap-3 drop-shadow-md">
                <Gamepad2 className="h-6 w-6 text-blue-500 animate-pulse" />
                Atividade Recente
            </h3>

            <div className="space-y-0 relative">
                {activities.map((activity, index) => (
                    <div key={activity.id} className="flex gap-4 items-start group relative pb-8 last:pb-0">
                        
                        {/* A Linha do Tempo Neon */}
                        <div className="absolute left-[11px] top-8 bottom-0 w-[2px] bg-gradient-to-b from-blue-600/50 to-purple-600/50 group-last:hidden shadow-[0_0_8px_rgba(37,99,235,0.4)]" />

                        {/* O Ponto Brilhante (Bolinha) */}
                        <div className="relative mt-1.5 z-10">
                            <div className="h-6 w-6 rounded-full bg-[#0A0A0B] border-2 border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.6)] flex items-center justify-center">
                                <div className="h-2 w-2 rounded-full bg-blue-400 animate-pulse" />
                            </div>
                        </div>

                        {/* O Cartão de Vidro (Glassmorphism) */}
                        <div className="flex-1 bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-white/5 hover:bg-white/10 hover:border-blue-500/30 transition-all duration-300 hover:shadow-[0_0_20px_-5px_rgba(59,130,246,0.15)] group-hover:translate-x-1">
                            <div className="flex flex-col gap-1">
                                <p className="text-sm text-gray-300 leading-relaxed">
                                    <span className={`font-bold text-lg block mb-1 ${activity.color}`}>{activity.game}</span> 
                                    <span className="text-gray-400">{activity.action}</span>
                                </p>
                                <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider flex items-center gap-1">
                                    ⏰ {activity.time}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}