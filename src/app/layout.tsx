import type { Metadata } from 'next'
import { ThemeProvider } from 'next-themes'
import { Sidebar } from '@/components/layout/Sidebar'
import './globals.css'

export const metadata: Metadata = {
  title: 'Trouve-Ton-Influ — Find the right voice for your brand',
  description: "Analyse l'URL de ton site et trouve instantanément les influenceurs qui correspondent à ta marque.",
  keywords: ['influenceurs', 'marketing', 'matching', 'créateurs de contenu'],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" data-theme="dark" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="data-theme" defaultTheme="dark" enableSystem={false}>
          <div style={{ display: 'flex', minHeight: '100vh' }}>
            <Sidebar />
            <main
              style={{
                flex: 1,
                marginLeft: '240px',
                minHeight: '100vh',
                background: 'var(--bg-base)',
              }}
            >
              {children}
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
