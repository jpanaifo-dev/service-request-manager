/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import {
  buscarSolicitudesPorUsuario,
  obtenerColorEstado,
  type Solicitud,
} from '@/lib/data'
import {
  Search,
  FileText,
  Calendar,
  Eye,
  AlertCircle,
  Info,
  HelpCircle,
} from 'lucide-react'

export const QueryPage = () => {
  const searchParams = useSearchParams()
  const [documento, setDocumento] = useState('')
  const [solicitudes, setSolicitudes] = useState<Solicitud[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [solicitudSeleccionada, setSolicitudSeleccionada] =
    useState<Solicitud | null>(null)

  useEffect(() => {
    const docParam = searchParams.get('documento')
    if (docParam) {
      setDocumento(docParam)
      buscarSolicitudes(docParam)
    }
  }, [])

  const buscarSolicitudes = async (doc?: string) => {
    const documentoBuscar = doc || documento
    if (!documentoBuscar) {
      setError('Por favor ingresa un número de documento')
      return
    }

    setLoading(true)
    setError('')

    // Simular delay de búsqueda
    setTimeout(() => {
      const solicitudesEncontradas =
        buscarSolicitudesPorUsuario(documentoBuscar)

      if (solicitudesEncontradas.length === 0) {
        setError('No se encontraron solicitudes para este documento')
        setSolicitudes([])
      } else {
        setSolicitudes(solicitudesEncontradas)
        setError('')
      }

      setLoading(false)
    }, 1000)
  }

  const formatearFecha = (fecha: string) => {
    return new Date(fecha).toLocaleDateString('es-CO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const obtenerDescripcionEstado = (estado: Solicitud['estado']) => {
    switch (estado) {
      case 'pendiente':
        return 'Tu solicitud ha sido recibida y está en cola para revisión'
      case 'en-revision':
        return 'Un especialista está revisando tu solicitud y documentos'
      case 'aprobada':
        return 'Tu solicitud ha sido aprobada y está en proceso de finalización'
      case 'rechazada':
        return 'Tu solicitud ha sido rechazada. Revisa las observaciones'
      case 'completada':
        return 'Tu solicitud ha sido completada exitosamente'
      default:
        return 'Estado desconocido'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Consultar Estado de Solicitudes
          </h1>
          <p className="text-gray-600">
            Ingresa tu número de documento para ver el estado de tus solicitudes
          </p>
        </div>

        <Card className="mb-6 border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-blue-800">
              <Info className="w-5 h-5" />
              <span>Instrucciones de Consulta</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="text-blue-700">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-2">¿Cómo consultar?</h4>
                <ul className="text-sm space-y-1">
                  <li>• Ingresa tu número de documento de identidad</li>
                  <li>• Haz clic en {'"Buscar"'} para ver tus solicitudes</li>
                  <li>
                    • Selecciona una solicitud para ver detalles completos
                  </li>
                  <li>• Revisa el seguimiento y estado actual</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Estados de Solicitud</h4>
                <div className="text-sm space-y-1">
                  <div className="flex items-center space-x-2">
                    <Badge className="bg-yellow-100 text-yellow-800 text-xs">
                      Pendiente
                    </Badge>
                    <span>En cola para revisión</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className="bg-blue-100 text-blue-800 text-xs">
                      En Revisión
                    </Badge>
                    <span>Siendo evaluada</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className="bg-green-100 text-green-800 text-xs">
                      Aprobada
                    </Badge>
                    <span>Lista para finalizar</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className="bg-purple-100 text-purple-800 text-xs">
                      Completada
                    </Badge>
                    <span>Proceso terminado</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Formulario de Búsqueda */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Search className="w-5 h-5" />
              <span>Buscar Solicitudes</span>
            </CardTitle>
            <CardDescription>
              Consulta todas tus solicitudes activas e historial
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <Label htmlFor="documento">Número de Documento</Label>
                <Input
                  id="documento"
                  value={documento}
                  onChange={(e) => setDocumento(e.target.value)}
                  placeholder="Ej: 12345678"
                  className="mt-1"
                />
                <div className="mt-2 p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 font-medium mb-1">
                    📋 Documentos de prueba disponibles:
                  </p>
                  <div className="text-sm text-gray-500 space-y-1">
                    <p>
                      <strong>12345678</strong> - Juan Pérez (3 solicitudes
                      activas)
                    </p>
                    <p>
                      <strong>87654321</strong> - María García (2 solicitudes
                      completadas)
                    </p>
                    <p>
                      <strong>11223344</strong> - Carlos López (1 solicitud en
                      revisión)
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-end">
                <Button
                  onClick={() => buscarSolicitudes()}
                  disabled={loading}
                  className="w-full sm:w-auto"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Buscando...
                    </>
                  ) : (
                    <>
                      <Search className="w-4 h-4 mr-2" />
                      Buscar
                    </>
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {error && (
          <Alert className="mb-6 border-red-200 bg-red-50">
            <AlertCircle className="w-4 h-4" />
            <AlertDescription className="text-red-800">
              {error}
            </AlertDescription>
          </Alert>
        )}

        {/* Lista de Solicitudes */}
        {solicitudes.length > 0 && (
          <div className="grid lg:grid-cols-2 gap-6">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">
                  Mis Solicitudes ({solicitudes.length})
                </h2>
                <div className="flex items-center space-x-1 text-sm text-gray-500">
                  <HelpCircle className="w-4 h-4" />
                  <span>Haz clic para ver detalles</span>
                </div>
              </div>
              <div className="space-y-4">
                {solicitudes.map((solicitud) => (
                  <Card
                    key={solicitud.id}
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      solicitudSeleccionada?.id === solicitud.id
                        ? 'ring-2 ring-blue-500'
                        : ''
                    }`}
                    onClick={() => setSolicitudSeleccionada(solicitud)}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg">
                            {solicitud.tipo}
                          </CardTitle>
                          <CardDescription className="flex items-center space-x-2 mt-1">
                            <span>ID: {solicitud.id}</span>
                            <span>•</span>
                            <span className="flex items-center">
                              <Calendar className="w-3 h-3 mr-1" />
                              {formatearFecha(solicitud.fechaCreacion)}
                            </span>
                          </CardDescription>
                        </div>
                        <Badge className={obtenerColorEstado(solicitud.estado)}>
                          {solicitud.estado.charAt(0).toUpperCase() +
                            solicitud.estado.slice(1)}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {solicitud.descripcion}
                      </p>
                      <div className="flex items-center justify-between mt-3">
                        <span className="text-xs text-gray-500">
                          Actualizado:{' '}
                          {formatearFecha(solicitud.fechaActualizacion)}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                        >
                          <Eye className="w-3 h-3 mr-1" />
                          Ver detalles
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Detalles de Solicitud Seleccionada */}
            <div>
              {solicitudSeleccionada ? (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <FileText className="w-5 h-5" />
                      <span>Detalles de la Solicitud</span>
                    </CardTitle>
                    <CardDescription>
                      Información completa y seguimiento
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm font-medium text-gray-500">
                          ID de Solicitud
                        </Label>
                        <p className="font-mono text-sm">
                          {solicitudSeleccionada.id}
                        </p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-500">
                          Estado Actual
                        </Label>
                        <div className="mt-1">
                          <Badge
                            className={obtenerColorEstado(
                              solicitudSeleccionada.estado
                            )}
                          >
                            {solicitudSeleccionada.estado
                              .charAt(0)
                              .toUpperCase() +
                              solicitudSeleccionada.estado.slice(1)}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label className="text-sm font-medium text-gray-500">
                        Tipo de Solicitud
                      </Label>
                      <p className="mt-1">{solicitudSeleccionada.tipo}</p>
                    </div>

                    <div>
                      <Label className="text-sm font-medium text-gray-500">
                        Descripción
                      </Label>
                      <p className="mt-1 text-sm">
                        {solicitudSeleccionada.descripcion}
                      </p>
                    </div>

                    <div>
                      <Label className="text-sm font-medium text-gray-500">
                        Estado Actual
                      </Label>
                      <p className="mt-1 text-sm text-gray-600">
                        {obtenerDescripcionEstado(solicitudSeleccionada.estado)}
                      </p>
                    </div>

                    {solicitudSeleccionada.archivos.length > 0 && (
                      <div>
                        <Label className="text-sm font-medium text-gray-500">
                          Documentos Adjuntos
                        </Label>
                        <div className="mt-1 space-y-1">
                          {solicitudSeleccionada.archivos.map(
                            (archivo, index) => (
                              <div
                                key={index}
                                className="flex items-center space-x-2 text-sm"
                              >
                                <FileText className="w-4 h-4 text-gray-400" />
                                <span>{archivo}</span>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    )}

                    {solicitudSeleccionada.observaciones && (
                      <div>
                        <Label className="text-sm font-medium text-gray-500">
                          Observaciones
                        </Label>
                        <Alert className="mt-1">
                          <AlertDescription className="text-sm">
                            {solicitudSeleccionada.observaciones}
                          </AlertDescription>
                        </Alert>
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                      <div>
                        <Label className="text-sm font-medium text-gray-500">
                          Fecha de Creación
                        </Label>
                        <p className="text-sm">
                          {formatearFecha(solicitudSeleccionada.fechaCreacion)}
                        </p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-500">
                          Última Actualización
                        </Label>
                        <p className="text-sm">
                          {formatearFecha(
                            solicitudSeleccionada.fechaActualizacion
                          )}
                        </p>
                      </div>
                    </div>

                    {/* Timeline de Estados */}
                    <div className="pt-4 border-t">
                      <Label className="text-sm font-medium text-gray-500 mb-3 block">
                        Seguimiento
                      </Label>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          <div className="flex-1">
                            <p className="text-sm font-medium">
                              Solicitud Creada
                            </p>
                            <p className="text-xs text-gray-500">
                              {formatearFecha(
                                solicitudSeleccionada.fechaCreacion
                              )}
                            </p>
                          </div>
                        </div>

                        {solicitudSeleccionada.estado !== 'pendiente' && (
                          <div className="flex items-center space-x-3">
                            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                            <div className="flex-1">
                              <p className="text-sm font-medium">En Revisión</p>
                              <p className="text-xs text-gray-500">
                                Procesando documentos
                              </p>
                            </div>
                          </div>
                        )}

                        {['aprobada', 'completada'].includes(
                          solicitudSeleccionada.estado
                        ) && (
                          <div className="flex items-center space-x-3">
                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                            <div className="flex-1">
                              <p className="text-sm font-medium">Aprobada</p>
                              <p className="text-xs text-gray-500">
                                Solicitud aprobada
                              </p>
                            </div>
                          </div>
                        )}

                        {solicitudSeleccionada.estado === 'completada' && (
                          <div className="flex items-center space-x-3">
                            <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                            <div className="flex-1">
                              <p className="text-sm font-medium">Completada</p>
                              <p className="text-xs text-gray-500">
                                {formatearFecha(
                                  solicitudSeleccionada.fechaActualizacion
                                )}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardContent className="flex items-center justify-center py-12">
                    <div className="text-center">
                      <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500 mb-2">
                        Selecciona una solicitud para ver los detalles
                      </p>
                      <p className="text-sm text-gray-400">
                        Haz clic en cualquier solicitud de la lista
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
