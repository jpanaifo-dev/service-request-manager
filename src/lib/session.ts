import 'server-only'
import { SignJWT, jwtVerify, type JWTPayload } from 'jose'
import { cookies } from 'next/headers'
import { IUserAuth } from '@/types'

const APP_NAME = process.env.APP_NAME
const secretKey = process.env.SESSION_SECRET

if (!secretKey) {
  throw new Error('SESSION_SECRET is not defined in environment variables')
}

if (!APP_NAME) {
  throw new Error('APP_NAME is not defined in environment variables')
}

const encodedKey = new TextEncoder().encode(secretKey)

export interface SessionPayload extends JWTPayload {
  data: IUserAuth
}

// Type guard para verificar si el payload tiene la estructura correcta
function isSessionPayload(payload: JWTPayload): payload is SessionPayload {
  return (payload as SessionPayload).data !== undefined
}

export async function encrypt(payload: SessionPayload): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1d')
    .sign(encodedKey)
}

export async function decrypt(
  session: string | undefined = ''
): Promise<SessionPayload | null> {
  if (!session?.trim()) return null

  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ['HS256'],
    })

    if (!isSessionPayload(payload)) {
      console.error('Invalid session payload structure')
      return null
    }

    return payload
  } catch (error) {
    console.error('Failed to verify session:', error)
    return null
  }
}

export async function createSession(
  data: IUserAuth,
  expiresInMs: number = 24 * 60 * 60 * 1000
): Promise<void> {
  const expiresAt = new Date(Date.now() + expiresInMs)
  const session = await encrypt({ data })

  const cookieStore = await cookies()
  cookieStore.set(`${APP_NAME}_session`, session, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    expires: expiresAt,
    sameSite: 'lax',
    path: '/',
  })
}

export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies()
  const session = cookieStore.get(`${APP_NAME}_session`)?.value
  return await decrypt(session)
}

export async function getUserAuth(): Promise<IUserAuth | null> {
  const payload = await getSession()
  return payload?.data ?? null
}

export async function deleteSession(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete(`${APP_NAME}_session`)
}
