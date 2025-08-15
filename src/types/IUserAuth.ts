// import { IPerson } from '../person'

export interface IUserAuth {
  // user_token: string //NO hay en el api
  // person_token: string
  // module_token: string
  user_id: string
  first_name: string
  last_name: string
  email: string
  refresh_token: string
  access_token: string
  expires_in: number // Tiempo de expiración del access_token en segundos
  expires_at: number // Tiempo de expiración del refresh_token en milisegundos
  // person: IPerson
}

export interface IUserSuccessCreate {
  username: string
  email: string
}

export interface IRefreshSession {
  access_token: string
  expires_in: number
}
export interface IResponseMessage {
  message: string
}

export interface IUserGoogle {
  accessToken: string
  email: string
  exp: number
  iat: number
  id: string
  idToken: string
  image: string
  jti: string
  name: string
  picture: string
  sub: string
}
