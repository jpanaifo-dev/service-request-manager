'use client'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { IOffices } from '@/types'
import { Edit, Mail, Phone, Plus, Search, Filter } from 'lucide-react'
import { OfficeForm } from '../components/office-form'
import { useState } from 'react'

interface OfficesPageProps {
  officesList?: IOffices[]
}

export function OfficesPage({ officesList }: OfficesPageProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState<'name' | 'code' | 'email'>('name')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingOffice, setEditingOffice] = useState<IOffices | null>(null)

  const openModal = (office?: IOffices) => {
    setEditingOffice(office || null)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setEditingOffice(null)
  }

  const filteredAndSortedOffices = officesList
    ? officesList
        .filter((office) => {
          const searchLower = searchTerm.toLowerCase()
          return (
            office.name.toLowerCase().includes(searchLower) ||
            office.code.toLowerCase().includes(searchLower) ||
            office.email.toLowerCase().includes(searchLower) ||
            office.phone.toLowerCase().includes(searchLower)
          )
        })
        .sort((a, b) => {
          const aValue =
            sortBy === 'name' ? a.name : sortBy === 'code' ? a.code : a.email
          const bValue =
            sortBy === 'name' ? b.name : sortBy === 'code' ? b.code : b.email
          if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1
          if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1
          return 0
        })
    : []

  const openCreateModal = () => {
    openModal()
  }

  const openEditModal = (office: IOffices) => {
    openModal(office)
  }

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      {/* Tabla de Oficinas */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle>Gestión de Oficinas</CardTitle>
              <CardDescription>
                Administra las oficinas del sistema
              </CardDescription>
            </div>
            <Button onClick={openCreateModal}>
              <Plus className="w-4 h-4 mr-2" />
              Nueva Oficina
            </Button>
          </div>

          {/* Buscador y Filtros */}
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Buscar por nombre, código, email o teléfono..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex gap-2">
              <Select
                value={sortBy}
                onValueChange={(value: 'name' | 'code' | 'email') =>
                  setSortBy(value)
                }
              >
                <SelectTrigger className="w-32">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Nombre</SelectItem>
                  <SelectItem value="code">Código</SelectItem>
                  <SelectItem value="email">Email</SelectItem>
                </SelectContent>
              </Select>

              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
                }
              >
                {sortOrder === 'asc' ? '↑' : '↓'}
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Código</TableHead>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Teléfono</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAndSortedOffices.map((office) => (
                  <TableRow key={office.id}>
                    <TableCell className="font-medium">{office.code}</TableCell>
                    <TableCell>{office.name}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <Phone className="w-3 h-3 text-gray-400" />
                        <span className="text-sm">{office.phone}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <Mail className="w-3 h-3 text-gray-400" />
                        <span className="text-sm">{office.email}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openEditModal(office)}
                        >
                          <Edit className="w-3 h-3" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {filteredAndSortedOffices.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No se encontraron oficinas que coincidan con la búsqueda
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Modal Crear/Editar Oficina */}
      <Dialog
        open={isModalOpen}
        onOpenChange={closeModal}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingOffice ? 'Editar Oficina' : 'Nueva Oficina'}
            </DialogTitle>
            <DialogDescription>
              {editingOffice
                ? 'Modifica la información de la oficina seleccionada'
                : 'Completa la información para crear una nueva oficina'}
            </DialogDescription>
          </DialogHeader>

          <OfficeForm
            office={editingOffice}
            onSuccess={() => {
              closeModal()
            }}
            onCancel={closeModal}
            isEditing={!!editingOffice}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}
