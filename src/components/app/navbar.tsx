'use client'

import type React from 'react'

import { useState } from 'react'
import { Search, Menu, X, ChevronDown, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

export interface NavItem {
  label: string
  href: string
  items?: NavItem[]
}

export interface NavbarProps {
  logo?: {
    text?: string
    image?: string
    href?: string
  }
  menuItems?: NavItem[]
  searchPlaceholder?: string
  showSearch?: boolean
  actionButtons?: {
    label: string
    href?: string
    onClick?: () => void
    variant?: 'default' | 'outline' | 'secondary' | 'ghost'
    icon?: React.ReactNode
  }[]
  userSection?: {
    isLoggedIn?: boolean
    userName?: string
    loginText?: string
    loginHref?: string
  }
  className?: string
}

export function Navbar({
  logo = { text: 'Mi App', href: '/' },
  menuItems = [],
  searchPlaceholder = 'Buscar...',
  showSearch = true,
  actionButtons = [],
  userSection,
  className,
}: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const toggleSubmenu = (label: string) => {
    setOpenSubmenu(openSubmenu === label ? null : label)
  }

  return (
    <>
      <nav
        className={cn(
          'bg-white border-b border-gray-200 sticky top-0 z-40',
          className
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleMobileMenu}
                className="p-2"
              >
                <Menu className="h-6 w-6" />
                <span className="ml-2 text-sm font-medium hidden sm:inline">
                  Menú
                </span>
              </Button>

              {/* Logo */}
              <div className="flex-shrink-0">
                <a
                  href={logo.href}
                  className="flex items-center"
                >
                  {logo.image ? (
                    <img
                      src={logo.image || '/placeholder.svg'}
                      alt="Logo"
                      className="h-8 w-auto"
                    />
                  ) : (
                    <span className="text-xl font-bold text-gray-900">
                      {logo.text}
                    </span>
                  )}
                </a>
              </div>
            </div>

            {showSearch && (
              <div className="hidden md:block flex-1 max-w-lg mx-8">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input
                    type="text"
                    placeholder={searchPlaceholder}
                    className="pl-10 pr-4 py-2 w-full"
                  />
                </div>
              </div>
            )}

            <div className="hidden md:flex items-center space-x-4">
              {actionButtons.map((button, index) => (
                <Button
                  key={index}
                  variant={button.variant || 'default'}
                  onClick={button.onClick}
                  asChild={!!button.href}
                  className="flex items-center space-x-2"
                >
                  {button.href ? (
                    <a href={button.href}>
                      {button.icon}
                      <span>{button.label}</span>
                    </a>
                  ) : (
                    <>
                      {button.icon}
                      <span>{button.label}</span>
                    </>
                  )}
                </Button>
              ))}

              {userSection && (
                <div className="flex items-center space-x-4">
                  {userSection.isLoggedIn ? (
                    <div className="flex items-center space-x-2">
                      <User className="h-5 w-5 text-gray-600" />
                      <span className="text-sm text-gray-700">
                        Hola, {userSection.userName}
                      </span>
                    </div>
                  ) : (
                    <a
                      href={userSection.loginHref}
                      className="text-sm text-gray-700 hover:text-blue-600"
                    >
                      {userSection.loginText || 'Iniciar sesión'}
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      <div
        className={cn(
          'fixed inset-0 z-50',
          isMobileMenuOpen ? 'block' : 'hidden'
        )}
      >
        {/* Backdrop con fade-in */}
        <div
          className={cn(
            'fixed inset-0 bg-black transition-opacity duration-300 ease-in-out',
            isMobileMenuOpen ? 'bg-opacity-50' : 'bg-opacity-0'
          )}
          onClick={toggleMobileMenu}
        />

        <div
          className={cn(
            'fixed top-0 left-0 h-full w-80 bg-white shadow-xl transform transition-all duration-500 ease-out',
            isMobileMenuOpen
              ? 'translate-x-0 opacity-100'
              : '-translate-x-full opacity-0'
          )}
          style={{
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          }}
        >
          {/* Header con animación */}
          <div
            className={cn(
              'flex items-center justify-between p-4 border-b transition-all duration-700 delay-100',
              isMobileMenuOpen
                ? 'translate-y-0 opacity-100'
                : '-translate-y-4 opacity-0'
            )}
          >
            <span className="text-lg font-semibold">Menú</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMobileMenu}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <X className="h-6 w-6" />
            </Button>
          </div>

          <div className="p-4 space-y-4 overflow-y-auto h-full pb-20">
            {/* Mobile Search con animación */}
            {showSearch && (
              <div
                className={cn(
                  'relative transition-all duration-700 delay-200',
                  isMobileMenuOpen
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-4 opacity-0'
                )}
              >
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  type="text"
                  placeholder={searchPlaceholder}
                  className="pl-10 pr-4 py-2 w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            )}

            {/* Navigation con animaciones staggered */}
            <div className="space-y-2">
              {menuItems.map((item, index) => (
                <div
                  key={item.label}
                  className={cn(
                    'transition-all duration-700 ease-out',
                    isMobileMenuOpen
                      ? 'translate-x-0 opacity-100'
                      : '-translate-x-8 opacity-0'
                  )}
                  style={{
                    transitionDelay: `${300 + index * 100}ms`,
                  }}
                >
                  <div className="flex items-center justify-between">
                    <a
                      href={item.href}
                      className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 py-3 px-2 text-base font-medium flex-1 rounded-md transition-colors duration-200"
                      onClick={!item.items ? toggleMobileMenu : undefined}
                    >
                      {item.label}
                    </a>
                    {item.items && item.items.length > 0 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleSubmenu(item.label)}
                        className="p-2 hover:bg-gray-100 rounded-full"
                      >
                        <ChevronDown
                          className={cn(
                            'h-4 w-4 transition-transform duration-300',
                            openSubmenu === item.label ? 'rotate-180' : ''
                          )}
                        />
                      </Button>
                    )}
                  </div>

                  {/* Submenu con animación de slide down */}
                  {item.items && (
                    <div
                      className={cn(
                        'ml-4 mt-2 space-y-2 overflow-hidden transition-all duration-300 ease-in-out',
                        openSubmenu === item.label
                          ? 'max-h-96 opacity-100'
                          : 'max-h-0 opacity-0'
                      )}
                    >
                      {item.items.map((subItem, subIndex) => (
                        <a
                          key={subItem.label}
                          href={subItem.href}
                          className={cn(
                            'block text-gray-600 hover:text-blue-600 hover:bg-blue-50 py-2 px-3 text-sm rounded-md transition-all duration-200',
                            openSubmenu === item.label
                              ? 'translate-x-0 opacity-100'
                              : '-translate-x-4 opacity-0'
                          )}
                          style={{
                            transitionDelay:
                              openSubmenu === item.label
                                ? `${subIndex * 50}ms`
                                : '0ms',
                          }}
                          onClick={toggleMobileMenu}
                        >
                          {subItem.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Action Buttons con animación */}
            {actionButtons.length > 0 && (
              <div
                className={cn(
                  'space-y-2 pt-4 border-t transition-all duration-700 delay-500',
                  isMobileMenuOpen
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-4 opacity-0'
                )}
              >
                {actionButtons.map((button, index) => (
                  <Button
                    key={index}
                    variant={button.variant || 'default'}
                    onClick={button.onClick}
                    asChild={!!button.href}
                    className="w-full justify-start hover:scale-105 transition-transform duration-200"
                  >
                    {button.href ? (
                      <a
                        href={button.href}
                        className="flex items-center space-x-2"
                      >
                        {button.icon}
                        <span>{button.label}</span>
                      </a>
                    ) : (
                      <>
                        {button.icon}
                        <span>{button.label}</span>
                      </>
                    )}
                  </Button>
                ))}
              </div>
            )}

            {/* User Section con animación */}
            {userSection && (
              <div
                className={cn(
                  'pt-4 border-t transition-all duration-700 delay-600',
                  isMobileMenuOpen
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-4 opacity-0'
                )}
              >
                {userSection.isLoggedIn ? (
                  <div className="flex items-center space-x-2 py-3 px-2 bg-gray-50 rounded-md">
                    <User className="h-5 w-5 text-gray-600" />
                    <span className="text-sm text-gray-700">
                      Hola, {userSection.userName}
                    </span>
                  </div>
                ) : (
                  <Button
                    variant="outline"
                    asChild
                    className="w-full bg-transparent hover:bg-blue-50 hover:border-blue-300 transition-colors duration-200"
                  >
                    <a href={userSection.loginHref}>
                      {userSection.loginText || 'Iniciar sesión'}
                    </a>
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
