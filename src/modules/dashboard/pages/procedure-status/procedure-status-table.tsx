'use client'

import { useState, useMemo } from 'react'
import { Search, Plus, Edit } from 'lucide-react'
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

import { Badge } from '@/components/ui/badge'
import { ProcedureStatusForm } from '@/modules/dashboard/components'
import { ProcedureStatus } from '@/types'
import { cn } from '@/lib/utils'

interface ProcedureStatusTableProps {
  data: ProcedureStatus[]
}

export function ProcedureStatusTable({ data }: ProcedureStatusTableProps) {
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

  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 flex flex-col gap-6">
      <>
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-semibold">
              Estados de Procedimientos
            </h1>
            <p className="text-sm text-muted-foreground">
              Administra los estados de los procedimientos aquí.
            </p>
          </div>
          <Button
            onClick={handleAdd}
            size="sm"
          >
            <Plus className="h-4 w-4 mr-2" />
            Agregar
          </Button>
        </div>

        {/* Barra de búsqueda */}
        <div className="relative bg-white rounded-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Buscar por nombre o descripción..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </>

      <div className="rounded-md border bg-white p-2">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead>Descripción</TableHead>
              <TableHead>Etiqueta</TableHead>
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
                    <div
                      className="w-14 h-6 border"
                      style={{ backgroundColor: item.color }}
                      title={item.color}
                    ></div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={cn(
                        item.is_active
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800',
                        'rounded-full'
                      )}
                    >
                      {item.is_active ? 'Activo' : 'Inactivo'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(item)}
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Editar
                    </Button>
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

      {/* Modal del formulario */}
      <ProcedureStatusForm
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        initialData={editingItem}
      />
    </div>
  )
}
