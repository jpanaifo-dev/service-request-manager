'use client'
import { useSidebar, useStore } from '@/hooks'
import { cn } from '@/lib/utils'
import { SideBar } from './side-bar'
import { SectionElement } from '@/types'
import { NavBarCustom } from './nav-bar-custom'

export default function AdminPanelLayout({
  children,
  menuItems,
  email,
}: {
  children: React.ReactNode
  menuItems?: SectionElement[]
  email?: string
}) {
  const sidebar = useStore(useSidebar, (x) => x)

  if (!sidebar) return null
  const { getOpenState, settings } = sidebar

  return (
    <>
      <SideBar menuItems={menuItems} />

      <main
        className={cn(
          'min-h-screen bg-slate-100 dark:bg-zinc-900 transition-[margin-left] ease-in-out duration-300 relative',
          !settings.disabled && (!getOpenState() ? 'lg:ml-[90px]' : 'lg:ml-72')
        )}
      >
        <NavBarCustom
          menuItems={menuItems}
          email={email}
        />

        <main className="w-full container mx-auto py-4 bg-slate-100 zoom-adjust">
          {children}
        </main>
      </main>
      {/* <Footer /> */}
    </>
  )
}
