'use client'
import { LOGOS } from '@/assets/brands'
import { useSidebar, useStore } from '@/hooks'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export const LogoRender = ({
  nameApp,
  subtitle,
  href,
  className,
  logoUrl = LOGOS.white.src,
  sizeLogo,
}: {
  nameApp?: string
  subtitle?: string
  href: string
  className?: string
  logoUrl?: string
  sizeLogo?: { width: number; height: number }
}) => {
  const sidebar = useStore(useSidebar, (x) => x)
  if (!sidebar) return null
  const { getOpenState } = sidebar

  return (
    <section
      id="logo"
      className={cn(
        'flex flex-col items-center gap-2 w-full hover:cursor-pointer justify-center px-2',
        className
      )}
    >
      <Link
        href={href}
        className="flex items-center gap-4 w-full"
      >
        {!nameApp && (
          <Image
            src={logoUrl}
            alt="logo-epg"
            width={300}
            height={40}
            style={{
              width: sizeLogo?.width || 300,
              height: sizeLogo?.height || 40,
            }}
          />
        )}
        {getOpenState() && (
          <div className="flex flex-col items-start">
            {nameApp && (
              <h1 className={cn(' font-bold text-lg', className)}>
                {nameApp || 'ESCUELA DE POSTGRADO UNAP'}
              </h1>
            )}
            {subtitle && (
              <h2 className="w-32 min-w-32 font-semibold text-xs text-gray-400 uppercase">
                {subtitle}
              </h2>
            )}
          </div>
        )}
      </Link>
    </section>
  )
}
