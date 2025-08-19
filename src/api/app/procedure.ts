'use server'
import { fetchServices } from '../core/api-clients'
import { ENDPOINTS_CONFIG } from '@/lib/endpoints.config'
import { ProcedureData, IResApi, ProcedureFilter } from '@/types'
// import { revalidatePath } from 'next/cache'
// import { IPersonFormData } from '@/schemas'

const INITAL_DATA: IResApi<ProcedureData> = {
  count: 0,
  next: null,
  previous: null,
  results: [],
}

export const fetchProceduresList = async (
  filter?: ProcedureFilter
): Promise<{
  status: number
  data?: IResApi<ProcedureData>

  errors?: string[]
}> => {
  const params = new URLSearchParams()
  if (filter) {
    Object.entries(filter).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params.append(key, String(value))
      }
    })
  }
  const path = `${ENDPOINTS_CONFIG.DESK.PROCEDURE.LIST}?${params.toString()}`

  try {
    const response = await fetchServices.get(path)
    if (!response.ok) {
      const errorResponse = await response.json()
      console.error('Error fetching procedures list:', errorResponse)
      const errorMessages = [errorResponse.message]
      return {
        status: response.status,
        errors: errorMessages,
      }
    }

    const responseData: IResApi<ProcedureData> = await response.json()
    return {
      status: response.status,
      data: responseData || INITAL_DATA,
    }
  } catch (error) {
    console.error('Error making request:', error)
    return {
      status: 500,
      errors: ['Error connecting to the server.'],
      data: INITAL_DATA,
    }
  }
}
