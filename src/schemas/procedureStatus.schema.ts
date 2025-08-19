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
  is_active: z.boolean().default(false),
})

export type ProcedureStatusFormData = z.infer<typeof procedureStatusSchema>
