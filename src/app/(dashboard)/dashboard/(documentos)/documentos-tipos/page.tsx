import { fetchProcedureTypeList } from '@/api/app/procedure-type'
import { ProcedureTypeTable } from '@/modules/dashboard'

export default async function Page() {
  const response = await fetchProcedureTypeList()
  return (
    <div>
      <ProcedureTypeTable data={response.data || []} />
    </div>
  )
}
