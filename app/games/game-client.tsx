'use client'

import { NavHeader } from '@/components/nav-header'
import { Button } from '@/components/ui/button'
import { SlidersHorizontal, Filter } from 'lucide-react'
import { useEffect, useState, useMemo } from 'react'
import { GameFrontend } from '@/types/game'
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { FilterContent } from "@/components/game-page/filter-content"
import { useDebounce } from '@/hooks/use-debounce'
import { Suspense } from 'react'
import { GameHeader } from '@/components/game-page/game-header'
import { GameList } from '@/components/game-page/game-list'
import { useRouter, useSearchParams } from 'next/navigation'
import { CategoriaLite } from '@/types/categoria'

interface GamesPageProps {
    initialGames: GameFrontend[]
    initialCategories: CategoriaLite[]
    initialTotalPages: number
    initialCurrentPage: number
    initialSearchTerm: string
    initialCategory: string
}

function PageContent({
    initialGames,
    initialCategories,
    initialTotalPages,
    initialCurrentPage,
    initialSearchTerm,
    initialCategory
}: GamesPageProps) {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [games, setGames] = useState<GameFrontend[]>(initialGames)
    const [totalPages, setTotalPages] = useState(initialTotalPages)
    const [categories, setCategories] = useState<CategoriaLite[]>(initialCategories)
    const [searchTerm, setSearchTerm] = useState(initialSearchTerm)
    const debouncedSearch = useDebounce(searchTerm, 500)
    const [minRating, setMinRating] = useState([0])
    const [sliderValue, setSliderValue] = useState([0])
    const [sortBy, setSortBy] = useState('popular')
    const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false)

    useEffect(() => {
        setGames(initialGames)
        setTotalPages(initialTotalPages)
    }, [initialGames, initialTotalPages])

    useEffect(() => {
        setCategories(initialCategories)
    }, [initialCategories])

    useEffect(() => {
        const params = new URLSearchParams(searchParams.toString())

        if (debouncedSearch) {
            params.set('search', debouncedSearch)
        } else {
            params.delete('search')
        }

        if (debouncedSearch !== initialSearchTerm) {
            params.set('page', '1')
        }

        router.push(`?${params.toString()}`)
    }, [debouncedSearch, router, searchParams, initialSearchTerm])

    const handleCategoryChange = (category: string) => {
        const params = new URLSearchParams(searchParams.toString())
        if (category && category !== 'all') {
            params.set('category', category)
        } else {
            params.delete('category')
        }
        params.set('page', '1')
        router.push(`?${params.toString()}`)
    }

    const handlePageChange = (page: number) => {
        const params = new URLSearchParams(searchParams.toString())
        params.set('page', page.toString())
        router.push(`?${params.toString()}`)
    }

    const handleClearFilters = () => {
        setSearchTerm('')
        setMinRating([0])
        setSliderValue([0])
        setSortBy('popular')
        router.push('/games')
    }

    const filteredGames = useMemo(() => {
        return games
            .filter(game => {
                if (game.averageRating < minRating[0]) return false
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
    }, [games, minRating, sortBy])

    return (
        <div className="min-h-screen bg-background text-foreground font-sans">
            <NavHeader />
            <GameHeader games={games} />
            <main className="container mx-auto px-4 py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    <div className="lg:hidden mb-4">
                        <Sheet open={isMobileFiltersOpen} onOpenChange={setIsMobileFiltersOpen}>
                            <SheetTrigger asChild>
                                <Button variant="outline" className="w-full bg-secondary/50 border-border text-foreground gap-2">
                                    <SlidersHorizontal className="h-4 w-4" />
                                    Filtros e Busca
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left" className="bg-background border-r border-border text-foreground w-[300px]">
                                <SheetHeader className="mb-6">
                                    <SheetTitle className="text-foreground flex items-center gap-2">
                                        <Filter className="h-5 w-5 text-blue-500" />
                                        Filtros
                                    </SheetTitle>
                                </SheetHeader>
                                <FilterContent
                                    searchTerm={searchTerm}
                                    setSearchTerm={setSearchTerm}
                                    selectedCategory={initialCategory}
                                    setSelectedCategory={handleCategoryChange}
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
                            <div className="pr-6 border-r border-border h-[calc(100vh-8rem)] overflow-y-auto custom-scrollbar">
                                <div className="flex items-center gap-2 mb-8">
                                    <Filter className="h-4 w-4 text-blue-500" />
                                    <h2 className="text-sm font-bold text-foreground uppercase tracking-wider">
                                        Filtros
                                    </h2>
                                </div>
                                <FilterContent
                                    searchTerm={searchTerm}
                                    setSearchTerm={setSearchTerm}
                                    selectedCategory={initialCategory}
                                    setSelectedCategory={handleCategoryChange}
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

                    <GameList
                        loading={false}
                        filteredGames={filteredGames}
                        debouncedSearch={debouncedSearch}
                        totalPages={totalPages}
                        currentPage={initialCurrentPage}
                        setCurrentPage={handlePageChange}
                    />
                </div>
            </main>
        </div>
    )
}

export default function GamesPage(props: GamesPageProps) {
    return (
        <Suspense>
            <PageContent {...props} />
        </Suspense>
    )
}