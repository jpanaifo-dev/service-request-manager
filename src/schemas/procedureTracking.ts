import z from 'zod'

// Esquema de validación para el formulario de acciones
export const trackingSchema = z.object({
  id: z.number().optional(),
  observations: z.string().min(1, 'Las observaciones son requeridas'),
  is_current: z.boolean().optional(),
  sequence: z.number().optional(),
  created_at: z.string().optional(),
  received_at: z.string().nullable().optional(),
  procedure: z.number().optional(),
  from_office: z.number().optional(),
  to_office: z.number().optional(),
  status: z.number().optional(),
  actor: z.number().optional(),
  actionType: z.string().optional(),
})

export type TrackingFormData = z.infer<typeof trackingSchema>
