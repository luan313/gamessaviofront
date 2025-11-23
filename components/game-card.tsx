"use client";
import { Star, TrendingDown } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"

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
  return (
    <Link href={`/games/${id}`} className="block h-full">
      <Card className="group relative h-full overflow-hidden border-white/5 bg-secondary/20 backdrop-blur-sm transition-all duration-300 hover:bg-secondary/40 hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-1">
        <div className="aspect-[3/4] relative overflow-hidden bg-muted/50">
          <Image
            src={coverImage || "/placeholder.svg"}
            alt={name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            onError={(e) => {
              e.currentTarget.src = `/placeholder.svg?height=400&width=300&query=${encodeURIComponent(name)}`
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
            <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
            {averageRating > 0 ? averageRating.toFixed(1) : "-"}
          </div>
          {priceDown && (
            <div className="absolute top-2 left-2 bg-red-500/90 backdrop-blur-md text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1 shadow-lg">
              <TrendingDown className="h-3 w-3" />
              Oferta
            </div>
          )}
        </div>

        <CardContent className="p-3 space-y-2">
          <div className="flex justify-between items-start gap-2">
            <h3 className="font-semibold text-sm sm:text-base leading-tight line-clamp-2 text-balance group-hover:text-blue-400 transition-colors">
              {name}
            </h3>
            {currentPrice !== undefined && (
              <div className="text-right shrink-0">
                {priceDown && (
                  <div className="text-[10px] text-muted-foreground line-through decoration-red-400 opacity-70">
                    R$ {(currentPrice * 1.5).toFixed(2)}
                  </div>
                )}
                <span className={`font-bold text-sm ${priceDown ? "text-green-400" : "text-white"}`}>
                  {currentPrice === 0 ? "Grátis" : `R$ ${currentPrice.toFixed(2)}`}
                </span>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between text-xs text-muted-foreground">
            {releaseYear && <span>{releaseYear}</span>}
          </div>

          <div className="flex flex-wrap gap-1 pt-1">
            {categories.slice(0, 2).map((cat) => (
              <span
                key={cat}
                className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-blue-500/10 text-blue-300 border border-blue-500/20"
              >
                {cat}
              </span>
            ))}
            {categories.length > 2 && (
              <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-white/5 text-muted-foreground">
                +{categories.length - 2}
              </span>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
