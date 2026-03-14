import { Router } from "express";
import prisma from "../config/prisma";

const router = Router();

router.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

router.get("/users-test", async (req, res) => {
  const users = await prisma.user.findMany();

  res.json(users);
});

export default router;