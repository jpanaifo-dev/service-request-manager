import { OfficesPage } from '@/modules/dashboard/pages'
import { fetchOfficesList } from '@/api/app'

export default async function Page() {
  const response = await fetchOfficesList()

  return (
    <>
      <OfficesPage officesList={response.data} />
    </>
  )
}
