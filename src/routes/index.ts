import { Router } from "express";
import prisma from "../config/prisma";
import { authRoutes } from "../modules/auth/auth.routes";

const router = Router();

router.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

router.get("/users-test", async (req, res) => {
  const users = await prisma.user.findMany();

  res.json(users);
});
// router.use("/users", userRoutes)
router.use("/auth", authRoutes)
export default router;