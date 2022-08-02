export interface UserDetails {
  username: string,
  classe: string,
  level: number,
  password: string,
}

export interface UserIdFull extends UserDetails {
  id?: number,
}

export interface UserLogin {
  username: string,
  password: string,
}