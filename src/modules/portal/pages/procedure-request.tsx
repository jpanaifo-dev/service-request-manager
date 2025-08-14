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
  buscarUsuarioPorDocumento,
  tiposSolicitud,
  generarCodigoVerificacion,
  type User,
} from '@/lib/data'
import {
  Search,
  UserIcon,
  FileText,
  Send,
  CheckCircle,
  Info,
  HelpCircle,
  Shield,
} from 'lucide-react'

type Step = 'buscar' | 'datos' | 'solicitud' | 'verificacion' | 'confirmacion'

export const ProcedureRequestPage = () => {
  const [step, setStep] = useState<Step>('buscar')
  const [documento, setDocumento] = useState('')
  const [usuario, setUsuario] = useState<User | null>(null)
  const [emailActual, setEmailActual] = useState('')
  const [telefonoActual, setTelefonoActual] = useState('')
  const [tipoSolicitud, setTipoSolicitud] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [archivos, setArchivos] = useState<FileList | null>(null)
  const [codigoVerificacion, setCodigoVerificacion] = useState('')
  const [codigoGenerado, setCodigoGenerado] = useState('')
  const [solicitudId, setSolicitudId] = useState('')
  const [error, setError] = useState('')

  const buscarUsuario = () => {
    setError('')
    const usuarioEncontrado = buscarUsuarioPorDocumento(documento)

    if (usuarioEncontrado) {
      setUsuario(usuarioEncontrado)
      setEmailActual(usuarioEncontrado.email)
      setTelefonoActual(usuarioEncontrado.telefono)
      setStep('datos')
    } else {
      setError('No se encontró un usuario con ese número de documento')
    }
  }

  const continuarConDatos = () => {
    if (!emailActual || !telefonoActual) {
      setError('Por favor completa todos los campos')
      return
    }
    setError('')
    setStep('solicitud')
  }

  const enviarSolicitud = () => {
    if (!tipoSolicitud || !descripcion) {
      setError('Por favor completa todos los campos obligatorios')
      return
    }

    const codigo = generarCodigoVerificacion()
    setCodigoGenerado(codigo)
    setError('')

    alert(
      `Código de verificación enviado: ${codigo}\n\n💡 Para esta demostración, el código siempre es: 1122`
    )
    setStep('verificacion')
  }

  const verificarCodigo = () => {
    if (codigoVerificacion !== codigoGenerado) {
      setError('Código de verificación incorrecto')
      return
    }

    // Generar ID de solicitud
    const id = `SOL-${Date.now().toString().slice(-6)}`
    setSolicitudId(id)
    setError('')
    setStep('confirmacion')
  }

  const reiniciar = () => {
    setStep('buscar')
    setDocumento('')
    setUsuario(null)
    setEmailActual('')
    setTelefonoActual('')
    setTipoSolicitud('')
    setDescripcion('')
    setArchivos(null)
    setCodigoVerificacion('')
    setCodigoGenerado('')
    setSolicitudId('')
    setError('')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Portal Ciudadano
          </h1>
          <p className="text-gray-600">
            Crea y gestiona tus solicitudes de servicios
          </p>
        </div>

        <Card className="mb-6 border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-blue-800">
              <Info className="w-5 h-5" />
              <span>Proceso de Solicitud - Guía Paso a Paso</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="text-blue-700">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2">📋 Pasos del Proceso:</h4>
                <ol className="text-sm space-y-1 list-decimal list-inside">
                  <li>
                    <strong>Identificación:</strong> Ingresa tu documento
                  </li>
                  <li>
                    <strong>Datos:</strong> Verifica tu información personal
                  </li>
                  <li>
                    <strong>Solicitud:</strong> Completa los detalles
                  </li>
                  <li>
                    <strong>Verificación:</strong> Confirma con código 1122
                  </li>
                  <li>
                    <strong>Confirmación:</strong> Recibe tu número de
                    seguimiento
                  </li>
                </ol>
              </div>
              <div>
                <h4 className="font-semibold mb-2">
                  🔐 Información de Seguridad:
                </h4>
                <div className="text-sm space-y-1">
                  <p>
                    • Código de verificación: <strong>1122</strong>
                  </p>
                  <p>• Documentos de prueba disponibles</p>
                  <p>• Proceso 100% seguro y encriptado</p>
                  <p>• Seguimiento en tiempo real</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {[
              { key: 'buscar', label: 'Identificación', icon: Search },
              { key: 'datos', label: 'Datos', icon: UserIcon },
              { key: 'solicitud', label: 'Solicitud', icon: FileText },
              { key: 'verificacion', label: 'Verificación', icon: Send },
              { key: 'confirmacion', label: 'Confirmación', icon: CheckCircle },
            ].map((stepItem, index) => {
              const Icon = stepItem.icon
              const isActive = step === stepItem.key
              const isCompleted =
                [
                  'buscar',
                  'datos',
                  'solicitud',
                  'verificacion',
                  'confirmacion',
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
                    className={`text-sm mt-2 ${
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
            <AlertDescription className="text-red-800">
              {error}
            </AlertDescription>
          </Alert>
        )}

        {/* Step 1: Buscar Usuario */}
        {step === 'buscar' && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Search className="w-5 h-5" />
                <span>Paso 1: Identificación</span>
              </CardTitle>
              <CardDescription>
                Ingresa tu número de documento para acceder a tus datos
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert className="border-green-200 bg-green-50">
                <HelpCircle className="w-4 h-4" />
                <AlertDescription className="text-green-800">
                  <strong>Instrucciones:</strong> Ingresa tu número de documento
                  de identidad sin puntos ni espacios. El sistema buscará
                  automáticamente tu información registrada.
                </AlertDescription>
              </Alert>

              <div>
                <Label htmlFor="documento">Número de Documento</Label>
                <Input
                  id="documento"
                  value={documento}
                  onChange={(e) => setDocumento(e.target.value)}
                  placeholder="Ej: 12345678"
                  className="mt-1"
                />
                <div className="mt-2 p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 font-medium mb-1">
                    📋 Documentos de prueba disponibles:
                  </p>
                  <div className="text-sm text-gray-500 space-y-1">
                    <p>
                      <strong>12345678</strong> - Juan Pérez (Cédula activa)
                    </p>
                    <p>
                      <strong>87654321</strong> - María García (Cédula activa)
                    </p>
                    <p>
                      <strong>11223344</strong> - Carlos López (Cédula activa)
                    </p>
                  </div>
                </div>
              </div>
              <Button
                onClick={buscarUsuario}
                className="w-full"
              >
                <Search className="w-4 h-4 mr-2" />
                Buscar Datos
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Datos del Usuario */}
        {step === 'datos' && usuario && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <UserIcon className="w-5 h-5" />
                <span>Paso 2: Verificación de Datos</span>
              </CardTitle>
              <CardDescription>
                Verifica y actualiza tu información de contacto
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert className="border-blue-200 bg-blue-50">
                <Info className="w-4 h-4" />
                <AlertDescription className="text-blue-800">
                  <strong>Instrucciones:</strong> Revisa que tu información sea
                  correcta. Puedes actualizar tu email y teléfono si han
                  cambiado. Estos datos se usarán para enviarte notificaciones
                  sobre tu solicitud.
                </AlertDescription>
              </Alert>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>Nombre Completo</Label>
                  <Input
                    value={`${usuario.nombre} ${usuario.apellido}`}
                    disabled
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label>Documento</Label>
                  <Input
                    value={usuario.documento}
                    disabled
                    className="mt-1"
                  />
                </div>
              </div>

              <div>
                <Label>Dirección</Label>
                <Input
                  value={usuario.direccion}
                  disabled
                  className="mt-1"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email">Email Actual *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={emailActual}
                    onChange={(e) => setEmailActual(e.target.value)}
                    className="mt-1"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Se enviará el código de verificación aquí
                  </p>
                </div>
                <div>
                  <Label htmlFor="telefono">Teléfono Actual *</Label>
                  <Input
                    id="telefono"
                    value={telefonoActual}
                    onChange={(e) => setTelefonoActual(e.target.value)}
                    className="mt-1"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    También recibirás notificaciones por SMS
                  </p>
                </div>
              </div>

              <Button
                onClick={continuarConDatos}
                className="w-full"
              >
                Continuar con la Solicitud
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Crear Solicitud */}
        {step === 'solicitud' && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="w-5 h-5" />
                <span>Paso 3: Detalles de la Solicitud</span>
              </CardTitle>
              <CardDescription>
                Completa los detalles de tu solicitud
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert className="border-yellow-200 bg-yellow-50">
                <FileText className="w-4 h-4" />
                <AlertDescription className="text-yellow-800">
                  <strong>Instrucciones:</strong> Selecciona el tipo de
                  solicitud y describe detalladamente tu requerimiento. Puedes
                  adjuntar documentos de apoyo en formatos PDF, DOC, DOCX, JPG o
                  PNG.
                </AlertDescription>
              </Alert>

              <div>
                <Label htmlFor="tipo">Tipo de Solicitud *</Label>
                <Select
                  value={tipoSolicitud}
                  onValueChange={setTipoSolicitud}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Selecciona el tipo de solicitud" />
                  </SelectTrigger>
                  <SelectContent>
                    {tiposSolicitud.map((tipo) => (
                      <SelectItem
                        key={tipo}
                        value={tipo}
                      >
                        {tipo}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-gray-500 mt-1">
                  Elige la opción que mejor describa tu necesidad
                </p>
              </div>

              <div>
                <Label htmlFor="descripcion">Descripción Detallada *</Label>
                <Textarea
                  id="descripcion"
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                  placeholder="Describe detalladamente tu solicitud, incluyendo fechas, lugares, personas involucradas y cualquier información relevante..."
                  className="mt-1 min-h-[120px]"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Sé específico: entre más detalles proporciones, más rápido
                  podremos procesar tu solicitud
                </p>
              </div>

              <div>
                <Label htmlFor="archivos">Documentos Adjuntos (Opcional)</Label>
                <Input
                  id="archivos"
                  type="file"
                  multiple
                  onChange={(e) => setArchivos(e.target.files)}
                  className="mt-1"
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                />
                <div className="mt-2 p-3 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-600 font-medium mb-1">
                    📎 Información sobre archivos:
                  </p>
                  <ul className="text-xs text-gray-500 space-y-1">
                    <li>• Formatos permitidos: PDF, DOC, DOCX, JPG, PNG</li>
                    <li>• Tamaño máximo: 5MB por archivo</li>
                    <li>• Puedes subir múltiples archivos</li>
                    <li>• Los documentos ayudan a acelerar el proceso</li>
                  </ul>
                </div>
              </div>

              <Button
                onClick={enviarSolicitud}
                className="w-full"
              >
                <Send className="w-4 h-4 mr-2" />
                Enviar Solicitud
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Step 4: Verificación */}
        {step === 'verificacion' && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="w-5 h-5" />
                <span>Paso 4: Verificación de Identidad</span>
              </CardTitle>
              <CardDescription>
                Confirma tu identidad con el código de verificación
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert className="border-green-200 bg-green-50">
                <Shield className="w-4 h-4" />
                <AlertDescription className="text-green-800">
                  <strong>Código de Verificación:</strong> Para esta
                  demostración, el código siempre es <strong>1122</strong>. En
                  el sistema real, recibirías un código único por email y SMS.
                </AlertDescription>
              </Alert>

              <Alert className="border-blue-200 bg-blue-50">
                <AlertDescription className="text-blue-800">
                  Se ha enviado un código de verificación a{' '}
                  <strong>{emailActual}</strong> y{' '}
                  <strong>{telefonoActual}</strong>
                </AlertDescription>
              </Alert>

              <div>
                <Label htmlFor="codigo">Código de Verificación</Label>
                <Input
                  id="codigo"
                  value={codigoVerificacion}
                  onChange={(e) => setCodigoVerificacion(e.target.value)}
                  placeholder="Ingresa: 1122"
                  className="mt-1 text-center text-lg tracking-widest"
                  maxLength={4}
                />
                <p className="text-sm text-gray-500 mt-1 text-center">
                  💡 <strong>Código de prueba:</strong> 1122
                </p>
              </div>

              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 font-medium mb-1">
                  🔐 ¿Por qué verificamos tu identidad?
                </p>
                <ul className="text-xs text-gray-500 space-y-1">
                  <li>• Proteger tus datos personales</li>
                  <li>• Evitar solicitudes fraudulentas</li>
                  <li>• Garantizar que solo tú puedas hacer solicitudes</li>
                  <li>• Cumplir con normativas de seguridad</li>
                </ul>
              </div>

              <Button
                onClick={verificarCodigo}
                className="w-full"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Verificar Código
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Step 5: Confirmación */}
        {step === 'confirmacion' && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-green-600">
                <CheckCircle className="w-5 h-5" />
                <span>¡Solicitud Creada Exitosamente!</span>
              </CardTitle>
              <CardDescription>
                Tu solicitud ha sido registrada y está siendo procesada
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert className="border-green-200 bg-green-50">
                <CheckCircle className="w-4 h-4" />
                <AlertDescription className="text-green-800">
                  <strong>¡Solicitud registrada!</strong> Tu número de
                  seguimiento es: <strong>{solicitudId}</strong>
                </AlertDescription>
              </Alert>

              <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                <h3 className="font-semibold text-gray-900">
                  📋 Resumen de tu Solicitud:
                </h3>
                <p>
                  <strong>ID:</strong> {solicitudId}
                </p>
                <p>
                  <strong>Tipo:</strong> {tipoSolicitud}
                </p>
                <p>
                  <strong>Solicitante:</strong> {usuario?.nombre}{' '}
                  {usuario?.apellido}
                </p>
                <p>
                  <strong>Documento:</strong> {usuario?.documento}
                </p>
                <p>
                  <strong>Estado:</strong>{' '}
                  <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm">
                    Pendiente
                  </span>
                </p>
                <p>
                  <strong>Fecha:</strong>{' '}
                  {new Date().toLocaleDateString('es-CO')}
                </p>
              </div>

              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800 font-medium mb-2">
                  📬 ¿Qué sigue ahora?
                </p>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>
                    <strong>1.</strong> Tu solicitud será revisada por nuestro
                    equipo especializado
                  </li>
                  <li>
                    <strong>2.</strong> Recibirás notificaciones por email sobre
                    cada cambio de estado
                  </li>
                  <li>
                    <strong>3.</strong> Puedes consultar el progreso en
                    cualquier momento con tu documento
                  </li>
                  <li>
                    <strong>4.</strong> El tiempo de respuesta típico es de 3-5
                    días hábiles
                  </li>
                </ul>
              </div>

              <div className="p-4 bg-yellow-50 rounded-lg">
                <p className="text-sm text-yellow-800 font-medium mb-2">
                  ⏰ Tiempos de Respuesta Estimados:
                </p>
                <div className="text-sm text-yellow-700 space-y-1">
                  <p>
                    • <strong>Certificados:</strong> 1-2 días hábiles
                  </p>
                  <p>
                    • <strong>Permisos:</strong> 3-5 días hábiles
                  </p>
                  <p>
                    • <strong>Licencias:</strong> 5-10 días hábiles
                  </p>
                  <p>
                    • <strong>Otros trámites:</strong> 3-7 días hábiles
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={reiniciar}
                  variant="outline"
                  className="flex-1 bg-transparent"
                >
                  Nueva Solicitud
                </Button>
                <Button
                  asChild
                  className="flex-1"
                >
                  <a href={`/consulta?documento=${usuario?.documento}`}>
                    Consultar Estado
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
