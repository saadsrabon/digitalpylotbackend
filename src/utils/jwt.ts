import jwt from "jsonwebtoken"

import { env } from "../config/env"

const { JWT_REFRESH_SECRET: REFRESH_SECRET, JWT_SECRET: ACCESS_SECRET } = env

export function generateAccessToken(payload: object) {
  return jwt.sign(payload, ACCESS_SECRET, {
    expiresIn: "15m"
  })
}

export function generateRefreshToken(payload: object) {
  return jwt.sign(payload, REFRESH_SECRET, {
    expiresIn: "7d"
  })
}

export function verifyAccessToken(token: string) {
  return jwt.verify(token, ACCESS_SECRET)
}

export function verifyRefreshToken(token: string) {
  return jwt.verify(token, REFRESH_SECRET)
}