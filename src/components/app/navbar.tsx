'use client'

import type React from 'react'
import { useState } from 'react'
import { Search, Menu, X, ChevronDown, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'
import { Variants } from 'framer-motion'

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

const backdropVariants: Variants = {
  hidden: { opacity: 0, backdropFilter: 'blur(0px)' },
  visible: {
    opacity: 1,
    backdropFilter: 'blur(8px)',
    transition: { duration: 0.3, ease: 'easeOut' },
  },
  exit: {
    opacity: 0,
    backdropFilter: 'blur(0px)',
    transition: { duration: 0.2, ease: 'easeIn' },
  },
}

const sidebarVariants: Variants = {
  hidden: {
    x: '-100%',
    opacity: 0,
    scale: 0.95,
    rotateY: -15,
  },
  visible: {
    x: 0,
    opacity: 1,
    scale: 1,
    rotateY: 0,
    transition: {
      type: 'spring',
      damping: 25,
      stiffness: 200,
      duration: 0.6,
      ease: [0.34, 1.56, 0.64, 1],
    },
  },
  exit: {
    x: '-100%',
    opacity: 0,
    scale: 0.95,
    rotateY: -15,
    transition: {
      duration: 0.4,
      ease: 'easeInOut',
    },
  },
}

const headerVariants: Variants = {
  hidden: { y: -20, opacity: 0, scale: 0.9 },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      delay: 0.2,
      type: 'spring',
      damping: 20,
      stiffness: 300,
    },
  },
}
const searchVariants: Variants = {
  hidden: { y: 20, opacity: 0, scale: 0.95 },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      delay: 0.3,
      type: 'spring',
      damping: 20,
      stiffness: 300,
    },
  },
}

const menuItemVariants: Variants = {
  hidden: { x: -30, opacity: 0, scale: 0.9 },
  visible: (index: number) => ({
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      delay: 0.4 + index * 0.1,
      type: 'spring',
      damping: 20,
      stiffness: 300,
    },
  }),
}

const submenuVariants: Variants = {
  hidden: { height: 0, opacity: 0 },
  visible: {
    height: 'auto',
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
      staggerChildren: 0.05,
    },
  },
  exit: {
    height: 0,
    opacity: 0,
    transition: {
      duration: 0.2,
      ease: 'easeIn',
    },
  },
}

const submenuItemVariants: Variants = {
  hidden: { x: -20, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      damping: 25,
      stiffness: 400,
    },
  },
}

const actionButtonVariants: Variants = {
  hidden: { y: 20, opacity: 0, scale: 0.9 },
  visible: (delay: number) => ({
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      delay,
      type: 'spring',
      damping: 20,
      stiffness: 300,
    },
  }),
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
          'bg-blue-950 text-white border-b border-gray-200 sticky top-0 z-40',
          className
        )}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleMobileMenu}
                  className="py-3 px-5 border rounded-full border-gray-300"
                >
                  <motion.div
                    animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="h-6 w-6" />
                  </motion.div>
                  <span className="ml-2 text-sm font-medium hidden sm:inline">
                    Menú
                  </span>
                </Button>
              </motion.div>

              {/* Logo */}
              <motion.div
                className="flex-shrink-0"
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              >
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
                    <span className="text-xl font-bold">{logo.text}</span>
                  )}
                </a>
              </motion.div>
            </div>

            {showSearch && (
              <motion.div
                className="hidden md:block flex-1 max-w-lg mx-8"
                whileHover={{ scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              >
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
              </motion.div>
            )}

            <div className="hidden md:flex items-center space-x-4">
              {actionButtons.map((button, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
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
                </motion.div>
              ))}

              {userSection && (
                <motion.div
                  className="flex items-center space-x-4"
                  whileHover={{ scale: 1.02 }}
                >
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
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50">
            {/* Backdrop animado */}
            <motion.div
              variants={backdropVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-0 bg-black/35 bg-opacity-50"
              onClick={toggleMobileMenu}
            />

            {/* Sidebar animado */}
            <motion.div
              variants={sidebarVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed top-0 left-0 h-full w-80 bg-white shadow-xl"
              style={{
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                transformOrigin: 'left center',
              }}
            >
              {/* Header animado */}
              <motion.div
                variants={headerVariants}
                initial="hidden"
                animate="visible"
                className="flex items-center justify-between p-4 border-b"
              >
                <span className="text-lg font-semibold">Menú</span>
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={toggleMobileMenu}
                    className="p-2 hover:bg-gray-100 rounded-full"
                  >
                    <X className="h-6 w-6" />
                  </Button>
                </motion.div>
              </motion.div>

              <div className="p-4 space-y-4 overflow-y-auto h-full pb-20">
                {/* Search animado */}
                {showSearch && (
                  <motion.div
                    variants={searchVariants}
                    initial="hidden"
                    animate="visible"
                    className="relative"
                  >
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input
                      type="text"
                      placeholder={searchPlaceholder}
                      className="pl-10 pr-4 py-2 w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </motion.div>
                )}

                {/* Navigation con animaciones staggered */}
                <div className="space-y-2">
                  {menuItems.map((item, index) => (
                    <motion.div
                      key={item.label}
                      variants={menuItemVariants}
                      initial="hidden"
                      animate="visible"
                      custom={index}
                    >
                      <div className="flex items-center justify-between">
                        <motion.a
                          href={item.href}
                          className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 py-3 px-2 text-base font-medium flex-1 rounded-md transition-colors duration-200"
                          onClick={!item.items ? toggleMobileMenu : undefined}
                          whileHover={{ scale: 1.02, x: 5 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          {item.label}
                        </motion.a>
                        {item.items && item.items.length > 0 && (
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => toggleSubmenu(item.label)}
                              className="p-2 hover:bg-gray-100 rounded-full"
                            >
                              <motion.div
                                animate={{
                                  rotate: openSubmenu === item.label ? 180 : 0,
                                }}
                                transition={{ duration: 0.2 }}
                              >
                                <ChevronDown className="h-4 w-4" />
                              </motion.div>
                            </Button>
                          </motion.div>
                        )}
                      </div>

                      {/* Submenu animado */}
                      {item.items && (
                        <AnimatePresence>
                          {openSubmenu === item.label && (
                            <motion.div
                              variants={submenuVariants}
                              initial="hidden"
                              animate="visible"
                              exit="exit"
                              className="ml-4 mt-2 space-y-2 overflow-hidden"
                            >
                              {item.items.map((subItem) => (
                                <motion.a
                                  key={subItem.label}
                                  variants={submenuItemVariants}
                                  href={subItem.href}
                                  className="block text-gray-600 hover:text-blue-600 hover:bg-blue-50 py-2 px-3 text-sm rounded-md transition-colors duration-200"
                                  onClick={toggleMobileMenu}
                                  whileHover={{ scale: 1.02, x: 5 }}
                                  whileTap={{ scale: 0.98 }}
                                >
                                  {subItem.label}
                                </motion.a>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      )}
                    </motion.div>
                  ))}
                </div>

                {/* Action Buttons animados */}
                {actionButtons.length > 0 && (
                  <div className="space-y-2 pt-4 border-t">
                    {actionButtons.map((button, index) => (
                      <motion.div
                        key={index}
                        variants={actionButtonVariants}
                        initial="hidden"
                        animate="visible"
                        custom={0.6 + menuItems.length * 0.1 + index * 0.1}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button
                          variant={button.variant || 'default'}
                          onClick={button.onClick}
                          asChild={!!button.href}
                          className="w-full justify-start"
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
                      </motion.div>
                    ))}
                  </div>
                )}

                {/* User Section animado */}
                {userSection && (
                  <motion.div
                    variants={actionButtonVariants}
                    initial="hidden"
                    animate="visible"
                    custom={0.7 + menuItems.length * 0.1}
                    className="pt-4 border-t"
                  >
                    {userSection.isLoggedIn ? (
                      <motion.div
                        className="flex items-center space-x-2 py-3 px-2 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors duration-200"
                        whileHover={{ scale: 1.02 }}
                      >
                        <User className="h-5 w-5 text-gray-600" />
                        <span className="text-sm text-gray-700">
                          Hola, {userSection.userName}
                        </span>
                      </motion.div>
                    ) : (
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button
                          variant="outline"
                          asChild
                          className="w-full bg-transparent hover:bg-blue-50 hover:border-blue-300 transition-colors duration-200"
                        >
                          <a href={userSection.loginHref}>
                            {userSection.loginText || 'Iniciar sesión'}
                          </a>
                        </Button>
                      </motion.div>
                    )}
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
