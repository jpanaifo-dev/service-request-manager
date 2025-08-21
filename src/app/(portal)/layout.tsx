import { LOGOS } from '@/assets/brands'
import { Footer, Navbar } from '@/components/app'
import { APP_URL } from '@/data/constants'

interface LayoutProps {
  children: React.ReactNode
}
export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Navbar
        logo={{
          href: APP_URL.HOME.BASE,
          image: LOGOS.horizontal.src,
        }}
        className="bg-white dark:bg-gray-900 shadow-md"
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
