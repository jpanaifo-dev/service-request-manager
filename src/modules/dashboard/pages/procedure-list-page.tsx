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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  solicitudesSimuladas,
  usuariosSimulados,
  obtenerColorEstado,
  type Solicitud,
} from '@/lib/data'
import { Eye, Edit, Send, Search, Filter } from 'lucide-react'
import Link from 'next/link'

export const ProcedureListPage = () => {
  const [solicitudes] = useState<Solicitud[]>(solicitudesSimuladas)
  const [filtroEstado, setFiltroEstado] = useState<string>('todos')
  const [filtroTipo, setFiltroTipo] = useState<string>('todos')
  const [busqueda, setBusqueda] = useState<string>('')
  const [isAuthenticated] = useState(true)

  const solicitudesFiltradas = solicitudes.filter((sol) => {
    const usuario = usuariosSimulados.find(
      (u) => u.documento === sol.usuarioDocumento
    )
    const matchEstado = filtroEstado === 'todos' || sol.estado === filtroEstado
    const matchTipo = filtroTipo === 'todos' || sol.tipo === filtroTipo
    const matchBusqueda =
      busqueda === '' ||
      sol.id.toLowerCase().includes(busqueda.toLowerCase()) ||
      sol.descripcion.toLowerCase().includes(busqueda.toLowerCase()) ||
      usuario?.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      usuario?.apellido.toLowerCase().includes(busqueda.toLowerCase()) ||
      usuario?.documento.includes(busqueda)

    return matchEstado && matchTipo && matchBusqueda
  })

  if (!isAuthenticated) {
    return <div>Verificando autenticación...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Filtros y Búsqueda */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Filter className="w-5 h-5" />
              <span>Filtros y Búsqueda</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4">
              <div>
                <Label htmlFor="busqueda">Buscar</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <Input
                    id="busqueda"
                    placeholder="ID, nombre, documento..."
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="filtro-estado">Estado</Label>
                <Select
                  value={filtroEstado}
                  onValueChange={setFiltroEstado}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos los Estados</SelectItem>
                    <SelectItem value="pendiente">Pendientes</SelectItem>
                    <SelectItem value="en-revision">En Revisión</SelectItem>
                    <SelectItem value="aprobada">Aprobadas</SelectItem>
                    <SelectItem value="completada">Completadas</SelectItem>
                    <SelectItem value="rechazada">Rechazadas</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="filtro-tipo">Tipo</Label>
                <Select
                  value={filtroTipo}
                  onValueChange={setFiltroTipo}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos los Tipos</SelectItem>
                    <SelectItem value="Certificado de Residencia">
                      Certificado de Residencia
                    </SelectItem>
                    <SelectItem value="Certificado Laboral">
                      Certificado Laboral
                    </SelectItem>
                    <SelectItem value="Permiso de Construcción">
                      Permiso de Construcción
                    </SelectItem>
                    <SelectItem value="Registro Mercantil">
                      Registro Mercantil
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-end">
                <Button
                  variant="outline"
                  onClick={() => {
                    setBusqueda('')
                    setFiltroEstado('todos')
                    setFiltroTipo('todos')
                  }}
                  className="w-full"
                >
                  Limpiar Filtros
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabla de Solicitudes */}
        <Card>
          <CardHeader>
            <CardTitle>Solicitudes ({solicitudesFiltradas.length})</CardTitle>
            <CardDescription>
              Gestiona el estado y seguimiento de todas las solicitudes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Solicitante</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {solicitudesFiltradas.map((solicitud) => {
                    const usuario = usuariosSimulados.find(
                      (u) => u.documento === solicitud.usuarioDocumento
                    )
                    return (
                      <TableRow key={solicitud.id}>
                        <TableCell className="font-medium">
                          {solicitud.id}
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">
                              {usuario?.nombre} {usuario?.apellido}
                            </p>
                            <p className="text-sm text-gray-600">
                              {usuario?.documento}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>{solicitud.tipo}</TableCell>
                        <TableCell>
                          <Badge
                            className={obtenerColorEstado(solicitud.estado)}
                          >
                            {solicitud.estado.charAt(0).toUpperCase() +
                              solicitud.estado.slice(1)}
                          </Badge>
                        </TableCell>
                        {/* <TableCell>{solicitud.fechaSolicitud}</TableCell> */}
                        <TableCell>
                          <div className="flex space-x-2">
                            <Link
                              href={`/dashboard/solicitudes/${solicitud.id}`}
                            >
                              <Button
                                variant="outline"
                                size="sm"
                              >
                                <Eye className="w-3 h-3 mr-1" />
                                Ver
                              </Button>
                            </Link>

                            <Link
                              href={`/dashboard/solicitudes/${solicitud.id}/acciones`}
                            >
                              <Button
                                variant="outline"
                                size="sm"
                              >
                                <Edit className="w-3 h-3 mr-1" />
                                Gestionar
                              </Button>
                            </Link>

                            <Link
                              href={`/dashboard/solicitudes/${solicitud.id}/acciones?tab=derivar`}
                            >
                              <Button
                                variant="outline"
                                size="sm"
                              >
                                <Send className="w-3 h-3 mr-1" />
                                Derivar
                              </Button>
                            </Link>
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
      </div>
    </div>
  )
}
