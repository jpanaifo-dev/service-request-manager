export const CONFIG_APP = {
  APP_NAME: process.env.APP_NAME,
  URL_PROD: process.env.URL_API_PRODUCTION,
  URL_LOCAL: process.env.URL_API_LOCAL,
  SESSION_SECRET: process.env.SESSION_SECRET,
  API_URL_RENIEC: process.env.API_URL_RENIEC,
  TOKEN: undefined,
}

export type ServicesModulesType = {
  [key: string]: {
    URL_PROD: string
    URL_LOCAL: string
    TOKEN?: string
  }
}
