import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Service Request Manager',
  description:
    'A web-based system for managing service requests and document workflows. Allows users to submit requests with specific document types, while the administrative panel enables staff to receive, review, forward to relevant units, approve, and update request statuses. Includes configurable settings, role-based access, and tracking tools to streamline the request lifecycle.',
  openGraph: {
    images: [
      {
        url: 'https://firebasestorage.googleapis.com/v0/b/coniap-iiap.appspot.com/o/EPG%2Fbanner_matricula.webp?alt=media&token=8266aa05-9ae2-4bbb-ba20-9c88c25564dd',
        width: 1000,
        height: 630,
        alt: 'Instituto Mycrosystem - IMS',
      },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body
        className={`${inter.className} antialiased bg-primary-50 text-foreground dark:bg-background-dark dark:text-foreground-dark`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
