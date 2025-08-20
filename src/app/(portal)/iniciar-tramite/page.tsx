import { ProcedureRequestPage } from '@/modules/portal'
import { fetchProcedureTypeList } from '@/api/app'

export default async function Page() {
  const [procedureTypes] = await Promise.all([fetchProcedureTypeList()])

  return (
    <>
      <ProcedureRequestPage procedureTypes={procedureTypes.data || []} />
    </>
  )
}
