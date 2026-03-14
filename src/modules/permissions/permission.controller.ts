import { Request, Response } from "express"
import * as permissionService from "./permission.service"

interface IdParams {
  id: string
}

export async function getPermissions(req: Request, res: Response) {

  const permissions = await permissionService.getAllPermissions()

  res.json(permissions)

}

export async function getUserPermissions(
  req: Request<IdParams>,
  res: Response
) {

  const { id } = req.params

  const result = await permissionService.getUserPermissions(id)

  res.json(result)

}

export async function updateUserPermissions(
  req: Request<IdParams>,
  res: Response
) {

  const actorId = (req as any).user.id

  const { id } = req.params
  const { permissionIds } = req.body

  const result = await permissionService.updateUserPermissions(
    actorId,
    id,
    permissionIds
  )

  res.json(result)

}