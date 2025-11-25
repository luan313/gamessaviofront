import { Trophy } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function AchievementsList() {
    const achievements = [
        { id: 1, name: "Primeira Avaliação", icon: "📝", description: "Escreveu sua primeira análise" },
        { id: 2, name: "Crítico Respeitado", icon: "⭐", description: "Recebeu 50 curtidas em análises" },
        { id: 3, name: "Caçador de Ofertas", icon: "💰", description: "Monitorou 10 jogos em promoção" },
        { id: 4, name: "Early Adopter", icon: "🚀", description: "Entrou na plataforma no primeiro mês" },
        { id: 5, name: "Social", icon: "🤝", description: "Seguiu 20 usuários" },
    ]

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Trophy className="h-5 w-5 text-yellow-500" />
                Conquistas
            </h3>

            <div className="flex flex-wrap gap-3">
                <TooltipProvider>
                    {achievements.map((achievement) => (
                        <Tooltip key={achievement.id}>
                            <TooltipTrigger>
                                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 flex items-center justify-center text-xl hover:scale-110 transition-transform cursor-help">
                                    {achievement.icon}
                                </div>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p className="font-bold">{achievement.name}</p>
                                <p className="text-xs text-muted-foreground">{achievement.description}</p>
                            </TooltipContent>
                        </Tooltip>
                    ))}

                    {/* Locked Achievement */}
                    <Tooltip>
                        <TooltipTrigger>
                            <div className="h-12 w-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-xl grayscale opacity-50 cursor-not-allowed">
                                🔒
                            </div>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p className="font-bold">Bloqueado</p>
                            <p className="text-xs text-muted-foreground">Continue usando a plataforma para desbloquear</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
        </div>
    )
}
