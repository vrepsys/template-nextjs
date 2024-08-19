import fs from 'fs'
import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { Layout } from '@/components/layout'
import path from 'path'
import { SearchIndexProvider } from '@/components/search-index-context'

export const metadata: Metadata = {
  title: 'Portal template',
  description: 'Next.js documentation template',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const searchIndex = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), '.next/search-index.json'), 'utf-8'),
  )

  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="bg-portal-background-body min-h-screen font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SearchIndexProvider value={searchIndex}>
            <Layout>{children}</Layout>
          </SearchIndexProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
