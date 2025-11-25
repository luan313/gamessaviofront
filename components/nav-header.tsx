"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Gamepad2, Search, Menu, X, Bell, User, Settings, LogOut, ChevronDown } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useState, useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

export function NavHeader() {
  // Force rebuild comment
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [scrolled, setScrolled] = useState(false)

  // Handle scroll effect for glassmorphism intensity
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { name: "Loja", href: "/games" },
    { name: "Categorias", href: "/categories" },
    { name: "Comunidade", href: "/community" },
    { name: "Suporte", href: "/support" },
  ]

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-300 border-b border-white/5",
          scrolled
            ? "bg-[#0A0A0B]/80 backdrop-blur-xl shadow-2xl shadow-black/50"
            : "bg-[#0A0A0B]/40 backdrop-blur-md"
        )}
      >
        <div className="container mx-auto flex h-20 items-center justify-between px-4 lg:px-8">

          {/* Left: Logo & Main Nav */}
          <div className="flex items-center gap-8 md:gap-12">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group relative">
              <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative rounded-xl bg-gradient-to-br from-blue-600 to-violet-700 p-2.5 shadow-lg shadow-blue-500/20 transition-transform duration-300 group-hover:scale-105 group-hover:shadow-blue-500/40 border border-white/10">
                <Gamepad2 className="h-6 w-6 text-white" />
              </div>
              <span className="hidden sm:block font-bold text-xl tracking-tight text-white group-hover:text-blue-100 transition-colors">
                GameBox
              </span>
            </Link>

            {/* Desktop Nav Links */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link key={link.name} href={link.href}>
                  <Button
                    variant="ghost"
                    className="text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 h-9 px-4 rounded-full transition-all duration-200"
                  >
                    {link.name}
                  </Button>
                </Link>
              ))}
            </nav>
          </div>

          {/* Center: Search (Hidden on mobile, visible on lg) */}
          <div className="hidden lg:flex flex-1 max-w-md mx-8">
            <div className="relative group w-full">
              <div className="absolute inset-0 bg-blue-500/5 blur-md rounded-full opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none" />
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-blue-400 transition-colors" />
              <Input
                type="search"
                placeholder="Buscar jogos, gêneros..."
                className="w-full pl-10 pr-12 h-10 bg-white/5 border-white/10 focus:bg-black/40 focus:border-blue-500/50 text-sm transition-all rounded-full placeholder:text-gray-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 pointer-events-none">
                <kbd className="hidden xl:inline-flex h-5 items-center gap-1 rounded border border-white/10 bg-white/5 px-1.5 font-mono text-[10px] font-medium text-gray-400">
                  <span className="text-xs">⌘</span>K
                </kbd>
              </div>
            </div>
          </div>

          {/* Right: User Actions */}
          <div className="flex items-center gap-3 md:gap-4">
            {/* Mobile Search Toggle */}
            <Button variant="ghost" size="icon" className="lg:hidden text-gray-300 hover:text-white hover:bg-white/5 rounded-full">
              <Search className="h-5 w-5" />
            </Button>

            {/* Notifications */}
            <Link href="/watchlist">
              <Button
                variant="ghost"
                size="icon"
                className="relative text-gray-300 hover:text-blue-400 hover:bg-blue-500/10 rounded-full transition-colors"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute top-2 right-2.5 h-2 w-2 rounded-full bg-blue-500 ring-2 ring-black" />
                <span className="sr-only">Notificações</span>
              </Button>
            </Link>

            {/* Profile Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="pl-2 pr-1 py-1 h-auto gap-2 rounded-full hover:bg-white/5 border border-transparent hover:border-white/5 transition-all group"
                >
                  <Avatar className="h-8 w-8 border border-white/10 ring-2 ring-transparent group-hover:ring-blue-500/30 transition-all">
                    <AvatarImage src="/diverse-user-avatars.png" alt="Avatar" />
                    <AvatarFallback className="bg-gradient-to-br from-blue-600 to-violet-600 text-white text-xs font-bold">
                      US
                    </AvatarFallback>
                  </Avatar>
                  <ChevronDown className="h-3 w-3 text-gray-400 group-hover:text-white transition-colors hidden sm:block" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="end"
                className="w-64 mt-2 bg-[#0A0A0B]/95 backdrop-blur-2xl border-white/10 shadow-2xl shadow-black/50 rounded-xl p-2"
              >
                <div className="px-2 py-3 mb-2 bg-white/5 rounded-lg border border-white/5">
                  <p className="text-sm font-bold text-white">Luan Savio</p>
                  <p className="text-xs text-gray-400 truncate">luan@example.com</p>
                </div>

                <DropdownMenuLabel className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-2 py-1.5">
                  Minha Conta
                </DropdownMenuLabel>

                <DropdownMenuItem asChild className="rounded-lg focus:bg-blue-600 focus:text-white cursor-pointer">
                  <Link href="/profile" className="flex items-center gap-2.5 py-2.5">
                    <User className="h-4 w-4" />
                    <span>Perfil</span>
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild className="rounded-lg focus:bg-blue-600 focus:text-white cursor-pointer">
                  <Link href="/watchlist" className="flex items-center gap-2.5 py-2.5">
                    <Bell className="h-4 w-4" />
                    <span>Monitoramento</span>
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild className="rounded-lg focus:bg-blue-600 focus:text-white cursor-pointer">
                  <Link href="/settings" className="flex items-center gap-2.5 py-2.5">
                    <Settings className="h-4 w-4" />
                    <span>Configurações</span>
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator className="bg-white/10 my-2" />

                <DropdownMenuItem asChild className="rounded-lg text-red-400 focus:bg-red-500/10 focus:text-red-400 cursor-pointer">
                  <Link href="/login" className="flex items-center gap-2.5 py-2.5">
                    <LogOut className="h-4 w-4" />
                    <span>Sair</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-white hover:bg-white/10 rounded-full"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden" onClick={() => setIsMobileMenuOpen(false)}>
          <div
            className="absolute top-0 right-0 h-full w-[80%] max-w-sm bg-[#0A0A0B] border-l border-white/10 shadow-2xl p-6 flex flex-col gap-6 animate-in slide-in-from-right duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-xl text-white">Menu</span>
              <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)} className="rounded-full hover:bg-white/10">
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="space-y-1">
              {navLinks.map((link) => (
                <Link key={link.name} href={link.href} onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start text-lg h-12 font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-xl">
                    {link.name}
                  </Button>
                </Link>
              ))}
            </div>

            <div className="mt-auto border-t border-white/10 pt-6 space-y-4">
              <Link href="/profile" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/diverse-user-avatars.png" />
                  <AvatarFallback className="bg-blue-600 text-white">US</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-bold text-white">Luan Savio</p>
                  <p className="text-xs text-gray-400">Ver perfil</p>
                </div>
              </Link>

              <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="destructive" className="w-full h-12 rounded-xl font-bold">
                  <LogOut className="mr-2 h-4 w-4" /> Sair
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
