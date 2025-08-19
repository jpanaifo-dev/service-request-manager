'use client'
import { InputSearch } from '@/components/app'
import { Label } from '@/components/ui/label'

export const PersonFilters = () => {
  return (
    <>
      <Label className="block mb-2">
        Buscar Personas
        <span className="text-sm text-muted-foreground">
          Utiliza el campo de búsqueda para encontrar personas por nombre o
          email
        </span>
      </Label>
      <InputSearch
        onChange={(value) => console.log('Buscar personas:', value)}
      />
    </>
  )
}
