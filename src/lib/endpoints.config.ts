const BASE_PATHS = {
  AUTH: 'accounts/',
  ACCOUNTS: 'accounts/',
  PERSON: 'person/',
  CORE: 'core/',
  ADMISSION: 'admission/',
  PROGRAM: 'program/',
  FILE: 'manager/',
  REPORT: 'report/',
  EVALUATION: 'evaluation/',
  ACADEMIC: 'academic/',
  ECONOMIC: 'economic/',
}

const MODELS_PATHS = {
  USER: 'users/',
  PERSON: 'person/',
  ENROLLMENT: 'enrollments/',
}

export const ENDPOINTS_CONFIG = {
  AUTH: {
    LOGIN: `${BASE_PATHS.AUTH}${MODELS_PATHS.USER}login/`,
    PASSWORD_CHANGE: `${BASE_PATHS.AUTH}${MODELS_PATHS.USER}password-change/`,
    PASSWORD_RESET: `${BASE_PATHS.AUTH}${MODELS_PATHS.USER}password-reset/`,
  },
  CORE: {
    OFFICES: {
      LIST: `${BASE_PATHS.CORE}office/`,
      DETAIL: (id: string) => `${BASE_PATHS.CORE}office/${id}/`,
    },
  },
  ACCOUNTS: {},
  PERSON: {},
}
