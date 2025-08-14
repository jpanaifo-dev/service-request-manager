'use client'

import { useState } from 'react'
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
  solicitudesSimuladas,
  usuariosSimulados,
  type Solicitud,
} from '@/lib/data'
import {
  FileText,
  Users,
  Clock,
  CheckCircle,
  AlertTriangle,
  Eye,
  LogOut,
  BarChart3,
  Building2,
} from 'lucide-react'

export const DashboardPanel = () => {
  const [solicitudes] = useState<Solicitud[]>(solicitudesSimuladas)
  //   const [filtroEstado, setFiltroEstado] = useState<string>('todos')
  //   const [solicitudSeleccionada, setSolicitudSeleccionada] =
  // //     useState<Solicitud | null>(null)
  //   const [nuevoEstado, setNuevoEstado] = useState<string>('')
  //   const [observaciones, setObservaciones] = useState<string>('')
  const [isAuthenticated] = useState(true)

  const handleLogout = () => {
    localStorage.removeItem('dashboard_logged_in')
    window.location.href = '/admin'
  }

  const estadisticas = {
    total: solicitudes.length,
    pendientes: solicitudes.filter((s) => s.estado === 'pendiente').length,
    enRevision: solicitudes.filter((s) => s.estado === 'en-revision').length,
    aprobadas: solicitudes.filter((s) => s.estado === 'aprobada').length,
    completadas: solicitudes.filter((s) => s.estado === 'completada').length,
    rechazadas: solicitudes.filter((s) => s.estado === 'rechazada').length,
  }

  //   const datosGrafico = [
  //     { name: 'Pendientes', value: estadisticas.pendientes, color: '#fbbf24' },
  //     { name: 'En Revisión', value: estadisticas.enRevision, color: '#3b82f6' },
  //     { name: 'Aprobadas', value: estadisticas.aprobadas, color: '#10b981' },
  //     { name: 'Completadas', value: estadisticas.completadas, color: '#6b7280' },
  //     { name: 'Rechazadas', value: estadisticas.rechazadas, color: '#ef4444' },
  //   ]

  //   const actualizarSolicitud = () => {
  //     if (!solicitudSeleccionada || !nuevoEstado) return

  //     const solicitudesActualizadas = solicitudes.map((sol) =>
  //       sol.id === solicitudSeleccionada.id
  //         ? {
  //             ...sol,
  //             estado: nuevoEstado as Solicitud['estado'],
  //             observaciones: observaciones || sol.observaciones,
  //             fechaActualizacion: new Date().toISOString().split('T')[0],
  //           }
  //         : sol
  //     )

  //     setSolicitudes(solicitudesActualizadas)
  //     setSolicitudSeleccionada(null)
  //     setNuevoEstado('')
  //     setObservaciones('')
  //   }

  if (!isAuthenticated) {
    return <div>Verificando autenticación...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <div className="bg-blue-600 text-white py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <BarChart3 className="w-6 h-6" />
              <h1 className="text-xl font-semibold">Panel Administrativo</h1>
            </div>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="text-blue-600 bg-white hover:bg-gray-100"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Cerrar Sesión
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Estadísticas */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <FileText className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-2xl font-bold">{estadisticas.total}</p>
                  <p className="text-sm text-gray-600">Total</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-yellow-600" />
                <div>
                  <p className="text-2xl font-bold">
                    {estadisticas.pendientes}
                  </p>
                  <p className="text-sm text-gray-600">Pendientes</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Eye className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-2xl font-bold">
                    {estadisticas.enRevision}
                  </p>
                  <p className="text-sm text-gray-600">En Revisión</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <div>
                  <p className="text-2xl font-bold">{estadisticas.aprobadas}</p>
                  <p className="text-sm text-gray-600">Aprobadas</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-gray-600" />
                <div>
                  <p className="text-2xl font-bold">
                    {estadisticas.completadas}
                  </p>
                  <p className="text-sm text-gray-600">Completadas</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="w-5 h-5 text-red-600" />
                <div>
                  <p className="text-2xl font-bold">
                    {estadisticas.rechazadas}
                  </p>
                  <p className="text-sm text-gray-600">Rechazadas</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Gráfico de Estados */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Distribución por Estado</CardTitle>
            </CardHeader>
            <CardContent>
              {/* <ResponsiveContainer
                width="100%"
                height={250}
              >
                <PieChart>
                  <Pie
                    data={datosGrafico}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {datosGrafico.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.color}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer> */}
            </CardContent>
          </Card>

          {/* Accesos Rápidos */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Accesos Rápidos</CardTitle>
              <CardDescription>
                Navega rápidamente a las diferentes secciones administrativas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <Button
                  variant="outline"
                  className="h-20 flex flex-col items-center justify-center space-y-2 bg-transparent"
                  onClick={() =>
                    (window.location.href = '/dashboard/solicitudes')
                  }
                >
                  <FileText className="w-6 h-6" />
                  <span>Gestión de Solicitudes</span>
                </Button>

                <Button
                  variant="outline"
                  className="h-20 flex flex-col items-center justify-center space-y-2 bg-transparent"
                  onClick={() => (window.location.href = '/dashboard/oficinas')}
                >
                  <Building2 className="w-6 h-6" />
                  <span>Gestión de Oficinas</span>
                </Button>

                <Button
                  variant="outline"
                  className="h-20 flex flex-col items-center justify-center space-y-2 bg-transparent"
                  onClick={() => (window.location.href = '/dashboard/usuarios')}
                >
                  <Users className="w-6 h-6" />
                  <span>Gestión de Usuarios</span>
                </Button>

                <Button
                  variant="outline"
                  className="h-20 flex flex-col items-center justify-center space-y-2 bg-transparent"
                  onClick={() => (window.location.href = '/dashboard/reportes')}
                >
                  <BarChart3 className="w-6 h-6" />
                  <span>Reportes y Estadísticas</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Usuarios Registrados */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="w-5 h-5" />
              <span>Usuarios Registrados</span>
            </CardTitle>
            <CardDescription>Lista de usuarios en el sistema</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {usuariosSimulados.map((usuario) => {
                const solicitudesUsuario = solicitudes.filter(
                  (s) => s.usuarioDocumento === usuario.documento
                )
                return (
                  <div
                    key={usuario.documento}
                    className="p-4 border rounded-lg"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium">
                          {usuario.nombre} {usuario.apellido}
                        </p>
                        <p className="text-sm text-gray-600">
                          Doc: {usuario.documento}
                        </p>
                        <p className="text-sm text-gray-600">{usuario.email}</p>
                        <p className="text-sm text-gray-600">
                          {usuario.telefono}
                        </p>
                      </div>
                      <Badge variant="outline">
                        {solicitudesUsuario.length} solicitudes
                      </Badge>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
