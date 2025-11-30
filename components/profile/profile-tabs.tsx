import { LayoutGrid, Gamepad2, Star, Trophy } from 'lucide-react'

export function ProfileTabs() {
  const tabs = [
    { name: "Visão Geral", icon: LayoutGrid, active: true },
    { name: "Meus Jogos", icon: Gamepad2, active: false },
    { name: "Avaliações", icon: Star, active: false },
    { name: "Conquistas", icon: Trophy, active: false },
  ]

  return (
    <div className="w-full border-b border-white/10 bg-black/20 backdrop-blur-sm mb-6 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              className={`
                relative flex items-center gap-2 px-6 py-4 text-sm font-medium transition-colors
                ${tab.active 
                  ? "text-white" 
                  : "text-muted-foreground hover:text-white hover:bg-white/5"
                }
              `}
            >
              <tab.icon className={`h-4 w-4 ${tab.active ? "text-blue-500" : ""}`} />
              {tab.name}
              
              {tab.active && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}