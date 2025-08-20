import { ProcedureRequestPage } from '@/modules/portal'
import { fetchProcedureTypeList, fetchDocumentTypeList } from '@/api/app'

export default async function Page() {
  const [procedureTypes, documentTypes] = await Promise.all([
    fetchProcedureTypeList(),
    fetchDocumentTypeList(),
  ])

  return (
    <>
      <ProcedureRequestPage
        procedureTypes={procedureTypes.data || []}
        documentTypes={documentTypes.data || []}
      />
    </>
  )
}
