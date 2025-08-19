import { fetchProcedureStatusList } from '@/api/app'
import { ProcedureStatusTable } from '@/modules/dashboard'

export default async function Page() {
  const response = await fetchProcedureStatusList()
  return (
    <div>
      <ProcedureStatusTable data={response.data || []} />
    </div>
  )
}
