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
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    FORGOT_PASSWORD: '/auth/forgot-password',
  },
  DASHBOARD: {
    BASE: `${URL_DASHBOARD}`,
    SOLICITUDES: `${URL_DASHBOARD}/solicitudes`,
    OFFICES: `${URL_DASHBOARD}/oficinas`,
    USERS: `${URL_DASHBOARD}/usuarios`,
  },
}
