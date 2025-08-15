// fetch-services.ts
// import { ServicesModulesType } from '@/config/modules.cofig'
import { fetchCore } from './fetch-client'
export async function headerClient(
  path: string,
  options: RequestInit = {},
  isFormData: boolean = false
) {
  return fetchCore(
    path,
    {
      ...options,
    },
    isFormData
  )
}
