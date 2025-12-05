import { GameFrontend } from '@/types/game'
import { GameCard } from '@/components/game-card'
import { Button } from '@/components/ui/button'
import { Search, ChevronLeft, ChevronRight } from 'lucide-react'


export function GameList({
  loading,
  filteredGames,
  debouncedSearch,
  totalPages,
  currentPage,
  setCurrentPage
}: {
  loading: boolean,
  filteredGames: GameFrontend[],
  debouncedSearch: string,
  totalPages: number,
  currentPage: number,             
  
  setCurrentPage: (page: number) => void
}) {    
return (
      <div className="flex-1">
                <div className="flex items-center justify-between mb-6">
                  <div className="text-sm text-muted-foreground">
                    Mostrando <span className="text-foreground font-bold">{filteredGames.length}</span> jogos
                  </div>
                </div>
    
                {loading ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                    {[...Array(15)].map((_, i) => (
                      <div key={i} className="aspect-[3/4] bg-secondary/50 animate-pulse rounded-xl border border-border" />
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredGames.map((game) => (
                      <GameCard key={game.id} {...game} />
                    ))}
    
                    {filteredGames.length === 0 && (
                      <div className="col-span-full text-center py-20">
                        <div className="bg-secondary/50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                          <Search className="h-8 w-8 text-muted-foreground" />
                        </div>
                        <h3 className="text-xl font-bold text-foreground mb-2">Nenhum jogo encontrado</h3>
                        <p className="text-muted-foreground">Tente ajustar seus filtros ou buscar por outro nome.</p>
                      </div>
                    )}
                  </div>
                )}
    
                {!loading && !debouncedSearch && totalPages > 1 && (
                  <div className="flex justify-center items-center gap-4 mt-8 pb-8">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
                      disabled={currentPage === 1}
                      className="bg-secondary/50 border-border text-foreground hover:bg-secondary disabled:opacity-50"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
    
                    <span className="text-foreground font-medium">
                      Página {currentPage} de {totalPages}
                    </span>
    
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="bg-secondary/50 border-border text-foreground hover:bg-secondary disabled:opacity-50"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
        )
}