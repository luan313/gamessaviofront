import { NavHeader } from '@/components/nav-header'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import Image from 'next/image'

// NOVAS CATEGORIAS COM CAPA REAL
const categories = [
  {
    id: '1',
    name: 'RPG',
    slug: 'rpg',
    count: 1234,
    description: 'Histórias profundas, mundos vastos e personagens inesquecíveis.',
    cover: '/rpg.jpg'
  },
  {
    id: '2',
    name: 'Ação',
    slug: 'acao',
    count: 2156,
    description: 'Combates intensos, adrenalina e jogabilidade frenética.',
    cover: '/acao.jpeg'
  },
  {
    id: '3',
    name: 'Aventura',
    slug: 'aventura',
    count: 1876,
    description: 'Explore mundos misteriosos e resolva puzzles envolventes.',
    cover: '/aventura.webp'
  },
  {
    id: '4',
    name: 'Indie',
    slug: 'indie',
    count: 3421,
    description: 'Criações inovadoras, artísticas e profundamente únicas.',
    cover: '/indie.webp'
  },
  {
    id: '5',
    name: 'Estratégia',
    slug: 'estrategia',
    count: 892,
    description: 'Coordene, planeje, execute — e vença com inteligência.',
    cover: '/estrategia.jpeg'
  },
  {
    id: '6',
    name: 'Simulação',
    slug: 'simulacao',
    count: 654,
    description: 'Experiências realistas que simulam o mundo real.',
    cover: '/gta.jpg'
  },
  {
    id: '7',
    name: 'Plataforma',
    slug: 'plataforma',
    count: 743,
    description: 'Saltos, precisão e criatividade nas fases.',
    cover: '/plataforma.webp'
  },

  {
    id: '8',
    name: 'Roguelike',
    slug: 'roguelike',
    count: 456,
    description: 'Permadeath, progressão desafiadora e geração procedural.',
    cover: '/images.jpeg'
  },
  {
    id: '9',
    name: 'Esportes',
    slug: 'esportes',
    count: 521,
    description: 'Jogos competitivos, realistas e cheios de ação.',
    cover: '/fifa.jpeg'
  },
  {
    id: '10',
    name: 'Horror',
    slug: 'horror',
    count: 328,
    description: 'Experiências aterrorizantes cheias de tensão e suspense.',
    cover: '/horror.webp'
  },
  {
    id: '11',
    name: 'Corrida',
    slug: 'corrida',
    count: 412,
    description: 'Velocidade, adrenalina e competição de alto nível.',
    cover: '/corrida.jpeg'
  },
  {
    id: '12',
    name: 'Puzzle',
    slug: 'puzzle',
    count: 789,
    description: 'Desafios de lógica, estratégia e raciocínio.',
    cover: '/puzzle.avif'
  }
]


export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-background">
      <NavHeader />
      

      <main className="container mx-auto px-4 py-10">
        <div className="mb-10">
          <h1 className="text-4xl font-extrabold tracking-tight mb-2">
            Categorias
          </h1>
          <p className="text-muted-foreground text-lg">
            Explore jogos por gênero em um visual cinematográfico
          </p>
        </div>

        {/* GRID MELHORADO */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {categories.map((category) => (
            <Link key={category.id} href={`/categories/${category.slug}`}>
              <div
                className="
                  group relative rounded-2xl overflow-hidden 
                  shadow-[0_10px_35px_rgba(0,0,0,0.45)]
                  hover:shadow-[0_15px_45px_rgba(0,0,0,0.55)]
                  transition-all duration-500 cursor-pointer
                  hover:scale-[1.03]
                "
              >
                {/* IMAGEM DE FUNDO CINEMATOGRÁFICA */}
                <div className="relative h-52 w-full overflow-hidden">
                  <Image
                    src={category.cover}
                    alt={category.name}
                    fill
                    className="
                      object-cover transition-all duration-700 
                      group-hover:scale-110 group-hover:brightness-[1.15]
                    "
                  />
                </div>

                {/* OVERLAY CINEMATIC */}
                <div className="
                  absolute inset-0 
                  bg-gradient-to-t from-black/80 via-black/40 to-transparent
                  opacity-100
                " />

                {/* TEXTO */}
                <div className="absolute bottom-4 left-4 right-4 z-20 text-white select-none">
                  
                  {/* TÍTULO + BADGE */}
                  <div className="flex items-center justify-between mb-1">
                    <h2 className="text-2xl font-bold drop-shadow-lg tracking-tight">
                      {category.name}
                    </h2>
                    <Badge className="bg-white/20 backdrop-blur-md text-white shadow-md">
                      {category.count}
                    </Badge>
                  </div>

                  {/* DESCRIÇÃO */}
                  <p className="text-sm text-white/80 drop-shadow-md">
                    {category.description}
                  </p>
                </div>

                {/* BORDA LUMINOSA AO REDOR NO HOVER */}
                <div className="
                  absolute inset-0 rounded-2xl 
                  ring-0 ring-primary/0
                  group-hover:ring-[3px] group-hover:ring-primary/70
                  transition-all duration-500
                "></div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}
