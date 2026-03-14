import { Request, Response } from "express"
import * as permissionService from "./permission.service"

export async function getPermissions(
  req: Request,
  res: Response
): Promise<void> {

  const permissions = await permissionService.getAllPermissions()

  res.json(permissions)
}

export async function getUserPermissions(
  req: Request,
  res: Response
): Promise<void> {

  const id = req.params.id as string

  const result = await permissionService.getUserPermissions(id)

  res.json(result)
}

export async function updateUserPermissions(
  req: Request,
  res: Response
): Promise<void> {

  const actorId =  req.user!.id

  const id = req.params.id as string
  const { permissionIds } = req.body

  const result = await permissionService.updateUserPermissions(
    actorId,
    id,
    permissionIds
  )

  res.json(result)
}