import { Router } from "express"
import * as controller from "./permission.controller"
import { authMiddleware } from "../../middleware/auth.middleware"
import { requirePermission } from "../../middleware/permission.middleware"

const router = Router()

router.get(
  "/",
  authMiddleware,
  controller.getPermissions
)

router.get(
  "/user/:id",
  authMiddleware,
  requirePermission("permissions.manage"),
  controller.getUserPermissions
)

router.patch(
  "/user/:id",
  authMiddleware,
  requirePermission("permissions.manage"),
  controller.updateUserPermissions
)

export const permissionRoutes = router