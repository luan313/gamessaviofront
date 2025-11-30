import { Trophy, Lock, Medal, Target, Flame, Zap } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function AchievementsList() {
    // Adicionei um campo 'rarity' para definir a cor
    const achievements = [
        { 
            id: 1, 
            name: "Primeira Avaliação", 
            icon: <Medal className="h-6 w-6" />, 
            description: "Escreveu sua primeira análise.", 
            rarity: "common" 
        },
        { 
            id: 2, 
            name: "Crítico Respeitado", 
            icon: <Target className="h-6 w-6" />, 
            description: "Recebeu 50 curtidas em análises.", 
            rarity: "rare" 
        },
        { 
            id: 3, 
            name: "Lenda do RPG", 
            icon: <Flame className="h-6 w-6" />, 
            description: "Zerou 5 RPGs com 100% de conclusão.", 
            rarity: "epic" 
        },
        { 
            id: 4, 
            name: "Early Adopter", 
            icon: <Zap className="h-6 w-6" />, 
            description: "Entrou na plataforma no primeiro mês.", 
            rarity: "legendary" 
        },
    ]

    // Função que define as cores baseadas na raridade
    const getRarityStyles = (rarity: string) => {
        switch (rarity) {
            case "legendary":
                return "border-yellow-500 text-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.5)] bg-yellow-500/10 hover:bg-yellow-500/20"
            case "epic":
                return "border-purple-500 text-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.5)] bg-purple-500/10 hover:bg-purple-500/20"
            case "rare":
                return "border-blue-500 text-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)] bg-blue-500/10 hover:bg-blue-500/20"
            default: // common
                return "border-gray-500 text-gray-400 bg-gray-500/10 hover:bg-gray-500/20"
        }
    }

    return (
        <div className="space-y-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-3 drop-shadow-md">
                <Trophy className="h-6 w-6 text-yellow-500 drop-shadow-[0_0_10px_rgba(234,179,8,0.5)]" />
                Sala de Troféus
            </h3>

            <div className="flex flex-wrap gap-4">
                <TooltipProvider delayDuration={100}>
                    {achievements.map((achievement) => (
                        <Tooltip key={achievement.id}>
                            <TooltipTrigger>
                                {/* O Círculo da Conquista com cores dinâmicas */}
                                <div className={`
                                    h-16 w-16 rounded-full border-2 flex items-center justify-center 
                                    transition-all duration-300 hover:scale-110 cursor-help
                                    ${getRarityStyles(achievement.rarity)}
                                `}>
                                    <span className="drop-shadow-md group-hover:animate-pulse">
                                        {achievement.icon}
                                    </span>
                                </div>
                            </TooltipTrigger>
                            
                            {/* O Tooltip que aparece ao passar o mouse */}
                            <TooltipContent className="bg-zinc-950 border-white/10 text-white p-3">
                                <p className="font-bold text-base mb-1 flex items-center gap-2">
                                    {achievement.name}
                                    {/* Etiqueta de Raridade */}
                                    <span className={`text-[10px] uppercase px-1.5 py-0.5 rounded border border-white/20 
                                        ${achievement.rarity === 'legendary' ? 'text-yellow-400 bg-yellow-900/30' : 
                                          achievement.rarity === 'epic' ? 'text-purple-400 bg-purple-900/30' : 
                                          achievement.rarity === 'rare' ? 'text-blue-400 bg-blue-900/30' : 'text-gray-400 bg-gray-800'}`}>
                                        {achievement.rarity}
                                    </span>
                                </p>
                                <p className="text-xs text-gray-400">{achievement.description}</p>
                            </TooltipContent>
                        </Tooltip>
                    ))}

                    {/* Conquista Bloqueada (Cadeado) */}
                    <Tooltip>
                        <TooltipTrigger>
                            <div className="h-16 w-16 rounded-full bg-black/40 border border-white/5 border-dashed flex items-center justify-center text-gray-700 hover:text-red-500 hover:border-red-900/50 transition-colors cursor-not-allowed">
                                <Lock className="h-6 w-6" />
                            </div>
                        </TooltipTrigger>
                        <TooltipContent className="bg-zinc-950 border-red-900/30 text-white">
                            <p className="font-bold text-red-400">Bloqueado</p>
                            <p className="text-xs text-gray-500">Continue jogando para descobrir...</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
        </div>
    )
}