import { Star } from 'lucide-react'
import { useState } from 'react'

interface StarRatingProps {
    rating: number
    onRatingChange: (rating: number) => void
}

export function StarRating({ rating, onRatingChange }: StarRatingProps) {
    const [hoveredRating, setHoveredRating] = useState(0)

    return (
        <div className="flex flex-col items-center p-6 bg-secondary/20 rounded-lg border border-border/50">
            <div className="flex items-center gap-1 sm:gap-2 mb-2">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
                    <button
                        key={value}
                        type="button"
                        onClick={() => onRatingChange(value)}
                        onMouseEnter={() => setHoveredRating(value)}
                        onMouseLeave={() => setHoveredRating(0)}
                        className="group relative p-1 focus:outline-none"
                    >
                        <Star
                            className={`h-6 w-6 sm:h-8 sm:w-8 transition-all duration-200 ${value <= (hoveredRating || rating)
                                    ? 'fill-primary text-primary scale-110 drop-shadow-[0_0_8px_rgba(255,165,0,0.5)]'
                                    : 'text-muted-foreground/30 hover:text-primary/50'
                                }`}
                        />
                    </button>
                ))}
            </div>
            <div className="h-6 text-center">
                {(hoveredRating || rating) > 0 && (
                    <span className="text-lg font-bold text-primary animate-in fade-in slide-in-from-bottom-2">
                        {hoveredRating || rating}/10
                    </span>
                )}
            </div>
        </div>
    )
}
