'use client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { IOffices } from '@/types'
import { IOfficeFormData, officeFormSchema } from '@/schemas'
import { createOrUpdateOffice } from '@/api/app'
import { toast } from 'react-toastify'
import { ToastCustom } from '@/components/app'

interface OfficeFormProps {
  office?: IOffices | null
  onCancel: () => void
  isEditing?: boolean
  onSuccess?: () => void
}

export function OfficeForm({
  office,
  onCancel,
  isEditing = false,
  onSuccess,
}: OfficeFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<IOfficeFormData>({
    resolver: zodResolver(officeFormSchema),
    defaultValues:
      office && isEditing
        ? {
            code: office.code,
            name: office.name,
            phone: office.phone,
            email: office.email,
          }
        : {
            code: '',
            name: '',
            phone: '',
            email: '',
          },
  })

  const handleFormSubmit = async (data: IOfficeFormData) => {
    try {
      const response = await createOrUpdateOffice({
        id: office?.id,
        data,
      })

      if (response.status >= 200 && response.status < 300) {
        toast.success(
          <ToastCustom
            title="Éxito"
            description={
              isEditing
                ? 'Oficina actualizada correctamente'
                : 'Oficina creada correctamente'
            }
          />
        )
        onSuccess?.()
        reset()
      } else {
        const errorMessage = response.errors?.join(', ') || 'Error desconocido'
        toast.error(
          <ToastCustom
            title="Error"
            description={`Error al ${
              isEditing ? 'actualizar' : 'crear'
            } la oficina: ${errorMessage}`}
          />
        )
      }
    } catch {
      toast.error(
        <ToastCustom
          title="Error"
          description={`Error al ${
            isEditing ? 'actualizar' : 'crear'
          } la oficina`}
        />
      )
    }
  }

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="space-y-4"
    >
      <div className="grid gap-4">
        <div>
          <Label htmlFor="code">Código *</Label>
          <Input
            id="code"
            {...register('code')}
            placeholder="Ej: OF001"
            className={errors.code ? 'border-red-500' : ''}
          />
          {errors.code && (
            <p className="text-sm text-red-500 mt-1">{errors.code.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="name">Nombre *</Label>
          <Input
            id="name"
            {...register('name')}
            placeholder="Nombre de la oficina"
            className={errors.name ? 'border-red-500' : ''}
          />
          {errors.name && (
            <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
          )}
        </div>
      </div>

      <div className="grid gap-4">
        <div>
          <Label htmlFor="phone">Teléfono *</Label>
          <Input
            id="phone"
            {...register('phone')}
            placeholder="+57 1 234-5678"
            className={errors.phone ? 'border-red-500' : ''}
          />
          {errors.phone && (
            <p className="text-sm text-red-500 mt-1">{errors.phone.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            {...register('email')}
            placeholder="oficina@empresa.com"
            className={errors.email ? 'border-red-500' : ''}
          />
          {errors.email && (
            <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
          )}
        </div>
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Cancelar
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Procesando...' : isEditing ? 'Actualizar' : 'Crear'}{' '}
          Oficina
        </Button>
      </div>
    </form>
  )
}
