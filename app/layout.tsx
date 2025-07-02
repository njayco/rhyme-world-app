import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Rhyme World: Rhyming Across The World',
  description: 'Community-driven multilingual rhyming dictionary with AI-powered rhyme generation. Find perfect and near rhymes in English, Spanish, and French.',
  generator: 'v0.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
