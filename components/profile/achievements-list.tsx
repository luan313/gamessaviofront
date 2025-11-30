import { Trophy, Lock } from "lucide-react"
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
        <div className="space-y-6 p-4 bg-black/20 rounded-xl border border-white/5 h-full">
            <h3 className="text-xl font-bold text-white flex items-center gap-3 drop-shadow-md">
                <Trophy className="h-6 w-6 text-yellow-500 drop-shadow-[0_0_10px_rgba(234,179,8,0.5)]" />
                Sala de Troféus
            </h3>

            <div className="flex flex-wrap gap-4">
                <TooltipProvider delayDuration={100}>
                    {achievements.map((achievement) => (
                        <Tooltip key={achievement.id}>
                            <TooltipTrigger>
                                {/* Círculo Dourado com Efeito Hover */}
                                <div className="group relative h-16 w-16 rounded-full bg-gradient-to-br from-[#1a1a1a] to-black border-2 border-yellow-500/20 hover:border-yellow-400 flex items-center justify-center text-2xl transition-all duration-300 hover:scale-110 hover:shadow-[0_0_20px_rgba(234,179,8,0.4)] cursor-help">
                                    
                                    {/* Brilho interno sutil */}
                                    <div className="absolute inset-0 rounded-full bg-yellow-500/5 group-hover:bg-yellow-500/10 transition-colors" />
                                    
                                    <span className="relative z-10 drop-shadow-md group-hover:animate-bounce">
                                        {achievement.icon}
                                    </span>
                                </div>
                            </TooltipTrigger>
                            <TooltipContent className="bg-zinc-900 border-yellow-500/30 text-white">
                                <p className="font-bold text-yellow-400">{achievement.name}</p>
                                <p className="text-xs text-gray-300">{achievement.description}</p>
                            </TooltipContent>
                        </Tooltip>
                    ))}

                    {/* Conquista Bloqueada (Estilo Dark) */}
                    <Tooltip>
                        <TooltipTrigger>
                            <div className="h-16 w-16 rounded-full bg-black/40 border border-white/5 border-dashed flex items-center justify-center text-xl text-gray-600 grayscale hover:text-red-500 hover:border-red-900/50 transition-colors cursor-not-allowed">
                                <Lock className="h-6 w-6" />
                            </div>
                        </TooltipTrigger>
                        <TooltipContent className="bg-zinc-950 border-red-900/30 text-white">
                            <p className="font-bold text-red-400">Bloqueado</p>
                            <p className="text-xs text-gray-400">Continue jogando para descobrir...</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
        </div>
    )
}