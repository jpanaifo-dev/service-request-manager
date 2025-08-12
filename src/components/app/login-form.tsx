'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { toast } from 'react-toastify'
import Image from 'next/image'

const loginSchema = z.object({
  email: z.string().email('Ingresa un email válido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
  rememberMe: z.boolean().optional(),
})

type LoginFormData = z.infer<typeof loginSchema>

export const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  })

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))
      toast.success('Inicio de sesión exitoso')
      console.log('Login data:', data)
    } catch {
      toast.error('Error al iniciar sesión. Por favor, inténtalo de nuevo.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex h-screen">
      {/* Formulario (25% del ancho) */}
      <div className="w-1/4 p-8 overflow-y-auto bg-white">
        <div className="space-y-6">
          {/* Header */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">J</span>
              </div>
              <span className="text-xl font-semibold text-gray-900">
                Joinnus
              </span>
            </div>
            <Link
              href="/register"
              className="text-sm text-teal-600 hover:underline"
            >
              ¿No tienes cuenta? Regístrate
            </Link>
          </div>

          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-6">
              Iniciar Sesión
            </h1>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm text-gray-700">
                        Email
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="tu@email.com"
                          className="border-gray-200 focus:border-teal-500 focus:ring-teal-500"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm text-gray-700">
                        Contraseña
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Tu contraseña"
                          className="border-gray-200 focus:border-teal-500 focus:ring-teal-500"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex items-center justify-between">
                  <FormField
                    control={form.control}
                    name="rememberMe"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="border-teal-500 data-[state=checked]:bg-teal-500"
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="text-sm">Recordarme</FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />

                  <Link
                    href="#"
                    className="text-sm text-teal-600 hover:underline"
                  >
                    ¿Olvidaste tu contraseña?
                  </Link>
                </div>

                {/* reCAPTCHA placeholder */}
                <div className="bg-gray-50 border border-gray-200 rounded p-4 flex items-center justify-center">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 border-2 border-gray-300 rounded"></div>
                    <span className="text-sm text-gray-600">
                      No soy un robot
                    </span>
                    <div className="ml-4">
                      <div className="w-8 h-8 bg-blue-500 rounded"></div>
                    </div>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-teal-500 hover:bg-teal-600 text-white py-3 rounded-lg font-medium"
                  disabled={isLoading}
                >
                  {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
                </Button>
              </form>
            </Form>

            <div className="mt-6 text-center">
              <div className="text-xs text-gray-500 mb-2">Powered by</div>
              <div className="text-sm font-semibold text-gray-700">JOINNUS</div>
            </div>
          </div>
        </div>
      </div>

      {/* Imagen (75% del ancho) */}
      <div className="w-3/4 bg-gray-100 flex items-center justify-center">
        {/* Reemplaza con tu imagen real */}
        <div className="relative w-full h-full">
          <Image
            src="/login-background.jpg" // Reemplaza con tu ruta de imagen
            alt="Background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
            <div className="text-center p-8 text-white">
              <h2 className="text-4xl font-bold mb-4">Bienvenido de vuelta</h2>
              <p className="text-xl max-w-2xl">
                Accede a tu cuenta para descubrir eventos personalizados según
                tus intereses
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
