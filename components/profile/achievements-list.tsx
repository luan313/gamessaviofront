import { Trophy, Lock, Medal, Target, Flame, Zap } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function AchievementsList() {
    const achievements: any[] = [] // Empty for now

    return (
        <div className="space-y-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-3 drop-shadow-md">
                <Trophy className="h-6 w-6 text-yellow-500 drop-shadow-[0_0_10px_rgba(234,179,8,0.5)]" />
                Sala de Troféus
            </h3>

            <div className="flex flex-wrap gap-4 justify-center py-8 bg-white/5 rounded-xl border border-white/5 border-dashed">
                <div className="text-center space-y-2">
                    <Lock className="h-8 w-8 text-gray-600 mx-auto" />
                    <p className="text-gray-500 text-sm">Conquistas em breve...</p>
                </div>
            </div>
        </div>
    )
}