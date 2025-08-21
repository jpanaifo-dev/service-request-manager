'use server'
import { fetchServices } from '../core/api-clients'
import { ENDPOINTS_CONFIG } from '@/lib/endpoints.config'
import { ProcedureList } from '@/types'
import { IProcedureFormData } from '@/schemas'

const buildFormData = (
  fields: Record<string, string | number | File | null>
) => {
  const formData = new FormData()
  Object.entries(fields).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      formData.append(key, typeof value === 'number' ? value.toString() : value)
    }
  })
  return formData
}

export const createOrUpdateProcedure = async ({
  id,
  data,
}: {
  id?: number
  data: IProcedureFormData
  urlRevalidate?: string
}): Promise<{
  status: number
  data?: ProcedureList
  errors?: string[]
}> => {
  // Convert boolean values to strings for FormData compatibility
  const normalizedData = Object.fromEntries(
    Object.entries(data).map(([key, value]) => [
      key,
      typeof value === 'boolean' ? value.toString() : value,
    ])
  )
  const formData = buildFormData(
    normalizedData as Record<string, string | number | File | null>
  )

  const path = id
    ? `${ENDPOINTS_CONFIG.DESK.PROCEDURE.LIST}${id}/`
    : ENDPOINTS_CONFIG.DESK.PROCEDURE.LIST
  try {
    const response = id
      ? await fetchServices.put(path, formData, true)
      : await fetchServices.post(path, formData, true)
    console.log('Response status:', response)
    if (!response.ok) {
      console.log('Response not ok:', response.status)
      const errorResponse = await response.json()
      console.error('Error response from server:', errorResponse)
      const errorMessages = [errorResponse.message]
      return {
        status: response.status,
        errors: errorMessages,
      }
    }
    const responseData: ProcedureList = await response.json()
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
