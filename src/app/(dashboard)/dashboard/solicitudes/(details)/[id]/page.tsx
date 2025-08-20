import { ProcedureDetailsPage } from '@/modules/dashboard'
import { fetchProceduresList } from '@/api/app/procedure'
import { Card, CardContent } from '@/components/ui/card'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { APP_URL } from '@/data/constants'
import { fetchProcedureTrackingList } from '@/api/app'

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

  return (
    <>
      <ProcedureDetailsPage
        procedureDetails={procedure}
        procedureTracking={procedureTracking.data?.results || []}
      />
    </>
  )
}
