/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import type React from 'react'

import { useState, useRef, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Upload, File, X, CheckCircle, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface FileUploadProps {
  value?: File | null
  onChange: (file: File | null) => void
  accept?: string
  maxSize?: number // in MB
  placeholder?: string
  className?: string
  disabled?: boolean
  loading?: boolean
  progress?: number
  error?: string
  success?: boolean
}

export function FileUpload({
  value,
  onChange,
  accept = '.pdf,application/pdf',
  maxSize = 2,
  placeholder = 'Arrastra tu archivo aquí o haz clic para seleccionar',
  className,
  disabled = false,
  loading = false,
  progress = 0,
  error,
  success = false,
}: FileUploadProps) {
  const [isDragOver, setIsDragOver] = useState(false)
  const [isAttaching, setIsAttaching] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return (
      Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
    )
  }

  const validateFile = (file: File): string | null => {
    if (maxSize && file.size > maxSize * 1024 * 1024) {
      return `El archivo es demasiado grande. Máximo ${maxSize}MB permitido.`
    }

    if (accept) {
      const acceptedTypes = accept.split(',').map((type) => type.trim())
      const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase()
      const mimeType = file.type

      const isValidType = acceptedTypes.some(
        (type) => type === mimeType || type === fileExtension || type === '*'
      )

      if (!isValidType) {
        return `Tipo de archivo no válido. Solo se permiten: ${accept}`
      }
    }

    return null
  }

  const handleFileChange = useCallback(
    (file: File | null) => {
      if (!file) {
        onChange(null)
        return
      }

      const validationError = validateFile(file)
      if (validationError) {
        console.error(validationError)
        return
      }

      setIsAttaching(true)
      setTimeout(() => {
        onChange(file)
        setIsAttaching(false)
      }, 300)
    },
    [onChange, maxSize, accept]
  )

  const handleDragOver = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      if (!disabled) {
        setIsDragOver(true)
      }
    },
    [disabled]
  )

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragOver(false)
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      setIsDragOver(false)

      if (disabled) return

      const droppedFile = e.dataTransfer.files?.[0]
      if (droppedFile) {
        handleFileChange(droppedFile)
      }
    },
    [disabled, handleFileChange]
  )

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFile = e.target.files?.[0] || null
      handleFileChange(selectedFile)
    },
    [handleFileChange]
  )

  const handleRemoveFile = useCallback(() => {
    onChange(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }, [onChange])

  const handleClick = useCallback(() => {
    if (!disabled) {
      fileInputRef.current?.click()
    }
  }, [disabled])

  const getStatusIcon = () => {
    if (loading) return <Upload className="h-5 w-5 animate-spin" />
    if (error) return <AlertCircle className="h-5 w-5 text-red-500" />
    if (success || value)
      return <CheckCircle className="h-5 w-5 text-green-500" />
    return <Upload className="h-5 w-5 text-gray-400" />
  }

  const getStatusColor = () => {
    if (error) return 'border-red-300 bg-red-50'
    if (success || value) return 'border-green-300 bg-green-50'
    if (isDragOver && !disabled) return 'border-blue-400 bg-blue-50'
    if (disabled) return 'border-gray-200 bg-gray-50'
    return 'border-gray-300 bg-white hover:border-gray-400 hover:bg-gray-50'
  }

  return (
    <div className={cn('w-full', className)}>
      <div
        className={cn(
          'relative border-2 border-dashed rounded-xl p-6 transition-all duration-300 cursor-pointer',
          getStatusColor(),
          disabled && 'cursor-not-allowed opacity-60',
          loading && 'animate-pulse border-blue-400 bg-blue-50',
          isAttaching && 'scale-105 border-blue-400 bg-blue-50'
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          onChange={handleInputChange}
          className="hidden"
          disabled={disabled}
        />

        {!value ? (
          <div className="flex flex-col items-center justify-center space-y-4">
            <div
              className={cn(
                'p-3 rounded-full bg-gray-100 transition-all duration-300',
                loading && 'animate-bounce bg-blue-100',
                isAttaching && 'scale-110 bg-blue-100'
              )}
            >
              {getStatusIcon()}
            </div>

            <div className="text-center space-y-2">
              <p className="text-sm font-medium text-gray-700">{placeholder}</p>
              <p className="text-xs text-gray-500">
                {accept.includes('pdf') ? 'PDF' : 'Archivos'} hasta {maxSize}MB
              </p>
            </div>

            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={disabled}
              className="pointer-events-none bg-transparent"
            >
              <Upload className="h-4 w-4 mr-2" />
              Seleccionar archivo
            </Button>
          </div>
        ) : (
          <div
            className={cn(
              'space-y-4 transition-all duration-300',
              loading && 'transform translate-y-1 opacity-90'
            )}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div
                  className={cn(
                    'p-2 rounded-lg bg-blue-100 transition-all duration-300',
                    loading && 'animate-pulse scale-110'
                  )}
                >
                  <File className="h-5 w-5 text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {value.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {formatFileSize(value.size)}
                  </p>
                </div>
              </div>

              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation()
                  handleRemoveFile()
                }}
                disabled={disabled || loading}
                className="text-red-500 hover:text-red-700 hover:bg-red-50"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {loading && (
              <div
                className={cn(
                  'space-y-2 transition-all duration-300',
                  'animate-in slide-in-from-bottom-2'
                )}
              >
                <div className="flex justify-between text-xs text-gray-600">
                  <span className="animate-pulse">Subiendo...</span>
                  <span className="font-medium">{progress}%</span>
                </div>
                <Progress
                  value={progress}
                  className={cn(
                    'h-2 transition-all duration-300',
                    'shadow-sm shadow-blue-200'
                  )}
                />
              </div>
            )}
          </div>
        )}
      </div>

      {error && (
        <p className="mt-2 text-sm text-red-600 flex items-center">
          <AlertCircle className="h-4 w-4 mr-1" />
          {error}
        </p>
      )}
    </div>
  )
}
