export const APP_NAME = 'Intranet Estudiante UNAP'

export const APP_DESCRIPTION = {
  title: 'Intranet Estudiante UNAP',
  description:
    'Intranet Estudiante de la Escuela de Posgrado de la Universidad Nacional de la Amazonía Peruana (UNAP)',
}

export const URL_DASHBOARD = '/dashboard'

export const APP_URL = {
  HOME: {
    UNAUTHORIZED: '/unauthorized',
    BASE: '/',
  },
  AUTH: {
    LOGIN: '/login',
    REGISTER: '/register',
    FORGOT_PASSWORD: '/forgot-password',
  },
  DASHBOARD: {
    BASE: `${URL_DASHBOARD}`,
    SOLICITUDES: `${URL_DASHBOARD}/solicitudes`,
    OFFICES: `${URL_DASHBOARD}/oficinas`,
    USERS: `${URL_DASHBOARD}/usuarios`,
    DOCUMENTS_TYPES: `${URL_DASHBOARD}/documentos-tipos`,
    DOCUMENTS_STATUS: `${URL_DASHBOARD}/documentos-estados`,
  },
}
