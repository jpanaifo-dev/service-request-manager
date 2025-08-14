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
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  usuariosSimulados,
  oficinasSimuladas,
  asignacionesSimuladas,
  solicitudesSimuladas,
  type Usuario,
  type AsignacionUsuarioOficina,
} from '@/lib/data'
import {
  Users,
  Building2,
  Mail,
  Phone,
  ArrowLeft,
  Search,
  UserPlus,
  UserMinus,
  FileText,
} from 'lucide-react'

export const UserListPage = () => {
  const [usuarios] = useState<Usuario[]>(usuariosSimulados)
  const [asignaciones, setAsignaciones] = useState<AsignacionUsuarioOficina[]>(
    asignacionesSimuladas
  )
  const [busqueda, setBusqueda] = useState<string>('')
  const [usuarioSeleccionado, setUsuarioSeleccionado] =
    useState<Usuario | null>(null)
  const [oficinaAsignacion, setOficinaAsignacion] = useState<string>('')
  const [rolAsignacion, setRolAsignacion] = useState<string>('')
  const [isAuthenticated] = useState(true)

  const usuariosFiltrados = usuarios.filter((usuario) => {
    const matchBusqueda =
      busqueda === '' ||
      usuario.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      usuario.apellido.toLowerCase().includes(busqueda.toLowerCase()) ||
      usuario.documento.includes(busqueda) ||
      usuario.email.toLowerCase().includes(busqueda.toLowerCase())

    return matchBusqueda
  })

  const obtenerAsignacionesUsuario = (documento: string) => {
    return asignaciones.filter(
      (a) => a.usuarioDocumento === documento && a.activa
    )
  }

  const obtenerSolicitudesUsuario = (documento: string) => {
    return solicitudesSimuladas.filter((s) => s.usuarioDocumento === documento)
  }

  const asignarUsuarioOficina = () => {
    if (!usuarioSeleccionado || !oficinaAsignacion || !rolAsignacion) return

    // Verificar si ya existe una asignación activa
    const asignacionExistente = asignaciones.find(
      (a) =>
        a.usuarioDocumento === usuarioSeleccionado.documento &&
        a.oficinaId === oficinaAsignacion &&
        a.activa
    )

    if (asignacionExistente) {
      alert('El usuario ya está asignado a esta oficina')
      return
    }

    const nuevaAsignacion: AsignacionUsuarioOficina = {
      id: `AS${String(asignaciones.length + 1).padStart(3, '0')}`,
      usuarioDocumento: usuarioSeleccionado.documento,
      oficinaId: oficinaAsignacion,
      rol: rolAsignacion as 'administrador' | 'operador' | 'consultor',
      fechaAsignacion: new Date().toISOString().split('T')[0],
      activa: true,
    }

    setAsignaciones([...asignaciones, nuevaAsignacion])
    setUsuarioSeleccionado(null)
    setOficinaAsignacion('')
    setRolAsignacion('')
  }

  const removerAsignacion = (asignacionId: string) => {
    const asignacionesActualizadas = asignaciones.map((a) =>
      a.id === asignacionId ? { ...a, activa: false } : a
    )
    setAsignaciones(asignacionesActualizadas)
  }

  if (!isAuthenticated) {
    return <div>Verificando autenticación...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <div className="bg-blue-600 text-white py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-blue-700"
              onClick={() => (window.location.href = '/admin/dashboard')}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver al Dashboard
            </Button>
            <Users className="w-6 h-6" />
            <h1 className="text-xl font-semibold">Gestión de Usuarios</h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Estadísticas */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-2xl font-bold">{usuarios.length}</p>
                  <p className="text-sm text-gray-600">Total Usuarios</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Building2 className="w-5 h-5 text-green-600" />
                <div>
                  <p className="text-2xl font-bold">
                    {asignaciones.filter((a) => a.activa).length}
                  </p>
                  <p className="text-sm text-gray-600">Asignaciones Activas</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <UserPlus className="w-5 h-5 text-purple-600" />
                <div>
                  <p className="text-2xl font-bold">
                    {
                      asignaciones.filter(
                        (a) => a.activa && a.rol === 'administrador'
                      ).length
                    }
                  </p>
                  <p className="text-sm text-gray-600">Administradores</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <FileText className="w-5 h-5 text-orange-600" />
                <div>
                  <p className="text-2xl font-bold">
                    {solicitudesSimuladas.length}
                  </p>
                  <p className="text-sm text-gray-600">Solicitudes Total</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Búsqueda */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Search className="w-5 h-5" />
              <span>Buscar Usuarios</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Buscar por nombre, documento o email..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Tabla de Usuarios */}
        <Card>
          <CardHeader>
            <CardTitle>
              Usuarios del Sistema ({usuariosFiltrados.length})
            </CardTitle>
            <CardDescription>
              Gestiona los usuarios y sus asignaciones a oficinas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Usuario</TableHead>
                    <TableHead>Contacto</TableHead>
                    <TableHead>Asignaciones</TableHead>
                    <TableHead>Solicitudes</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {usuariosFiltrados.map((usuario) => {
                    const asignacionesUsuario = obtenerAsignacionesUsuario(
                      usuario.documento
                    )
                    const solicitudesUsuario = obtenerSolicitudesUsuario(
                      usuario.documento
                    )

                    return (
                      <TableRow key={usuario.documento}>
                        <TableCell>
                          <div>
                            <p className="font-medium">
                              {usuario.nombre} {usuario.apellido}
                            </p>
                            <p className="text-sm text-gray-600">
                              Doc: {usuario.documento}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex items-center space-x-1">
                              <Mail className="w-3 h-3 text-gray-400" />
                              <span className="text-sm">{usuario.email}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Phone className="w-3 h-3 text-gray-400" />
                              <span className="text-sm">
                                {usuario.telefono}
                              </span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            {asignacionesUsuario.length > 0 ? (
                              asignacionesUsuario.map((asignacion) => {
                                const oficina = oficinasSimuladas.find(
                                  (o) => o.id === asignacion.oficinaId
                                )
                                return (
                                  <div
                                    key={asignacion.id}
                                    className="flex items-center justify-between"
                                  >
                                    <Badge
                                      variant="outline"
                                      className="text-xs"
                                    >
                                      {oficina?.nombre} - {asignacion.rol}
                                    </Badge>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() =>
                                        removerAsignacion(asignacion.id)
                                      }
                                      className="h-6 w-6 p-0 text-red-600 hover:text-red-800"
                                    >
                                      <UserMinus className="w-3 h-3" />
                                    </Button>
                                  </div>
                                )
                              })
                            ) : (
                              <span className="text-sm text-gray-500">
                                Sin asignaciones
                              </span>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">
                            {solicitudesUsuario.length} solicitudes
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  setUsuarioSeleccionado(usuario)
                                  setOficinaAsignacion('')
                                  setRolAsignacion('')
                                }}
                              >
                                <UserPlus className="w-3 h-3 mr-1" />
                                Asignar
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>
                                  Asignar Usuario a Oficina
                                </DialogTitle>
                                <DialogDescription>
                                  Asigna a {usuario.nombre} {usuario.apellido} a
                                  una oficina con un rol específico
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div>
                                  <Label htmlFor="oficina-select">
                                    Oficina
                                  </Label>
                                  <Select
                                    value={oficinaAsignacion}
                                    onValueChange={setOficinaAsignacion}
                                  >
                                    <SelectTrigger className="mt-1">
                                      <SelectValue placeholder="Selecciona una oficina" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {oficinasSimuladas
                                        .filter((o) => o.activa)
                                        .map((oficina) => (
                                          <SelectItem
                                            key={oficina.id}
                                            value={oficina.id}
                                          >
                                            {oficina.nombre}
                                          </SelectItem>
                                        ))}
                                    </SelectContent>
                                  </Select>
                                </div>

                                <div>
                                  <Label htmlFor="rol-select">Rol</Label>
                                  <Select
                                    value={rolAsignacion}
                                    onValueChange={setRolAsignacion}
                                  >
                                    <SelectTrigger className="mt-1">
                                      <SelectValue placeholder="Selecciona un rol" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="administrador">
                                        Administrador
                                      </SelectItem>
                                      <SelectItem value="operador">
                                        Operador
                                      </SelectItem>
                                      <SelectItem value="consultor">
                                        Consultor
                                      </SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>

                                <div className="bg-gray-50 p-3 rounded text-sm">
                                  <p>
                                    <strong>Roles:</strong>
                                  </p>
                                  <p>
                                    <strong>Administrador:</strong> Acceso
                                    completo a la gestión de la oficina
                                  </p>
                                  <p>
                                    <strong>Operador:</strong> Puede procesar y
                                    actualizar solicitudes
                                  </p>
                                  <p>
                                    <strong>Consultor:</strong> Solo puede
                                    consultar información
                                  </p>
                                </div>

                                <div className="flex justify-end space-x-2">
                                  <Button
                                    variant="outline"
                                    onClick={() => setUsuarioSeleccionado(null)}
                                  >
                                    Cancelar
                                  </Button>
                                  <Button
                                    onClick={asignarUsuarioOficina}
                                    disabled={
                                      !oficinaAsignacion || !rolAsignacion
                                    }
                                  >
                                    <UserPlus className="w-4 h-4 mr-2" />
                                    Asignar
                                  </Button>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
