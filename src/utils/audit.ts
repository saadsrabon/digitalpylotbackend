import { createAuditLog } from "../modules/audit/audit.service"

export async function auditAction(
  actorId: string,
  action: string,
  targetId?: string,
  metadata?: any
) {

  try {

    await createAuditLog({
      actorId,
      action,
      targetId,
      metadata
    })

  } catch (error) {

    console.error("Audit log failed:", error)

  }

}