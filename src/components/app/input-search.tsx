'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Search, X } from 'lucide-react'

export interface FilterOption {
  value: string
  label: string
}

export interface InputSearchProps {
  /** Array of filter options for the dropdown */
  filterOptions?: FilterOption[]
  /** Placeholder text for the search input */
  searchPlaceholder?: string
  /** Placeholder text for the filter value input */
  filterPlaceholder?: string
  /** Show general search input */
  showGeneralSearch?: boolean
  /** Show filter selector */
  showFilterSelector?: boolean
  /** Custom CSS classes */
  className?: string
  /** Callback when search is performed */
  onSearch?: (params: Record<string, string>) => void
  /** Custom search parameter name for general search */
  searchParamName?: string
}

export function InputSearch({
  filterOptions = [],
  searchPlaceholder = 'Ingresa tu término de búsqueda...',
  filterPlaceholder = 'Valor del filtro',
  showGeneralSearch = true,
  showFilterSelector = true,
  className = '',
  onSearch,
  searchParamName = 'search',
}: InputSearchProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [generalSearch, setGeneralSearch] = useState(
    searchParams.get(searchParamName) || ''
  )
  const [selectedFilterType, setSelectedFilterType] = useState<string>('')
  const [filterValue, setFilterValue] = useState<string>('')

  useEffect(() => {
    const currentSearch = searchParams.get(searchParamName) || ''
    setGeneralSearch(currentSearch)

    // Find which filter is currently active
    for (const option of filterOptions) {
      const paramValue = searchParams.get(option.value)
      if (paramValue) {
        setSelectedFilterType(option.value)
        setFilterValue(paramValue)
        break
      }
    }
  }, [searchParams, filterOptions, searchParamName])

  const handleSearch = () => {
    const params = new URLSearchParams()

    if (showGeneralSearch && generalSearch.trim()) {
      params.set(searchParamName, generalSearch.trim())
    }

    if (showFilterSelector && selectedFilterType && filterValue.trim()) {
      params.set(selectedFilterType, filterValue.trim())
    }

    // Call custom callback if provided
    if (onSearch) {
      const paramsObject: Record<string, string> = {}
      params.forEach((value, key) => {
        paramsObject[key] = value
      })
      onSearch(paramsObject)
    }

    // Update URL with new parameters
    const queryString = params.toString()
    router.push(queryString ? `?${queryString}` : '/')
  }

  const handleClear = () => {
    setGeneralSearch('')
    setSelectedFilterType('')
    setFilterValue('')
    router.push('/')
  }

  const hasActiveFilters =
    (showGeneralSearch && generalSearch.trim()) ||
    (showFilterSelector && selectedFilterType && filterValue.trim())

  return (
    <div className={`w-full space-y-6 ${className}`}>
      {/* General Search */}
      {showGeneralSearch && (
        <div className="space-y-3">
          <Label
            htmlFor="search"
            className="text-sm font-medium text-foreground"
          >
            Búsqueda General
          </Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="search"
              placeholder={searchPlaceholder}
              value={generalSearch}
              onChange={(e) => setGeneralSearch(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              className="pl-10 h-12 text-base bg-input border-border focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
            />
          </div>
        </div>
      )}

      {/* Filter Selector */}
      {showFilterSelector && filterOptions.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-3">
            <Label
              htmlFor="filter-type"
              className="text-sm font-medium text-foreground"
            >
              Tipo de Filtro
            </Label>
            <Select
              value={selectedFilterType}
              onValueChange={setSelectedFilterType}
            >
              <SelectTrigger className="h-12 bg-input border-border focus:ring-2 focus:ring-primary/20 focus:border-primary">
                <SelectValue placeholder="Selecciona un tipo de filtro" />
              </SelectTrigger>
              <SelectContent className="bg-popover border-border">
                {filterOptions.map((option) => (
                  <SelectItem
                    key={option.value}
                    value={option.value}
                    className="hover:bg-accent hover:text-accent-foreground cursor-pointer"
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <Label
              htmlFor="filter-value"
              className="text-sm font-medium text-foreground"
            >
              Valor del Filtro
            </Label>
            <Input
              id="filter-value"
              placeholder={
                selectedFilterType
                  ? `Valor para ${
                      filterOptions.find(
                        (opt) => opt.value === selectedFilterType
                      )?.label
                    }`
                  : filterPlaceholder
              }
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              disabled={!selectedFilterType}
              className="h-12 text-base bg-input border-border focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 disabled:opacity-50"
            />
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button
          onClick={handleSearch}
          className="flex-1 h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-medium shadow-md hover:shadow-lg transition-all duration-200"
        >
          <Search className="h-4 w-4 mr-2" />
          Buscar
        </Button>

        {hasActiveFilters && (
          <Button
            onClick={handleClear}
            variant="outline"
            className="flex-1 sm:flex-none h-12 bg-background hover:bg-muted border-border hover:border-destructive/50 hover:text-destructive transition-all duration-200"
          >
            <X className="h-4 w-4 mr-2" />
            Limpiar
          </Button>
        )}
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="p-4 bg-muted/30 rounded-lg border border-border/50">
          <p className="text-sm font-medium mb-3 text-foreground">
            Filtros Activos:
          </p>
          <div className="flex flex-wrap gap-2">
            {showGeneralSearch && generalSearch.trim() && (
              <span className="inline-flex items-center px-3 py-1.5 bg-primary/10 text-primary text-sm rounded-full border border-primary/20 font-medium">
                Búsqueda: {generalSearch}
              </span>
            )}
            {showFilterSelector && selectedFilterType && filterValue.trim() && (
              <span className="inline-flex items-center px-3 py-1.5 bg-accent/10 text-accent text-sm rounded-full border border-accent/20 font-medium">
                {
                  filterOptions.find((opt) => opt.value === selectedFilterType)
                    ?.label
                }
                : {filterValue}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
