'use client'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
// import { AuthLayout } from '@/modules/app'
import { LoaderIcon, X } from 'lucide-react'
import { Input } from '../ui/input'
import { useForm, Controller } from 'react-hook-form'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { recoveryPassword } from '@/api/auth'
import { ToastCustom } from '../app'
import { APP_URL } from '@/data/constants'
import { ForgotPasswordForm } from '@/types'
import Image from 'next/image'
import { authBackground } from '@/assets/images'

interface IProps {
  email?: string
}

export const ForgotPassword = (props: IProps) => {
  const { email } = props
  const { control, handleSubmit, watch, formState } =
    useForm<ForgotPasswordForm>()
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<string[]>([])

  const router = useRouter()

  const { errors: formErrors } = formState

  const handleChangePassword = async (data: ForgotPasswordForm) => {
    const { email, newPassword, confirmPassword } = data

    if (newPassword !== confirmPassword) {
      toast.error(
        <ToastCustom
          title="Error"
          description="Las contraseñas no coinciden."
        />
      )
      return
    }

    setIsLoading(true)

    const response = await recoveryPassword({
      email,
      password: newPassword,
      confirm_password: confirmPassword,
      code_token: '', // Puedes ajustar esto según tu API
    })

    if (response?.status === 200) {
      toast.success(
        <ToastCustom
          title="¡Éxito!"
          description="Contraseña cambiada correctamente. Serás redirigido al inicio de sesión en unos segundos."
        />
      )
      setTimeout(() => router.push(APP_URL.AUTH.LOGIN), 2000)
    } else {
      setErrors(response?.errors || [])
    }

    setIsLoading(false)
  }

  return (
    <div className="flex h-screen">
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Cambiar contraseña</h2>
        <p className="text-sm text-gray-600">
          Por favor, ingresa tu correo electrónico y tu nueva contraseña.
        </p>

        {errors.length > 0 && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            <button
              onClick={() => setErrors([])}
              className="absolute top-0 right-0 mt-1 mr-2 text-red-500 hover:text-red-700 focus:outline-none"
              aria-label="Cerrar"
            >
              <X className="w-4 h-4" />
            </button>
            <ul className="list-disc list-inside">
              {errors.map((error, index) => (
                <li
                  key={index}
                  className="text-red-500 text-sm mt-1"
                >
                  {error}
                </li>
              ))}
            </ul>
          </div>
        )}

        <form
          onSubmit={handleSubmit(handleChangePassword)}
          className="space-y-4"
        >
          <Controller
            name="email"
            control={control}
            defaultValue=""
            rules={{
              required: 'El correo electrónico es requerido',
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: 'El correo electrónico no es válido',
              },
            }}
            render={({ field }) => (
              <Input
                {...field}
                type="email"
                placeholder="Correo electrónico"
              />
            )}
          />
          {formErrors.email && (
            <p className="text-red-500 text-sm mt-1">
              {formErrors.email.message}
            </p>
          )}

          <Controller
            name="newPassword"
            control={control}
            defaultValue=""
            rules={{
              required: 'La nueva contraseña es requerida',
              minLength: {
                value: 6,
                message: 'La contraseña debe tener al menos 6 caracteres',
              },
            }}
            render={({ field }) => <Input {...field} />}
          />
          {formErrors?.newPassword && (
            <p className="text-red-500 text-sm mt-1">
              {formErrors?.newPassword?.message}
            </p>
          )}

          <Controller
            name="confirmPassword"
            control={control}
            defaultValue=""
            rules={{
              required: 'Debes confirmar tu contraseña',
              validate: (value) =>
                value === watch('newPassword') ||
                'Las contraseñas no coinciden',
            }}
            render={({ field }) => (
              <Input
                {...field}
                type="password"
                placeholder="Confirmar contraseña"
              />
            )}
          />
          {formErrors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">
              {formErrors.confirmPassword.message}
            </p>
          )}

          <Button
            type="submit"
            className="w-full bg-[#001B3D]"
            disabled={isLoading}
          >
            {isLoading && <LoaderIcon className="animate-spin mr-2" />}
            Cambiar contraseña
          </Button>

          <Button
            type="button"
            onClick={() => router.push(APP_URL.AUTH.LOGIN)}
            variant="link"
            className="w-full"
          >
            Regresar al inicio de sesión
          </Button>
        </form>
      </div>

      {/* Imagen (75% del ancho) */}
      <div className="w-2/3 bg-gray-100 flex items-center justify-center">
        <div className="relative w-full h-full">
          <Image
            src={authBackground.src}
            alt="Background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-black/40 flex items-center justify-center">
            <div className="text-left p-8 text-white w-full ">
              <h2 className="text-5xl font-extrabold mb-4 tracking-tight drop-shadow-lg font-sans text-center">
                Bienvenido de vuelta
              </h2>
              <p className="text-2xl text-center font-light drop-shadow-md font-sans">
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
