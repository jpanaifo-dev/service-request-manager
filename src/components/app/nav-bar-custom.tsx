'use client'
import { SheetMenu } from './sheet-menu'
import { useSidebar } from '@/hooks'
import { cn } from '@/lib/utils'
import { IMoreApp, SectionElement } from '@/types'
import { useStore } from 'zustand'
import { MENU_PROFILE } from '@/config/profile-menu'
import { ProfilePopover } from './profile-popover'
import { BreadcrumbCustom } from '../panel-admin/bread-crumb-custom'
// import { SidebarToggle } from './sidebar-toggle'
// import { Grip } from 'lucide-react'
// import { Breadcrumb } from '@/components/ui/breadcrumb'

interface NavBarCustomProps {
  app?: keyof typeof configApps
  moreApps?: Array<IMoreApp>
  email?: string
  menuItems?: SectionElement[]
}

export const NavBarCustom = (props: NavBarCustomProps) => {
  const { app, email, menuItems } = props

  const sidebar = useStore(useSidebar, (x) => x)
  if (!sidebar) return null
  // const { isOpen, toggleOpen } = sidebar

  const appConfig = app ? configApps[app] : configApps['student']

  const colorApp = appConfig.color
  const nameApp = appConfig.name

  return (
    <header
      className={cn(`sticky top-0 z-50 w-full  shadow `)}
      style={{
        backgroundColor: colorApp,
      }}
    >
      <div className="px-4 sm:px-6 md:px-7 flex h-16 items-center">
        <div className="flex items-center space-x-4 lg:space-x-0 sm:gap-3">
          <SheetMenu
            title={nameApp}
            menuItems={menuItems}
          />
          {/* <SidebarToggle
            isOpen={isOpen}
            setIsOpen={toggleOpen}
          /> */}
          <BreadcrumbCustom />
        </div>
        <div className="flex flex-1 items-center justify-end gap-2">
          {/*Menu de perfil*/}
          <ProfilePopover
            profileData={{
              names: `${person?.names} ${person?.last_name1} ${person?.last_name2}`,
              email,
              photo: person?.photo,
            }}
            menuSections={MENU_PROFILE.APP_MENU}
            showProgress={false}
            showBorders={false}
          />
        </div>
      </div>
    </header>
  )
}
