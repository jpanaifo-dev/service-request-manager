import { fetchPersonList } from '@/api/app'
import { PersonListPage } from '@/modules/dashboard'

export default async function Page() {
  const response = await fetchPersonList()

  return (
    <>
      <PersonListPage persons={response.data?.results} />
    </>
  )
}
