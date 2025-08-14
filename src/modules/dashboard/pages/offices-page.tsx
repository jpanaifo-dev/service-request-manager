'use client'

import { useState, useEffect } from 'react'
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
import { Textarea } from '@/components/ui/textarea'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
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
  oficinasSimuladas,
  asignacionesSimuladas,
  usuariosSimulados,
  type Oficina,
} from '@/lib/data'
import {
  Building2,
  Plus,
  Edit,
  Users,
  Mail,
  Phone,
  ArrowLeft,
  CheckCircle,
  XCircle,
} from 'lucide-react'

export const OfficesPage = () => {
  const [oficinas, setOficinas] = useState<Oficina[]>(oficinasSimuladas)
  const [oficinaSeleccionada, setOficinaSeleccionada] =
    useState<Oficina | null>(null)
  const [modoEdicion, setModoEdicion] = useState<'crear' | 'editar' | null>(
    null
  )
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    responsable: '',
    email: '',
    telefono: '',
    activa: true,
  })
  const [isAuthenticated] = useState(true)

  //   useEffect(() => {
  //     const loggedIn = localStorage.getItem('admin_logged_in')
  //     if (!loggedIn) {
  //       window.location.href = '/admin'
  //       return
  //     }
  //     setIsAuthenticated(true)
  //   }, [])

  const limpiarFormulario = () => {
    setFormData({
      nombre: '',
      descripcion: '',
      responsable: '',
      email: '',
      telefono: '',
      activa: true,
    })
    setOficinaSeleccionada(null)
    setModoEdicion(null)
  }

  const abrirModalCrear = () => {
    limpiarFormulario()
    setModoEdicion('crear')
  }

  const abrirModalEditar = (oficina: Oficina) => {
    setOficinaSeleccionada(oficina)
    setFormData({
      nombre: oficina.nombre,
      descripcion: oficina.descripcion,
      responsable: oficina.responsable,
      email: oficina.email,
      telefono: oficina.telefono,
      activa: oficina.activa,
    })
    setModoEdicion('editar')
  }

  const guardarOficina = () => {
    if (!formData.nombre || !formData.responsable || !formData.email) return

    if (modoEdicion === 'crear') {
      const nuevaOficina: Oficina = {
        id: `OF${String(oficinas.length + 1).padStart(3, '0')}`,
        ...formData,
        fechaCreacion: new Date().toISOString().split('T')[0],
      }
      setOficinas([...oficinas, nuevaOficina])
    } else if (modoEdicion === 'editar' && oficinaSeleccionada) {
      const oficinasActualizadas = oficinas.map((o) =>
        o.id === oficinaSeleccionada.id
          ? { ...oficinaSeleccionada, ...formData }
          : o
      )
      setOficinas(oficinasActualizadas)
    }

    limpiarFormulario()
  }

  const toggleEstadoOficina = (oficinaId: string) => {
    const oficinasActualizadas = oficinas.map((o) =>
      o.id === oficinaId ? { ...o, activa: !o.activa } : o
    )
    setOficinas(oficinasActualizadas)
  }

  const obtenerUsuariosAsignados = (oficinaId: string) => {
    const asignaciones = asignacionesSimuladas.filter(
      (a) => a.oficinaId === oficinaId && a.activa
    )
    return asignaciones
      .map((a) => {
        const usuario = usuariosSimulados.find(
          (u) => u.documento === a.usuarioDocumento
        )
        return { ...usuario, rol: a.rol }
      })
      .filter(Boolean)
  }

  if (!isAuthenticated) {
    return <div>Verificando autenticación...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Estadísticas */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Building2 className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-2xl font-bold">{oficinas.length}</p>
                  <p className="text-sm text-gray-600">Total Oficinas</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <div>
                  <p className="text-2xl font-bold">
                    {oficinas.filter((o) => o.activa).length}
                  </p>
                  <p className="text-sm text-gray-600">Activas</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <XCircle className="w-5 h-5 text-red-600" />
                <div>
                  <p className="text-2xl font-bold">
                    {oficinas.filter((o) => !o.activa).length}
                  </p>
                  <p className="text-sm text-gray-600">Inactivas</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-purple-600" />
                <div>
                  <p className="text-2xl font-bold">
                    {asignacionesSimuladas.filter((a) => a.activa).length}
                  </p>
                  <p className="text-sm text-gray-600">Asignaciones</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabla de Oficinas */}
        <Card>
          <CardHeader>
            <CardTitle>Oficinas Registradas</CardTitle>
            <CardDescription>
              Gestiona las oficinas del sistema y sus responsables
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Responsable</TableHead>
                    <TableHead>Contacto</TableHead>
                    <TableHead>Usuarios</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {oficinas.map((oficina) => {
                    const usuariosAsignados = obtenerUsuariosAsignados(
                      oficina.id
                    )
                    return (
                      <TableRow key={oficina.id}>
                        <TableCell className="font-medium">
                          {oficina.id}
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{oficina.nombre}</p>
                            <p className="text-sm text-gray-600">
                              {oficina.descripcion}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>{oficina.responsable}</TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex items-center space-x-1">
                              <Mail className="w-3 h-3 text-gray-400" />
                              <span className="text-sm">{oficina.email}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Phone className="w-3 h-3 text-gray-400" />
                              <span className="text-sm">
                                {oficina.telefono}
                              </span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">
                            {usuariosAsignados.length} usuarios
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={
                              oficina.activa
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                            }
                          >
                            {oficina.activa ? 'Activa' : 'Inactiva'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => abrirModalEditar(oficina)}
                            >
                              <Edit className="w-3 h-3" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => toggleEstadoOficina(oficina.id)}
                              className={
                                oficina.activa
                                  ? 'text-red-600'
                                  : 'text-green-600'
                              }
                            >
                              {oficina.activa ? (
                                <XCircle className="w-3 h-3" />
                              ) : (
                                <CheckCircle className="w-3 h-3" />
                              )}
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Modal Crear/Editar Oficina */}
        <Dialog
          open={modoEdicion !== null}
          onOpenChange={() => limpiarFormulario()}
        >
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {modoEdicion === 'crear'
                  ? 'Crear Nueva Oficina'
                  : 'Editar Oficina'}
              </DialogTitle>
              <DialogDescription>
                {modoEdicion === 'crear'
                  ? 'Completa la información para crear una nueva oficina'
                  : 'Modifica la información de la oficina seleccionada'}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="nombre">Nombre de la Oficina *</Label>
                  <Input
                    id="nombre"
                    value={formData.nombre}
                    onChange={(e) =>
                      setFormData({ ...formData, nombre: e.target.value })
                    }
                    placeholder="Ej: Oficina de Atención Ciudadana"
                  />
                </div>
                <div>
                  <Label htmlFor="responsable">Responsable *</Label>
                  <Input
                    id="responsable"
                    value={formData.responsable}
                    onChange={(e) =>
                      setFormData({ ...formData, responsable: e.target.value })
                    }
                    placeholder="Nombre del responsable"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="descripcion">Descripción</Label>
                <Textarea
                  id="descripcion"
                  value={formData.descripcion}
                  onChange={(e) =>
                    setFormData({ ...formData, descripcion: e.target.value })
                  }
                  placeholder="Describe las funciones de esta oficina..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="oficina@gobierno.gov"
                  />
                </div>
                <div>
                  <Label htmlFor="telefono">Teléfono</Label>
                  <Input
                    id="telefono"
                    value={formData.telefono}
                    onChange={(e) =>
                      setFormData({ ...formData, telefono: e.target.value })
                    }
                    placeholder="+57 1 234-5678"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="activa"
                  checked={formData.activa}
                  onChange={(e) =>
                    setFormData({ ...formData, activa: e.target.checked })
                  }
                  className="rounded"
                />
                <Label htmlFor="activa">Oficina activa</Label>
              </div>

              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  onClick={limpiarFormulario}
                >
                  Cancelar
                </Button>
                <Button
                  onClick={guardarOficina}
                  disabled={
                    !formData.nombre || !formData.responsable || !formData.email
                  }
                >
                  {modoEdicion === 'crear'
                    ? 'Crear Oficina'
                    : 'Guardar Cambios'}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
