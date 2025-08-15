'use server'
import { CONFIG_APP } from '@/lib/modules.cofig'
const APP_NAME = process.env.APP_NAME

import { decrypt } from '@/lib/session'
import { cookies } from 'next/headers'
import { IUserAuth } from '@/types'

export async function fetchCore(
  path: string,
  options: RequestInit,
  // module: keyof ServicesModulesType,
  isFormData: boolean = false
): Promise<Response> {
  const cookie = (await cookies()).get(`${APP_NAME}_session`)?.value
  const session = await decrypt(cookie)
  const data: IUserAuth = (await session?.data) as unknown as IUserAuth
  const appToken = data?.access_token

  const headers: Record<string, string> = {}

  const { URL_PROD, URL_LOCAL, TOKEN } = CONFIG_APP
  // const { URL_PROD, URL_LOCAL, TOKEN } = SERVICES_MODULES[module]
  if (!URL_PROD || !URL_LOCAL) {
    throw new Error(
      `Las URLs no están configuradas para el módulo ${CONFIG_APP.APP_NAME}`
    )
  }
  const isProduction = process.env.NODE_ENV === 'production'
  const urlBase = isProduction ? URL_PROD : URL_LOCAL

  if (TOKEN) headers['Authorization'] = `Bearer ${TOKEN}`
  if (appToken) headers['app-token'] = appToken
  if (!isFormData) headers['Content-Type'] = 'application/json'

  const newOptions = {
    ...options,
    headers: { ...headers, ...(options?.headers || {}) },
  }

  const url = `${urlBase}${path}`
  return fetch(url, newOptions)
}
