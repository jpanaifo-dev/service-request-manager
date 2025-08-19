import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export const PersonFilters = () => {
  return (
    <>
      <Label className="block mb-2">Filtrar Personas</Label>
      <Input
        placeholder="Buscar por nombre, apellido o documento"
        className="w-full mb-4"
      />
    </>
  )
}
