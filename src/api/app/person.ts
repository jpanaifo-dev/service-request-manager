'use server'
import { fetchServices } from '../core/api-clients'
import { ENDPOINTS_CONFIG } from '@/lib/endpoints.config'
import { revalidatePath } from 'next/cache'
import { IResApi, Person } from '@/types'
import { IPersonFormData } from '@/schemas'

export const fetchPersonList = async (): Promise<{
  status: number
  data?: IResApi<Person>
  errors?: string[]
}> => {
  const path = ENDPOINTS_CONFIG.CORE.PERSON.LIST

  try {
    const response = await fetchServices.get(path)
    if (!response.ok) {
      const errorResponse = await response.json()
      console.error('Error fetching person list:', errorResponse)
      const errorMessages = [errorResponse.message]
      return {
        status: response.status,
        errors: errorMessages,
      }
    }

    const responseData: IResApi<Person> = await response.json()
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

export const createOrUpdatePerson = async ({
  id,
  data,
  urlRevalidate,
}: {
  id?: number
  data: IPersonFormData
  urlRevalidate?: string
}): Promise<{
  status: number
  data?: Person
  errors?: string[]
}> => {
  const path = id
    ? `${ENDPOINTS_CONFIG.CORE.PERSON.LIST}${id}/`
    : ENDPOINTS_CONFIG.CORE.PERSON.LIST
  try {
    const response = id
      ? await fetchServices.put(path, data)
      : await fetchServices.post(path, data)
    if (!response.ok) {
      const errorResponse = await response.json()
      console.error('Error creating/updating person:', errorResponse)
      const errorMessages = [errorResponse.message]
      return {
        status: response.status,
        errors: errorMessages,
      }
    }
    const responseData: Person = await response.json()
    revalidatePath(urlRevalidate || '/dashboard/personas')
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
