import type { Metadata, Viewport } from 'next'
import { Inter, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from '@/components/theme-provider'
import { LanguageProvider } from '@/lib/i18n'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter'
})

const geistMono = Geist_Mono({ 
  subsets: ["latin"],
  variable: '--font-geist-mono'
})

export const metadata: Metadata = {
  title: 'V Momentum | SaaS Technology Apps Design',
  description: 'Diseñamos y desarrollamos apps listas para operar en días. Aplicaciones, sistemas y herramientas digitales con integraciones reales para vender, operar y escalar tu negocio.',
  generator: 'V Momentum',
  applicationName: 'V Momentum',
  keywords: ['SaaS', 'apps', 'desarrollo', 'software', 'integraciones', 'automatización', 'IA', 'cloud'],
  authors: [{ name: 'V Momentum' }],
  creator: 'V Momentum',
  publisher: 'V Momentum',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'V Momentum',
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'es_MX',
    url: 'https://vmomentum.app',
    siteName: 'V Momentum',
    title: 'V Momentum | SaaS Technology Apps Design',
    description: 'Tu app. Tu negocio. Sin tensiones. Diseñamos y desarrollamos apps listas para operar en días.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'V Momentum - SaaS Technology Apps Design',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'V Momentum | SaaS Technology Apps Design',
    description: 'Tu app. Tu negocio. Sin tensiones.',
    images: ['/og-image.png'],
  },
  icons: {
    icon: [
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
    { media: '(prefers-color-scheme: light)', color: '#fafafa' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${inter.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body className="font-sans antialiased bg-background min-h-screen">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </ThemeProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
