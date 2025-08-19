'use server'
import { fetchServices } from '../core/api-clients'
import { ENDPOINTS_CONFIG } from '@/lib/endpoints.config'
import { revalidatePath } from 'next/cache'
import { ProcedureType } from '@/types'
import { ProcedureTypeFormData } from '@/schemas'

export const fetchProcedureTypeList = async (): Promise<{
  status: number
  data?: ProcedureType[]
  errors?: string[]
}> => {
  const path = ENDPOINTS_CONFIG.DESK.PROCEDURE_TYPE.LIST

  try {
    const response = await fetchServices.get(path)
    if (!response.ok) {
      const errorResponse = await response.json()
      console.error('Error fetching procedure type list:', errorResponse)
      const errorMessages = [errorResponse.message]
      return {
        status: response.status,
        errors: errorMessages,
        data: [],
      }
    }

    return {
      status: response.status,
      data: (await response.json()) as ProcedureType[],
    }
  } catch (error) {
    console.error('Error making request:', error)
    return {
      status: 500,
      errors: ['Error connecting to the server.'],
      data: [],
    }
  }
}

export const createOrUpdateProcedureType = async ({
  id,
  data,
  urlRevalidate,
}: {
  id?: number
  data: ProcedureTypeFormData
  urlRevalidate?: string
}): Promise<{
  status: number
  data?: ProcedureType
  errors?: string[]
}> => {
  const path = id
    ? `${ENDPOINTS_CONFIG.DESK.PROCEDURE_TYPE.LIST}${id}/`
    : ENDPOINTS_CONFIG.DESK.PROCEDURE_TYPE.LIST
  try {
    const response = id
      ? await fetchServices.put(path, data)
      : await fetchServices.post(path, data)
    if (!response.ok) {
      const errorResponse = await response.json()
      console.error('Error creating/updating procedure type:', errorResponse)
      const errorMessages = [errorResponse.message]
      return {
        status: response.status,
        errors: errorMessages,
      }
    }
    const responseData: ProcedureType = await response.json()
    revalidatePath(urlRevalidate || '/dashboard/procedure-type')
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

export const deleteProcedureType = async (
  id: number
): Promise<{
  status: number
  errors?: string[]
}> => {
  const path = `${ENDPOINTS_CONFIG.DESK.PROCEDURE_TYPE.LIST}${id}/`
  try {
    const response = await fetchServices.delete(path)
    if (!response.ok) {
      const errorResponse = await response.json()
      console.error('Error deleting procedure type:', errorResponse)
      const errorMessages = [errorResponse.message]
      return {
        status: response.status,
        errors: errorMessages,
      }
    }
    revalidatePath('/dashboard/procedure-type')
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
