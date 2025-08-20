import {
  fetchProcedureTrackingList,
  fetchOfficesList,
  fetchProcedureStatusList,
} from '@/api/app'
import { fetchProceduresList } from '@/api/app/procedure'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { APP_URL } from '@/data/constants'
import { ProcedureActionsPage } from '@/modules/dashboard'
import { Link } from 'lucide-react'
interface PageProps {
  params: {
    id: string
  }
}

export default async function Page(props: PageProps) {
  const params = await props.params
  const procedureId = params.id

  // Fetch procedure details using the provided ID
  const procedureDetails = await fetchProceduresList({
    id: Number(procedureId),
  })

  // If the procedure is not found, you can handle it here (e.g., redirect or show a 404 page)
  if (!procedureDetails) {
    // Handle not found case, e.g., redirect or show a 404 page
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto py-8 px-4">
          <Card>
            <CardContent className="py-8 text-center">
              <p className="text-gray-500">Solicitud no encontrada</p>
              <Link href={APP_URL.DASHBOARD.SOLICITUDES.BASE}>
                <Button className="mt-4">Volver a Solicitudes</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  const procedureTracking = await fetchProcedureTrackingList({
    procedure_id: Number(procedureId),
  })

  const procedure = procedureDetails.data?.results[0]

  const [offices, procedureStatus] = await Promise.all([
    fetchOfficesList(),
    fetchProcedureStatusList(),
  ])

  return (
    <>
      <ProcedureActionsPage
        procedureDetails={procedure}
        procedureTracking={procedureTracking.data?.results || []}
        offices={offices.data || []}
        statuses={procedureStatus.data || []}
      />
    </>
  )
}
