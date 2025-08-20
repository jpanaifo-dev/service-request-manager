'use client'

import { useState, useEffect, useCallback } from 'react'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'

export interface InputSearchProps {
  /** Valor del input */
  value?: string
  /** Valor inicial por defecto */
  defaultValue?: string
  /** Callback cuando cambia el valor */
  onChange?: (value: string) => void
  /** Placeholder para el input */
  placeholder?: string
  /** Tiempo de debounce en milisegundos */
  debounceTime?: number
  /** Clases CSS personalizadas */
  className?: string
  /** Propiedades adicionales para el input */
  [key: string]: unknown
}

export function InputSearch({
  value: propValue,
  defaultValue = '',
  onChange,
  placeholder = 'Buscar...',
  debounceTime = 300,
  className = '',
  ...props
}: InputSearchProps) {
  const [internalValue, setInternalValue] = useState(propValue ?? defaultValue)

  // Actualizar el valor interno cuando cambia la prop
  useEffect(() => {
    if (propValue !== undefined) {
      setInternalValue(propValue)
    }
  }, [propValue])

  // Debounce para onChange
  useEffect(() => {
    if (!onChange) return

    const timeoutId = setTimeout(() => {
      onChange(internalValue)
    }, debounceTime)

    return () => clearTimeout(timeoutId)
  }, [internalValue, debounceTime, onChange])

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInternalValue(e.target.value)
  }, [])

  return (
    <div className={`relative ${className}`}>
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder={placeholder}
        value={internalValue}
        onChange={handleChange}
        className="pl-10 h-10 text-base bg-white border-border focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
        {...props}
      />
    </div>
  )
}
