/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { obtenerColorEstado } from '@/lib/data'
import {
  Search,
  FileText,
  Calendar,
  AlertCircle,
  Copy,
  CheckCircle,
  Loader2,
  User,
  Mail,
  Phone,
  MapPin,
} from 'lucide-react'
import { fetchProceduresList, fetchProcedureTrackingList } from '@/api/app'
import { ProcedureData, ProcedureTrackingDetail } from '@/types'

export const QueryPage = () => {
  const searchParams = useSearchParams()
  const [codigo, setCodigo] = useState('')
  const [solicitud, setSolicitud] = useState<ProcedureData | null>(null)
  const [tracking, setTracking] = useState<ProcedureTrackingDetail[]>([])
  const [loading, setLoading] = useState(false)
  const [loadingTracking, setLoadingTracking] = useState(false)
  const [error, setError] = useState('')
  const [errorTracking, setErrorTracking] = useState('')
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const codigoParam = searchParams.get('codigo')
    if (codigoParam) {
      setCodigo(codigoParam)
      buscarSolicitud(codigoParam)
    }
  }, [])

  const buscarSolicitud = async (cod?: string) => {
    const codigoBuscar = cod || codigo
    if (!codigoBuscar) {
      setError('Por favor ingresa un código de procedimiento')
      return
    }

    setLoading(true)
    setError('')
    setSolicitud(null)
    setTracking([])

    try {
      const response = await fetchProceduresList({
        code: codigoBuscar,
      })

      if (response && response.data && response.data.results.length > 0) {
        setSolicitud(response.data.results[0])
        await obtenerTracking(response.data.results[0].id)
      } else {
        setError('No se encontró ninguna solicitud con este código')
      }
    } catch {
      setError('Error al buscar la solicitud. Intenta nuevamente.')
    } finally {
      setLoading(false)
    }
  }

  const obtenerTracking = async (solicitudId: number) => {
    setLoadingTracking(true)
    setErrorTracking('')

    try {
      const response = await fetchProcedureTrackingList({
        procedure_id: solicitudId,
      })

      if (response && response.data && response.data.results.length > 0) {
        setTracking(response.data.results)
      } else {
        setErrorTracking(
          'No se encontró información de tracking para esta solicitud'
        )
      }
    } catch {
      setErrorTracking('Error al obtener el tracking. Intenta nuevamente.')
    } finally {
      setLoadingTracking(false)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const formatearFecha = (fecha: string) => {
    return new Date(fecha).toLocaleDateString('es-CO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const formatearFechaHora = (fecha: string) => {
    return new Date(fecha).toLocaleString('es-CO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto py-12 px-4">
        <div className="text-center mb-12">
          <h1 className="text-2xl font-semibold text-gray-900 mb-3">
            Consultar Solicitud
          </h1>
          <p className="text-gray-600 text-sm">
            Ingresa tu código de procedimiento para consultar el estado
          </p>
        </div>

        <Card className="mb-8 border-gray-100 shadow-sm">
          <CardContent className="pt-6">
            <div className="max-w-md mx-auto">
              <Label
                htmlFor="codigo"
                className="text-sm font-medium text-gray-700"
              >
                Código de Procedimiento
              </Label>
              <div className="mt-2 flex gap-3">
                <Input
                  id="codigo"
                  value={codigo}
                  onChange={(e) => setCodigo(e.target.value)}
                  placeholder="Ej: PROC-2024-001"
                  className="flex-1"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      buscarSolicitud()
                    }
                  }}
                />
                <Button
                  onClick={() => buscarSolicitud()}
                  disabled={loading}
                  className="px-6"
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Search className="w-4 h-4" />
                  )}
                </Button>
              </div>

              <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-500 mb-2">Códigos de prueba:</p>
                <div className="flex flex-wrap gap-2">
                  {['PROC-001', 'PROC-002', 'PROC-003'].map((testCode) => (
                    <button
                      key={testCode}
                      onClick={() => setCodigo(testCode)}
                      className="text-xs px-2 py-1 bg-white border border-gray-200 rounded hover:bg-gray-50 transition-colors"
                    >
                      {testCode}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {error && (
          <Alert
            variant="destructive"
            className="mb-6 max-w-md mx-auto"
          >
            <AlertCircle className="w-4 h-4" />
            <AlertDescription className="text-sm">{error}</AlertDescription>
          </Alert>
        )}

        {solicitud && (
          <div className="max-w-2xl mx-auto">
            <Card className="border-gray-100 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">
                      {solicitud.procedure_type?.name || 'Tipo no especificado'}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <FileText className="w-3 h-3" />
                        {solicitud.code}
                      </span>
                      <button
                        onClick={() => copyToClipboard(solicitud.code)}
                        className="flex items-center gap-1 hover:text-gray-700 transition-colors"
                      >
                        {copied ? (
                          <CheckCircle className="w-3 h-3 text-green-500" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                      </button>
                    </div>
                  </div>
                  <Badge className={obtenerColorEstado('pendiente')}>
                    {solicitud.is_active ? 'Activo' : 'Inactivo'}
                  </Badge>
                </div>

                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {solicitud.description || 'Sin descripción'}
                </p>

                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {formatearFecha(solicitud.created_at)}
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card className="mt-6 border-gray-100">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">
                  Detalles de la Solicitud
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Código:</span>
                    <p className="font-mono">{solicitud.code}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Estado:</span>
                    <div className="mt-1">
                      <Badge className={obtenerColorEstado('pendiente')}>
                        {solicitud.is_active ? 'Activo' : 'Inactivo'}
                      </Badge>
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-500">Tipo:</span>
                    <p className="mt-1">
                      {solicitud.procedure_type?.name || 'No especificado'}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-500">Creado:</span>
                    <p className="mt-1">
                      {formatearFecha(solicitud.created_at)}
                    </p>
                  </div>
                </div>

                {solicitud.description && (
                  <div>
                    <span className="text-gray-500 text-sm">Descripción:</span>
                    <p className="text-sm mt-1">{solicitud.description}</p>
                  </div>
                )}

                {solicitud.person && (
                  <div className="pt-4 border-t">
                    <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Información del solicitante
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Nombre:</span>
                        <p className="mt-1">
                          {solicitud.person.names} {solicitud.person.last_name1}{' '}
                          {solicitud.person.last_name2}
                        </p>
                      </div>
                      <div>
                        <span className="text-gray-500">Documento:</span>
                        <p className="mt-1">
                          {solicitud.person.document_number ||
                            'No especificado'}
                        </p>
                      </div>
                      {solicitud.person.email && (
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-gray-400" />
                          <span>{solicitud.person.email}</span>
                        </div>
                      )}
                      {solicitud.person.cellphone && (
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-gray-400" />
                          <span>{solicitud.person.cellphone}</span>
                        </div>
                      )}
                      {solicitud.person.address && (
                        <div className="flex items-center gap-2 md:col-span-2">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          <span className="text-sm">
                            {solicitud.person.address}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                <div className="pt-4 border-t">
                  <h4 className="font-medium text-gray-900 mb-3">
                    Historial de Tracking
                  </h4>

                  {loadingTracking ? (
                    <div className="flex justify-center py-4">
                      <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
                    </div>
                  ) : errorTracking ? (
                    <Alert variant="destructive">
                      <AlertCircle className="w-4 h-4" />
                      <AlertDescription className="text-sm">
                        {errorTracking}
                      </AlertDescription>
                    </Alert>
                  ) : tracking.length === 0 ? (
                    <p className="text-sm text-gray-500 text-center py-4">
                      No hay información de tracking disponible
                    </p>
                  ) : (
                    <div className="space-y-4">
                      {tracking.map((track, index) => (
                        <div
                          key={track.id}
                          className="flex gap-4"
                        >
                          <div className="flex flex-col items-center">
                            <div
                              className={`w-3 h-3 rounded-full ${
                                index === 0 ? 'bg-blue-500' : 'bg-gray-300'
                              }`}
                            />
                            {index < tracking.length - 1 && (
                              <div className="w-0.5 h-12 bg-gray-300 mt-1" />
                            )}
                          </div>
                          <div className="flex-1 pb-4">
                            <div className="flex justify-between items-start">
                              <div>
                                <p className="font-medium text-sm">
                                  {track.status?.name ||
                                    'Estado no especificado'}
                                </p>
                                <p className="text-xs text-gray-500 mt-1">
                                  {track.created_at
                                    ? formatearFechaHora(track.created_at)
                                    : 'Fecha no disponible'}
                                </p>
                              </div>
                              {track.status?.color && (
                                <Badge
                                  className="text-xs"
                                  style={{
                                    backgroundColor: track.status.color,
                                  }}
                                >
                                  {track.status.name}
                                </Badge>
                              )}
                            </div>

                            <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-gray-600">
                              {track.from_office && (
                                <div>
                                  <span className="font-medium">Desde:</span>{' '}
                                  {track.from_office.name}
                                </div>
                              )}
                              {track.to_office && (
                                <div>
                                  <span className="font-medium">Hacia:</span>{' '}
                                  {track.to_office.name}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
