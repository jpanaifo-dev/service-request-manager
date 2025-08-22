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
            href: APP_URL.HOME.BASE,
          },
          {
            label: 'Consultar trámite',
            href: APP_URL.PORTAL.CONSULTAR,
          },
          {
            label: 'Iniciar trámite',
            href: APP_URL.PORTAL.START_PROCEDURE,
          },
        ]}
      />
      {children}
      <Footer />
    </>
  )
}
