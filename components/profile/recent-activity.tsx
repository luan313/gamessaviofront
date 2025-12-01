import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Gamepad2, Star, MessageSquare } from "lucide-react"

export function RecentActivity() {
    const activities: any[] = [] // Empty for now

    return (
        <div className="space-y-6 p-4 bg-black/20 rounded-xl border border-white/5">
            <h3 className="text-xl font-bold text-white flex items-center gap-3 drop-shadow-md">
                <Gamepad2 className="h-6 w-6 text-blue-500 animate-pulse" />
                Atividade Recente
            </h3>

            <div className="space-y-0 relative min-h-[100px] flex items-center justify-center">
                <p className="text-gray-500 text-sm italic">Nenhuma atividade recente.</p>
            </div>
        </div>
    )
}