"use client"

import { NavHeader } from "@/components/nav-header"
import { Construction, Hammer } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function Constructor() {
    return (
         <div className="min-h-screen bg-[#0A0A0B] text-foreground font-sans flex flex-col">
            <NavHeader />
            <main className="flex-1 container mx-auto px-4 flex flex-col items-center justify-center text-center py-20">
                <div className="relative mb-8">
                    <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full animate-pulse" />
                    <div className="relative bg-white/5 p-8 rounded-full border border-white/10 shadow-2xl">
                        <Construction className="h-24 w-24 text-blue-500 animate-bounce" />
                    </div>
                    <Hammer className="absolute -bottom-2 -right-2 h-12 w-12 text-yellow-500 animate-pulse" />
                </div>

                <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
                    Comunidade <span className="text-blue-500">Em Construção</span>
                </h1>

                <p className="text-xl text-muted-foreground max-w-2xl mb-10 leading-relaxed">
                    Estamos construindo um espaço incrível para você se conectar com outros gamers,
                    compartilhar conquistas e discutir seus jogos favoritos.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                    <Link href="/games">
                        <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8">
                            Explorar Jogos
                        </Button>
                    </Link>
                    <Link href="/">
                        <Button size="lg" variant="outline" className="border-white/10 text-white hover:bg-white/5">
                            Voltar ao Início
                        </Button>
                    </Link>
                </div>
            </main>
        </div>
    )
}