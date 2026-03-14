import { Router } from "express"
import * as controller from "./user.controller"
import { authMiddleware } from "../../middleware/auth.middleware"
import { requirePermission } from "../../middleware/permission.middleware"

const router = Router()

router.post(
  "/",
  authMiddleware,
  requirePermission("users.create"),
  controller.createUser
)

router.get(
  "/",
  authMiddleware,
  requirePermission("users.read"),
  controller.listUsers
)

router.get(
  "/:id",
  authMiddleware,
  requirePermission("users.read"),
  controller.getUser
)

export const userRoutes = router