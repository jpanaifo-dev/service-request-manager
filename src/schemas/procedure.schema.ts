import { z } from 'zod'

export const procedureFormSchema = z.object({
  description: z.string().optional().default(''),
  is_active: z.boolean().optional().default(false),
  file: z.any().nullable().optional().default(null),
  person: z.any().nullable().optional().default(null),
  procedure_type: z.any().nullable().optional().default(null),
})

export type IProcedureFormData = z.infer<typeof procedureFormSchema>
