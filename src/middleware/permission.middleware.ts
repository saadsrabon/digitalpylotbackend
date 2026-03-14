import { Request, Response, NextFunction } from "express";
import { resolveUserPermissions } from "../services/permission.service";

export function requirePermission(permission: string) {
  return async (req: Request, res: Response, next: NextFunction) => {

    try {

      const userId = (req as any).user?.id;

      if (!userId) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      const permissions = await resolveUserPermissions(userId);

      if (!permissions.includes(permission)) {
        return res.status(403).json({
          error: "Forbidden",
          required: permission
        });
      }

      next();

    } catch (error) {
      next(error);
    }

  };
}