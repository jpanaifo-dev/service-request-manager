import Image from 'next/image'
import Link from 'next/link'

interface AuthLayoutProps {
  children: React.ReactNode
  subTitle?: string
  backgroundImage?: string
  gradientOpacity?: number // Valor entre 0 y 1
  logoUrl?: string
  logoAlt?: string
  logoSize?: number
  homeUrl?: string
  systemName?: string
  hiddenName?: boolean
  hiddenApp?: boolean
  title?: string
}

const TITLE = '¡Bienvenido a SIGAE - UNAP!'
const DESCRIPTION =
  'Accede para gestionar tus solicitudes, ver convocatorias y hacer seguimiento a tus postulaciones.'

export function AuthLayout({
  children,
  subTitle = DESCRIPTION,
  backgroundImage = '/default-auth-background.jpg',
  gradientOpacity = 1,
  logoUrl = '/brands/escudo-epg.webp',
  logoAlt = 'EPG-UNAP Logo',
  logoSize = 35,
  homeUrl = '#',
  systemName = 'SIGAE - UNAP',
  hiddenName,
  hiddenApp,
  title = TITLE,
}: AuthLayoutProps) {
  // Validar que la opacidad esté entre 0 y 1
  const safeGradientOpacity = Math.min(1, Math.max(0, gradientOpacity))

  return (
    <div className="flex min-h-screen">
      {/* Left side - Form content */}
      <div className="w-full lg:w-1/3 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md space-y-8">{children}</div>
      </div>
      {/* Rigth side - Background with gradient overlay */}
      <div className="hidden lg:flex w-2/3 relative flex-col p-8 justify-between">
        {/* Background image with gradient overlay */}
        <div className="absolute inset-0 -z-20 overflow-hidden">
          {backgroundImage && (
            <Image
              src={backgroundImage}
              alt="Background"
              fill
              className="object-cover"
              quality={100}
              priority
            />
          )}
        </div>

        {/* Gradient overlay */}
        <div
          className="absolute inset-0 -z-10 bg-black/65"
          style={{ opacity: safeGradientOpacity }}
        />

        {/* Background pattern (optional) */}
        <div
          className="absolute inset-0 opacity-20 -z-10 justify-between"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0c50 0 50 100 100 100V0H0z' fill='%23ffffff' fill-opacity='0.1'/%3E%3C/svg%3E\")",
            backgroundSize: 'cover',
            mixBlendMode: 'overlay',
          }}
        />

        {/* Logo and system name */}
        {!hiddenApp && (
          <Link
            href={homeUrl}
            className="hover:cursor-pointer z-10"
          >
            <div className="flex items-center gap-2 text-white">
              <Image
                src={logoUrl}
                alt={logoAlt}
                width={logoSize}
                height={logoSize}
                className="object-contain"
                style={{
                  width: `${logoSize}px`,
                  height: `${logoSize}px`,
                  minWidth: `${logoSize}px`,
                  minHeight: `${logoSize}px`,
                }}
              />
              {!hiddenName && (
                <span className="text-xl font-semibold">{systemName}</span>
              )}
            </div>
          </Link>
        )}

        {/* Content */}
        <div className="fixed bottom-8 right-8 text-white max-w-xl z-10">
          <h1 className="text-4xl font-extrabold mb-4">{title}</h1>
          {subTitle ? (
            <p className="text-lg opacity-90">{subTitle}</p>
          ) : (
            <p className="text-lg opacity-90">{DESCRIPTION}</p>
          )}
        </div>
      </div>
    </div>
  )
}
