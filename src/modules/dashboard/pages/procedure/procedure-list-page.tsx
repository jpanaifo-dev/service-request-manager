'use client'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Eye, Edit, Send } from 'lucide-react'
import Link from 'next/link'
import { ProcedureData } from '@/types'
import { cn } from '@/lib/utils'
import { APP_URL } from '@/data/constants'

interface ProcedureListPageProps {
  data: ProcedureData[]
}

export const ProcedureListPage = ({ data }: ProcedureListPageProps) => {
  const obtenerColorEstado = (estado: boolean) => {
    return estado
      ? 'bg-green-100 text-green-800 hover:bg-green-200'
      : 'bg-red-100 text-red-800 hover:bg-red-200'
  }

  const obtenerTextoEstado = (estado: boolean) => {
    return estado ? 'Activo' : 'Inactivo'
  }

  return (
    <div className="container mx-auto p-6 bg-white py-6 rounded-lg">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Código</TableHead>
              <TableHead>Descripción</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Fecha Creación</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="min-h-[400px]">
            {data.length === 0 && (
              <TableRow className="bg-white min-h-[400px] justify-center items-center">
                <TableCell
                  colSpan={6}
                  className="text-center min-h-[400px] text-gray-500 justify-center items-center"
                >
                  <div className="flex flex-col items-center justify-center h-full">
                    No hay procedimientos disponibles.
                  </div>
                </TableCell>
              </TableRow>
            )}
            {data.length > 0 &&
              data.map((procedimiento) => (
                <TableRow key={procedimiento.id}>
                  <TableCell className="font-medium">
                    {procedimiento.code}
                  </TableCell>
                  <TableCell>{procedimiento.description}</TableCell>
                  <TableCell>{procedimiento.procedure_type.name}</TableCell>
                  <TableCell>
                    <Badge
                      className={cn(
                        'cursor-pointer',
                        obtenerColorEstado(procedimiento.is_active),
                        'rounded-full'
                      )}
                    >
                      {obtenerTextoEstado(procedimiento.is_active)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(procedimiento.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Link
                        href={APP_URL.DASHBOARD.SOLICITUDES.DETAIL(
                          procedimiento.id.toString()
                        )}
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
                        href={`${APP_URL.DASHBOARD.SOLICITUDES.ACTIONS(
                          procedimiento.id.toString()
                        )}`}
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
                        href={`${APP_URL.DASHBOARD.SOLICITUDES.ACTIONS(
                          procedimiento.id.toString()
                        )}?tab=derivar`}
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
              ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
