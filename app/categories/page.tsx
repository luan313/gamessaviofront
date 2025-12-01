"use client"

import { NavHeader } from '@/components/nav-header'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { CategoriaLite } from '@/types/categoria'
import { CategoriaService } from '@/services/categoria'

export default function CategoriesPage() {
  const [categories, setCategories] = useState<CategoriaLite[]>([])

  useEffect(() => {
    const categoriaService =  CategoriaService.getCategories()
    categoriaService.then((response) => {
      setCategories(response)
    })
  }, [])
    

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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {categories.map((category) => (
            <Link key={category.id} href={`/categories/${category.id}`}>
              <div
                className="
                  group relative rounded-2xl overflow-hidden 
                  shadow-[0_10px_35px_rgba(0,0,0,0.45)]
                  hover:shadow-[0_15px_45px_rgba(0,0,0,0.55)]
                  transition-all duration-500 cursor-pointer
                  hover:scale-[1.03]
                "
              >
                <div className="relative h-52 w-full overflow-hidden">
                  <Image
                    src={category.imagem_capa}
                    alt={category.nome}
                    fill
                    className="
                      object-cover transition-all duration-700 
                      group-hover:scale-110 group-hover:brightness-[1.15]
                    "
                  />
                </div>

                <div className="
                  absolute inset-0 
                  bg-gradient-to-t from-black/80 via-black/40 to-transparent
                  opacity-100
                " />

                <div className="absolute bottom-4 left-4 right-4 z-20 text-white select-none">
                  
                  <div className="flex items-center justify-between mb-1">
                    <h2 className="text-2xl font-bold drop-shadow-lg tracking-tight">
                      {category.nome}
                    </h2>
                    <Badge className="bg-white/20 backdrop-blur-md text-white shadow-md">
                      {category.qtd_jogos}
                    </Badge>
                  </div>

                  <p className="text-sm text-white/80 drop-shadow-md">
                  </p>
                </div>
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
