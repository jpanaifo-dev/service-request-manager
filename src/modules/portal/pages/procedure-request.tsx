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
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Alert, AlertDescription } from '@/components/ui/alert'
import {
  Search,
  UserPlus,
  FileText,
  CheckCircle,
  AlertCircle,
} from 'lucide-react'
import { DocumentType, Person, ProcedureType } from '@/types'
import { fetchPersonList } from '@/api/app'

interface Procedure {
  id?: number
  description: string
  is_active: boolean
  file: File | null
  person: number | null
  procedure_type: number | null
}

type Step = 'search' | 'create-person' | 'create-procedure' | 'success'

interface ProcedurePageProps {
  procedureTypes: ProcedureType[]
  documentTypes?: DocumentType[]
}

export const ProcedureRequestPage = ({
  procedureTypes,
  documentTypes = [],
}: ProcedurePageProps) => {
  const [step, setStep] = useState<Step>('search')
  const [searchDocument, setSearchDocument] = useState('')
  const [foundPerson, setFoundPerson] = useState<Person | null>(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const [personForm, setPersonForm] = useState<Person>({
    document_number: '',
    names: '',
    last_name1: '',
    last_name2: '',
    gender: 'F',
    email: '',
    cellphone: '',
    address: '',
    document_type: 1,
    user: null,
  })

  const [procedureForm, setProcedureForm] = useState<Procedure>({
    description: '',
    is_active: false,
    file: null,
    person: null,
    procedure_type: null,
  })

  const [createdProcedureId, setCreatedProcedureId] = useState<string>('')

  const handleSearchPerson = async () => {
    if (!searchDocument.trim()) {
      setError('Por favor ingresa un número de documento')
      return
    }

    const response = await fetchPersonList({
      document_number: searchDocument.trim(),
    })

    if (response.status === 200 && response.data?.results.length) {
      setFoundPerson(response.data?.results[0] || null)
      setProcedureForm((prev) => ({
        ...prev,
        person: response.data?.results[0]?.id || null,
      }))

      setStep('create-procedure')
      setError('')
    } else if (response.status === 200 && response.data?.results.length === 0) {
      setError(
        'No se encontró ninguna persona con ese documento. Por favor, crea una nueva persona.'
      )
      setStep('create-person')
      setPersonForm((prev) => ({
        ...prev,
        document_number: searchDocument.trim(),
      }))
    } else {
      setFoundPerson(null)
      setPersonForm((prev) => ({
        ...prev,
        document_number: searchDocument.trim(),
      }))
      setStep('create-person')
    }
  }

  const handleCreatePerson = async () => {
    setError('')

    // Validate required fields
    if (
      !personForm.names ||
      !personForm.last_name1 ||
      !personForm.email ||
      !personForm.cellphone ||
      !personForm.document_type
    ) {
      setError('Por favor completa todos los campos obligatorios')
      return
    }

    setLoading(true)

    // Simulate API call to create person
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock created person with ID
    const createdPerson: Person = {
      ...personForm,
      id: Math.floor(Math.random() * 1000) + 100,
    }

    setFoundPerson(createdPerson)
    setProcedureForm((prev) => ({ ...prev, person: createdPerson.id || null }))
    setLoading(false)
    setStep('create-procedure')
  }

  const handleCreateProcedure = async () => {
    setError('')

    if (!procedureForm.description || !procedureForm.procedure_type) {
      setError('Por favor completa todos los campos obligatorios')
      return
    }

    setLoading(true)

    // Simulate API call to create procedure
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Generate procedure ID
    const procedureId = `PROC-${Date.now().toString().slice(-6)}`
    setCreatedProcedureId(procedureId)

    setLoading(false)
    setStep('success')
  }

  const handleSearchAnother = () => {
    setSearchDocument('')
    setFoundPerson(null)
    setError('')
    setPersonForm({
      document_number: '',
      names: '',
      last_name1: '',
      last_name2: '',
      address: '',
      cellphone: '',
      document_type: null,
      email: '',
      gender: 'F',
      user: null,
    })
    setStep('search')
  }

  const handleReset = () => {
    setStep('search')
    setSearchDocument('')
    setFoundPerson(null)
    setError('')
    setPersonForm({
      document_number: '',
      names: '',
      last_name1: '',
      last_name2: '',
      gender: '',
      email: '',
      cellphone: '',
      address: '',
      document_type: null,
      user: null,
    })
    setProcedureForm({
      description: '',
      is_active: false,
      file: null,
      person: null,
      procedure_type: null,
    })
    setCreatedProcedureId('')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto py-8 px-4">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Solicitud de Trámite
          </h1>
          <p className="text-gray-600">
            Registra tu solicitud de manera rápida y segura
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4">
            {[
              { key: 'search', label: 'Buscar Persona', icon: Search },
              { key: 'create-person', label: 'Crear Persona', icon: UserPlus },
              {
                key: 'create-procedure',
                label: 'Crear Solicitud',
                icon: FileText,
              },
              { key: 'success', label: 'Confirmación', icon: CheckCircle },
            ].map((stepItem, index) => {
              const Icon = stepItem.icon
              const isActive = step === stepItem.key
              const isCompleted =
                [
                  'search',
                  'create-person',
                  'create-procedure',
                  'success',
                ].indexOf(step) > index

              return (
                <div
                  key={stepItem.key}
                  className="flex flex-col items-center"
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      isActive
                        ? 'bg-blue-600 text-white'
                        : isCompleted
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-300 text-gray-600'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <span
                    className={`text-xs mt-1 text-center ${
                      isActive ? 'text-blue-600 font-medium' : 'text-gray-500'
                    }`}
                  >
                    {stepItem.label}
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        {error && (
          <Alert className="mb-6 border-red-200 bg-red-50">
            <AlertCircle className="w-4 h-4" />
            <AlertDescription className="text-red-800">
              {error}
            </AlertDescription>
          </Alert>
        )}

        {/* Step 1: Search Person */}
        {step === 'search' && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Search className="w-5 h-5" />
                <span>Buscar Persona</span>
              </CardTitle>
              <CardDescription>
                Ingresa el número de documento para buscar la persona
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="search-document">Número de Documento</Label>
                <Input
                  id="search-document"
                  value={searchDocument}
                  onChange={(e) => setSearchDocument(e.target.value)}
                  placeholder="Ej: 12345678"
                  className="mt-1"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Documentos de prueba: 12345678, 87654321
                </p>
              </div>
              <Button
                onClick={handleSearchPerson}
                disabled={loading}
                className="w-full"
              >
                <Search className="w-4 h-4 mr-2" />
                {loading ? 'Buscando...' : 'Buscar Persona'}
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Create Person */}
        {step === 'create-person' && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <UserPlus className="w-5 h-5" />
                <span>
                  Registra tus datos personales.
                  <span className="text-red-500">*</span>
                </span>
              </CardTitle>
              <CardDescription>
                No se encontró una persona con el documento{' '}
                {personForm.document_number}. Completa los datos para crearla.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="names">Nombres *</Label>
                  <Input
                    id="names"
                    value={personForm.names}
                    onChange={(e) =>
                      setPersonForm((prev) => ({
                        ...prev,
                        names: e.target.value,
                      }))
                    }
                    placeholder="Juan Carlos"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="document-type">Tipo de Documento *</Label>
                  <Select
                    value={personForm.document_type?.toString() || ''}
                    onValueChange={(value) =>
                      setPersonForm((prev) => ({
                        ...prev,
                        document_type: Number.parseInt(value),
                      }))
                    }
                  >
                    <SelectTrigger className="mt-1 w-full">
                      <SelectValue placeholder="Seleccionar" />
                    </SelectTrigger>
                    <SelectContent>
                      {documentTypes.map((type) => (
                        <SelectItem
                          key={type.id}
                          value={type.id.toString()}
                        >
                          {type.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="last-name1">Primer Apellido *</Label>
                  <Input
                    id="last-name1"
                    value={personForm.last_name1}
                    onChange={(e) =>
                      setPersonForm((prev) => ({
                        ...prev,
                        last_name1: e.target.value,
                      }))
                    }
                    placeholder="Pérez"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="last-name2">Segundo Apellido</Label>
                  <Input
                    id="last-name2"
                    value={personForm.last_name2}
                    onChange={(e) =>
                      setPersonForm((prev) => ({
                        ...prev,
                        last_name2: e.target.value,
                      }))
                    }
                    placeholder="González"
                    className="mt-1"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={personForm.email}
                    onChange={(e) =>
                      setPersonForm((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                    placeholder="juan@email.com"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="cellphone">Teléfono *</Label>
                  <Input
                    id="cellphone"
                    value={personForm.cellphone}
                    onChange={(e) =>
                      setPersonForm((prev) => ({
                        ...prev,
                        cellphone: e.target.value,
                      }))
                    }
                    placeholder="3001234567"
                    className="mt-1"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="gender">Género</Label>
                  <Select
                    value={personForm.gender || ''}
                    onValueChange={(value) =>
                      setPersonForm((prev) => ({ ...prev, gender: value }))
                    }
                  >
                    <SelectTrigger className="mt-1 w-full">
                      <SelectValue placeholder="Seleccionar" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="M">Masculino</SelectItem>
                      <SelectItem value="F">Femenino</SelectItem>
                      <SelectItem value="O">Otro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="address">Dirección</Label>
                  <Input
                    id="address"
                    value={personForm.address || ''}
                    onChange={(e) =>
                      setPersonForm((prev) => ({
                        ...prev,
                        address: e.target.value,
                      }))
                    }
                    placeholder="Calle 123 #45-67"
                    className="mt-1"
                  />
                </div>
              </div>

              <div className="flex space-x-3">
                <Button
                  onClick={handleSearchAnother}
                  variant="outline"
                  className="flex-1 bg-transparent"
                >
                  Buscar Otro Documento
                </Button>
                <Button
                  onClick={handleCreatePerson}
                  disabled={loading}
                  className="flex-1"
                >
                  {loading ? 'Creando...' : 'Crear Persona'}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Create Procedure */}
        {step === 'create-procedure' && foundPerson && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="w-5 h-5" />
                <span>Registrar Solicitud</span>
              </CardTitle>
              <CardDescription>
                Solicitud para: {foundPerson.names} {foundPerson.last_name1}{' '}
                {foundPerson.last_name2}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert className="border-blue-200 bg-blue-50">
                <AlertDescription className="text-blue-800">
                  <strong>Persona:</strong> {foundPerson.names}{' '}
                  {foundPerson.last_name1} {foundPerson.last_name2} -{' '}
                  {foundPerson.document_number}
                </AlertDescription>
              </Alert>

              <div>
                <Label htmlFor="procedure-type">Tipo de Trámite *</Label>
                <Select
                  value={procedureForm.procedure_type?.toString() || ''}
                  onValueChange={(value) =>
                    setProcedureForm((prev) => ({
                      ...prev,
                      procedure_type: Number.parseInt(value),
                    }))
                  }
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Seleccionar tipo de trámite" />
                  </SelectTrigger>
                  <SelectContent>
                    {procedureTypes.map((type) => (
                      <SelectItem
                        key={type.id}
                        value={type.id.toString()}
                      >
                        {type.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="description">Descripción *</Label>
                <Textarea
                  id="description"
                  value={procedureForm.description}
                  onChange={(e) =>
                    setProcedureForm((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  placeholder="Describe detalladamente tu solicitud..."
                  className="mt-1 min-h-[100px]"
                />
              </div>

              <div>
                <Label htmlFor="file">Archivo Adjunto (Opcional)</Label>
                <Input
                  id="file"
                  type="file"
                  onChange={(e) =>
                    setProcedureForm((prev) => ({
                      ...prev,
                      file: e.target.files?.[0] || null,
                    }))
                  }
                  className="mt-1"
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                />
              </div>

              <div className="flex space-x-3">
                <Button
                  onClick={handleSearchAnother}
                  variant="outline"
                  className="flex-1 bg-transparent"
                >
                  Buscar Otra Persona
                </Button>
                <Button
                  onClick={handleCreateProcedure}
                  disabled={loading}
                  className="flex-1"
                >
                  {loading ? 'Registrando...' : 'Registrar Solicitud'}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 4: Success */}
        {step === 'success' && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-green-600">
                <CheckCircle className="w-5 h-5" />
                <span>¡Solicitud Registrada Exitosamente!</span>
              </CardTitle>
              <CardDescription>
                Tu solicitud ha sido creada y está siendo procesada
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert className="border-green-200 bg-green-50">
                <CheckCircle className="w-4 h-4" />
                <AlertDescription className="text-green-800">
                  <strong>ID de Solicitud:</strong> {createdProcedureId}
                </AlertDescription>
              </Alert>

              <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                <h3 className="font-semibold text-gray-900">Resumen:</h3>
                <p>
                  <strong>Solicitante:</strong> {foundPerson?.names}{' '}
                  {foundPerson?.last_name1}
                </p>
                <p>
                  <strong>Documento:</strong> {foundPerson?.document_number}
                </p>
                <p>
                  <strong>Tipo:</strong>{' '}
                  {
                    procedureTypes.find(
                      (t) => t.id === procedureForm.procedure_type
                    )?.name
                  }
                </p>
                <p>
                  <strong>Estado:</strong>{' '}
                  <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm">
                    Pendiente
                  </span>
                </p>
              </div>

              <Button
                onClick={handleReset}
                className="w-full"
              >
                Nueva Solicitud
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
