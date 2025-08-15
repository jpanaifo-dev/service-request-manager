import { ForgotPassword } from '@/components/app/forgot-password'
import { AUTH_METADATA } from '@/data/auth.meta'
import { Metadata } from 'next'
export const metadata: Metadata = AUTH_METADATA.PAGES.FORGOT_PASSWORD

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

export default async function Page(props: { searchParams: SearchParams }) {
  const searchParams = await props.searchParams

  const { email } = searchParams

  return <ForgotPassword email={email as string} />
}
