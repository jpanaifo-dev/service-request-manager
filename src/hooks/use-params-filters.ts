'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'

interface IQueryParams {
  key: string
  value: string
}

type IRemoveFilter = Omit<IQueryParams, 'value'>

export const useParamsFilters = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()!

  const getParams = ({ key, value }: IQueryParams) => {
    const result = searchParams.get(key)
    return result || value
  }

  const updateFilter = ({ key, value }: IQueryParams) => {
    const params = new URLSearchParams(searchParams.toString())

    // If the key is different from 'page', remove 'page'
    if (key !== 'page' || params.get('page') === '1') {
      params.delete('page')
    }

    params.set(key, value)

    const queryString = params.toString()
    const url = `${pathname}${queryString ? `?${queryString}` : ''}`

    router.push(url, { scroll: false })
  }

  const createFilter = useCallback(
    ({ key, value }: IQueryParams) => {
      const params = new URLSearchParams(searchParams.toString())

      // Set the new filter
      params.set(key, value)

      const queryString = params.toString()
      const url = `${pathname}${queryString ? `?${queryString}` : ''}`

      router.push(url, { scroll: false })
    },
    [searchParams, router, pathname]
  )

  const removeFilter = useCallback(
    ({ key }: IRemoveFilter) => {
      const params = new URLSearchParams(searchParams)

      // Remove the filter
      params.delete(key)

      const queryString = params.toString()
      const url = `${pathname}${queryString ? `?${queryString}` : ''}`

      router.push(url, { scroll: false })
    },
    [searchParams, router, pathname]
  )

  return {
    getParams,
    updateFilter,
    createFilter,
    removeFilter,
  }
}
