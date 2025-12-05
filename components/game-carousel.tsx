"use client"

import React, { useCallback } from "react"
import useEmblaCarousel from "embla-carousel-react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface GameCarouselProps {
    children: React.ReactNode
}

export function GameCarousel({ children }: GameCarouselProps) {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        align: "start",
        loop: false,
        dragFree: true,
        containScroll: "trimSnaps",
        duration: 20,
        skipSnaps: true,
    })

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev()
    }, [emblaApi])

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext()
    }, [emblaApi])

    return (
        <div className="relative group">
            <div className="overflow-hidden -mx-4 px-4" ref={emblaRef}>
                <div className="flex gap-4 touch-pan-y">
                    {children}
                </div>
            </div>

            <Button
                variant="ghost"
                size="icon"
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 h-10 w-10 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-black/80 disabled:opacity-0"
                onClick={scrollPrev}
            >
                <ChevronLeft className="h-6 w-6" />
            </Button>

            <Button
                variant="ghost"
                size="icon"
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10 h-10 w-10 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-black/80 disabled:opacity-0"
                onClick={scrollNext}
            >
                <ChevronRight className="h-6 w-6" />
            </Button>
        </div>
    )
}
