import { Person } from './person'
import { ProcedureType } from './procedureType'

export interface ProcedureBase {
  id: number
  code: string
  description: string
  is_active: boolean
  file: string
  created_at: string
  updated_at: string
}
export interface ProcedureList extends ProcedureBase {
  procedure_type: number
  person: number
}

export interface ProcedureData extends ProcedureBase {
  procedure_type: ProcedureType
  person: Person
}

export interface ProcedureFilter {
  id?: number
  code?: string
  code__icontains?: string
  person_id?: number
  person__document_number?: string
  person__document_number__icontains?: string
  procedure_type_id?: number
  created_at?: string
  created_at__gte?: string
  created_at__lte?: string
  updated_at?: string
  updated_at__gte?: string
  updated_at__lte?: string
  is_active?: boolean
}
