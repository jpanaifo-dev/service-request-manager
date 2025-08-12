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
import { authBackground } from '@/assets/images'

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
      <div className="w-1/3 p-8 overflow-y-auto bg-white flex items-center justify-center">
        <div className="space-y-6 w-full max-w-md">
          <div className="flex flex-col gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Iniciar Sesión
              </h1>
              <p className="text-gray-600 text-sm mb-4">
                Ingresa tus credenciales para acceder a tu cuenta
              </p>
            </div>

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
                {/* end reCAPTCHA placeholder */}

                <Button
                  type="submit"
                  className="w-full bg-teal-500 hover:bg-teal-600 text-white py-3 rounded-lg font-medium"
                  disabled={isLoading}
                >
                  {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
                </Button>
              </form>
            </Form>

            <div className="mt-8 flex flex-col items-center">
              <span className="text-gray-500 text-sm mb-2">
                ¿No tienes cuenta?{' '}
                <Link
                  href="/register"
                  className="text-teal-600 hover:underline font-semibold text-sm"
                >
                  Regístrate gratis
                </Link>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Imagen (75% del ancho) */}
      <div className="w-2/3 bg-gray-100 flex items-center justify-center">
        {/* Reemplaza con tu imagen real */}
        <div className="relative w-full h-full">
          <Image
            src={authBackground.src} // Reemplaza con tu ruta de imagen
            alt="Background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-black/40 flex items-center justify-start">
            <div className="text-left p-8 text-white w-full max-w-2xl">
              <h2 className="text-5xl font-extrabold mb-4 tracking-tight drop-shadow-lg font-sans">
                Bienvenido de vuelta
              </h2>
              <p className="text-2xl text-left font-light drop-shadow-md font-sans">
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
