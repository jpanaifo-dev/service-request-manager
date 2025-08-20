'use client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { ProcedureStatusFormData, procedureStatusSchema } from '@/schemas'
import { ProcedureStatus } from '@/types'
import { createOrUpdateProcedureStatus } from '@/api/app'
import { toast } from 'react-toastify'
import { ToastCustom } from '@/components/app'
import { useEffect } from 'react'

interface ProcedureStatusFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  initialData?: ProcedureStatus | null
  isLoading?: boolean
}

export function ProcedureStatusForm({
  open,
  onOpenChange,
  initialData,
  isLoading = false,
}: ProcedureStatusFormProps) {
  const form = useForm<ProcedureStatusFormData>({
    resolver: zodResolver(procedureStatusSchema),
    defaultValues: {
      name: initialData?.name || '',
      description: initialData?.description || '',
      is_active: initialData?.is_active || false,
      color: initialData?.color || '#000000',
    },
  })

  useEffect(() => {
    if (initialData) {
      form.reset({
        name: initialData.name,
        description: initialData.description,
        is_active: initialData.is_active,
        color: initialData.color,
      })
    }
  }, [initialData, form])

  const handleSubmit = async (data: ProcedureStatusFormData) => {
    try {
      const response = await createOrUpdateProcedureStatus({
        id: initialData?.id,
        data,
        urlRevalidate: '/dashboard/procedure-status',
      })

      if (response.status >= 400) {
        toast.error(
          <ToastCustom
            title="Error al guardar el estado"
            description={
              response.errors?.[0] ||
              'Hubo un error al intentar guardar el estado del procedimiento. Por favor, inténtalo de nuevo.'
            }
          />
        )
        return
      } else {
        toast.success(
          <ToastCustom
            title="Estado guardado"
            description="El estado del procedimiento se ha guardado correctamente."
          />
        )
        onOpenChange(false)
        form.reset()
      }
    } catch {
      toast.error(
        <ToastCustom
          title="Error al guardar el estado"
          description={
            'Hubo un error al intentar guardar el estado del procedimiento. Por favor, inténtalo de nuevo.'
          }
        />
      )
    }
  }

  const handleClose = () => {
    form.reset()
    onOpenChange(false)
  }

  return (
    <Dialog
      open={open}
      onOpenChange={handleClose}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {initialData
              ? 'Editar Estado de Procedimiento'
              : 'Agregar Estado de Procedimiento'}
          </DialogTitle>
          <DialogDescription>
            {initialData
              ? 'Modifica los datos del estado de procedimiento.'
              : 'Completa los datos para crear un nuevo estado de procedimiento.'}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ingresa el nombre"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descripción</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Ingresa la descripción"
                      className="resize-none"
                      rows={3}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Color</FormLabel>
                  <FormControl>
                    <Input
                      type="color"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="is_active"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Estado Activo</FormLabel>
                    <div className="text-sm text-muted-foreground">
                      Determina si el estado está disponible para uso
                    </div>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                disabled={isLoading}
              >
                {isLoading
                  ? 'Guardando...'
                  : initialData
                  ? 'Actualizar'
                  : 'Crear'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
