import { Router } from "express"
import * as controller from "./auth.controller"
import { authLimiter } from "../../middleware/ratelimit.middleware"

const router = Router()

router.post("/login",authLimiter, controller.login)
router.post("/refresh", controller.refresh)

router.post("/logout", controller.logout)

export const authRoutes = router