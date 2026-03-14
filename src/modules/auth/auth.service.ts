import prisma from "../../config/prisma"

import { generateAccessToken } from "../../utils/jwt"
import { resolveUserPermissions } from "../../services/permission.service"
import { comparePassword } from "../../utils/password"

export async function login(email: string, password: string) {

  const user = await prisma.user.findUnique({
    where: { email },
    include: { role: true }
  })

  if (!user) {
    throw new Error("Invalid credentials")
  }

  const valid = await comparePassword(password, user.password)

  if (!valid) {
    throw new Error("Invalid credentials")
  }

  const permissions = await resolveUserPermissions(user.id)

  const token = generateAccessToken({
    id: user.id,
    role: user.role.name,
    permissions
  })

  return {
    token,
    user: {
      id: user.id,
      email: user.email,
      role: user.role.name,
      permissions
    }
  }
}