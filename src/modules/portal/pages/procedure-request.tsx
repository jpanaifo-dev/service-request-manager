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
  Eye,
  File,
} from 'lucide-react'
import { DocumentType, Person, ProcedureType } from '@/types'
import {
  fetchPersonList,
  createOrUpdatePerson,
  createOrUpdateProcedure,
} from '@/api/app'
import { IPersonFormData } from '@/schemas'
import { FileUpload } from '../components/file-upload'
import { SuccessConfirmation } from './success-confirmation'

interface Procedure {
  id?: number
  description: string
  is_active: boolean
  file: File | null
  person: number | null
  procedure_type: number | null
}

type Step =
  | 'search'
  | 'create-person'
  | 'create-procedure'
  | 'confirmation'
  | 'success'

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
  const [loadingPerson, setLoadingPerson] = useState(false)
  const [loadingFile, setLoadingFile] = useState(false)
  const [progressFile, setProgressFile] = useState(0)

  const [personForm, setPersonForm] = useState<IPersonFormData>({
    document_number: '',
    names: '',
    last_name1: '',
    last_name2: '',
    gender: 1, // Default
    email: '',
    cellphone: '',
    address: '',
    document_type: '',
  })

  const [codeCreatedProcedure, setCodeCreatedProcedure] = useState<
    string | null
  >(null)

  const [procedureForm, setProcedureForm] = useState<Procedure>({
    description: '',
    is_active: false,
    file: null,
    person: null,
    procedure_type: null,
  })

  const handleSearchPerson = async () => {
    if (!searchDocument.trim()) {
      setError('Por favor ingresa un número de documento')
      return
    }

    setLoadingPerson(true)
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
        document_type: documentTypes.length
          ? documentTypes[0].id.toString()
          : '',
      }))
    } else {
      setFoundPerson(null)
      setPersonForm((prev) => ({
        ...prev,
        document_number: searchDocument.trim(),
        document_type: documentTypes.length
          ? documentTypes[0].id.toString()
          : '',
      }))
      setStep('create-person')
    }
    setLoadingPerson(false)
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

    // Mock created person with ID
    const responsePerson = await createOrUpdatePerson({
      data: personForm,
    })

    if (responsePerson?.status !== 201) {
      setError('Error al crear la persona. Inténtalo de nuevo.')
      setLoading(false)
      return
    }
    setFoundPerson(responsePerson.data || null)
    setProcedureForm((prev) => ({
      ...prev,
      person: responsePerson.data?.id || null,
    }))
    setLoading(false)
    setStep('create-procedure')
  }

  const handleCreateProcedure = async () => {
    setError('')

    if (!procedureForm.description || !procedureForm.procedure_type) {
      setError('Por favor completa todos los campos obligatorios')
      return
    }

    // Go to confirmation step instead of creating immediately
    setStep('confirmation')
  }

  const handleConfirmProcedure = async () => {
    setLoading(true)

    try {
      const response = await createOrUpdateProcedure({
        data: {
          description: procedureForm.description,
          file: procedureForm.file,
          is_active: true,
          person: procedureForm.person,
          procedure_type: procedureForm.procedure_type,
        },
      })

      if (response.status !== 201) {
        setError('Error al registrar la solicitud. Inténtalo de nuevo.')
        setLoading(false)
        return
      }
      if (response.data?.code) {
        setCodeCreatedProcedure(response?.data?.code || null)
      }
      setStep('success')
      setLoading(false)
    } catch (error) {
      console.error('Error creating procedure:', error)
      setError('Error al registrar la solicitud. Inténtalo de nuevo.')
      setLoading(false)
      return
    }
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
      document_type: documentTypes.length ? documentTypes[0].id.toString() : '',
      email: '',
      gender: 1, // Default
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
      gender: 1,
      email: '',
      cellphone: '',
      address: '',
      document_type: documentTypes.length ? documentTypes[0].id.toString() : '',
    })
    setProcedureForm({
      description: '',
      is_active: false,
      file: null,
      person: null,
      procedure_type: null,
    })
  }

  const handleFileChange = (file: File | null) => {
    if (file && file.type !== 'application/pdf') {
      setError('El archivo debe ser un PDF')
      return
    }
    if (file && file.size > 2 * 1024 * 1024) {
      setError('El archivo no debe exceder los 2MB')
      return
    }
    setLoadingFile(true)
    setProcedureForm((prev) => ({
      ...prev,
      file: file,
    }))
    new Promise((resolve) => setTimeout(resolve, 500)).then(() =>
      setLoadingFile(false)
    )
    setError('')
  }

  useEffect(() => {
    if (loadingFile) {
      let progress = 0
      const interval = setInterval(() => {
        progress += 10
        setProgressFile(progress)
        if (progress >= 100) {
          setLoadingFile(false)
          clearInterval(interval)
        }
      }, 100)
      return () => clearInterval(interval)
    } else {
      setProgressFile(0)
    }
  }, [loadingFile])

  const handleEditProcedure = () => {
    setStep('create-procedure')
  }

  // Get procedure type name
  const getProcedureTypeName = () => {
    if (!procedureForm.procedure_type) return 'No seleccionado'
    const type = procedureTypes.find(
      (t) => t.id === procedureForm.procedure_type
    )
    return type ? type.name : 'No seleccionado'
  }

  // Get document type name
  const getDocumentTypeName = () => {
    if (!personForm.document_type) return 'No seleccionado'
    const type = documentTypes.find(
      (t) => t.id.toString() === personForm.document_type.toString()
    )
    return type ? type.name : 'No seleccionado'
  }

  return (
    <div className="min-h-screen bg-gray-100">
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
              { key: 'confirmation', label: 'Confirmación', icon: Eye },
              { key: 'success', label: 'Completado', icon: CheckCircle },
            ].map((stepItem, index) => {
              const Icon = stepItem.icon
              const isActive = step === stepItem.key
              const isCompleted =
                [
                  'search',
                  'create-person',
                  'create-procedure',
                  'confirmation',
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
              </div>
              <Button
                onClick={handleSearchPerson}
                disabled={loadingPerson}
                className="w-full"
              >
                <Search className="w-4 h-4 mr-2" />
                {loadingPerson ? 'Buscando...' : 'Buscar Persona'}
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
                        document_type: value,
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
                    value={personForm?.gender?.toString() || ''}
                    onValueChange={(value) =>
                      setPersonForm((prev) => ({
                        ...prev,
                        gender: Number.parseInt(value),
                      }))
                    }
                  >
                    <SelectTrigger className="mt-1 w-full">
                      <SelectValue placeholder="Seleccionar" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Masculino</SelectItem>
                      <SelectItem value="2">Femenino</SelectItem>
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
                Solicitud creada por: {foundPerson.names}{' '}
                {foundPerson.last_name1} {foundPerson.last_name2}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-white border rounded-lg p-4 mb-4 flex flex-col gap-2">
                <div className="flex items-center gap-2 mb-2">
                  <UserPlus className="w-4 h-4 text-blue-500" />
                  <span className="font-medium text-gray-900 text-sm">
                    Datos de la Persona
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs text-gray-700">
                  <div>
                    <span className="block font-semibold">Nombre</span>
                    <span>
                      {foundPerson.names} {foundPerson.last_name1}{' '}
                      {foundPerson.last_name2}
                    </span>
                  </div>
                  <div>
                    <span className="block font-semibold">Documento</span>
                    <span>{foundPerson.document_number}</span>
                  </div>
                  <div>
                    <span className="block font-semibold">Email</span>
                    <span>
                      {foundPerson.email
                        ? `${foundPerson.email.slice(
                            0,
                            3
                          )}...${foundPerson.email.slice(
                            foundPerson.email.indexOf('@')
                          )}`
                        : ''}
                    </span>
                  </div>
                  <div>
                    <span className="block font-semibold">Teléfono</span>
                    <span>
                      {foundPerson.cellphone
                        ? `${foundPerson.cellphone[0]}${'*'.repeat(
                            foundPerson.cellphone.length - 4
                          )}${foundPerson.cellphone.slice(-3)}`
                        : ''}
                    </span>
                  </div>
                </div>
              </div>

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
                  <SelectTrigger className="mt-1 w-full">
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
                {/* <Label htmlFor="file">Archivo Adjunto (PDF, máx 2MB)</Label>
                <div
                  className={`border-2 border-dashed rounded-lg p-4 mt-1 flex flex-col items-center justify-center transition-colors duration-200 ${
                    procedureForm.file
                      ? 'border-green-400 bg-green-50'
                      : 'border-gray-300 bg-gray-100 hover:border-blue-400 hover:bg-blue-50'
                  }`}
                  onDragOver={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                  }}
                  onDrop={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    const file = e.dataTransfer.files?.[0] || null
                    handleFileChange(file)
                  }}
                >
                  {!procedureForm.file ? (
                    <>
                      <span className="text-gray-500 text-sm mb-2">
                        Arrastra el archivo PDF aquí o haz clic para seleccionar
                      </span>
                      <Input
                        id="file"
                        type="file"
                        accept=".pdf,application/pdf"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0] || null
                          handleFileChange(file)
                        }}
                      />
                      <Button
                        variant="outline"
                        className="mt-2"
                        onClick={() => {
                          document.getElementById('file')?.click()
                        }}
                      >
                        Seleccionar Archivo
                      </Button>
                    </>
                  ) : (
                    <div className="w-full flex flex-col items-center">
                      <span className="text-green-700 font-medium mb-1">
                        {procedureForm.file.name}
                      </span>
                      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mb-2">
                        <div
                          className="h-full bg-blue-500 animate-progress"
                          style={{ width: loading ? '100%' : '0%' }}
                        />
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-500"
                        onClick={() =>
                          setProcedureForm((prev) => ({
                            ...prev,
                            file: null,
                          }))
                        }
                      >
                        Quitar Archivo
                      </Button>
                    </div>
                  )}
                </div> */}
                <FileUpload
                  value={procedureForm.file}
                  onChange={handleFileChange}
                  progress={progressFile}
                  disabled={loadingFile || loading}
                  placeholder="Adjunta un archivo PDF (máx 2MB)"
                  accept="application/pdf"
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
                  {loading ? 'Registrando...' : 'Continuar a Confirmación'}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 4: Confirmation */}
        {step === 'confirmation' && foundPerson && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Eye className="w-5 h-5" />
                <span>Confirmar Solicitud</span>
              </CardTitle>
              <CardDescription>
                Revisa toda la información antes de registrar la solicitud
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h3 className="font-semibold text-blue-800 mb-3 text-center">
                  Vista Previa de la Solicitud
                </h3>

                <div className="grid grid-cols-1 gap-4">
                  <div className="bg-white p-4 rounded-lg border">
                    <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                      <UserPlus className="w-4 h-4 mr-2 text-blue-500" />
                      Datos del Solicitante
                    </h4>
                    <div className="space-y-2 text-sm">
                      <p>
                        <span className="font-medium">Nombre:</span>{' '}
                        {foundPerson.names} {foundPerson.last_name1}{' '}
                        {foundPerson.last_name2}
                      </p>
                      <p>
                        <span className="font-medium">Documento:</span>{' '}
                        {foundPerson.document_number}
                      </p>
                      <p>
                        <span className="font-medium">Tipo de documento:</span>{' '}
                        {getDocumentTypeName()}
                      </p>
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-lg border">
                    <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                      <FileText className="w-4 h-4 mr-2 text-blue-500" />
                      Detalles del Trámite
                    </h4>
                    <div className="space-y-2 text-sm">
                      <p>
                        <span className="font-medium">Tipo de trámite:</span>{' '}
                        {getProcedureTypeName()}
                      </p>
                      <p>
                        <span className="font-medium">Descripción:</span>
                      </p>
                      <div className="bg-gray-50 p-3 rounded text-sm mt-1">
                        {procedureForm.description}
                      </div>
                      <p>
                        <span className="font-medium">Archivo adjunto:</span>
                      </p>
                      <div className="flex items-center mt-1">
                        {procedureForm.file ? (
                          <div className="flex items-center text-green-600">
                            <File className="w-4 h-4 mr-1" />
                            <span className="text-sm">
                              {procedureForm.file.name}
                            </span>
                          </div>
                        ) : (
                          <span className="text-sm text-gray-500">
                            Ningún archivo adjunto
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <h4 className="font-medium text-yellow-800 mb-2 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-2 text-yellow-600" />
                  Confirmación requerida
                </h4>
                <p className="text-sm text-yellow-700">
                  Por favor verifica que toda la información es correcta antes
                  de proceder con el registro. Una vez confirmado, la solicitud
                  será registrada en el sistema.
                </p>
              </div>

              <div className="flex space-x-3">
                <Button
                  onClick={handleEditProcedure}
                  variant="outline"
                  className="flex-1 bg-transparent"
                >
                  Editar Solicitud
                </Button>
                <Button
                  onClick={handleConfirmProcedure}
                  disabled={loading}
                  className="flex-1 "
                >
                  {loading ? 'Registrando...' : 'Confirmar y Registrar'}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 5: Success */}
        {step === 'success' && (
          <SuccessConfirmation
            codeProcedure={codeCreatedProcedure}
            foundPerson={foundPerson}
            handleReset={handleReset}
            procedureForm={procedureForm}
            procedureTypes={procedureTypes}
          />
        )}
      </div>
    </div>
  )
}
