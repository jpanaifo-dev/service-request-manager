import { z } from 'zod'

export const documentTypeSchema = z.object({
  name: z.string(),
  character: z.string(),
  abbreviation: z.string(),
  type: z.string(),
})

export type DocumentTypeFormData = z.infer<typeof documentTypeSchema>
