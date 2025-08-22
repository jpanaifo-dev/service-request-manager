import { NextResponse, NextRequest } from 'next/server'

const APP_NAME = process.env.APP_NAME

export async function middleware(request: NextRequest) {
  const currentUser = request.cookies.get(`${APP_NAME}_session`)?.value
  const { pathname } = request.nextUrl

  // 1. Si la ruta es /dashboard o una subruta, verificar autenticación
  if (pathname.startsWith('/dashboard')) {
    // Si NO hay usuario autenticado, redirigir a /login con ?redirect=[ruta-deseada]
    if (!currentUser) {
      const loginUrl = new URL('/login', request.url)
      loginUrl.searchParams.set('redirect', pathname) // Guarda la ruta original
      return NextResponse.redirect(loginUrl)
    }
    // Si hay usuario, permitir acceso
    return NextResponse.next()
  }

  // 2. Si la ruta es /login y el usuario YA está autenticado, redirigir a /dashboard
  if (pathname === '/login' && currentUser) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  // 3. Para cualquier otra ruta (pública), permitir acceso sin restricción
  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/login'],
}
