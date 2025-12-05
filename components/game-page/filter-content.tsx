
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from "@/components/ui/select"

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
  categories: { id: string; nome: string }[]
}

export function FilterContent({
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
}: FilterContentProps) {
    return  (
    <div className="space-y-8">
        <div className="space-y-3">
        <Label htmlFor="search" className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Buscar</Label>
        <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-blue-500 transition-colors" />
            <Input
            id="search"
            type="search"
            placeholder="Nome do jogo..."
            className="pl-10 bg-secondary/50 border-border text-foreground placeholder:text-muted-foreground focus:border-blue-500/50 focus:bg-background transition-all h-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
        </div>

        <div className="space-y-3">
        <Label htmlFor="category" className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Categoria</Label>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger id="category" className="bg-secondary/50 border-border text-foreground h-10 focus:ring-offset-0 focus:ring-blue-500/20">
            <SelectValue placeholder="Todas as categorias" />
            </SelectTrigger>
            <SelectContent className="bg-popover border-border text-foreground">
            <SelectItem value="all">Todas</SelectItem>
            {categories.map((category) => (
                <SelectItem key={category.id} value={category.id}>{category.nome}</SelectItem>
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
            <SelectTrigger id="sort" className="bg-secondary/50 border-border text-foreground h-10 focus:ring-offset-0 focus:ring-blue-500/20">
            <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-popover border-border text-foreground">
            <SelectItem value="popular">Mais populares</SelectItem>
            <SelectItem value="rating">Nota mais alta</SelectItem>
            <SelectItem value="price-low">Menor preço</SelectItem>
            <SelectItem value="price-high">Maior preço</SelectItem>
            <SelectItem value="recent">Mais recente</SelectItem>
            </SelectContent>
        </Select>
        </div>

        <Button
            className="w-full bg-secondary/50 hover:bg-secondary text-foreground border border-border transition-all hover:border-border/80"
            variant="outline"
            onClick={onClear}
            >
            Limpar filtros
        </Button>
    </div>
    )
}