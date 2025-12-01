"use client";
import { Star, TrendingDown, Heart, Plus } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { AddGameModal } from "@/components/add-game-modal"

interface GameCardProps {
  id: string
  name: string
  coverImage: string
  averageRating: number
  currentPrice: number
  priceDown?: boolean
  categories: string[]
  releaseYear?: string
}

export function GameCard({
  id,
  name,
  coverImage,
  averageRating,
  currentPrice,
  priceDown,
  categories,
  releaseYear,
}: GameCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [inWishlist, setInWishlist] = useState(false)

  const gameForModal = {
    id,
    nome: name,
    imagem_capa: coverImage,
    last_price: currentPrice
  }

  return (
    <div
      className="relative group w-full h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/games/${id}`} className="block h-full">
        <Card className="h-full overflow-hidden border-0 bg-transparent shadow-none flex flex-col">
          <div className="aspect-[2/3] relative rounded-xl overflow-hidden shadow-lg transition-all duration-300 group-hover:shadow-blue-500/20 group-hover:scale-[1.02]">
            <Image
              src={coverImage || "/placeholder.svg"}
              alt={name}
              fill
              className="object-cover"
              onError={(e) => {
                e.currentTarget.src = `/placeholder.svg?height=600&width=400&query=${encodeURIComponent(name)}`
              }}
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />

            <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md text-white text-xs font-bold px-2 py-1 rounded-md flex items-center gap-1 border border-white/10">
              <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
              {averageRating > 0 ? averageRating.toFixed(1) : "-"}
            </div>

            {priceDown && (
              <div className="absolute top-2 left-2 bg-green-500/90 backdrop-blur-md text-white text-xs font-bold px-2 py-1 rounded-md flex items-center gap-1 shadow-lg">
                <TrendingDown className="h-3 w-3" />
                -{Math.floor(Math.random() * 50 + 10)}%
              </div>
            )}

            <div className={`absolute bottom-0 left-0 right-0 p-3 flex gap-2 transition-all duration-300 transform ${isHovered ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}>
              {inWishlist ? (
                <Button
                  size="sm"
                  className="w-full h-8 text-xs font-semibold bg-green-500 hover:bg-green-600"
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    setInWishlist(false)
                  }}
                >
                  <Heart className="h-3 w-3 mr-1 fill-current" /> Salvo
                </Button>
              ) : (
                <div onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                }}>
                  <AddGameModal
                    onSuccess={() => setInWishlist(true)}
                    initialGame={gameForModal}
                  >
                    <Button
                      size="sm"
                      className="w-full h-8 text-xs font-semibold bg-blue-600 hover:bg-blue-500"
                    >
                      <Plus className="h-3 w-3 mr-1" /> Monitorar
                    </Button>
                  </AddGameModal>
                </div>
              )}
            </div>
          </div>

          <div className="mt-3 space-y-1">
            <h3 className="font-bold text-sm leading-tight text-foreground group-hover:text-blue-400 transition-colors line-clamp-1" title={name}>
              {name}
            </h3>

            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>{releaseYear || "N/A"}</span>
              {currentPrice !== undefined && (
                <span className={priceDown ? "text-green-500 font-medium" : "text-muted-foreground"}>
                  {currentPrice === 0 ? "Grátis" : `R$ ${currentPrice.toFixed(2)}`}
                </span>
              )}
            </div>
          </div>
        </Card>
      </Link>
    </div>
  )
}
