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
        menuItems={[
          {
            label: 'Inicio',
            href: '/',
          },
          {
            label: 'Consultar trámite',
            href: '/consultar',
          },
          {
            label: 'Iniciar trámite',
            href: '/iniciar-tramite',
          },
        ]}
      />
      {children}
      <Footer />
    </>
  )
}
