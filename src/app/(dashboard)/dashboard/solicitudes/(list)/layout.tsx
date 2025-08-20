interface IProps {
  children: React.ReactNode
}

export default function Layout({ children }: IProps) {
  return (
    <>
      <div>
        <h1 className="text-2xl font-bold">Solicitudes y Trámites</h1>
        <p className="text-gray-600 mb-6">
          Aquí puedes gestionar las solicitudes y trámites de tu aplicación.
        </p>
      </div>
      {children}
    </>
  )
}
