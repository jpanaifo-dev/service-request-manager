'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Alert, AlertDescription } from '@/components/ui/alert'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  ArrowLeft,
  FileText,
  Edit,
  CheckCircle,
  XCircle,
  Save,
  Clock,
  User,
  Building,
  Calendar,
} from 'lucide-react'
import Link from 'next/link'
import { APP_URL } from '@/data/constants'
import {
  ProcedureData,
  ProcedureTrackingDetail,
  ProcedureStatus,
  IOffices,
} from '@/types'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { TrackingFormData, trackingSchema } from '@/schemas/procedureTracking'
import { createProcedureTracking } from '@/api/app'

// Constantes para textos en español
const TEXTS = {
  LOADING: 'Cargando información del trámite...',
  BACK_TO_DETAILS: 'Volver a Detalles',
  MANAGE_PROCEDURE: 'Gestionar Trámite',
  PROCEDURE_INFO: 'Información del Trámite',
  APPLICANT: 'Solicitante',
  PROCEDURE_TYPE: 'Tipo de Trámite',
  CREATION_DATE: 'Fecha de Creación',
  CURRENT_OFFICE: 'Oficina Actual',
  DESCRIPTION: 'Descripción',
  ACTION_TO_PERFORM: 'Acción a Realizar',
  ACTION_DESCRIPTION:
    'Selecciona y completa la acción que deseas realizar sobre este trámite',
  TO_OFFICE: 'A Oficina',
  SELECT_OFFICE: 'Selecciona una oficina',
  STATUS: 'Estado',
  SELECT_STATUS: 'Selecciona un estado',
  OBSERVATIONS: 'Observaciones',
  OBSERVATIONS_PLACEHOLDER: 'Agrega tus observaciones aquí...',
  CANCEL: 'Cancelar',
  SAVE_ACTION: 'Guardar Acción',
  PROCESSING: 'Procesando...',
  PROCEDURE_HISTORY: 'Historial del Trámite',
  HISTORY_DESCRIPTION: 'Seguimiento de todos los movimientos realizados',
  NO_HISTORY: 'No hay historial disponible para este trámite',
  CONFIRM_ACTION: 'Confirmar Acción',
  CONFIRM_DESCRIPTION:
    '¿Estás seguro de que deseas realizar esta acción? Esto actualizará el estado del trámite y el historial de seguimiento.',
  SUCCESS_MESSAGE: 'Acción completada exitosamente',
  ERROR_MESSAGE: 'Error al ejecutar la acción',
} as const

interface PageProps {
  procedureDetails: ProcedureData | undefined
  procedureTracking?: ProcedureTrackingDetail[] | null
  offices: IOffices[]
  statuses: ProcedureStatus[]
}

export const ProcedureActionsPage = (props: PageProps) => {
  const { procedureDetails, procedureTracking, offices, statuses } = props
  const params = useParams()
  const router = useRouter()

  const procedureId = params.id as string

  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<{
    type: 'success' | 'error'
    text: string
  } | null>(null)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [formData, setFormData] = useState<TrackingFormData | null>(null)

  // Form for actions
  const form = useForm<TrackingFormData>({
    resolver: zodResolver(trackingSchema),
    defaultValues: {
      to_office: undefined,
      status: undefined,
      observations: '',
    },
  })

  const isDirty = form.formState.isDirty

  if (!procedureDetails) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">{TEXTS.LOADING}</p>
        </div>
      </div>
    )
  }

  // Function to execute the selected action
  const executeAction = async (data: TrackingFormData) => {
    setIsLoading(true)
    try {
      // Here would be the API call to execute the action
      const response = await createProcedureTracking({
        formData: { ...data, procedure: Number(procedureId) },
      })

      if (response.data) {
        setMessage({
          type: 'success',
          text: TEXTS.SUCCESS_MESSAGE,
        })
        setTimeout(() => {
          router.push(`${APP_URL.DASHBOARD.SOLICITUDES.BASE}/${procedureId}`)
        }, 1500)
      } else {
        throw new Error('Error executing action')
      }
    } catch {
      setMessage({ type: 'error', text: TEXTS.ERROR_MESSAGE })
    } finally {
      setIsLoading(false)
      setShowConfirmation(false)
    }
  }

  const onSubmit = (data: TrackingFormData) => {
    setFormData(data)
    setShowConfirmation(true)
  }

  const handleConfirm = () => {
    if (formData) {
      executeAction(formData)
    }
  }

  // Get current status
  const currentStatus = procedureTracking?.find((t) => t.is_current)?.status

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-blue-600 text-white py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Link
                href={`${APP_URL.DASHBOARD.SOLICITUDES.BASE}/${procedureId}`}
              >
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-blue-700"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  {TEXTS.BACK_TO_DETAILS}
                </Button>
              </Link>
              <Edit className="w-6 h-6" />
              <h1 className="text-xl font-semibold">
                {TEXTS.MANAGE_PROCEDURE}
              </h1>
            </div>
            <div className="flex items-center space-x-2">
              {currentStatus && (
                <Badge
                  variant="outline"
                  className="rounded-full text-sm px-3 py-1 font-medium"
                >
                  {currentStatus.name}
                </Badge>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column: Procedure information */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <Card className="pt-0">
              <CardHeader className="bg-blue-50">
                <CardTitle className="flex items-center space-x-2 text-blue-800 py-4">
                  <FileText className="w-5 h-5" />
                  <span>{TEXTS.PROCEDURE_INFO}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4 text-gray-500" />
                      <p className="text-sm font-medium text-gray-500">
                        {TEXTS.APPLICANT}
                      </p>
                    </div>
                    <p className="text-lg font-semibold">
                      {procedureDetails.person.last_name1}{' '}
                      {procedureDetails.person.last_name2}{' '}
                      {procedureDetails.person.names}{' '}
                    </p>
                    <p className="text-sm text-gray-600">
                      N° Doc: {procedureDetails.person.document_number}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <FileText className="w-4 h-4 text-gray-500" />
                      <p className="text-sm font-medium text-gray-500">
                        {TEXTS.PROCEDURE_TYPE}
                      </p>
                    </div>
                    <p className="text-lg font-semibold">
                      {procedureDetails.procedure_type.name}
                    </p>
                    <p className="text-sm text-gray-600">
                      {procedureDetails.procedure_type.description}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <p className="text-sm font-medium text-gray-500">
                        {TEXTS.CREATION_DATE}
                      </p>
                    </div>
                    <p className="text-lg font-semibold">
                      {new Date(procedureDetails.created_at).toLocaleDateString(
                        'es-ES',
                        {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        }
                      )}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Building className="w-4 h-4 text-gray-500" />
                      <p className="text-sm font-medium text-gray-500">
                        {TEXTS.CURRENT_OFFICE}
                      </p>
                    </div>
                    <p className="text-lg font-semibold">
                      {procedureTracking?.find((t) => t.is_current)?.to_office
                        ?.name || 'No Asignada'}
                    </p>
                  </div>
                </div>

                {procedureDetails.description && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <p className="text-sm font-semibold text-gray-500 mb-1">
                      {TEXTS.DESCRIPTION}
                    </p>
                    <p className="text-gray-700">
                      {procedureDetails.description}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Action Form */}
            <Card>
              <CardHeader>
                <CardTitle>{TEXTS.ACTION_TO_PERFORM}</CardTitle>
                <CardDescription>{TEXTS.ACTION_DESCRIPTION}</CardDescription>
              </CardHeader>
              <CardContent>
                {/* Status Message */}
                {message && (
                  <Alert
                    className={
                      message.type === 'success'
                        ? 'border-green-200 bg-green-50 text-green-800 mb-6'
                        : 'border-red-200 bg-red-50 text-red-800 mb-6'
                    }
                  >
                    {message.type === 'success' ? (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-600" />
                    )}
                    <AlertDescription>{message.text}</AlertDescription>
                  </Alert>
                )}

                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
                    <div className="space-y-4">
                      {/* To Office Select */}
                      <FormField
                        control={form.control}
                        name="to_office"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{TEXTS.TO_OFFICE}</FormLabel>
                            <Select
                              onValueChange={(value) =>
                                field.onChange(parseInt(value))
                              }
                              value={field.value?.toString()}
                            >
                              <FormControl>
                                <SelectTrigger className="w-full">
                                  <SelectValue
                                    placeholder={TEXTS.SELECT_OFFICE}
                                  />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {offices.map((office) => (
                                  <SelectItem
                                    key={office.id}
                                    value={office.id.toString()}
                                  >
                                    {office.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Status Select */}
                      <FormField
                        control={form.control}
                        name="status"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{TEXTS.STATUS}</FormLabel>
                            <Select
                              onValueChange={(value) =>
                                field.onChange(parseInt(value))
                              }
                              value={field.value?.toString()}
                            >
                              <FormControl>
                                <SelectTrigger className="w-full">
                                  <SelectValue
                                    placeholder={TEXTS.SELECT_STATUS}
                                  />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {statuses.map((status) => (
                                  <SelectItem
                                    key={status.id}
                                    value={status.id.toString()}
                                  >
                                    {status.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Observations Textarea */}
                      <FormField
                        control={form.control}
                        name="observations"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{TEXTS.OBSERVATIONS}</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder={TEXTS.OBSERVATIONS_PLACEHOLDER}
                                className="resize-none"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="flex justify-end space-x-2 pt-4">
                        <Link
                          href={`${APP_URL.DASHBOARD.SOLICITUDES.BASE}/${procedureId}`}
                        >
                          <Button
                            variant="outline"
                            type="button"
                          >
                            {TEXTS.CANCEL}
                          </Button>
                        </Link>
                        <Button
                          type="submit"
                          disabled={isLoading || !isDirty}
                        >
                          {isLoading ? (
                            <>{TEXTS.PROCESSING}</>
                          ) : (
                            <>
                              <Save className="w-4 h-4 mr-2" />
                              {TEXTS.SAVE_ACTION}
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>

          {/* Right column: Tracking History */}
          <div className="space-y-6">
            <Card>
              <CardHeader className="bg-gray-50">
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="w-5 h-5" />
                  <span>{TEXTS.PROCEDURE_HISTORY}</span>
                </CardTitle>
                <CardDescription>{TEXTS.HISTORY_DESCRIPTION}</CardDescription>
              </CardHeader>
              <CardContent>
                {procedureTracking && procedureTracking.length > 0 ? (
                  <div className="space-y-4">
                    {procedureTracking.map((tracking, index) => (
                      <div
                        key={tracking.id}
                        className="flex"
                      >
                        <div className="flex flex-col items-center mr-4">
                          <div
                            className={`w-3 h-3 rounded-full ${
                              tracking.is_current
                                ? 'bg-blue-500'
                                : 'bg-gray-300'
                            }`}
                          ></div>
                          {index < procedureTracking.length - 1 && (
                            <div className="w-0.5 h-16 bg-gray-300 my-1"></div>
                          )}
                        </div>
                        <div className="flex-1 pb-4">
                          <div className="flex flex-wrap items-center gap-2 mb-1">
                            <Badge variant="outline">
                              {tracking.status.name}
                            </Badge>
                            <span className="text-sm text-gray-500">
                              {new Date(tracking.created_at).toLocaleDateString(
                                'es-ES'
                              )}
                            </span>
                          </div>
                          <p className="text-sm text-gray-700 mb-1">
                            {tracking.from_office
                              ? `De: ${tracking.from_office.name}`
                              : 'Origen inicial'}
                            {tracking.to_office &&
                              ` → A: ${tracking.to_office.name}`}
                          </p>
                          {tracking.observations && (
                            <p className="text-sm text-gray-600 bg-gray-50 p-2 rounded-md">
                              {tracking.observations}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6 text-gray-500">
                    <Clock className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p>{TEXTS.NO_HISTORY}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Confirmation Dialog */}
      <Dialog
        open={showConfirmation}
        onOpenChange={setShowConfirmation}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader className="space-y-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-50 mx-auto">
              <CheckCircle className="w-6 h-6 text-blue-600" />
            </div>
            <div className="text-center space-y-2">
              <DialogTitle className="text-lg font-semibold text-gray-900">
                {TEXTS.CONFIRM_ACTION}
              </DialogTitle>
              <DialogDescription className="text-sm text-gray-600">
                {TEXTS.CONFIRM_DESCRIPTION}
              </DialogDescription>
            </div>
          </DialogHeader>

          {formData && (
            <div className="space-y-3 p-4 bg-gray-50 rounded-lg border">
              {formData.to_office && (
                <div className="flex items-start space-x-2">
                  <Building className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-700">
                      {TEXTS.TO_OFFICE}
                    </p>
                    <p className="text-sm text-gray-900">
                      {offices.find((o) => o.id === formData.to_office)?.name}
                    </p>
                  </div>
                </div>
              )}

              {formData.status && (
                <div className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-700">
                      {TEXTS.STATUS}
                    </p>
                    <p className="text-sm text-gray-900">
                      {statuses.find((s) => s.id === formData.status)?.name}
                    </p>
                  </div>
                </div>
              )}

              {formData.observations && (
                <div className="flex items-start space-x-2">
                  <FileText className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-700">
                      {TEXTS.OBSERVATIONS}
                    </p>
                    <p className="text-sm text-gray-900">
                      {formData.observations}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-0">
            <Button
              variant="outline"
              onClick={() => setShowConfirmation(false)}
              className="w-full sm:w-auto order-2 sm:order-1"
            >
              {TEXTS.CANCEL}
            </Button>
            <Button
              onClick={handleConfirm}
              disabled={isLoading}
              className="w-full sm:w-auto order-1 sm:order-2"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  {TEXTS.PROCESSING}
                </div>
              ) : (
                'Confirmar'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
