import { AdminPanelLayout } from '@/components/app'
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
    template: '%s | SIGAE - ESTUDIANTE | UNAP',
    default: 'SIGAE - ESTUDIANTE | UNAP',
  },
  description:
    'Intranet Estudiante de la Escuela de Posgrado de la Universidad Nacional de la Amazonía Peruana (UNAP)',
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
      >
        {children}
      </AdminPanelLayout>
    </>
  )
}
