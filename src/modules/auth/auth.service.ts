import prisma from "../../config/prisma"

import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from "../../utils/jwt"
import { resolveUserPermissions } from "../../services/permission.service"
import { comparePassword } from "../../utils/password"
import { AppError } from "../../errors/AppError"

export async function login(email: string, password: string) {

  const user = await prisma.user.findUnique({
    where: { email },
    include: { role: true }
  })

  if (!user) throw new Error("Invalid credentials")

  const valid = await comparePassword(password, user.password)

  if (!valid) throw new Error("Invalid credentials")

  const permissions = await resolveUserPermissions(user.id)

  const accessToken = generateAccessToken({
    id: user.id,
    role: user.role.name,
    permissions
  })

  const refreshToken = generateRefreshToken({
    id: user.id
  })

  await prisma.session.create({
    data: {
      userId: user.id,
      refreshToken,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    }
  })

  return { accessToken, refreshToken,userId: user.id }
}

export async function refreshToken(refreshToken: string) {

  const decoded = verifyRefreshToken(refreshToken) as any

  const session = await prisma.session.findUnique({
    where: { refreshToken }
  })

  if (!session || session.revoked) {
    throw new Error("Invalid session")
  }

  const permissions = await resolveUserPermissions(decoded.id)

  const newAccessToken = generateAccessToken({
    id: decoded.id,
    permissions
  })

  return newAccessToken
}