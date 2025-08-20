export interface Person {
  id?: number
  uuid?: string
  document_number: string | null
  names: string
  last_name1: string
  last_name2: string
  gender: string
  email: string
  cellphone: string
  address: string | null
  document_type: number | null
  user?: number | null
}

export interface PersonFilter {
  page?: number
  page_size?: number
  id?: number
  names?: string
  names__icontains?: string
  last_name1?: string
  last_name1__icontains?: string
  last_name2?: string
  last_name2__icontains?: string
  document_number?: string
  document_number__icontains?: string
}
