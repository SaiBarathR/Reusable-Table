import './globals.css'
import type { Metadata } from 'next'
import { Providers } from "./Providers";
import { Suspense } from 'react';
import Loading from './loading';

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
      <body>
        <Providers>
          <Suspense fallback={<Loading />}>{children}</Suspense>
        </Providers>
      </body>
    </html>
  )
}
