import { Request, Response } from "express"
import * as authService from "./auth.service"
import prisma from "../../config/prisma"

export async function login(req:Request, res:Response) {

  const { email, password } = req.body

  const tokens = await authService.login(email, password)

  res.cookie("accessToken", tokens.accessToken, {
    httpOnly: true,
    sameSite: "lax",
    maxAge: 15 * 60 * 1000
  })

  res.cookie("refreshToken", tokens.refreshToken, {
    httpOnly: true,
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000
  })

  res.json({ message: "Login successful" })
}


export async function refresh(req:Request, res:Response) {

  const token = req.cookies.refreshToken

  const accessToken = await authService.refreshToken(token)

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    sameSite: "lax",
    maxAge: 15 * 60 * 1000
  })

  res.json({ message: "Token refreshed" })
}

export async function logout(req:Request, res:Response) {

  const refreshToken = req.cookies.refreshToken

  await prisma.session.updateMany({
    where: { refreshToken },
    data: { revoked: true }
  })

  res.clearCookie("accessToken")
  res.clearCookie("refreshToken")

  res.json({ message: "Logged out" })
}