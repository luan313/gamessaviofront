import {GameBasic } from '@/types/game'


export function GameHeader({games}: {games: GameBasic[]}) {
    console.log(games)
    return (
        <div className="pt-8 pb-6 border-b border-border bg-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-2">
                Explorar Jogos
              </h1>
              <p className="text-muted-foreground text-base max-w-xl">
                Navegue pelo nosso catálogo completo e encontre sua próxima aventura.
              </p>
            </div>

            <div className="hidden md:flex gap-8 text-sm text-muted-foreground border-l border-border pl-8">
              <div>
                <span className="block text-xl font-bold text-foreground">{games.length}</span>
                <span>Jogos listados</span>
              </div>
              <div>
                <span className="block text-xl font-bold text-foreground">
                  {games.filter(g => g.currentPrice === 0).length}
                </span>
                <span>Gratuitos</span>
              </div>
            </div>
          </div>
        </div>
      </div>

    )
}