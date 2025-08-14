'use client'

import Link from 'next/link'
import { Ellipsis } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { CollapseMenuButton } from './collapse-menu-button'
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from '@/components/ui/tooltip'
import { SectionElement } from '@/types'

interface MenuProps {
  isOpen: boolean | undefined
  menuItems?: SectionElement[]
}

export function Menu({ isOpen, menuItems }: MenuProps) {
  const pathname = usePathname()
  const menuList = menuItems || []

  return (
    <ScrollArea className="[&>div>div[style]]:!block">
      <nav className="w-full sm:mt-14">
        <ul className="flex flex-col min-h-[calc(100vh-48px-36px-16px-32px)] lg:min-h-[calc(100vh-32px-40px-32px)] items-start space-y-1 px-2">
          {menuList
            ?.filter(({ menus }) => menus.length > 0)
            .map(({ section, menus }, index) => (
              <li
                className={cn('w-full', section ? 'pt-5' : '')}
                key={index}
              >
                {(isOpen && section) || isOpen === undefined ? (
                  <p className="text-sm font-medium text-gray-400 px-4 pb-2 max-w-[248px] truncate">
                    {section?.name}
                  </p>
                ) : !isOpen && isOpen !== undefined && section ? (
                  <TooltipProvider>
                    <Tooltip delayDuration={100}>
                      <TooltipTrigger className="w-full">
                        <div className="w-full flex justify-center items-center">
                          <Ellipsis className="h-5 w-5" />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent side="right">
                        <p>{section?.name}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ) : (
                  <p className="pb-2"></p>
                )}
                {menus.map(({ menu, submenus }, index) => {
                  const isActive = (href: string) => pathname === href
                  return !submenus || submenus.length === 0 ? (
                    <div
                      className="w-full"
                      key={index}
                    >
                      <TooltipProvider disableHoverableContent>
                        <Tooltip delayDuration={100}>
                          <TooltipTrigger asChild>
                            <Button
                              variant={
                                isActive(menu.url ?? '') ? 'default' : 'ghost'
                              }
                              className={cn(
                                'w-full justify-start h-10 mb-1',
                                isActive(menu.url ?? '')
                                  ? 'font-bold text-white'
                                  : ''
                              )}
                              asChild
                            >
                              {menu.url && (
                                <Link href={menu.url}>
                                  <span
                                    className={cn(
                                      isOpen === false ? '' : 'mr-4'
                                    )}
                                  >
                                    {menu.icon && (
                                      <span
                                        className={cn(
                                          isActive(menu.url ?? '') ? '' : ''
                                        )}
                                        dangerouslySetInnerHTML={{
                                          __html: menu.icon,
                                        }}
                                      />
                                    )}
                                  </span>
                                  <p
                                    className={cn(
                                      'max-w-[200px] truncate',
                                      isOpen === false
                                        ? '-translate-x-96 opacity-0'
                                        : 'translate-x-0 opacity-100'
                                    )}
                                  >
                                    {menu.name}
                                  </p>
                                </Link>
                              )}
                            </Button>
                          </TooltipTrigger>
                          {isOpen === false && (
                            <TooltipContent side="right">
                              {menu.name}
                            </TooltipContent>
                          )}
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  ) : (
                    <div
                      className="w-full"
                      key={index}
                    >
                      <CollapseMenuButton
                        icon={`${menu.icon}`}
                        label={menu.name}
                        active={submenus.some((submenu) =>
                          isActive(submenu.url ?? '')
                        )}
                        submenus={submenus}
                        isOpen={isOpen}
                      />
                    </div>
                  )
                })}
              </li>
            ))}
        </ul>
      </nav>
    </ScrollArea>
  )
}
