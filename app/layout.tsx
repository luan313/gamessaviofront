import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'GameTracker - Avalie e Monitore Preços de Jogos',
  description: 'Plataforma para avaliar jogos e monitorar preços em tempo real',
  generator: 'v0.app',
  icons: {
    icon: 'https://svgsilh.com/svg_v2/1294077.svg',
    apple: 'https://svgsilh.com/svg_v2/1294077.svg',
  },
}

import { ThemeProvider } from "@/components/theme-provider"


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
