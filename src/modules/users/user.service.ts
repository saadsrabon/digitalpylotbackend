import prisma from "../../config/prisma"
import { auditAction } from "../../utils/audit"
import { hashPassword } from "../../utils/password"
import { CreateUserDTO } from "./user.types"

export async function createUser(data: CreateUserDTO) {

  const role = await prisma.role.findUnique({
    where: { name: data.roleName }
  })

  if (!role) {
    throw new Error("Role not found")
  }

  const existingUser = await prisma.user.findUnique({
    where: { email: data.email }
  })

  if (existingUser) {
    throw new Error("Email already exists")
  }

  const hashedPassword = await hashPassword(data.password)

  const user = await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: hashedPassword,
      roleId: role.id,
      managerId: data.managerId
    },
    include: {
      role: true
    }
  })

  const actorId = data.managerId || user.id
  await auditAction(
  actorId,
  "USER_CREATED",
  user.id
)
  return user
}

export async function getUsers() {

  return prisma.user.findMany({
    include: {
      role: true
    }
  })
}

export async function getUserById(id: string) {

  return prisma.user.findUnique({
    where: { id },
    include: {
      role: true
    }
  })
}