'use client'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Edit, Mail, Phone, User } from 'lucide-react'
import { useState } from 'react'

export interface Person {
  id: number
  uuid: string
  document_number: string
  names: string
  last_name1: string
  last_name2: string
  gender: string
  email: string
  cellphone: string
  address: string | null
  document_type: number
  user: number
}

interface PersonListPageProps {
  persons?: Person[]
}

export function PersonListPage({ persons = [] }: PersonListPageProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingPerson, setEditingPerson] = useState<Person | null>(null)

  const openEditModal = (person: Person) => {
    setEditingPerson(person)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setEditingPerson(null)
  }

  return (
    <div className="conatiner mx-auto py-8 px-4 sm:px-6">
      {/* Tabla de Personas */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle>Listado de Personas</CardTitle>
              <CardDescription>
                Registro de personas en el sistema
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Documento</TableHead>
                  <TableHead>Nombres</TableHead>
                  <TableHead>Apellidos</TableHead>
                  <TableHead>Contacto</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {persons.map((person) => (
                  <TableRow key={person.uuid}>
                    <TableCell className="font-medium">
                      {person.document_number}
                    </TableCell>
                    <TableCell>{person.names}</TableCell>
                    <TableCell>
                      {person.last_name1} {person.last_name2}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center space-x-1">
                          <Mail className="w-3 h-3 text-gray-400" />
                          <span className="text-sm">{person.email}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Phone className="w-3 h-3 text-gray-400" />
                          <span className="text-sm">{person.cellphone}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openEditModal(person)}
                        >
                          <Edit className="w-3 h-3" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          //   onClick={() => onView?.(person)}
                        >
                          <User className="w-3 h-3" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {persons.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No hay personas registradas
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
