export interface IResApi<T> {
  count: number
  previous: string | null
  next: string | null
  results: T[]
}

export interface IResApiArray<T> {
  status: number
  data: T[]
  errors: string[]
}
