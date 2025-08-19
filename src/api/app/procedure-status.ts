'use server'
import { fetchServices } from '../core/api-clients'
import { ENDPOINTS_CONFIG } from '@/lib/endpoints.config'
import { revalidatePath } from 'next/cache'
import { ProcedureStatus } from '@/types'
import { ProcedureStatusFormData } from '@/schemas'

export const fetchProcedureStatusList = async (): Promise<{
  status: number
  data?: ProcedureStatus[]
  errors?: string[]
}> => {
  const path = ENDPOINTS_CONFIG.CORE.PROCEDURE_STATUS.LIST

  try {
    const response = await fetchServices.get(path)
    if (!response.ok) {
      const errorResponse = await response.json()
      console.error('Error fetching procedure status list:', errorResponse)
      const errorMessages = [errorResponse.message]
      return {
        status: response.status,
        errors: errorMessages,
      }
    }

    const responseData: ProcedureStatus[] = await response.json()
    return {
      status: response.status,
      data: responseData,
    }
  } catch (error) {
    console.error('Error making request:', error)
    return {
      status: 500,
      errors: ['Error connecting to the server.'],
    }
  }
}

export const createOrUpdateProcedureStatus = async ({
  id,
  data,
  urlRevalidate,
}: {
  id?: number
  data: ProcedureStatusFormData
  urlRevalidate?: string
}): Promise<{
  status: number
  data?: ProcedureStatus
  errors?: string[]
}> => {
  const path = id
    ? `${ENDPOINTS_CONFIG.CORE.PROCEDURE_STATUS.LIST}${id}/`
    : ENDPOINTS_CONFIG.CORE.PROCEDURE_STATUS.LIST
  try {
    const response = id
      ? await fetchServices.put(path, data)
      : await fetchServices.post(path, data)
    if (!response.ok) {
      const errorResponse = await response.json()
      console.error('Error creating/updating procedure status:', errorResponse)
      const errorMessages = [errorResponse.message]
      return {
        status: response.status,
        errors: errorMessages,
      }
    }
    const responseData: ProcedureStatus = await response.json()
    revalidatePath(urlRevalidate || '/dashboard/procedure-status')
    return {
      status: response.status,
      data: responseData,
    }
  } catch (error) {
    console.error('Error making request:', error)
    return {
      status: 500,
      errors: ['Error connecting to the server.'],
    }
  }
}

export const deleteProcedureStatus = async (
  id: number
): Promise<{
  status: number
  errors?: string[]
}> => {
  const path = `${ENDPOINTS_CONFIG.CORE.PROCEDURE_STATUS.LIST}${id}/`
  try {
    const response = await fetchServices.delete(path)
    if (!response.ok) {
      const errorResponse = await response.json()
      console.error('Error deleting procedure status:', errorResponse)
      const errorMessages = [errorResponse.message]
      return {
        status: response.status,
        errors: errorMessages,
      }
    }
    revalidatePath('/dashboard/procedure-status')
    return {
      status: response.status,
    }
  } catch (error) {
    console.error('Error making request:', error)
    return {
      status: 500,
      errors: ['Error connecting to the server.'],
    }
  }
}
