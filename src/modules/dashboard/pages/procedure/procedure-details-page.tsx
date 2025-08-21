'use client'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import {
  ArrowLeft,
  User,
  FileText,
  Clock,
  Edit,
  Send,
  Download,
  CheckCircle,
  XCircle,
  AlertCircle,
  Eye,
} from 'lucide-react'
import Link from 'next/link'
import type { ProcedureData } from '@/types'
import type { ProcedureTrackingDetail } from '@/types/procedureTracking'
import { APP_URL } from '@/data/constants'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'

interface PageProps {
  procedureDetails: ProcedureData | undefined
  procedureTracking?: ProcedureTrackingDetail[] | null
}

export const ProcedureDetailsPage = (props: PageProps) => {
  const { procedureDetails, procedureTracking } = props
  console.log('ProcedureDetailsPage', procedureDetails, procedureTracking)

  if (!procedureDetails) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-600">
            Procedimiento no encontrado
          </h2>
          <p className="text-gray-500 mt-2">
            El procedimiento solicitado no existe o no está disponible.
          </p>
          <Link href={APP_URL.DASHBOARD.SOLICITUDES.BASE}>
            <Button className="mt-4 Hover:bg-blue-700 text-white">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver a Solicitudes
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  const getStatusColor = (isActive: boolean) => {
    return isActive
      ? 'bg-green-100 text-green-800 border-green-200'
      : 'bg-red-100 text-red-800 border-red-200'
  }

  const getTrackingIcon = (statusName: string) => {
    const status = statusName.toLowerCase()
    if (status.includes('aprobado') || status.includes('completado')) {
      return <CheckCircle className="w-4 h-4 text-green-500" />
    } else if (status.includes('rechazado') || status.includes('cancelado')) {
      return <XCircle className="w-4 h-4 text-red-500" />
    } else if (status.includes('derivado') || status.includes('enviado')) {
      return <Send className="w-4 h-4 text-purple-500" />
    } else if (status.includes('proceso') || status.includes('revision')) {
      return <Edit className="w-4 h-4 text-yellow-500" />
    } else {
      return <AlertCircle className="w-4 h-4 text-gray-500" />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-blue-600 text-white py-4 rounded-t-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Link href={APP_URL.DASHBOARD.SOLICITUDES.BASE}>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-blue-600 hover:text-white"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Volver a Solicitudes
                </Button>
              </Link>
              <FileText className="w-6 h-6" />
              <h1 className="text-xl font-semibold">
                Detalle de Procedimiento {procedureDetails.code}
              </h1>
            </div>
            <div className="flex space-x-2">
              <Link
                href={APP_URL.DASHBOARD.SOLICITUDES.ACTIONS(
                  procedureDetails.id.toString()
                )}
              >
                <Button
                  variant="secondary"
                  size="sm"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Gestionar
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Información Principal */}
          <div className="lg:col-span-2 space-y-6">
            {/* Estado y Información Básica */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <FileText className="w-5 h-5" />
                    <span>Información del Procedimiento</span>
                  </CardTitle>
                  <Badge
                    className={`${getStatusColor(
                      procedureDetails.is_active
                    )} text-sm px-3 py-1 rounded-full`}
                  >
                    {procedureDetails.is_active ? 'Activo' : 'Inactivo'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Código de Procedimiento
                    </p>
                    <p className="text-lg font-semibold">
                      {procedureDetails.code}
                    </p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-sm font-medium text-gray-500">
                      Tipo de trámite
                    </p>
                    <p className="text-lg">
                      {procedureDetails.procedure_type.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {procedureDetails.procedure_type.description}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Fecha de Creación
                    </p>
                    <p className="text-lg">
                      {format(
                        new Date(procedureDetails.created_at),
                        'dd/MM/yyyy HH:mm',
                        { locale: es }
                      )}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Última Actualización
                    </p>
                    <p className="text-lg">
                      {procedureDetails.updated_at
                        ? format(
                            new Date(procedureDetails.updated_at),
                            'dd/MM/yyyy HH:mm',
                            { locale: es }
                          )
                        : 'No disponible'}
                    </p>
                  </div>
                </div>

                <Separator />

                <div>
                  <p className="text-sm font-medium text-gray-500 mb-2">
                    Descripción
                  </p>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 border-dashed">
                    <p className="text-gray-700 italic">
                      {procedureDetails.description}
                    </p>
                  </div>
                </div>

                {procedureDetails.file && (
                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-2">
                      Archivo Adjunto
                    </p>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <FileText className="w-4 h-4 text-gray-500" />
                        <span className="text-sm">{procedureDetails.file}</span>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                      >
                        <Download className="w-3 h-3 mr-1" />
                        Descargar
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Tracking e Historial */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center space-x-2 text-base font-semibold">
                  <Clock className="w-5 h-5 text-gray-600" />
                  <span>Historial y Tracking</span>
                </CardTitle>
                <CardDescription className="text-sm text-gray-600">
                  Seguimiento completo de todos los cambios y acciones
                  realizadas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {procedureTracking && procedureTracking?.length > 0 ? (
                    procedureTracking?.map((tracking, index) => {
                      const isCurrent = tracking.is_current
                      return (
                        <div
                          key={tracking.id}
                          className={`flex space-x-4 p-3 rounded-lg border ${
                            isCurrent
                              ? 'bg-green-50 border-green-200'
                              : 'bg-white border-gray-200'
                          }`}
                        >
                          <div className="flex flex-col items-center">
                            <div
                              className={`flex items-center justify-center w-8 h-8 rounded-full ${
                                isCurrent ? 'bg-green-100' : 'bg-gray-100'
                              }`}
                            >
                              {getTrackingIcon(tracking.status.name)}
                            </div>
                            {index < procedureTracking.length - 1 && (
                              <div
                                className={`w-px h-12 mt-2 ${
                                  isCurrent ? 'bg-blue-200' : 'bg-gray-200'
                                }`}
                              ></div>
                            )}
                          </div>

                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center space-x-2">
                                <Badge
                                  variant="outline"
                                  className={`text-xs font-medium ${
                                    isCurrent
                                      ? 'bg-blue-100 text-blue-800 border-blue-200'
                                      : 'bg-gray-100 text-gray-700 border-gray-200'
                                  }`}
                                >
                                  {tracking.status.name}
                                </Badge>
                                {isCurrent && (
                                  <span className="text-xs text-blue-600 font-medium">
                                    Actual
                                  </span>
                                )}
                              </div>
                              <span className="text-xs text-gray-500">
                                {format(
                                  new Date(tracking.created_at),
                                  'dd/MM/yyyy HH:mm',
                                  { locale: es }
                                )}
                              </span>
                            </div>

                            <div className="space-y-1 text-sm">
                              <div className="flex items-center space-x-1 text-gray-700">
                                <span className="text-gray-500">•</span>
                                <span className="font-medium">De:</span>
                                <span>
                                  {tracking?.from_office?.name || 'Externo'}
                                </span>
                              </div>
                              <div className="flex items-center space-x-1 text-gray-700">
                                <span className="text-gray-500">•</span>
                                <span className="font-medium">Para:</span>
                                <span>{tracking?.to_office?.name}</span>
                              </div>
                              {tracking.observations && (
                                <div className="mt-2 p-2 bg-gray-50 rounded-md border border-gray-200">
                                  <p className="text-xs text-gray-600">
                                    <span className="font-medium">
                                      Observaciones:
                                    </span>{' '}
                                    {tracking.observations}
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      )
                    })
                  ) : (
                    <div className="text-center py-6 text-gray-500">
                      <Clock className="w-8 h-8 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">
                        No hay historial de tracking disponible
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Información del Solicitante */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="w-5 h-5" />
                  <span>Información del Solicitante</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Nombre Completo
                  </p>
                  <p className="text-lg font-semibold">
                    {procedureDetails.person.names}{' '}
                    {procedureDetails.person.last_name1}{' '}
                    {procedureDetails.person.last_name2}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Documento</p>
                  <p className="text-lg">
                    {procedureDetails.person.document_number}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Email</p>
                  <p className="text-lg">{procedureDetails.person.email}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Teléfono</p>
                  <p className="text-lg">{procedureDetails.person.cellphone}</p>
                </div>
                {procedureDetails.person.address && (
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Dirección
                    </p>
                    <p className="text-lg">{procedureDetails.person.address}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Acciones Rápidas */}
            <Card>
              <CardHeader>
                <CardTitle>Acciones Rápidas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link
                  href={`/dashboard/solicitudes/${procedureDetails.id}/acciones`}
                >
                  <Button
                    className="w-full"
                    variant="default"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Gestionar Estado
                  </Button>
                </Link>
                <Link
                  href={`/dashboard/solicitudes/${procedureDetails.id}/acciones?tab=derivar`}
                >
                  <Button
                    className="w-full bg-transparent"
                    variant="outline"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Derivar Procedimiento
                  </Button>
                </Link>
                <Button
                  className="w-full bg-transparent"
                  variant="outline"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  Ver en Portal Ciudadano
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
