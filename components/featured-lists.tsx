"use client"

import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"

const lists = [
    {
        id: 1,
        title: "Indies Essenciais 2024",
        author: "Editoria",
        games: ["/hades-game-cover.png", "/celeste-game-cover.jpg", "/stardew-valley-game-cover.png"],
        count: 15,
    },
    {
        id: 2,
        title: "RPGs para perder a vida social",
        author: "LuanSavio",
        games: ["/elden-ring-hero.jpg", "/bg3-hero.jpg", "/cyberpunk-hero.jpg"],
        count: 8,
    },
    {
        id: 3,
        title: "Jogos com visuais incríveis",
        author: "DesignTeam",
        games: ["/cyberpunk-hero.jpg", "/hollow-knight-game-cover.jpg", "/placeholder.svg"],
        count: 12,
    },
]

export function FeaturedLists() {
    return (
        <div className="grid gap-4">
            {lists.map((list) => (
                <Link key={list.id} href="#" className="block group">
                    <Card className="bg-secondary/10 border-white/5 overflow-hidden hover:bg-secondary/20 transition-all hover:border-white/10">
                        <CardContent className="p-0">
                            <div className="flex h-24">
                                {/* Preview Images */}
                                <div className="flex w-2/3 relative">
                                    {list.games.slice(0, 3).map((img, i) => (
                                        <div key={i} className="flex-1 relative border-r border-black/50 last:border-0">
                                            <Image
                                                src={img}
                                                alt="Game cover"
                                                fill
                                                className="object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                                                onError={(e) => {
                                                    e.currentTarget.src = "/placeholder.svg"
                                                }}
                                            />
                                        </div>
                                    ))}
                                </div>

                                {/* Info */}
                                <div className="w-1/3 p-3 flex flex-col justify-center bg-black/20">
                                    <h3 className="font-bold text-sm text-white leading-tight group-hover:text-blue-400 transition-colors">
                                        {list.title}
                                    </h3>
                                    <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                                        <span>{list.count} jogos</span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </Link>
            ))}
        </div>
    )
}
