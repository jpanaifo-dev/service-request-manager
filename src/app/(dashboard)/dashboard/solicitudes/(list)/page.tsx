import { fetchProceduresList } from '@/api/app/procedure'
import { ProcedureListPage } from '@/modules/dashboard'
import { SearchParams } from '@/types'

interface IProps {
  searchParams: SearchParams
}

export default async function Page(props: IProps) {
  const searchParams = await props.searchParams
  const response = await fetchProceduresList({
    code__icontains: searchParams.search?.toString() || undefined,
  })
  return (
    <>
      <ProcedureListPage data={response.data?.results || []} />
    </>
  )
}
