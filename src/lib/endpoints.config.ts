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
  DESK: 'desk/',
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
    PERSON: {
      LIST: `${BASE_PATHS.CORE}${MODELS_PATHS.PERSON}`,
      DETAIL: (id: string) => `${BASE_PATHS.CORE}${MODELS_PATHS.PERSON}${id}/`,
    },
  },
  DESK: {
    PROCEDURE_STATUS: {
      LIST: `${BASE_PATHS.DESK}procedure-status/`,
      DETAIL: (id: string) => `${BASE_PATHS.DESK}procedure-status/${id}/`,
    },
    PROCEDURE_TYPE: {
      LIST: `${BASE_PATHS.DESK}procedure-type/`,
      DETAIL: (id: string) => `${BASE_PATHS.DESK}procedure-type/${id}/`,
    },
    PROCEDURE: {
      LIST: `${BASE_PATHS.DESK}procedure/`,
      LIST_DETAIL: `${BASE_PATHS.DESK}procedure/list/`,
      DETAIL: (id: string) => `${BASE_PATHS.DESK}procedure/${id}/`,
    },
    PROCEDURE_TRACKING: {
      LIST: `${BASE_PATHS.DESK}procedure-tracking/`,
      LIST_DETAIL: `${BASE_PATHS.DESK}procedure-tracking/list/`,
      DETAIL: (id: string) => `${BASE_PATHS.DESK}procedure-tracking/${id}/`,
    },
  },
  ACCOUNTS: {},
  PERSON: {},
}
