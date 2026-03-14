import prisma from "../config/prisma";

export async function resolveUserPermissions(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      role: {
        include: {
          permissions: {
            include: { permission: true }
          }
        }
      },
      permissions: {
        include: { permission: true }
      }
    }
  });

  if (!user) return [];

  const rolePermissions = user.role.permissions.map(
    rp => rp.permission.key
  );

  const userPermissions = user.permissions.map(
    up => up.permission.key
  );

  return [...new Set([...rolePermissions, ...userPermissions])];
}