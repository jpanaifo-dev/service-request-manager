'use server'
import { fetchServices } from '../core/api-clients'
import { ENDPOINTS_CONFIG } from '@/lib/endpoints.config'
import { IOffices } from '@/types'
import { IOfficeFormData } from '@/schemas'

export const fetchOfficesList = async (): Promise<{
  status: number
  data?: IOffices[]
  errors?: string[]
}> => {
  const path = ENDPOINTS_CONFIG.CORE.OFFICES.LIST

  try {
    const response = await fetchServices.get(path)
    if (!response.ok) {
      const errorResponse = await response.json()
      console.error('Error fetching docs list:', errorResponse)
      const errorMessages = [errorResponse.message]
      return {
        status: response.status,
        errors: errorMessages,
      }
    }

    const responseData: IOffices[] = await response.json()
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

export const createOrUpdateOffice = async ({
  id,
  data,
  urlRevalidate,
}: {
  id?: number
  data: IOfficeFormData
  urlRevalidate?: string
}): Promise<{
  status: number
  data?: IOffices
  errors?: string[]
}> => {
  const path = id
    ? `${ENDPOINTS_CONFIG.CORE.OFFICES.LIST}${id}/`
    : ENDPOINTS_CONFIG.CORE.OFFICES.LIST
  try {
    const response = id
      ? await fetchServices.put(path, data)
      : await fetchServices.post(path, data)
    if (!response.ok) {
      const errorResponse = await response.json()
      console.error('Error creating/updating office:', errorResponse)
      const errorMessages = [errorResponse.message]
      return {
        status: response.status,
        errors: errorMessages,
      }
    }
    const responseData: IOffices = await response.json()
    if (urlRevalidate) {
      await fetchServices.get(urlRevalidate)
    }
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
