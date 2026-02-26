import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '@harkmeij — Media Kit 2026',
  description: 'Media kit for @harkmeij — cycling content creator',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=satoshi@300,400,500,600,700,800,900&display=swap"
          rel="stylesheet"
        />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-5NZ2WQ9JWH" />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-5NZ2WQ9JWH');`,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
