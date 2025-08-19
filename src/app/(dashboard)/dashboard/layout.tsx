import { AdminPanelLayout } from '@/components/app'
import { APP_URL } from '@/data/constants'
// import { APP_URL } from '@/config/urls-data/student.urls.config'
// import { getUserAuth } from '@/lib/session'
// import { IPerson, IUserAuth, MenuConfigApps } from '@/types'
import type { Metadata } from 'next'
// import { redirect } from 'next/navigation'

interface LayoutProps {
  children: React.ReactNode
}

export const metadata: Metadata = {
  title: {
    template: '%s | Servicio de Trámites',
    default: 'Servicio de Trámites',
  },
  description:
    'Panel de administración para la gestión y seguimiento de solicitudes de trámites.',
}

// const APP_NAME_KEY: MenuConfigApps = 'student'

export default async function Layout(props: LayoutProps) {
  const { children } = props

  //   if (menuItems?.status !== 200) {
  //     redirect(APP_URL.HOME.UNAUTHORIZED)
  //   }

  return (
    <>
      <AdminPanelLayout
        // menuItems={menuItems.data}
        // app={APP_NAME_KEY}
        // email={data?.email}
        // personData={personData}
        // studentUuid={studentUuid}
        menuItems={[
          {
            section: {
              id: 1,
              name: 'Principal',
            },
            menus: [
              {
                menu: {
                  id: 1,
                  name: 'Inicio',
                  url: APP_URL.DASHBOARD.BASE,
                  icon: '',
                  description: 'Página principal del panel de administración',
                },
                submenus: [],
              },
              {
                menu: {
                  id: 2,
                  name: 'Historial de Solicitudes',
                  url: APP_URL.DASHBOARD.SOLICITUDES,
                  icon: '',
                  description:
                    'Consultar el historial de solicitudes realizadas',
                },
                submenus: [],
              },
              {
                menu: {
                  id: 3,
                  name: 'Oficinas',
                  url: APP_URL.DASHBOARD.OFFICES,
                  icon: '',
                  description: 'Consultar las oficinas disponibles',
                },
                submenus: [],
              },
              {
                menu: {
                  id: 4,
                  name: 'Usuarios',
                  url: APP_URL.DASHBOARD.USERS,
                  icon: '',
                  description: 'Administrar los usuarios del sistema',
                },
                submenus: [],
              },
            ],
          },
          {
            section: {
              id: 2,
              name: 'Gestión',
            },
            menus: [
              {
                menu: {
                  id: 5,
                  name: 'Documentos y estados',
                  description: 'Administrar documentos y estados de trámites',
                  url: APP_URL.DASHBOARD.DOCUMENTS_TYPES,
                  icon: '',
                },
                submenus: [
                  {
                    id: 1,
                    name: 'Tipos de documentos',
                    url: APP_URL.DASHBOARD.DOCUMENTS_TYPES,
                    icon: '',
                    description: 'Administrar los tipos de documentos',
                  },
                  {
                    id: 2,
                    name: 'Estados de trámites',
                    url: APP_URL.DASHBOARD.DOCUMENTS_STATUS,
                    icon: '',
                    description: 'Administrar los estados de los trámites',
                  },
                ],
              },
            ],
          },
        ]}
      >
        {children}
      </AdminPanelLayout>
    </>
  )
}
