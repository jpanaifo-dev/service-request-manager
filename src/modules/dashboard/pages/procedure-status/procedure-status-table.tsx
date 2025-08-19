'use client'

import { useState, useMemo } from 'react'
import { Search, Plus, Edit, Trash2, MoreHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ProcedureStatusForm } from '@/modules/dashboard/components'
import { ProcedureStatus } from '@/types'
import { ProcedureStatusFormData } from '@/schemas'

interface ProcedureStatusTableProps {
  data: ProcedureStatus[]
  onAdd?: (data: ProcedureStatusFormData) => void
  onEdit?: (id: number, data: ProcedureStatusFormData) => void
  onDelete?: (id: number) => void
  isLoading?: boolean
}

export function ProcedureStatusTable({
  data,
  onAdd,
  onEdit,
  onDelete,
  isLoading = false,
}: ProcedureStatusTableProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<ProcedureStatus | null>(null)

  // Filtrar datos basado en el término de búsqueda
  const filteredData = useMemo(() => {
    if (!searchTerm) return data

    return data.filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [data, searchTerm])

  const handleAdd = () => {
    setEditingItem(null)
    setIsFormOpen(true)
  }

  const handleEdit = (item: ProcedureStatus) => {
    setEditingItem(item)
    setIsFormOpen(true)
  }

  const handleFormSubmit = (formData: ProcedureStatusFormData) => {
    if (editingItem) {
      onEdit?.(editingItem.id, formData)
    } else {
      onAdd?.(formData)
    }
    setIsFormOpen(false)
    setEditingItem(null)
  }

  const handleDelete = (id: number) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este elemento?')) {
      onDelete?.(id)
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Estados de Procedimiento</CardTitle>
          <Button
            onClick={handleAdd}
            size="sm"
          >
            <Plus className="h-4 w-4 mr-2" />
            Agregar
          </Button>
        </div>

        {/* Barra de búsqueda */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Buscar por nombre o descripción..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </CardHeader>

      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Nombre</TableHead>
                <TableHead>Descripción</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="text-center py-8 text-muted-foreground"
                  >
                    {searchTerm
                      ? 'No se encontraron resultados'
                      : 'No hay datos disponibles'}
                  </TableCell>
                </TableRow>
              ) : (
                filteredData.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.id}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell
                      className="max-w-xs truncate"
                      title={item.description}
                    >
                      {item.description}
                    </TableCell>
                    <TableCell>
                      <Badge variant={item.is_active ? 'default' : 'secondary'}>
                        {item.is_active ? 'Activo' : 'Inactivo'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleEdit(item)}>
                            <Edit className="h-4 w-4 mr-2" />
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDelete(item.id)}
                            className="text-destructive"
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Eliminar
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Información de resultados */}
        {data.length > 0 && (
          <div className="flex items-center justify-between text-sm text-muted-foreground mt-4">
            <div>
              Mostrando {filteredData.length} de {data.length} resultados
            </div>
            {searchTerm && (
              <div>
                Filtrado por:
                {`"${searchTerm}"`}
              </div>
            )}
          </div>
        )}
      </CardContent>

      {/* Modal del formulario */}
      <ProcedureStatusForm
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        onSubmit={handleFormSubmit}
        initialData={editingItem}
        isLoading={isLoading}
      />
    </Card>
  )
}
