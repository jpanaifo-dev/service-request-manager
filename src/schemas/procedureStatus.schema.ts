import { z } from 'zod'

export const procedureStatusSchema = z.object({
  name: z
    .string()
    .min(1, 'El nombre es requerido')
    .max(100, 'El nombre no puede exceder 100 caracteres'),
  description: z
    .string()
    .min(1, 'La descripción es requerida')
    .max(500, 'La descripción no puede exceder 500 caracteres'),
  color: z
    .string()
    .min(1, 'El color es requerido')
    .max(7, 'El color no puede exceder 7 caracteres'),
  is_active: z.boolean(),
})

export type ProcedureStatusFormData = z.infer<typeof procedureStatusSchema>
