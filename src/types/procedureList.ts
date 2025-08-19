import { ProcedureType } from './procedureType'

export interface ProcedureBase {
  id: number
  code: string
  description: string
  is_active: boolean
  file: string
  created_at: string
  updated_at: string
  person: number
}
export interface ProcedureList extends ProcedureBase {
  procedure_type: number
}

export interface ProcedureData extends ProcedureBase {
  procedure_type: ProcedureType
}
