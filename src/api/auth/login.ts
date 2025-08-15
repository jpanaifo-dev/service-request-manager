'use server'

import { IUserAuth } from '@/types'
import { createSession } from '@/lib/session'
import { fetchUserService } from '../core/fetch-services'
import { ENDPOINTS_CONFIG } from '@/lib/endpoints.config'
import { buildHeaders } from '../core/build-headers'

export const fetchLogin = async (
  data: { username: string; password: string },
  role: 'student' | 'teacher'
): Promise<{ status: number; data?: IUserAuth; errors?: string[] }> => {
  const path = ENDPOINTS_CONFIG.AUTH.LOGIN

  const headers = await buildHeaders(role === 'student' ? 'STUDENT' : 'TEACHER')

  try {
    const response = await fetchUserService.post(path, data, false, headers)
    if (!response.ok) {
      const errorResponse = await response.json()
      console.error('Error al iniciar sesión:', errorResponse)
      const errorMessages = [errorResponse.message]
      return {
        status: response.status,
        errors: errorMessages,
      }
    }

    const responseData: IUserAuth = await response.json()
    await createSession(responseData, responseData.expires_at)
    return {
      status: response.status,
      data: responseData,
    }
  } catch (error) {
    console.error('Error al realizar la petición:', error)
    return {
      status: 500,
      errors: ['Error al conectar con el servidor.'],
    }
  }
}

export const signInWithGoogle = async (
  token: string,
  role?: 'student' | 'teacher'
): Promise<{
  status: number
  data?: IUserAuth
  errors?: string[]
}> => {
  const path = ENDPOINTS_CONFIG.AUTH.LOGIN_WITH_GOOGLE
  const headers = await buildHeaders(role === 'student' ? 'STUDENT' : 'TEACHER')
  try {
    const response = await fetchUserService.post(
      path,
      {
        google_access_token: token,
      },
      false,
      headers
    )
    if (!response.ok) {
      const errorResponse: { [key: string]: string[] } = await response.json()
      const errorMessages = Object.values(errorResponse).flat()
      return {
        status: response.status,
        errors: errorMessages,
      }
    }

    const responseData: IUserAuth = await response.json()
    await createSession(responseData, responseData.expires_at)
    return {
      status: response.status,
      data: responseData,
    }
  } catch (error) {
    console.error('Error al realizar la petición:', error)
    return {
      status: 500,
      errors: ['Error al conectar con el servidor.'],
    }
  }
}
