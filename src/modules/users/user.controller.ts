import { Request, Response } from "express"
import * as userService from "./user.service"

export async function createUser(req: Request, res: Response) {

  try {

    const user = await userService.createUser(req.body)

    res.status(201).json(user)

  } catch (error: any) {

    res.status(400).json({
      error: error.message
    })

  }

}

export async function listUsers(req: Request, res: Response) {

  try {

    const users = await userService.getUsers()

    res.json(users)

  } catch {

    res.status(500).json({
      error: "Failed to fetch users"
    })

  }

}

export async function getUser(req: Request, res: Response) {

  try {

    const user = await userService.getUserById(req.params.id as string)

    if (!user) {
      return res.status(404).json({ error: "User not found" })
    }

    res.json(user)

  } catch {

    res.status(500).json({
      error: "Failed to fetch user"
    })

  }

}