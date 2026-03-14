import prisma from "../../config/prisma"

export async function getAllPermissions() {

  return prisma.permission.findMany({
    orderBy: {
      key: "asc"
    }
  })

}

export async function getUserPermissions(userId: string) {

  const rolePermissions = await prisma.rolePermission.findMany({
    where: {
      role: {
        users: {
          some: { id: userId }
        }
      }
    },
    include: {
      permission: true
    }
  })

  const userPermissions = await prisma.userPermission.findMany({
    where: { userId },
    include: {
      permission: true
    }
  })

  return {
    rolePermissions,
    userPermissions
  }

}

import { resolveUserPermissions } from "../../services/permission.service"
import { AppError } from "../../errors/AppError"

export async function updateUserPermissions(
  actorId: string,
  targetUserId: string,
  permissionIds: string[]
) {

  const actorPermissions = await resolveUserPermissions(actorId)

  const permissions = await prisma.permission.findMany({
    where: {
      id: { in: permissionIds }
    }
  })

  for (const perm of permissions) {

    if (!actorPermissions.includes(perm.key)) {
      throw new AppError(
        `You cannot grant permission: ${perm.key}`,
        403
      )
    }

  }

  await prisma.userPermission.deleteMany({
    where: { userId: targetUserId }
  })

  await prisma.userPermission.createMany({
    data: permissionIds.map((permissionId) => ({
      userId: targetUserId,
      permissionId
    }))
  })

  return { success: true }

}