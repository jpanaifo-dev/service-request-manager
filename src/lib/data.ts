export interface User {
  documento: string
  nombre: string
  apellido: string
  email: string
  telefono: string
  direccion: string
}

export interface Solicitud {
  id: string
  usuarioDocumento: string
  tipo: string
  descripcion: string
  archivos: string[]
  estado: 'pendiente' | 'en-revision' | 'aprobada' | 'rechazada' | 'completada'
  fechaCreacion: string
  fechaActualizacion: string
  codigoVerificacion?: string
  observaciones?: string
}

// Enhanced mock data with more realistic examples
export const usuariosSimulados: User[] = [
  {
    documento: '12345678',
    nombre: 'Juan Carlos',
    apellido: 'Rodríguez',
    email: 'juan.rodriguez@email.com',
    telefono: '3001234567',
    direccion: 'Calle 123 #45-67, Bogotá',
  },
  {
    documento: '87654321',
    nombre: 'María Elena',
    apellido: 'González',
    email: 'maria.gonzalez@email.com',
    telefono: '3109876543',
    direccion: 'Carrera 45 #12-34, Medellín',
  },
  {
    documento: '11223344',
    nombre: 'Carlos Alberto',
    apellido: 'Martínez',
    email: 'carlos.martinez@email.com',
    telefono: '3201122334',
    direccion: 'Avenida 67 #89-12, Cali',
  },
  {
    documento: '55667788',
    nombre: 'Ana Sofía',
    apellido: 'López',
    email: 'ana.lopez@email.com',
    telefono: '3155667788',
    direccion: 'Transversal 23 #56-78, Barranquilla',
  },
  {
    documento: '99887766',
    nombre: 'Luis Fernando',
    apellido: 'Herrera',
    email: 'luis.herrera@email.com',
    telefono: '3199887766',
    direccion: 'Diagonal 89 #12-34, Cartagena',
  },
]

// Enhanced solicitudes with more variety and realistic data
export const solicitudesSimuladas: Solicitud[] = [
  {
    id: 'SOL-001',
    usuarioDocumento: '12345678',
    tipo: 'Certificado de Residencia',
    descripcion:
      'Solicito certificado de residencia para trámites bancarios y apertura de cuenta corriente',
    archivos: ['cedula.pdf', 'recibo_servicios.pdf'],
    estado: 'aprobada',
    fechaCreacion: '2024-01-15',
    fechaActualizacion: '2024-01-18',
    observaciones:
      'Documentos aprobados, certificado listo para entrega en ventanilla principal',
  },
  {
    id: 'SOL-002',
    usuarioDocumento: '12345678',
    tipo: 'Permiso de Construcción',
    descripcion:
      'Permiso para construcción de segundo piso en vivienda unifamiliar existente',
    archivos: ['planos.pdf', 'licencia_construccion.pdf', 'estudio_suelos.pdf'],
    estado: 'en-revision',
    fechaCreacion: '2024-01-20',
    fechaActualizacion: '2024-01-22',
    observaciones:
      'En revisión por el departamento de planeación. Pendiente concepto de bomberos.',
  },
  {
    id: 'SOL-003',
    usuarioDocumento: '87654321',
    tipo: 'Certificado de Ingresos',
    descripcion:
      'Certificado de ingresos para solicitud de crédito hipotecario en entidad bancaria',
    archivos: ['declaracion_renta.pdf', 'certificado_laboral.pdf'],
    estado: 'completada',
    fechaCreacion: '2024-01-10',
    fechaActualizacion: '2024-01-25',
    observaciones:
      'Certificado entregado exitosamente. Documento válido por 30 días.',
  },
  {
    id: 'SOL-004',
    usuarioDocumento: '87654321',
    tipo: 'Licencia Comercial',
    descripcion:
      'Licencia para apertura de restaurante en zona comercial del centro de la ciudad',
    archivos: ['rut.pdf', 'camara_comercio.pdf', 'concepto_sanitario.pdf'],
    estado: 'pendiente',
    fechaCreacion: '2024-01-28',
    fechaActualizacion: '2024-01-28',
    observaciones: 'Solicitud recibida, en cola para asignación de revisor',
  },
  {
    id: 'SOL-005',
    usuarioDocumento: '11223344',
    tipo: 'Certificado de Paz y Salvo',
    descripcion:
      'Certificado de paz y salvo por concepto de impuesto predial para venta de inmueble',
    archivos: ['escrituras.pdf', 'ultimo_recibo_predial.pdf'],
    estado: 'rechazada',
    fechaCreacion: '2024-01-12',
    fechaActualizacion: '2024-01-16',
    observaciones:
      'Rechazada: Existe deuda pendiente por $450.000 en impuesto predial. Debe ponerse al día.',
  },
  {
    id: 'SOL-006',
    usuarioDocumento: '55667788',
    tipo: 'Permiso de Eventos',
    descripcion:
      'Permiso para evento cultural al aire libre en parque municipal con capacidad para 200 personas',
    archivos: [
      'propuesta_evento.pdf',
      'seguro_responsabilidad.pdf',
      'plan_contingencia.pdf',
    ],
    estado: 'aprobada',
    fechaCreacion: '2024-01-18',
    fechaActualizacion: '2024-01-24',
    observaciones:
      'Evento aprobado para el 15 de febrero. Debe cumplir con medidas de seguridad establecidas.',
  },
]

export const tiposSolicitud = [
  'Certificado de Residencia',
  'Certificado de Ingresos',
  'Permiso de Construcción',
  'Licencia Comercial',
  'Certificado de Paz y Salvo',
  'Permiso de Eventos',
  'Certificado de Tradición y Libertad',
  'Licencia de Funcionamiento',
  'Permiso de Ocupación del Espacio Público',
  'Otro',
]

// Funciones helper
export function buscarUsuarioPorDocumento(documento: string): User | undefined {
  return usuariosSimulados.find((user) => user.documento === documento)
}

export function buscarSolicitudesPorUsuario(documento: string): Solicitud[] {
  return solicitudesSimuladas.filter(
    (sol) => sol.usuarioDocumento === documento
  )
}

export function generarCodigoVerificacion(): string {
  return '1122'
}

export function obtenerColorEstado(estado: Solicitud['estado']): string {
  switch (estado) {
    case 'pendiente':
      return 'bg-yellow-100 text-yellow-800'
    case 'en-revision':
      return 'bg-blue-100 text-blue-800'
    case 'aprobada':
      return 'bg-green-100 text-green-800'
    case 'rechazada':
      return 'bg-red-100 text-red-800'
    case 'completada':
      return 'bg-gray-100 text-gray-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

// Added new helper functions for enhanced functionality
export function obtenerEstadisticasGenerales() {
  return {
    totalSolicitudes: solicitudesSimuladas.length,
    pendientes: solicitudesSimuladas.filter((s) => s.estado === 'pendiente')
      .length,
    enRevision: solicitudesSimuladas.filter((s) => s.estado === 'en-revision')
      .length,
    aprobadas: solicitudesSimuladas.filter((s) => s.estado === 'aprobada')
      .length,
    completadas: solicitudesSimuladas.filter((s) => s.estado === 'completada')
      .length,
    rechazadas: solicitudesSimuladas.filter((s) => s.estado === 'rechazada')
      .length,
    totalUsuarios: usuariosSimulados.length,
  }
}

export function obtenerSolicitudesRecientes(limite = 5): Solicitud[] {
  return [...solicitudesSimuladas]
    .sort(
      (a, b) =>
        new Date(b.fechaCreacion).getTime() -
        new Date(a.fechaCreacion).getTime()
    )
    .slice(0, limite)
}

export function validarDocumento(documento: string): boolean {
  return /^\d{8,10}$/.test(documento)
}

export function formatearFecha(fecha: string): string {
  return new Date(fecha).toLocaleDateString('es-CO', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
