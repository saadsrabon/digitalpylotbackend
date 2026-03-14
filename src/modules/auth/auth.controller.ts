import { Request, Response } from "express"
import * as authService from "./auth.service"

export async function login(req: Request, res: Response) {

  try {

    const { email, password } = req.body

    const result = await authService.login(email, password)

    res.json(result)

  } catch (error) {

    res.status(401).json({
      error: "Invalid credentials"
    })

  }

}