import { z } from 'zod'

export const personSchema = z.object({
  document_number: z.string().min(1, 'Document number is required'),
  names: z.string().min(1, 'Names are required'),
  last_name1: z.string().optional(),
  last_name2: z.string().optional(),
  gender: z.number().optional(),
  email: z.string().email().optional(),
  cellphone: z.string().optional(),
  address: z.string().optional(),
  document_type: z.string().min(1, 'Document type is required'),
  user: z.string().optional(),
})

export type IPersonFormData = z.infer<typeof personSchema>
