export interface JwtPayload {
  id: string
  role: string
  permissions: string[]
}