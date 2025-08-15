'use server'

import { cookies } from 'next/headers'
import { decrypt } from '@/lib/session'
import { IUserAuth } from '@/types'

export async function buildHeaders(): Promise<Record<string, string>> {
  const cookie = (await cookies()).get(`${process.env.APP_NAME}_session`)?.value
  const session = await decrypt(cookie)
  const userData: IUserAuth = (await session?.data) as unknown as IUserAuth
  const token = userData?.access_token
  // const uuid_user = userData?.user_token

  const headers: Record<string, string> = {}

  if (token) headers['Authorization'] = `Bearer ${token}`
  // if (uuid_user) headers['user-token'] = uuid_user

  return headers
}
