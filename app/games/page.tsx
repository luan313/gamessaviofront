'use client'

import { NavHeader } from '@/components/nav-header'
import { GameCard } from '@/components/game-card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { Search, SlidersHorizontal, Filter, ChevronLeft, ChevronRight } from 'lucide-react'
import { useEffect, useState, useMemo } from 'react'
import { GameService } from '@/services/game-service'
import { GameFrontend, GameBackend } from '@/types/game'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

import { useDebounce } from '@/hooks/use-debounce'
import { CategoriaService } from '@/services/categoria'

interface FilterContentProps {
  searchTerm: string
  setSearchTerm: (value: string) => void
  selectedCategory: string
  setSelectedCategory: (value: string) => void
  minRating: number[]
  sliderValue: number[]
  setSliderValue: (value: number[]) => void
  setMinRating: (value: number[]) => void
  sortBy: string
  setSortBy: (value: string) => void
  onClear: () => void
  categories: { id: string, nome: string }[]
}

const FilterContent = ({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  minRating,
  sliderValue,
  setSliderValue,
  setMinRating,
  sortBy,
  setSortBy,
  onClear,
  categories
}: FilterContentProps) => (
  <div className="space-y-8">
    <div className="space-y-3">
      <Label htmlFor="search" className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Buscar</Label>
      <div className="relative group">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-blue-500 transition-colors" />
        <Input
          id="search"
          type="search"
          placeholder="Nome do jogo..."
          className="pl-10 bg-black/20 border-white/10 text-white placeholder:text-muted-foreground focus:border-blue-500/50 focus:bg-black/40 transition-all h-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </div>

    <div className="space-y-3">
      <Label htmlFor="category" className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Categoria</Label>
      <Select value={selectedCategory} onValueChange={setSelectedCategory}>
        <SelectTrigger id="category" className="bg-black/20 border-white/10 text-white h-10 focus:ring-offset-0 focus:ring-blue-500/20">
          <SelectValue placeholder="Todas as categorias" />
        </SelectTrigger>
        <SelectContent className="bg-[#1A1A1C] border-white/10 text-white">
          <SelectItem value="all">Todas</SelectItem>
          {categories.map((category) => (
            <SelectItem key={category.id} value={category.nome}>{category.nome}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>

    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Nota Mínima</Label>
        <span className="text-xs font-bold px-2 py-1 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">{sliderValue[0]}</span>
      </div>
      <Slider
        value={sliderValue}
        onValueChange={setSliderValue}
        onValueCommit={setMinRating}
        max={10}
        step={0.5}
        className="py-2"
      />
    </div>

    <div className="space-y-3">
      <Label htmlFor="sort" className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Ordenar por</Label>
      <Select value={sortBy} onValueChange={setSortBy}>
        <SelectTrigger id="sort" className="bg-black/20 border-white/10 text-white h-10 focus:ring-offset-0 focus:ring-blue-500/20">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="bg-[#1A1A1C] border-white/10 text-white">
          <SelectItem value="popular">Mais populares</SelectItem>
          <SelectItem value="rating">Nota mais alta</SelectItem>
          <SelectItem value="price-low">Menor preço</SelectItem>
          <SelectItem value="price-high">Maior preço</SelectItem>
          <SelectItem value="recent">Mais recente</SelectItem>
        </SelectContent>
      </Select>
    </div>

    <Button
      className="w-full bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-all hover:border-white/20"
      variant="outline"
      onClick={onClear}
    >
      Limpar filtros
    </Button>
  </div>
)

import { useSearchParams } from 'next/navigation'

// ... (imports remain the same)

export default function GamesPage() {
  const searchParams = useSearchParams()
  const [games, setGames] = useState<GameFrontend[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [categories, setCategories] = useState<{ id: string, nome: string }[]>([])

  const [searchTerm, setSearchTerm] = useState('')
  const debouncedSearch = useDebounce(searchTerm, 500)

  const [minRating, setMinRating] = useState([0])
  const [sliderValue, setSliderValue] = useState([0])

  const [sortBy, setSortBy] = useState('popular')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false)

  useEffect(() => {
    const query = searchParams.get('search')
    if (query) {
      setSearchTerm(query)
    }
  }, [searchParams])

  useEffect(() => {
    const fetchGames = async () => {
      setLoading(true)
      try {
        let data: GameBackend[] = []
        if (debouncedSearch.trim()) {
          data = await GameService.searchGames(debouncedSearch)
          setTotalPages(1)
        } else {
          const response = await GameService.getAllGames(currentPage, 20)
          data = response.items
          setTotalPages(response.pages)
        }

        const mappedGames: GameFrontend[] = data.map((game) => ({
          id: game.id,
          name: game.nome,
          coverImage: game.imagem_capa || "/placeholder-game.jpg",
          averageRating: game.nota_media || 0,
          currentPrice: game.last_price || 0,
          categories: game.categorias?.map(c => c.categoria.nome) || [],
          releaseYear: game.data_lancamento
            ? new Date(game.data_lancamento).getFullYear().toString()
            : "N/A",
        }))

        setGames(mappedGames)
      } catch (error) {
        console.error("Erro ao buscar jogos:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchGames()
  }, [debouncedSearch, currentPage])

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await CategoriaService.getCategories()
        setCategories(data)
      } catch (error) {
        console.error("Erro ao buscar categorias:", error)
      }
    }
    fetchCategories()
  }, [])

  const filteredGames = useMemo(() => {
    return games
      .filter(game => {
        if (game.averageRating < minRating[0]) return false

        if (selectedCategory !== 'all') {
          const hasCategory = game.categories.some(c =>
            c.toLowerCase().includes(selectedCategory.toLowerCase())
          )
          if (!hasCategory) return false
        }

        return true
      })
      .sort((a, b) => {
        switch (sortBy) {
          case 'rating':
            return b.averageRating - a.averageRating
          case 'price-low':
            return a.currentPrice - b.currentPrice
          case 'price-high':
            return b.currentPrice - a.currentPrice
          case 'recent':
            return parseInt(b.releaseYear) - parseInt(a.releaseYear)
          case 'popular':
          default:
            return 0
        }
      })
  }, [games, minRating, selectedCategory, sortBy])

  const handleClearFilters = () => {
    setSearchTerm('')
    setMinRating([0])
    setSliderValue([0])
    setSortBy('popular')
    setSelectedCategory('all')
  }

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-foreground font-sans">
      <NavHeader />
      <div className="pt-8 pb-6 border-b border-white/5 bg-[#0A0A0B]">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-2">
                Explorar Jogos
              </h1>
              <p className="text-muted-foreground text-base max-w-xl">
                Navegue pelo nosso catálogo completo e encontre sua próxima aventura.
              </p>
            </div>

            <div className="hidden md:flex gap-8 text-sm text-muted-foreground border-l border-white/10 pl-8">
              <div>
                <span className="block text-xl font-bold text-white">{games.length}</span>
                <span>Jogos listados</span>
              </div>
              <div>
                <span className="block text-xl font-bold text-white">
                  {games.filter(g => g.currentPrice === 0).length}
                </span>
                <span>Gratuitos</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:hidden mb-4">
            <Sheet open={isMobileFiltersOpen} onOpenChange={setIsMobileFiltersOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" className="w-full bg-white/5 border-white/10 text-white gap-2">
                  <SlidersHorizontal className="h-4 w-4" />
                  Filtros e Busca
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="bg-[#0A0A0B] border-r border-white/10 text-white w-[300px]">
                <SheetHeader className="mb-6">
                  <SheetTitle className="text-white flex items-center gap-2">
                    <Filter className="h-5 w-5 text-blue-500" />
                    Filtros
                  </SheetTitle>
                </SheetHeader>
                <FilterContent
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                  minRating={minRating}
                  sliderValue={sliderValue}
                  setSliderValue={setSliderValue}
                  setMinRating={setMinRating}
                  sortBy={sortBy}
                  setSortBy={setSortBy}
                  onClear={handleClearFilters}
                  categories={categories}
                />
              </SheetContent>
            </Sheet>
          </div>

          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-24">
              <div className="pr-6 border-r border-white/5 h-[calc(100vh-8rem)] overflow-y-auto custom-scrollbar">
                <div className="flex items-center gap-2 mb-8">
                  <Filter className="h-4 w-4 text-blue-500" />
                  <h2 className="text-sm font-bold text-white uppercase tracking-wider">
                    Filtros
                  </h2>
                </div>
                <FilterContent
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                  minRating={minRating}
                  sliderValue={sliderValue}
                  setSliderValue={setSliderValue}
                  setMinRating={setMinRating}
                  sortBy={sortBy}
                  setSortBy={setSortBy}
                  onClear={handleClearFilters}
                  categories={categories}
                />
              </div>
            </div>
          </aside>

          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <div className="text-sm text-gray-400">
                Mostrando <span className="text-white font-bold">{filteredGames.length}</span> jogos
              </div>
            </div>

            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="aspect-[3/4] bg-white/5 animate-pulse rounded-xl border border-white/5" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredGames.map((game) => (
                  <GameCard key={game.id} {...game} />
                ))}

                {filteredGames.length === 0 && (
                  <div className="col-span-full text-center py-20">
                    <div className="bg-white/5 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <Search className="h-8 w-8 text-gray-500" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Nenhum jogo encontrado</h3>
                    <p className="text-gray-400">Tente ajustar seus filtros ou buscar por outro nome.</p>
                  </div>
                )}
              </div>
            )}

            {!loading && !debouncedSearch && totalPages > 1 && (
              <div className="flex justify-center items-center gap-4 mt-8 pb-8">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="bg-white/5 border-white/10 text-white hover:bg-white/10 disabled:opacity-50"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>

                <span className="text-white font-medium">
                  Página {currentPage} de {totalPages}
                </span>

                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="bg-white/5 border-white/10 text-white hover:bg-white/10 disabled:opacity-50"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
