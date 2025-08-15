'use server'

import { IUserAuth } from '@/types'
import { createSession } from '@/lib/session'
import { fetchServices } from '../core/api-clients'
import { ENDPOINTS_CONFIG } from '@/lib/endpoints.config'

export const fetchLogin = async (data: {
  username: string
  password: string
}): Promise<{ status: number; data?: IUserAuth; errors?: string[] }> => {
  const path = ENDPOINTS_CONFIG.AUTH.LOGIN

  // const headers = await buildHeaders(role === 'student' ? 'STUDENT' : 'TEACHER')

  try {
    const response = await fetchServices.post(path, data, false)
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
