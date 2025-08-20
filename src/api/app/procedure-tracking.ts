'use server'
import { fetchServices } from '../core/api-clients'
import { ENDPOINTS_CONFIG } from '@/lib/endpoints.config'
import {
  ProcedureTrackingDetail,
  IResApi,
  ProcedureTrackingFilter,
} from '@/types'

const INITIAL_DATA: IResApi<ProcedureTrackingDetail> = {
  count: 0,
  next: null,
  previous: null,
  results: [],
}

export const fetchProcedureTrackingList = async (
  filter?: ProcedureTrackingFilter
): Promise<{
  status: number
  data?: IResApi<ProcedureTrackingDetail>
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
  const path = `${
    ENDPOINTS_CONFIG.DESK.PROCEDURE_TRACKING.LIST_DETAIL
  }?${params.toString()}`

  try {
    const response = await fetchServices.get(path)
    if (!response.ok) {
      const errorResponse = await response.json()
      console.error('Error fetching procedure tracking list:', errorResponse)
      const errorMessages = [errorResponse.message]
      return {
        status: response.status,
        errors: errorMessages,
        data: INITIAL_DATA,
      }
    }

    const responseData: IResApi<ProcedureTrackingDetail> = await response.json()
    return {
      status: response.status,
      data: responseData || INITIAL_DATA,
    }
  } catch (error) {
    console.error('Error making request:', error)
    return {
      status: 500,
      errors: ['Error connecting to the server.'],
      data: INITIAL_DATA,
    }
  }
}
