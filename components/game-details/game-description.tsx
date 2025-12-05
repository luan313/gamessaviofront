interface GameDescriptionProps {
    description: string | null
}

export function GameDescription({ description }: GameDescriptionProps) {
    return (
        <section className="prose prose-invert max-w-none">
            <h2 className="text-2xl font-bold mb-4">Sobre o Jogo</h2>
            <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                {description || "Sem descrição disponível."}
            </p>
        </section>
    )
}
