import { Router } from "express";
import prisma from "../config/prisma";
import { authRoutes } from "../modules/auth/auth.routes";
import { userRoutes } from "../modules/users/user.routes";
import { permissionRoutes } from "../modules/permissions/permission.routes";

const router = Router();

router.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

router.get("/users-test", async (req, res) => {
  const users = await prisma.user.findMany();

  res.json(users);
});
router.use("/users", userRoutes)
router.use("/auth", authRoutes)
router.use("/permissions", permissionRoutes)
export default router;