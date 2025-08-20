'use client'
import { InputSearch } from '@/components/app'
import { useParamsFilters } from '@/hooks/use-params-filters'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { CalendarIcon, Filter, X } from 'lucide-react'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { useState } from 'react'
import { cn } from '@/lib/utils'

export const ProcedureFilters = () => {
  const { updateFilter, getParams, removeFilter, clearAllFilters } =
    useParamsFilters()
  const [sheetOpen, setSheetOpen] = useState(false)

  // Get current filter values
  const search = getParams({ key: 'search', value: '' })
  const id = getParams({ key: 'id', value: '' })
  const code = getParams({ key: 'code', value: '' })
  const codeContains = getParams({ key: 'code__icontains', value: '' })
  const personId = getParams({ key: 'person_id', value: '' })
  const personDocument = getParams({
    key: 'person__document_number',
    value: '',
  })
  const personDocumentContains = getParams({
    key: 'person__document_number__icontains',
    value: '',
  })
  const procedureTypeId = getParams({ key: 'procedure_type_id', value: '' })
  const isActive = getParams({ key: 'is_active', value: '' })
  const createdAt = getParams({ key: 'created_at', value: '' })
  const createdAtGte = getParams({ key: 'created_at__gte', value: '' })
  const createdAtLte = getParams({ key: 'created_at__lte', value: '' })
  const updatedAt = getParams({ key: 'updated_at', value: '' })
  const updatedAtGte = getParams({ key: 'updated_at__gte', value: '' })
  const updatedAtLte = getParams({ key: 'updated_at__lte', value: '' })

  const handleInputChange = (key: string, value: string) => {
    if (value.trim() === '') {
      removeFilter({ key })
    } else {
      updateFilter({ key, value })
    }
  }

  const handleDateChange = (key: string, date: Date | undefined) => {
    if (!date) {
      removeFilter({ key })
    } else {
      updateFilter({ key, value: format(date, 'yyyy-MM-dd') })
    }
  }

  const handleSelectChange = (key: string, value: string) => {
    if (value === 'all') {
      removeFilter({ key })
    } else {
      updateFilter({ key, value })
    }
  }

  const DatePickerField = ({
    label,
    value,
    onChange,
  }: {
    label: string
    value: string
    onChange: (date: Date | undefined) => void
  }) => {
    const [open, setOpen] = useState(false)
    const dateValue = value ? new Date(value) : undefined

    return (
      <div className="space-y-2">
        <Label className="text-sm font-medium">{label}</Label>
        <Popover
          open={open}
          onOpenChange={setOpen}
        >
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                'w-full justify-start text-left font-normal',
                !dateValue && 'text-muted-foreground'
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {dateValue
                ? format(dateValue, 'dd/MM/yyyy', { locale: es })
                : 'Seleccionar fecha'}
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="w-auto p-0"
            align="start"
          >
            <Calendar
              mode="single"
              selected={dateValue}
              onSelect={(date) => {
                onChange(date)
                setOpen(false)
              }}
            />
          </PopoverContent>
        </Popover>
      </div>
    )
  }

  const hasActiveFilters = [
    id,
    code,
    codeContains,
    personId,
    personDocument,
    personDocumentContains,
    procedureTypeId,
    isActive,
    createdAt,
    createdAtGte,
    createdAtLte,
    updatedAt,
    updatedAtGte,
    updatedAtLte,
  ].some((filter) => filter !== '')

  return (
    <div className="w-full flex flex-col gap-6 mb-6 md:flex-row md:items-center md:justify-between">
      {/* Main Search */}
      <div className="w-full">
        <InputSearch
          defaultValue={search}
          placeholder="Buscar procedimientos..."
          onChange={(value) => handleInputChange('search', value)}
          className="w-full"
        />
      </div>

      {/* Filter Controls */}
      <div className="flex items-center justify-between">
        <Sheet
          open={sheetOpen}
          onOpenChange={setSheetOpen}
        >
          <SheetTrigger asChild>
            <Button className="flex items-center gap-2 bg-white text-gray-800 hover:bg-gray-100">
              <Filter className="h-4 w-4" />
              Filtros avanzados
              {hasActiveFilters && (
                <span className="ml-1 bg-primary text-primary-foreground text-xs px-1.5 py-0.5 rounded-full">
                  {
                    [
                      id,
                      code,
                      codeContains,
                      personId,
                      personDocument,
                      personDocumentContains,
                      procedureTypeId,
                      isActive,
                      createdAt,
                      createdAtGte,
                      createdAtLte,
                      updatedAt,
                      updatedAtGte,
                      updatedAtLte,
                    ].filter((f) => f !== '').length
                  }
                </span>
              )}
            </Button>
          </SheetTrigger>

          <SheetContent className="w-full sm:max-w-2xl overflow-y-auto">
            <SheetHeader>
              <SheetTitle>Filtros Avanzados</SheetTitle>
              <SheetDescription>
                Configura filtros específicos para encontrar los procedimientos
                que necesitas
              </SheetDescription>
            </SheetHeader>

            <div className="space-y-6 px-4">
              {/* Person Filters */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                  Filtros de Persona
                </h3>
                <div className="grid grid-cols-1 gap-4">
                  {/* <div className="space-y-2">
                    <Label
                      htmlFor="person-id"
                      className="text-sm font-medium"
                    >
                      ID Persona
                    </Label>
                    <Input
                      id="person-id"
                      type="number"
                      placeholder="ID de la persona"
                      defaultValue={personId}
                      onChange={(e) =>
                        handleInputChange('person_id', e.target.value)
                      }
                    />
                  </div> */}

                  <div className="space-y-2">
                    <Label
                      htmlFor="person-document"
                      className="text-sm font-medium"
                    >
                      Documento exacto
                    </Label>
                    <Input
                      id="person-document"
                      placeholder="Número de documento"
                      defaultValue={personDocument}
                      onChange={(e) =>
                        handleInputChange(
                          'person__document_number',
                          e.target.value
                        )
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="person-document-contains"
                      className="text-sm font-medium"
                    >
                      Documento contiene
                    </Label>
                    <Input
                      id="person-document-contains"
                      placeholder="Buscar en documento"
                      defaultValue={personDocumentContains}
                      onChange={(e) =>
                        handleInputChange(
                          'person__document_number__icontains',
                          e.target.value
                        )
                      }
                    />
                  </div>
                </div>
              </div>

              {/* Type and Status */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                  Tipo y Estado
                </h3>
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="procedure-type"
                      className="text-sm font-medium"
                    >
                      Tipo de Procedimiento
                    </Label>
                    <Input
                      id="procedure-type"
                      type="number"
                      placeholder="ID del tipo de procedimiento"
                      defaultValue={procedureTypeId}
                      onChange={(e) =>
                        handleInputChange('procedure_type_id', e.target.value)
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Estado</Label>
                    <Select
                      value={isActive || 'all'}
                      onValueChange={(value) =>
                        handleSelectChange('is_active', value)
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Seleccionar estado" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todos</SelectItem>
                        <SelectItem value="true">Activo</SelectItem>
                        <SelectItem value="false">Inactivo</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Date Filters */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                  Filtros de Fecha
                </h3>

                {/* Created At */}
                <div className="space-y-3">
                  <h4 className="text-sm font-medium">Fecha de Creación</h4>
                  <div className="grid grid-cols-1 gap-4">
                    <DatePickerField
                      label="Fecha exacta"
                      value={createdAt}
                      onChange={(date) => handleDateChange('created_at', date)}
                    />
                    <DatePickerField
                      label="Desde"
                      value={createdAtGte}
                      onChange={(date) =>
                        handleDateChange('created_at__gte', date)
                      }
                    />
                    <DatePickerField
                      label="Hasta"
                      value={createdAtLte}
                      onChange={(date) =>
                        handleDateChange('created_at__lte', date)
                      }
                    />
                  </div>
                </div>

                {/* Updated At */}
                <div className="space-y-3">
                  <h4 className="text-sm font-medium">
                    Fecha de Actualización
                  </h4>
                  <div className="grid grid-cols-1 gap-4">
                    <DatePickerField
                      label="Fecha exacta"
                      value={updatedAt}
                      onChange={(date) => handleDateChange('updated_at', date)}
                    />
                    <DatePickerField
                      label="Desde"
                      value={updatedAtGte}
                      onChange={(date) =>
                        handleDateChange('updated_at__gte', date)
                      }
                    />
                    <DatePickerField
                      label="Hasta"
                      value={updatedAtLte}
                      onChange={(date) =>
                        handleDateChange('updated_at__lte', date)
                      }
                    />
                  </div>
                </div>
              </div>

              {hasActiveFilters && (
                <div className="pt-4 border-t">
                  <Button
                    variant="outline"
                    onClick={() => {
                      clearAllFilters()
                      setSheetOpen(false)
                    }}
                    className="w-full flex items-center gap-2"
                  >
                    <X className="h-4 w-4" />
                    Limpiar todos los filtros
                  </Button>
                </div>
              )}
            </div>
          </SheetContent>
        </Sheet>

        {hasActiveFilters && (
          <Button
            variant="ghost"
            onClick={clearAllFilters}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
            Limpiar filtros
          </Button>
        )}
      </div>
    </div>
  )
}
