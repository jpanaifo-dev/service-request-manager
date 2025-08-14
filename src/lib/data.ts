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

export interface Oficina {
  id: string
  nombre: string
  descripcion: string
  responsable: string
  email: string
  telefono: string
  activa: boolean
  fechaCreacion: string
}

export interface AsignacionUsuarioOficina {
  id: string
  usuarioDocumento: string
  oficinaId: string
  rol: 'administrador' | 'operador' | 'consultor'
  fechaAsignacion: string
  activa: boolean
}

export interface HistorialSolicitud {
  id: string
  solicitudId: string
  tipo:
    | 'creacion'
    | 'actualizacion'
    | 'derivacion'
    | 'aprobacion'
    | 'rechazo'
    | 'completado'
  accion: string
  usuario: string
  oficina: string
  fecha: string
  hora: string
  estadoAnterior?: string
  estadoNuevo?: string
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

export const oficinasSimuladas: Oficina[] = [
  {
    id: 'OF001',
    nombre: 'Oficina de Atención Ciudadana',
    descripcion: 'Atención general al ciudadano y recepción de solicitudes',
    responsable: 'María Fernanda Castro',
    email: 'atencion.ciudadana@gobierno.gov.co',
    telefono: '+57 1 234-5678',
    activa: true,
    fechaCreacion: '2023-01-15',
  },
  {
    id: 'OF002',
    nombre: 'Departamento de Planeación',
    descripcion:
      'Revisión y aprobación de permisos de construcción y urbanismo',
    responsable: 'Ing. Roberto Mendoza',
    email: 'planeacion@gobierno.gov.co',
    telefono: '+57 1 234-5679',
    activa: true,
    fechaCreacion: '2023-01-15',
  },
  {
    id: 'OF003',
    nombre: 'Oficina de Hacienda',
    descripcion:
      'Gestión de impuestos, certificados de paz y salvo y asuntos fiscales',
    responsable: 'Dra. Carmen Rodríguez',
    email: 'hacienda@gobierno.gov.co',
    telefono: '+57 1 234-5680',
    activa: true,
    fechaCreacion: '2023-01-15',
  },
  {
    id: 'OF004',
    nombre: 'Secretaría de Desarrollo Económico',
    descripcion:
      'Licencias comerciales, permisos de eventos y desarrollo empresarial',
    responsable: 'Lic. Andrés Vargas',
    email: 'desarrollo.economico@gobierno.gov.co',
    telefono: '+57 1 234-5681',
    activa: true,
    fechaCreacion: '2023-01-15',
  },
  {
    id: 'OF005',
    nombre: 'Oficina de Sistemas',
    descripcion: 'Soporte técnico y mantenimiento de sistemas informáticos',
    responsable: 'Ing. Patricia Jiménez',
    email: 'sistemas@gobierno.gov.co',
    telefono: '+57 1 234-5682',
    activa: false,
    fechaCreacion: '2023-01-15',
  },
]

export const asignacionesSimuladas: AsignacionUsuarioOficina[] = [
  {
    id: 'AS001',
    usuarioDocumento: '12345678',
    oficinaId: 'OF001',
    rol: 'operador',
    fechaAsignacion: '2023-02-01',
    activa: true,
  },
  {
    id: 'AS002',
    usuarioDocumento: '87654321',
    oficinaId: 'OF002',
    rol: 'administrador',
    fechaAsignacion: '2023-02-01',
    activa: true,
  },
  {
    id: 'AS003',
    usuarioDocumento: '11223344',
    oficinaId: 'OF003',
    rol: 'operador',
    fechaAsignacion: '2023-02-15',
    activa: true,
  },
  {
    id: 'AS004',
    usuarioDocumento: '55667788',
    oficinaId: 'OF004',
    rol: 'consultor',
    fechaAsignacion: '2023-03-01',
    activa: true,
  },
  {
    id: 'AS005',
    usuarioDocumento: '99887766',
    oficinaId: 'OF001',
    rol: 'administrador',
    fechaAsignacion: '2023-03-15',
    activa: true,
  },
  {
    id: 'AS006',
    usuarioDocumento: '12345678',
    oficinaId: 'OF003',
    rol: 'consultor',
    fechaAsignacion: '2023-04-01',
    activa: false,
  },
]

export const historialSimulado: HistorialSolicitud[] = [
  {
    id: 'HIST-001',
    solicitudId: 'SOL-001',
    tipo: 'creacion',
    accion: 'Solicitud creada por el ciudadano',
    usuario: 'Juan Carlos Rodríguez',
    oficina: 'Portal Ciudadano',
    fecha: '2024-01-15',
    hora: '09:30',
    estadoNuevo: 'pendiente',
    observaciones: 'Solicitud creada exitosamente con documentos adjuntos',
  },
  {
    id: 'HIST-002',
    solicitudId: 'SOL-001',
    tipo: 'actualizacion',
    accion: 'Solicitud asignada para revisión',
    usuario: 'María Fernanda Castro',
    oficina: 'Oficina de Atención Ciudadana',
    fecha: '2024-01-16',
    hora: '14:15',
    estadoAnterior: 'pendiente',
    estadoNuevo: 'en-revision',
    observaciones:
      'Asignada al revisor especializado en certificados de residencia',
  },
  {
    id: 'HIST-003',
    solicitudId: 'SOL-001',
    tipo: 'aprobacion',
    accion: 'Solicitud aprobada',
    usuario: 'Carlos Mendoza',
    oficina: 'Oficina de Atención Ciudadana',
    fecha: '2024-01-18',
    hora: '11:45',
    estadoAnterior: 'en-revision',
    estadoNuevo: 'aprobada',
    observaciones:
      'Documentos verificados correctamente. Certificado listo para entrega.',
  },
  {
    id: 'HIST-004',
    solicitudId: 'SOL-002',
    tipo: 'creacion',
    accion: 'Solicitud creada por el ciudadano',
    usuario: 'Juan Carlos Rodríguez',
    oficina: 'Portal Ciudadano',
    fecha: '2024-01-20',
    hora: '16:20',
    estadoNuevo: 'pendiente',
    observaciones:
      'Solicitud de permiso de construcción con planos arquitectónicos',
  },
  {
    id: 'HIST-005',
    solicitudId: 'SOL-002',
    tipo: 'derivacion',
    accion: 'Solicitud derivada al Departamento de Planeación',
    usuario: 'María Fernanda Castro',
    oficina: 'Oficina de Atención Ciudadana',
    fecha: '2024-01-21',
    hora: '10:30',
    estadoAnterior: 'pendiente',
    estadoNuevo: 'en-revision',
    observaciones:
      'Derivada por requerir revisión técnica especializada de planos',
  },
  {
    id: 'HIST-006',
    solicitudId: 'SOL-002',
    tipo: 'actualizacion',
    accion: 'Solicitud en revisión técnica',
    usuario: 'Ing. Roberto Mendoza',
    oficina: 'Departamento de Planeación',
    fecha: '2024-01-22',
    hora: '09:15',
    estadoAnterior: 'en-revision',
    estadoNuevo: 'en-revision',
    observaciones:
      'Revisión de planos en proceso. Pendiente concepto de bomberos.',
  },
  {
    id: 'HIST-007',
    solicitudId: 'SOL-003',
    tipo: 'creacion',
    accion: 'Solicitud creada por el ciudadano',
    usuario: 'María Elena González',
    oficina: 'Portal Ciudadano',
    fecha: '2024-01-10',
    hora: '08:45',
    estadoNuevo: 'pendiente',
    observaciones:
      'Solicitud de certificado de ingresos para crédito hipotecario',
  },
  {
    id: 'HIST-008',
    solicitudId: 'SOL-003',
    tipo: 'actualizacion',
    accion: 'Solicitud en proceso de verificación',
    usuario: 'Ana Patricia Ruiz',
    oficina: 'Oficina de Hacienda',
    fecha: '2024-01-12',
    hora: '13:20',
    estadoAnterior: 'pendiente',
    estadoNuevo: 'en-revision',
    observaciones: 'Verificación de información tributaria en proceso',
  },
  {
    id: 'HIST-009',
    solicitudId: 'SOL-003',
    tipo: 'aprobacion',
    accion: 'Solicitud aprobada y certificado generado',
    usuario: 'Dra. Carmen Rodríguez',
    oficina: 'Oficina de Hacienda',
    fecha: '2024-01-20',
    hora: '15:30',
    estadoAnterior: 'en-revision',
    estadoNuevo: 'aprobada',
    observaciones: 'Certificado de ingresos aprobado y generado',
  },
  {
    id: 'HIST-010',
    solicitudId: 'SOL-003',
    tipo: 'completado',
    accion: 'Certificado entregado al ciudadano',
    usuario: 'María Fernanda Castro',
    oficina: 'Oficina de Atención Ciudadana',
    fecha: '2024-01-25',
    hora: '10:15',
    estadoAnterior: 'aprobada',
    estadoNuevo: 'completada',
    observaciones:
      'Certificado entregado exitosamente. Documento válido por 30 días.',
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

export function obtenerHistorialSolicitud(
  solicitudId: string
): HistorialSolicitud[] {
  return historialSimulado
    .filter((hist) => hist.solicitudId === solicitudId)
    .sort((a, b) => {
      const fechaA = new Date(`${a.fecha} ${a.hora}`)
      const fechaB = new Date(`${b.fecha} ${b.hora}`)
      return fechaB.getTime() - fechaA.getTime() // Más reciente primero
    })
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
