import { Footer, Navbar } from '@/components/app'

interface LayoutProps {
  children: React.ReactNode
}
export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Navbar
        logo={{
          text: 'MiTrámite',
          href: '/',
        }}
      />
      {children}
      <Footer />
    </>
  )
}
