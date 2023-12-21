import './globals.css'
import type { Metadata } from 'next'
import { Providers } from "./Providers";
import { Inter } from 'next/font/google'
import { Suspense } from 'react';
import Loading from './loading';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Table',
  description: 'Custom table component',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Suspense fallback={<Loading />}>{children}</Suspense>
        </Providers>
      </body>
    </html>
  )
}
