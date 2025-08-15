'use server'
import { IResponseMessage } from '@/types'
import { fetchServices } from '../core/api-clients'
import { ENDPOINTS_CONFIG } from '@/lib/endpoints.config'

export const recoveryPassword = async (data: {
  email: string
  password: string
  confirm_password: string
  code_token: string
}): Promise<{ status: number; data?: IResponseMessage; errors?: string[] }> => {
  const path = `${ENDPOINTS_CONFIG.AUTH.PASSWORD_RESET}`

  try {
    const response = await fetchServices.post(`${path}`, {
      ...data,
      //   action: ActionsTypes.FORGOT_PASSWORD,
    })

    if (!response.ok) {
      const errorResponse: {
        [key: string]: string[]
      } = await response.json()
      const errorMessages = Object.values(errorResponse).flat()
      return {
        status: response.status,
        errors: errorMessages,
      }
    }

    // Si el estado es exitoso, parseamos los datos
    const responseData: IResponseMessage = await response.json()
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
