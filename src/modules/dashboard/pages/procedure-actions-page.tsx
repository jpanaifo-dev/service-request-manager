'use client'

import { useState, useEffect } from 'react'
import { useParams, useSearchParams } from 'next/navigation'
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
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription } from '@/components/ui/alert'
import {
  solicitudesSimuladas,
  usuariosSimulados,
  oficinasSimuladas,
  obtenerColorEstado,
  type Solicitud,
} from '@/lib/data'
import {
  ArrowLeft,
  FileText,
  Edit,
  Send,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Save,
  Eye,
} from 'lucide-react'
import Link from 'next/link'

export const ProcedureActionsPage = () => {
  const params = useParams()
  const searchParams = useSearchParams()
  const solicitudId = params.id as string
  const tabInicial = searchParams.get('tab') || 'estado'

  const [solicitud, setSolicitud] = useState<Solicitud | null>(null)
  const [nuevoEstado, setNuevoEstado] = useState<string>('')
  const [observaciones, setObservaciones] = useState<string>('')
  const [oficinaDestino, setOficinaDestino] = useState<string>('')
  const [motivoDerivacion, setMotivoDerivacion] = useState<string>('')
  const [isAuthenticated] = useState(true)
  const [guardando, setGuardando] = useState(false)
  const [mensaje, setMensaje] = useState<{
    tipo: 'success' | 'error'
    texto: string
  } | null>(null)

  useEffect(() => {
    // Buscar la solicitud
    const solicitudEncontrada = solicitudesSimuladas.find(
      (s) => s.id === solicitudId
    )
    if (solicitudEncontrada) {
      setSolicitud(solicitudEncontrada)
      setNuevoEstado(solicitudEncontrada.estado)
      setObservaciones(solicitudEncontrada.observaciones || '')
    }
  }, [solicitudId])

  const actualizarEstado = async () => {
    if (!solicitud || !nuevoEstado) return

    setGuardando(true)

    // Simular actualización
    setTimeout(() => {
      setMensaje({
        tipo: 'success',
        texto: `Estado actualizado exitosamente a "${nuevoEstado}"`,
      })
      setGuardando(false)

      // Limpiar mensaje después de 3 segundos
      setTimeout(() => setMensaje(null), 3000)
    }, 1000)
  }

  const derivarSolicitud = async () => {
    if (!solicitud || !oficinaDestino) return

    setGuardando(true)

    // Simular derivación
    setTimeout(() => {
      const oficina = oficinasSimuladas.find((o) => o.id === oficinaDestino)
      setMensaje({
        tipo: 'success',
        texto: `Solicitud derivada exitosamente a "${oficina?.nombre}"`,
      })
      setGuardando(false)

      // Limpiar mensaje después de 3 segundos
      setTimeout(() => setMensaje(null), 3000)
    }, 1000)
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
              <Link href={`/dashboard/solicitudes/${solicitud.id}`}>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-blue-700"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Volver al Detalle
                </Button>
              </Link>
              <Edit className="w-6 h-6" />
              <h1 className="text-xl font-semibold">
                Gestionar Solicitud {solicitud.id}
              </h1>
            </div>
            <div className="flex items-center space-x-2">
              <Badge
                className={`${obtenerColorEstado(
                  solicitud.estado
                )} text-sm px-3 py-1`}
              >
                {solicitud.estado.charAt(0).toUpperCase() +
                  solicitud.estado.slice(1)}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Información Básica */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="w-5 h-5" />
              <span>Información de la Solicitud</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Solicitante</p>
                <p className="text-lg">
                  {usuario?.nombre} {usuario?.apellido}
                </p>
                <p className="text-sm text-gray-600">{usuario?.documento}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Tipo</p>
                <p className="text-lg">{solicitud.tipo}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Fecha</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Mensaje de Estado */}
        {mensaje && (
          <Alert
            className={`mb-6 ${
              mensaje.tipo === 'success'
                ? 'border-green-200 bg-green-50'
                : 'border-red-200 bg-red-50'
            }`}
          >
            <CheckCircle
              className={`h-4 w-4 ${
                mensaje.tipo === 'success' ? 'text-green-600' : 'text-red-600'
              }`}
            />
            <AlertDescription
              className={
                mensaje.tipo === 'success' ? 'text-green-800' : 'text-red-800'
              }
            >
              {mensaje.texto}
            </AlertDescription>
          </Alert>
        )}

        {/* Tabs de Acciones */}
        <Card>
          <CardHeader>
            <CardTitle>Acciones Disponibles</CardTitle>
            <CardDescription>
              Selecciona la acción que deseas realizar sobre esta solicitud
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs
              defaultValue={tabInicial}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger
                  value="estado"
                  className="flex items-center space-x-2"
                >
                  <Edit className="w-4 h-4" />
                  <span>Cambiar Estado</span>
                </TabsTrigger>
                <TabsTrigger
                  value="derivar"
                  className="flex items-center space-x-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Derivar</span>
                </TabsTrigger>
                <TabsTrigger
                  value="observaciones"
                  className="flex items-center space-x-2"
                >
                  <FileText className="w-4 h-4" />
                  <span>Observaciones</span>
                </TabsTrigger>
              </TabsList>

              {/* Cambiar Estado */}
              <TabsContent
                value="estado"
                className="space-y-4"
              >
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="nuevo-estado">Nuevo Estado</Label>
                    <Select
                      value={nuevoEstado}
                      onValueChange={setNuevoEstado}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pendiente">
                          <div className="flex items-center space-x-2">
                            <AlertTriangle className="w-4 h-4 text-yellow-500" />
                            <span>Pendiente</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="en-revision">
                          <div className="flex items-center space-x-2">
                            <Eye className="w-4 h-4 text-blue-500" />
                            <span>En Revisión</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="aprobada">
                          <div className="flex items-center space-x-2">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span>Aprobada</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="rechazada">
                          <div className="flex items-center space-x-2">
                            <XCircle className="w-4 h-4 text-red-500" />
                            <span>Rechazada</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="completada">
                          <div className="flex items-center space-x-2">
                            <CheckCircle className="w-4 h-4 text-blue-500" />
                            <span>Completada</span>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="observaciones-estado">
                      Observaciones del Cambio
                    </Label>
                    <Textarea
                      id="observaciones-estado"
                      value={observaciones}
                      onChange={(e) => setObservaciones(e.target.value)}
                      placeholder="Explica el motivo del cambio de estado..."
                      className="mt-1"
                      rows={4}
                    />
                  </div>

                  <div className="flex justify-end space-x-2">
                    <Link href={`/dashboard/solicitudes/${solicitud.id}`}>
                      <Button variant="outline">Cancelar</Button>
                    </Link>
                    <Button
                      onClick={actualizarEstado}
                      disabled={guardando || nuevoEstado === solicitud.estado}
                    >
                      {guardando ? (
                        <>Guardando...</>
                      ) : (
                        <>
                          <Save className="w-4 h-4 mr-2" />
                          Actualizar Estado
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </TabsContent>

              {/* Derivar Solicitud */}
              <TabsContent
                value="derivar"
                className="space-y-4"
              >
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="oficina-destino">Oficina Destino</Label>
                    <Select
                      value={oficinaDestino}
                      onValueChange={setOficinaDestino}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Selecciona la oficina destino" />
                      </SelectTrigger>
                      <SelectContent>
                        {oficinasSimuladas
                          .filter((o) => o.activa)
                          .map((oficina) => (
                            <SelectItem
                              key={oficina.id}
                              value={oficina.id}
                            >
                              <div>
                                <p className="font-medium">{oficina.nombre}</p>
                                <p className="text-sm text-gray-500">
                                  {oficina.descripcion}
                                </p>
                              </div>
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="motivo-derivacion">
                      Motivo de la Derivación
                    </Label>
                    <Textarea
                      id="motivo-derivacion"
                      value={motivoDerivacion}
                      onChange={(e) => setMotivoDerivacion(e.target.value)}
                      placeholder="Explica por qué se deriva esta solicitud a la oficina seleccionada..."
                      className="mt-1"
                      rows={4}
                    />
                  </div>

                  <Alert>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                      Al derivar la solicitud, se cambiará automáticamente el
                      estado a{'En Revisión'} y se notificará a la oficina y se
                      notificará a la oficina destino.
                    </AlertDescription>
                  </Alert>

                  <div className="flex justify-end space-x-2">
                    <Link href={`/dashboard/solicitudes/${solicitud.id}`}>
                      <Button variant="outline">Cancelar</Button>
                    </Link>
                    <Button
                      onClick={derivarSolicitud}
                      disabled={guardando || !oficinaDestino}
                    >
                      {guardando ? (
                        <>Derivando...</>
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          Derivar Solicitud
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </TabsContent>

              {/* Observaciones */}
              <TabsContent
                value="observaciones"
                className="space-y-4"
              >
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="observaciones-generales">
                      Observaciones Generales
                    </Label>
                    <Textarea
                      id="observaciones-generales"
                      value={observaciones}
                      onChange={(e) => setObservaciones(e.target.value)}
                      placeholder="Agrega observaciones generales sobre esta solicitud..."
                      className="mt-1"
                      rows={6}
                    />
                  </div>

                  <Alert>
                    <FileText className="h-4 w-4" />
                    <AlertDescription>
                      Las observaciones serán visibles para otros
                      administradores y quedarán registradas en el historial de
                      la solicitud.
                    </AlertDescription>
                  </Alert>

                  <div className="flex justify-end space-x-2">
                    <Link href={`/dashboard/solicitudes/${solicitud.id}`}>
                      <Button variant="outline">Cancelar</Button>
                    </Link>
                    <Button
                      onClick={actualizarEstado}
                      disabled={guardando}
                    >
                      {guardando ? (
                        <>Guardando...</>
                      ) : (
                        <>
                          <Save className="w-4 h-4 mr-2" />
                          Guardar Observaciones
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
