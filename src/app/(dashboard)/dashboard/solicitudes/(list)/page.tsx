import { fetchProceduresList } from '@/api/app/procedure'
import { ProcedureListPage } from '@/modules/dashboard/pages/procedure-list-page'

export default async function Page() {
  const response = await fetchProceduresList()
  return (
    <>
      <ProcedureListPage data={response.data?.results || []} />
    </>
  )
}
