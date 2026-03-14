import { Request, Response, NextFunction } from "express"
import { verifyAccessToken } from "../utils/jwt"
import prisma from "../config/prisma"
import { AppError } from "../errors/AppError"

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {

  try {

    const token = req.cookies.accessToken

    if (!token) {
      throw new AppError("Unauthorized", 401)
    }

    const decoded: any = verifyAccessToken(token)

    const user = await prisma.user.findUnique({
      where: { id: decoded.id }
    })

    if (!user) {
      throw new AppError("User not found", 401)
    }

    if (user.status === "BANNED") {
      throw new AppError("User banned", 403)
    }

    if (user.status === "SUSPENDED") {
      throw new AppError("User suspended", 403)
    }

    ;(req as any).user = decoded

    next()

  } catch (error) {

    next(error)

  }
}