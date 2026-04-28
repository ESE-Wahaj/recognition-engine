import type { Metadata, Viewport } from 'next'
import { Playfair_Display, DM_Sans, DM_Mono } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  variable: '--font-playfair',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-dm-sans',
  display: 'swap',
})

const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-dm-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    template: '%s | The Recognition Engine',
    default: 'The Recognition Engine — CX Team Performance & Recognition',
  },
  description:
    'A complete monthly recognition system for CX teams. Rank agents, celebrate wins, and drive improvement — with one Google Sheet, six Canva templates, and a clear process.',
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    siteName: 'The Recognition Engine',
    title: 'The Recognition Engine',
    description: 'CX Team Performance & Recognition Dashboard',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable} ${dmMono.variable}`}>
      <body className="font-sans antialiased bg-surface text-ink min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
