import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Settings, Share2, MapPin, Link as LinkIcon } from "lucide-react"
import Link from "next/link"

interface ProfileHeaderProps {
    user: {
        name: string
        username: string
        avatar: string
        bio: string
        level: number
        xp: number
        maxXp: number
        location?: string
        website?: string
    }
}

export function ProfileHeader({ user }: ProfileHeaderProps) {
    const xpPercentage = (user.xp / user.maxXp) * 100

    return (
        <div className="relative mb-8 group">
            {/* Banner Background */}
            <div className="h-48 md:h-64 w-full rounded-t-2xl bg-gradient-to-r from-blue-900 via-purple-900 to-indigo-900 overflow-hidden relative">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-40 mix-blend-overlay"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0B] to-transparent"></div>
            </div>

            {/* Profile Info Container */}
            <div className="px-6 md:px-10 relative -mt-20 flex flex-col md:flex-row items-end md:items-end gap-6">

                {/* Avatar with Level Badge */}
                <div className="relative">
                    <div className="h-32 w-32 md:h-40 md:w-40 rounded-full p-1 bg-[#0A0A0B] ring-4 ring-blue-500/30 relative z-10">
                        <Avatar className="h-full w-full border-4 border-[#0A0A0B]">
                            <AvatarImage src={user.avatar} alt={user.name} className="object-cover" />
                            <AvatarFallback className="text-4xl bg-zinc-800">{user.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                    </div>

                    {/* Level Badge */}
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 z-20 bg-[#0A0A0B] p-1 rounded-full">
                        <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-bold border-2 border-[#0A0A0B] px-3 py-0.5 text-sm shadow-lg shadow-orange-500/20">
                            Lvl {user.level}
                        </Badge>
                    </div>
                </div>

                {/* User Info */}
                <div className="flex-1 pb-2 md:pb-4 text-center md:text-left space-y-2">
                    <div className="flex flex-col md:flex-row items-center md:items-end justify-between gap-4">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow-md">{user.name}</h1>
                            <p className="text-muted-foreground font-medium text-lg">@{user.username}</p>
                        </div>

                        <div className="flex items-center gap-3">
                            <Button variant="outline" size="sm" className="bg-white/5 border-white/10 hover:bg-white/10 hover:text-white backdrop-blur-sm">
                                <Share2 className="h-4 w-4 mr-2" /> Compartilhar
                            </Button>
                            <Link href="/settings">
                                <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20 border-0">
                                    <Settings className="h-4 w-4 mr-2" /> Editar Perfil
                                </Button>
                            </Link>
                        </div>
                    </div>

                    <p className="text-gray-300 max-w-2xl text-sm md:text-base leading-relaxed">
                        {user.bio}
                    </p>

                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm text-muted-foreground pt-2">
                        {user.location && (
                            <div className="flex items-center gap-1">
                                <MapPin className="h-3.5 w-3.5" />
                                <span>{user.location}</span>
                            </div>
                        )}
                        {user.website && (
                            <div className="flex items-center gap-1">
                                <LinkIcon className="h-3.5 w-3.5" />
                                <a href={user.website} target="_blank" rel="noreferrer" className="hover:text-blue-400 transition-colors">{user.website}</a>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* XP Bar */}
            <div className="mt-8 px-6 md:px-10">
                <div className="flex items-center justify-between text-xs font-bold text-muted-foreground mb-1 uppercase tracking-wider">
                    <span>Progresso do Nível</span>
                    <span>{user.xp} / {user.maxXp} XP</span>
                </div>
                <div className="h-2 w-full bg-secondary/30 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                        style={{ width: `${xpPercentage}%` }}
                    />
                </div>
            </div>
        </div>
    )
}
