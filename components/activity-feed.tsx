"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Star, MessageSquare, ThumbsUp } from "lucide-react"
import { useEffect, useState } from "react"
import { Avaliacao } from "@/types/avaliacao"
import { AvaliacaoService } from "@/services/avaliacao-service"
import Link from "next/link"

export function ActivityFeed() {

    const [avaliacoes, setAvaliacoes] = useState<Avaliacao[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchData() {
            try {
                const gamesData = await AvaliacaoService.getLastFive()

                setAvaliacoes(gamesData)
            } catch (error) {
                console.error("Erro ao carregar dados:", error)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [])

    return (
        <div className="space-y-4">
            {avaliacoes.map((activity) => (
                <Card key={activity.id} className="bg-secondary/10 border-white/5 hover:bg-secondary/20 transition-colors">
                    <CardContent className="p-4">
                        <div className="flex gap-3">
                            <Avatar className="h-10 w-10 border border-white/10">
                                <AvatarImage src="https://occ-0-8407-90.1.nflxso.net/dnm/api/v6/6AYY37jfdO6hpXcMjf9Yu5cnmO0/AAAABeEDeJdItI3t5-HzWoL1nV-zJWKc3manHStYsnKrFWQunZp_UbC0UlTRGJGXocrwtIQg_2N4BFzxx5UTtSh3Ni3ZkYjSqjqqwUbW.jpg?r=20f" />
                                <AvatarFallback className="bg-blue-600 text-xs">U</AvatarFallback>
                            </Avatar>

                            <div className="flex-1 space-y-1">
                                <div className="flex items-center justify-between">
                                    <p className="text-sm">
                                        <span className="font-bold text-white hover:underline cursor-pointer">{activity.user.nome}</span>{" "}
                                        <span className="text-muted-foreground"></span>{" "}
                                        <Link href="#" className="font-bold text-blue-400 hover:underline">
                                            {activity.game.nome}
                                        </Link>
                                    </p>
                                    <span className="text-xs text-muted-foreground"></span>
                                </div>

                                {activity.nota && (
                                    <div className="flex items-center gap-1 text-yellow-500">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`h-3 w-3 ${i < Math.floor(activity.nota!) ? "fill-current" : "opacity-30"}`}
                                            />
                                        ))}
                                    </div>
                                )}

                                {activity.comentario && (
                                    <p className="text-sm text-gray-300 italic">"{activity.comentario}"</p>
                                )}

                                <div className="flex items-center gap-4 pt-2">
                                    <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-white transition-colors">
                                        <ThumbsUp className="h-3 w-3" /> {activity.nota > 0 ? activity.nota : "Curtir"}
                                    </button>
                                    <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-white transition-colors">
                                        <MessageSquare className="h-3 w-3" /> Comentar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}
