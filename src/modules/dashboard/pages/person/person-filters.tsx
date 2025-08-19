'use client'
import { InputSearch } from '@/components/app'
import { useParamsFilters } from '@/hooks/use-params-filters'

export const PersonFilters = () => {
  const { updateFilter, getParams } = useParamsFilters()

  const search = getParams({ key: 'search', value: '' })

  const handleSearchChange = (value: string) => {
    if (value.trim() === '') {
      updateFilter({ key: 'search', value: '' })
    } else {
      updateFilter({ key: 'search', value })
    }
  }

  return (
    <div className="container mx-auto w-full flex flex-col gap-4 px-4 sm:px-6">
      <div>
        <h1 className="text-2xl font-semibold">Gestión de Personas</h1>
        <p className="text-sm text-muted-foreground">
          Administra la información de las personas registradas en el sistema
        </p>
      </div>
      <div>
        <InputSearch
          defaultValue={search}
          placeholder="Buscar por documento, nombre o apellido"
          onChange={handleSearchChange}
          className="w-full max-w-5xl"
        />
      </div>
    </div>
  )
}
