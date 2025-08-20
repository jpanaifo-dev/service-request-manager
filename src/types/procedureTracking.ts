import { IOffices } from './docs'
import { ProcedureList } from './procedureList'
import { ProcedureStatus } from './procedureStatus'

export interface ProcedureTrackingBase {
  id: number
  observations: string
  is_current: boolean
  sequence: number
  created_at: string // ISO date string
  received_at: string | null // ISO date string or null
}

export interface ProcedureTracking extends ProcedureTrackingBase {
  actor: number | null
  from_office: number | null
  to_office: number | null
  procedure: number
  status: number
}

export interface ProcedureTrackingDetail extends ProcedureTrackingBase {
  from_office: IOffices | null
  to_office: IOffices | null
  procedure: ProcedureList
  status: ProcedureStatus
  actor: number | null
}

export interface ProcedureTrackingFilter {
  id?: number
  procedure_id?: number
}
