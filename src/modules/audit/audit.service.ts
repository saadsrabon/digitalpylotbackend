import prisma from "../../config/prisma"

export async function createAuditLog({
  actorId,
  action,
  targetId,
  metadata
}: {
  actorId: string
  action: string
  targetId?: string
  metadata?: any
}) {

  await prisma.auditLog.create({
    data: {
      actorId,
      action,
      targetId,
      metadata
    }
  })

}