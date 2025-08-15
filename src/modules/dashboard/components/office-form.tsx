'use client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { IOffices } from '@/types'
import { IOfficeFormData, officeFormSchema } from '@/schemas'

interface OfficeFormProps {
  office?: IOffices | null
  onSubmit: (data: IOfficeFormData) => void
  onCancel: () => void
  isEditing?: boolean
}

export function OfficeForm({
  office,
  onSubmit,
  onCancel,
  isEditing = false,
}: OfficeFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
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

  const handleFormSubmit = (data: IOfficeFormData) => {
    onSubmit(data)
    reset()
  }

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="space-y-4"
    >
      <div className="grid grid-cols-2 gap-4">
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

      <div className="grid grid-cols-2 gap-4">
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
        >
          Cancelar
        </Button>
        <Button type="submit">
          {isEditing ? 'Actualizar' : 'Crear'} Oficina
        </Button>
      </div>
    </form>
  )
}
