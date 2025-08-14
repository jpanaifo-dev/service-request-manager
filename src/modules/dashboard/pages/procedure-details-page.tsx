'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
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
  solicitudesSimuladas,
  usuariosSimulados,
  obtenerColorEstado,
  obtenerHistorialSolicitud,
  type Solicitud,
  type HistorialSolicitud,
} from '@/lib/data'
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

export const ProcedureDetailsPage = () => {
  const params = useParams()
  const solicitudId = params.id as string
  const [solicitud, setSolicitud] = useState<Solicitud | null>(null)
  const [historial, setHistorial] = useState<HistorialSolicitud[]>([])
  const [isAuthenticated] = useState(true)

  useEffect(() => {
    // Buscar la solicitud
    const solicitudEncontrada = solicitudesSimuladas.find(
      (s) => s.id === solicitudId
    )
    if (solicitudEncontrada) {
      setSolicitud(solicitudEncontrada)
      setHistorial(obtenerHistorialSolicitud(solicitudId))
    }
  }, [solicitudId])

  const obtenerIconoHistorial = (tipo: HistorialSolicitud['tipo']) => {
    switch (tipo) {
      case 'creacion':
        return <FileText className="w-4 h-4 text-blue-500" />
      case 'actualizacion':
        return <Edit className="w-4 h-4 text-yellow-500" />
      case 'derivacion':
        return <Send className="w-4 h-4 text-purple-500" />
      case 'aprobacion':
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'rechazo':
        return <XCircle className="w-4 h-4 text-red-500" />
      case 'completado':
        return <CheckCircle className="w-4 h-4 text-blue-500" />
      default:
        return <AlertCircle className="w-4 h-4 text-gray-500" />
    }
  }

  if (!isAuthenticated) {
    return <div>Verificando autenticación...</div>
  }

  if (!solicitud) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto py-8 px-4">
          <Card>
            <CardContent className="py-8 text-center">
              <p className="text-gray-500">Solicitud no encontrada</p>
              <Link href="/dashboard/solicitudes">
                <Button className="mt-4">Volver a Solicitudes</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  const usuario = usuariosSimulados.find(
    (u) => u.documento === solicitud.usuarioDocumento
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-blue-600 text-white py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Link href="/dashboard/solicitudes">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-blue-700"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Volver a Solicitudes
                </Button>
              </Link>
              <FileText className="w-6 h-6" />
              <h1 className="text-xl font-semibold">
                Detalle de Solicitud {solicitud.id}
              </h1>
            </div>
            <div className="flex space-x-2">
              <Link href={`/dashboard/solicitudes/${solicitud.id}/acciones`}>
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
                    <span>Información de la Solicitud</span>
                  </CardTitle>
                  <Badge
                    className={`${obtenerColorEstado(
                      solicitud.estado
                    )} text-sm px-3 py-1`}
                  >
                    {solicitud.estado.charAt(0).toUpperCase() +
                      solicitud.estado.slice(1)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      ID de Solicitud
                    </p>
                    <p className="text-lg font-semibold">{solicitud.id}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Tipo de Solicitud
                    </p>
                    <p className="text-lg">{solicitud.tipo}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Fecha de Solicitud
                    </p>
                    {/* <p className="text-lg">{solicitud.fechaSolicitud}</p> */}
                  </div>
                  {solicitud.fechaActualizacion && (
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Última Actualización
                      </p>
                      <p className="text-lg">{solicitud.fechaActualizacion}</p>
                    </div>
                  )}
                </div>

                <Separator />

                <div>
                  <p className="text-sm font-medium text-gray-500 mb-2">
                    Descripción
                  </p>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-700">{solicitud.descripcion}</p>
                  </div>
                </div>

                {solicitud.observaciones && (
                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-2">
                      Observaciones Administrativas
                    </p>
                    <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
                      <p className="text-gray-700 whitespace-pre-line">
                        {solicitud.observaciones}
                      </p>
                    </div>
                  </div>
                )}

                {solicitud.archivos && solicitud.archivos.length > 0 && (
                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-2">
                      Archivos Adjuntos
                    </p>
                    <div className="space-y-2">
                      {solicitud.archivos.map((archivo, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                        >
                          <div className="flex items-center space-x-2">
                            <FileText className="w-4 h-4 text-gray-500" />
                            <span className="text-sm">{archivo}</span>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                          >
                            <Download className="w-3 h-3 mr-1" />
                            Descargar
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Tracking e Historial */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="w-5 h-5" />
                  <span>Historial y Tracking</span>
                </CardTitle>
                <CardDescription>
                  Seguimiento completo de todos los cambios y acciones
                  realizadas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {historial.length > 0 ? (
                    historial.map((item, index) => (
                      <div
                        key={item.id}
                        className="flex space-x-4"
                      >
                        <div className="flex flex-col items-center">
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100">
                            {obtenerIconoHistorial(item.tipo)}
                          </div>
                          {index < historial.length - 1 && (
                            <div className="w-px h-12 bg-gray-200 mt-2"></div>
                          )}
                        </div>
                        <div className="flex-1 pb-4">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium text-gray-900">
                              {item.accion}
                            </h4>
                            <span className="text-sm text-gray-500">
                              {item.fecha} - {item.hora}
                            </span>
                          </div>
                          <div className="mt-1 text-sm text-gray-600">
                            <p>
                              <strong>Usuario:</strong> {item.usuario}
                            </p>
                            <p>
                              <strong>Oficina:</strong> {item.oficina}
                            </p>
                            {item.estadoAnterior && item.estadoNuevo && (
                              <p>
                                <strong>Cambio de estado:</strong>{' '}
                                {item.estadoAnterior} → {item.estadoNuevo}
                              </p>
                            )}
                            {item.observaciones && (
                              <p className="mt-2 p-2 bg-gray-50 rounded text-xs">
                                {item.observaciones}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-center py-4">
                      No hay historial disponible
                    </p>
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
                {usuario ? (
                  <>
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Nombre Completo
                      </p>
                      <p className="text-lg font-semibold">
                        {usuario.nombre} {usuario.apellido}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Documento
                      </p>
                      <p className="text-lg">{usuario.documento}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Email</p>
                      <p className="text-lg">{usuario.email}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Teléfono
                      </p>
                      <p className="text-lg">{usuario.telefono}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Dirección
                      </p>
                      <p className="text-lg">{usuario.direccion}</p>
                    </div>
                  </>
                ) : (
                  <p className="text-gray-500">
                    Información del usuario no disponible
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Acciones Rápidas */}
            <Card>
              <CardHeader>
                <CardTitle>Acciones Rápidas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href={`/dashboard/solicitudes/${solicitud.id}/acciones`}>
                  <Button
                    className="w-full"
                    variant="default"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Gestionar Estado
                  </Button>
                </Link>
                <Link
                  href={`/dashboard/solicitudes/${solicitud.id}/acciones?tab=derivar`}
                >
                  <Button
                    className="w-full bg-transparent"
                    variant="outline"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Derivar Solicitud
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
