import { Trophy, Gamepad2, Eye } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

// Regras simples apenas para esse pedaço
interface StatsData {
  gamesWatched: number;
  achievements: number;
}

interface ProfileStatsProps {
  stats: StatsData
}

export function ProfileStats({ stats }: ProfileStatsProps) {
  const statItems = [
    {
      label: "Jogos",
      value: 0, // Placeholder
      icon: Gamepad2,
      color: "text-emerald-500",
      bgColor: "bg-emerald-500/10"
    },
    {
      label: "Monitorados",
      value: stats.gamesWatched,
      icon: Eye,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10"
    },
    {
      label: "Conquistas",
      value: stats.achievements,
      icon: Trophy,
      color: "text-amber-500",
      bgColor: "bg-amber-500/10"
    }
  ]

  return (
    // AQUI: grid-cols-3 força sempre 3 colunas, ideal para monitor
    <div className="grid grid-cols-3 gap-6 w-full">
      {statItems.map((item, index) => (
        <Card key={index} className="bg-secondary/5 border-white/5 overflow-hidden hover:bg-secondary/10 transition-colors cursor-default">
          {/* aspect-square garante que sejam quadrados perfeitos */}
          <CardContent className="p-4 flex flex-col items-center justify-center aspect-square text-center">

            <div className={`p-3 rounded-full mb-3 ${item.bgColor}`}>
              <item.icon className={`h-8 w-8 ${item.color}`} />
            </div>

            <div className="font-bold text-3xl text-white leading-none mb-2">
              {item.value}
            </div>

            <div className="text-xs uppercase tracking-wider text-muted-foreground font-medium">
              {item.label}
            </div>

          </CardContent>
        </Card>
      ))}
    </div>
  )
}