import { ProcedureRequestPage } from '@/modules/portal'
import { fetchProcedureTypeList, fetchOfficesList } from '@/api/app'

export default async function Page() {
  const [offices, procedureTypes] = await Promise.all([
    fetchOfficesList(),
    fetchProcedureTypeList(),
  ])

  return (
    <>
      <ProcedureRequestPage
        offices={offices.data || []}
        procedureTypes={procedureTypes.data || []}
      />
    </>
  )
}
