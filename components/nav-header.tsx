"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Gamepad2, Search, Menu, X, Bell, User, Settings, LogOut } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function NavHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  return (
<header className="sticky top-0 z-50 w-full border-b border-white/10 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
  <div className="container mx-auto flex h-16 items-center space-around jugap-4 px-4">

    {/* Logo */}
    <Link href="/" className="flex items-center gap-3 font-bold text-xl group">
      <div className="rounded-xl bg-gradient-to-br from-blue-600 to-violet-600 p-2 shadow-lg shadow-blue-500/20 transition-all group-hover:shadow-blue-500/40">
        <Gamepad2 className="h-5 w-5 text-white" />
      </div>
      <span className="hidden sm:inline bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
        Games Savio
      </span>
    </Link>

    {/* Search Desktop */}
    <div className="flex-1 max-w-md hidden md:block ml-6">
      <div className="relative group">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-blue-400 transition-colors" />
        <Input
          type="search"
          placeholder="Buscar jogos..."
          className="w-full pl-10 bg-secondary/50 border-white/5 focus:bg-background focus:border-blue-500/50 transition-all rounded-full"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
    </div>

    {/* Desktop Navigation */}
    <nav className="hidden md:flex items-center gap-4 ml-auto">
      <Link href="/games">
        <Button variant="ghost" className="text-muted-foreground hover:text-white hover:bg-white/5">
          Jogos
        </Button>
      </Link>

      <Link href="/categories">
        <Button variant="ghost" className="text-muted-foreground hover:text-white hover:bg-white/5">
          Categorias
        </Button>
      </Link>

      <Link href="/watchlist">
        <Button
          variant="ghost"
          size="icon"
          className="text-muted-foreground hover:text-blue-400 hover:bg-blue-400/10"
        >
          <Bell className="h-5 w-5" />
          <span className="sr-only">Watchlist</span>
        </Button>
      </Link>

      {/* Profile Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full ring-2 ring-transparent hover:ring-blue-500/50 transition-all ml-2"
          >
            <Avatar className="h-8 w-8 border border-white/10">
              <AvatarImage src="/diverse-user-avatars.png" alt="Avatar" />
              <AvatarFallback className="bg-gradient-to-br from-blue-600 to-violet-600 text-white">
                U
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          className="w-56 bg-background/95 backdrop-blur-xl border-white/10"
        >
          <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-white/10" />

          <DropdownMenuItem asChild>
            <Link href="/profile" className="flex items-center cursor-pointer">
              <User className="mr-2 h-4 w-4" />
              Perfil
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link href="/watchlist" className="flex items-center cursor-pointer">
              <Bell className="mr-2 h-4 w-4" />
              Monitoramento
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link href="/settings" className="flex items-center cursor-pointer">
              <Settings className="mr-2 h-4 w-4" />
              Configurações
            </Link>
          </DropdownMenuItem>

          <DropdownMenuSeparator className="bg-white/10" />

          <DropdownMenuItem asChild className="text-red-400 focus:text-red-400">
            <Link href="/login" className="flex items-center cursor-pointer">
              <LogOut className="mr-2 h-4 w-4" />
              Sair
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>

    {/* Mobile Actions */}
    <div className="flex md:hidden items-center gap-4 pr-2">
      <Button variant="ghost" size="icon" className="text-muted-foreground">
        <Search className="h-5 w-5" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="text-white"
      >
        {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>
    </div>
  </div>

  {/* Mobile Menu */}
  {isMobileMenuOpen && (
    <div className="md:hidden absolute top-16 left-0 w-full h-[calc(100vh-4rem)] bg-background/95 backdrop-blur-xl border-t border-white/10 p-4 flex flex-col gap-4 animate-in slide-in-from-top-5 z-50">

      <Link
        href="/profile"
        className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5"
        onClick={() => setIsMobileMenuOpen(false)}
      >
        <Avatar className="h-10 w-10 border border-white/10">
          <AvatarImage src="/diverse-user-avatars.png" />
          <AvatarFallback className="bg-gradient-to-br from-blue-600 to-violet-600 text-white">
            U
          </AvatarFallback>
        </Avatar>

        <div className="flex flex-col">
          <span className="font-semibold text-white">Meu Perfil</span>
          <span className="text-xs text-muted-foreground">Gerenciar conta</span>
        </div>
      </Link>

      <div className="space-y-1">
        <Link href="/games" onClick={() => setIsMobileMenuOpen(false)}>
          <Button variant="ghost" className="w-full justify-start text-lg h-12">Jogos</Button>
        </Link>

        <Link href="/categories" onClick={() => setIsMobileMenuOpen(false)}>
          <Button variant="ghost" className="w-full justify-start text-lg h-12">Categorias</Button>
        </Link>

        <Link href="/watchlist" onClick={() => setIsMobileMenuOpen(false)}>
          <Button variant="ghost" className="w-full justify-start text-lg h-12">Monitoramento</Button>
        </Link>
      </div>

      <div className="mt-auto border-t border-white/10 pt-4">
        <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
          <Button variant="destructive" className="w-full justify-start gap-2">
            <LogOut className="h-4 w-4" /> Sair
          </Button>
        </Link>
      </div>
    </div>
  )}
</header>


  )
}
