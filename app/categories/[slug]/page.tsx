"use client"

import { NavHeader } from '@/components/nav-header'
import { GameCard } from '@/components/game-card'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ArrowLeft, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { CategoriaService } from '@/services/categoria'
import { CategoriaLite } from '@/types/categoria'
import { GameBackend } from '@/types/game'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

export default function CategoryDetailPage() {
  const params = useParams()
  const categoryId = params.slug as string

  const [category, setCategory] = useState<CategoriaLite | null>(null)
  const [games, setGames] = useState<GameBackend[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const limit = 10

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const categories = await CategoriaService.getCategories()
        const currentCategory = categories.find(c => c.id === categoryId)
        setCategory(currentCategory || null)

        const gamesResponse = await CategoriaService.getGamesByCategoryId(categoryId, page, limit)
        setGames(gamesResponse.items)
        setTotalPages(gamesResponse.pages)
      } catch (error) {
        console.error("Error fetching category data:", error)
      } finally {
        setLoading(false)
      }
    }

    if (categoryId) {
      fetchData()
    }
  }, [categoryId, page])

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  if (loading && page === 1) {
    return (
      <div className="min-h-screen bg-background">
        <NavHeader />
        <div className="flex items-center justify-center h-[calc(100vh-80px)]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </div>
    )
  }

  if (!category) {
    return (
      <div className="min-h-screen bg-background">
        <NavHeader />
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Categoria não encontrada</h1>
          <Link href="/categories" className="text-primary hover:underline">
            Voltar para categorias
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <NavHeader />

      <main className="container mx-auto px-4 py-8">
        <Link href="/categories" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Voltar para categorias
        </Link>

        <div className="flex items-start justify-between mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold">{category.nome}</h1>
              <Badge variant="secondary" className="text-base">
                {category.qtd_jogos} jogos
              </Badge>
            </div>
            <p className="text-muted-foreground max-w-2xl">
              Explore os melhores jogos de {category.nome}
            </p>
          </div>

          <Select defaultValue="popular">
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="popular">Mais populares</SelectItem>
              <SelectItem value="rating">Nota mais alta</SelectItem>
              <SelectItem value="price-low">Menor preço</SelectItem>
              <SelectItem value="price-high">Maior preço</SelectItem>
              <SelectItem value="recent">Mais recente</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-8">
              {games.map((game) => (
                <GameCard
                  key={game.id}
                  id={game.id}
                  name={game.nome}
                  coverImage={game.imagem_capa || '/placeholder-game.jpg'}
                  averageRating={game.nota_media || 0}
                  currentPrice={game.last_price || 0}
                  categories={game.categorias?.map(c => c.categoria.nome) || []}
                  releaseYear={game.data_lancamento ? new Date(game.data_lancamento).getFullYear().toString() : undefined}
                />
              ))}
            </div>

            {games.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                Nenhum jogo encontrado nesta categoria.
              </div>
            )}

            {totalPages > 1 && (
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      onClick={(e) => {
                        e.preventDefault()
                        handlePageChange(page - 1)
                      }}
                      className={page <= 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>

                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let p = page;
                    if (totalPages <= 5) {
                      p = i + 1;
                    } else if (page <= 3) {
                      p = i + 1;
                    } else if (page >= totalPages - 2) {
                      p = totalPages - 4 + i;
                    } else {
                      p = page - 2 + i;
                    }

                    return (
                      <PaginationItem key={p}>
                        <PaginationLink
                          href="#"
                          isActive={page === p}
                          onClick={(e) => {
                            e.preventDefault()
                            handlePageChange(p)
                          }}
                        >
                          {p}
                        </PaginationLink>
                      </PaginationItem>
                    )
                  })}

                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      onClick={(e) => {
                        e.preventDefault()
                        handlePageChange(page + 1)
                      }}
                      className={page >= totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
          </>
        )}
      </main>
    </div>
  )
}
