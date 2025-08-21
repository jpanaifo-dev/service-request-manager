'use client'

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  CheckCircle,
  FileText,
  User,
  Clock,
  Sparkles,
  Copy,
  Download,
  Mail,
  Code,
} from 'lucide-react'
import type { Person, ProcedureType } from '@/types'

interface Procedure {
  id?: number
  description: string
  is_active: boolean
  file: File | null
  person: number | null
  procedure_type: number | null
}

interface SuccessConfirmationProps {
  foundPerson: Person | null
  procedureTypes: ProcedureType[]
  procedureForm: Procedure
  codeProcedure?: string | null
  handleReset: () => void
}

export function SuccessConfirmation({
  foundPerson,
  procedureTypes,
  procedureForm,
  handleReset,
  codeProcedure = null,
}: SuccessConfirmationProps) {
  const handleCopyCode = () => {
    if (codeProcedure) {
      navigator.clipboard.writeText(codeProcedure)
      // You could add a toast notification here
    }
  }

  const handleDownloadCode = () => {
    if (codeProcedure) {
      const blob = new Blob([codeProcedure], { type: 'text/plain' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `codigo-solicitud-${Date.now()}.txt`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    }
  }

  const handleEmailCode = () => {
    if (codeProcedure) {
      const subject = encodeURIComponent('Código de Solicitud de Procedimiento')
      const body = encodeURIComponent(
        `Hola,\n\nAquí está tu código de solicitud:\n\n${codeProcedure}\n\nUtiliza este código para realizar tu consulta.\n\nSaludos.`
      )
      window.open(`mailto:?subject=${subject}&body=${body}`)
    }
  }

  return (
    <Card className="relative overflow-hidden border-0 shadow-2xl bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-emerald-100/50 to-transparent rounded-full -translate-y-16 translate-x-16" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-teal-100/30 to-transparent rounded-full translate-y-12 -translate-x-12" />

      <CardHeader className="relative pb-4">
        <div className="flex items-center justify-center mb-4">
          <div className="relative">
            <div className="absolute inset-0 bg-emerald-500/20 rounded-full animate-pulse" />
            <div className="relative bg-gradient-to-r from-emerald-500 to-teal-500 p-3 rounded-full shadow-lg">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
          </div>
        </div>

        <CardTitle className="text-center text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
          ¡Solicitud Registrada Exitosamente!
        </CardTitle>
        <CardDescription className="text-center text-gray-600 mt-2 text-base">
          Tu solicitud ha sido creada y está siendo procesada por nuestro equipo
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6 relative">
        <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
          <div className="flex items-center space-x-2 mb-4">
            <Sparkles className="w-5 h-5 text-gray-600" />
            <h3 className="font-bold text-gray-900 text-lg">
              Resumen de la Solicitud
            </h3>
          </div>

          <div className="grid gap-4">
            <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="bg-blue-100 p-2 rounded-lg">
                <User className="w-4 h-4 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-500 mb-1">
                  Solicitante
                </p>
                <p className="font-semibold text-gray-900">
                  {foundPerson?.names} {foundPerson?.last_name1}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  Doc: {foundPerson?.document_number}
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="bg-purple-100 p-2 rounded-lg">
                <FileText className="w-4 h-4 text-purple-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-500 mb-1">
                  Tipo de Procedimiento
                </p>
                <p className="font-semibold text-gray-900">
                  {
                    procedureTypes.find(
                      (t) =>
                        t.id.toString() ===
                        procedureForm?.procedure_type?.toString()
                    )?.name
                  }
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="bg-amber-100 p-2 rounded-lg">
                <Clock className="w-4 h-4 text-amber-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-500 mb-1">
                  Estado Actual
                </p>
                <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-800 border border-amber-200">
                  <div className="w-2 h-2 bg-amber-500 rounded-full mr-2 animate-pulse" />
                  En Proceso
                </div>
              </div>
            </div>
          </div>
        </div>

        {codeProcedure && (
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-6 shadow-sm">
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-blue-500 p-2 rounded-lg">
                <Code className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-blue-900 text-lg">
                  Código de tu Solicitud
                </h3>
                <p className="text-sm text-blue-700">
                  Utiliza este código para realizar tu consulta
                </p>
              </div>
            </div>

            <div className="bg-white border-2 border-dashed border-blue-300 rounded-lg p-4 mb-4">
              <code className="text-lg font-mono font-bold text-blue-800 break-all">
                {codeProcedure}
              </code>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Button
                onClick={handleCopyCode}
                variant="outline"
                className="border-blue-300 text-blue-700 hover:bg-blue-50 hover:border-blue-400 bg-transparent"
              >
                <Copy className="w-4 h-4 mr-2" />
                Copiar Código
              </Button>

              <Button
                onClick={handleDownloadCode}
                variant="outline"
                className="border-green-300 text-green-700 hover:bg-green-50 hover:border-green-400 bg-transparent"
              >
                <Download className="w-4 h-4 mr-2" />
                Descargar
              </Button>

              <Button
                onClick={handleEmailCode}
                variant="outline"
                className="border-purple-300 text-purple-700 hover:bg-purple-50 hover:border-purple-400 bg-transparent"
              >
                <Mail className="w-4 h-4 mr-2" />
                Enviar por Email
              </Button>
            </div>

            <div className="mt-4 p-3 bg-blue-100 rounded-lg">
              <p className="text-sm text-blue-800 font-medium">
                💡 <strong>Importante:</strong> Guarda este código en un lugar
                seguro. Lo necesitarás para hacer seguimiento a tu solicitud.
              </p>
            </div>
          </div>
        )}

        <div className="pt-2">
          <Button
            onClick={handleReset}
            className="w-full"
          >
            <FileText className="w-4 h-4 mr-2" />
            Crear Nueva Solicitud
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
