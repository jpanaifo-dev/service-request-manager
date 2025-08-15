import { z } from 'zod'

export const officeFormSchema = z.object({
  code: z
    .string()
    .min(1, 'El código es requerido')
    .min(3, 'El código debe tener al menos 3 caracteres'),
  name: z
    .string()
    .min(1, 'El nombre es requerido')
    .min(2, 'El nombre debe tener al menos 2 caracteres'),
  phone: z
    .string()
    .min(1, 'El teléfono es requerido')
    .min(9, 'El teléfono debe tener al menos 10 dígitos'),
  email: z.string().min(1, 'El email es requerido').email('Email inválido'),
})

export type IOfficeFormData = z.infer<typeof officeFormSchema>
