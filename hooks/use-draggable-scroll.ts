import { useRef, useState, MouseEvent, useCallback } from 'react'

export function useDraggableScroll() {
    const ref = useRef<HTMLDivElement>(null)
    const [isDragging, setIsDragging] = useState(false)

    // Use refs for mutable state to avoid closure staleness in event handlers
    const state = useRef({
        isDown: false,
        startX: 0,
        scrollLeft: 0,
    })

    const onMouseDown = useCallback((e: MouseEvent) => {
        if (!ref.current) return
        state.current.isDown = true
        state.current.startX = e.pageX - ref.current.offsetLeft
        state.current.scrollLeft = ref.current.scrollLeft
        setIsDragging(true)
    }, [])

    const onMouseLeave = useCallback(() => {
        state.current.isDown = false
        setIsDragging(false)
    }, [])

    const onMouseUp = useCallback(() => {
        state.current.isDown = false
        setIsDragging(false)
    }, [])

    const onMouseMove = useCallback((e: MouseEvent) => {
        if (!state.current.isDown || !ref.current) return
        e.preventDefault()
        const x = e.pageX - ref.current.offsetLeft
        const walk = (x - state.current.startX) * 2 // Scroll-fast
        ref.current.scrollLeft = state.current.scrollLeft - walk
    }, [])

    return {
        ref,
        events: {
            onMouseDown,
            onMouseLeave,
            onMouseUp,
            onMouseMove,
        },
        isDragging,
    }
}
