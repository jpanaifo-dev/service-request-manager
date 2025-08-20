'use server'
import { fetchServices } from '../core/api-clients'
import { ENDPOINTS_CONFIG } from '@/lib/endpoints.config'
import { revalidatePath } from 'next/cache'
import { DocumentType } from 'next/dist/shared/lib/utils'
import { DocumentTypeFormData } from '@/schemas/document.schema'

export const fetchDocumentTypeList = async (): Promise<{
  status: number
  data?: DocumentType[]
  errors?: string[]
}> => {
  const path = ENDPOINTS_CONFIG.CORE.DOCUMENT_TYPE.LIST

  try {
    const response = await fetchServices.get(path)
    if (!response.ok) {
      const errorResponse = await response.json()
      console.error('Error fetching document type list:', errorResponse)
      const errorMessages = [errorResponse.message]
      return {
        status: response.status,
        errors: errorMessages,
      }
    }

    const responseData: DocumentType[] = await response.json()
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

export const createOrUpdateDocumentType = async ({
  id,
  data,
  urlRevalidate,
}: {
  id?: number
  data: DocumentTypeFormData
  urlRevalidate?: string
}): Promise<{
  status: number
  data?: DocumentType
  errors?: string[]
}> => {
  const path = id
    ? `${ENDPOINTS_CONFIG.CORE.DOCUMENT_TYPE.LIST}${id}/`
    : ENDPOINTS_CONFIG.CORE.DOCUMENT_TYPE.LIST
  try {
    const response = id
      ? await fetchServices.put(path, data)
      : await fetchServices.post(path, data)
    if (!response.ok) {
      const errorResponse = await response.json()
      console.error('Error creating/updating document type:', errorResponse)
      const errorMessages = [errorResponse.message]
      return {
        status: response.status,
        errors: errorMessages,
      }
    }
    const responseData: DocumentType = await response.json()
    revalidatePath(urlRevalidate || '/dashboard/document-type')
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

export const deleteDocumentType = async (
  id: number
): Promise<{
  status: number
  errors?: string[]
}> => {
  const path = `${ENDPOINTS_CONFIG.CORE.DOCUMENT_TYPE.LIST}${id}/`
  try {
    const response = await fetchServices.delete(path)
    if (!response.ok) {
      const errorResponse = await response.json()
      console.error('Error deleting document type:', errorResponse)
      const errorMessages = [errorResponse.message]
      return {
        status: response.status,
        errors: errorMessages,
      }
    }
    revalidatePath('/dashboard/document-type')
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
