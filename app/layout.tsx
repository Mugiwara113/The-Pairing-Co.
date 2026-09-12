import type { Metadata } from 'next'
import '../styles/globals.css'
import AppWithSplash from './app-with-splash'

export const metadata: Metadata = {
  title: 'Spirited Sweetly - Meal Pairing',
  description: 'Discover perfect meal pairings with wine, spirits, desserts, and flowers',
  keywords: ['meals', 'recipes', 'recommendations', 'wine pairing', 'food', 'celebration'],
  openGraph: {
    title: 'Spirited Sweetly - Meal Pairing',
    description: 'Discover perfect meal pairings',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <AppWithSplash>{children}</AppWithSplash>
      </body>
    </html>
  )
}
