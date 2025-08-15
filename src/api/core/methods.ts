import { ServicesModulesType } from '@/config/modules.cofig'
import { headerClient } from './header-client'

export async function get(path: string, module: keyof ServicesModulesType) {
  return headerClient(path, { method: 'GET' }, undefined, module)
}

export async function post(
  path: string,
  body: unknown,
  isFormData = false,
  module: keyof ServicesModulesType
) {
  return headerClient(
    path,
    {
      method: 'POST',
      body: isFormData ? (body as FormData) : JSON.stringify(body),
    },
    isFormData,
    module
  )
}

export async function put(
  path: string,
  body: unknown,
  isFormData = false,
  module: keyof ServicesModulesType
) {
  return headerClient(
    path,
    {
      method: 'PUT',
      body: isFormData ? (body as FormData) : JSON.stringify(body),
    },
    isFormData,
    module
  )
}

export async function patch(
  path: string,
  body: unknown,
  isFormData = false,
  module: keyof ServicesModulesType
) {
  return headerClient(
    path,
    {
      method: 'PATCH',
      body: isFormData ? (body as FormData) : JSON.stringify(body),
    },
    isFormData,
    module
  )
}

export async function del(path: string, module: keyof ServicesModulesType) {
  return headerClient(path, { method: 'DELETE' }, undefined, module)
}

export const fetchMethods = {
  get,
  post,
  put,
  patch,
  del,
}
