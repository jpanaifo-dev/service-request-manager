import { fetchPersonList } from '@/api/app'
import { PersonListPage } from '@/modules/dashboard'
import { SearchParams } from '@/types'

interface Props {
  searchParams?: SearchParams
}

export default async function Page(props: Props) {
  const searchParams = await props.searchParams
  const response = await fetchPersonList({
    last_name1__icontains: searchParams?.search?.toString() || undefined,
  })

  return (
    <>
      <PersonListPage persons={response.data?.results} />
    </>
  )
}
