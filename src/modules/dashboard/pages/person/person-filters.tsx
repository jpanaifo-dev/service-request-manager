'use client'
import { InputSearch } from '@/components/app'
import { Label } from '@/components/ui/label'

export const PersonFilters = () => {
  return (
    <div className="container mx-auto w-full flex flex-col gap-4 px-4 py-6 sm:px-6">
      <div>
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
      </div>
    </div>
  )
}
