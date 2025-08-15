export interface Person {
  id: number
  username: string
  email: string
  is_active: boolean
  is_staff: boolean
  is_superuser: boolean
  last_login: string // ISO date string
  first_name: string
  last_name: string
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
  search?: string
}
