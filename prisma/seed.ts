// import prisma from "../src/config/prisma";

// async function main() {

//   const permissions = [
//     "dashboard.view",

//     "users.read",
//     "users.create",
//     "users.update",
//     "users.delete",

//     "permissions.manage",

//     "audit.read",

//     "leads.read",
//     "leads.manage",

//     "tasks.read",
//     "tasks.manage",

//     "reports.view",

//     "settings.manage"
//   ];

//   for (const key of permissions) {
//     await prisma.permission.upsert({
//       where: { key },
//       update: {},
//       create: {
//         key,
//         description: key
//       }
//     });
//   }

//   const roles = ["ADMIN", "MANAGER", "AGENT", "CUSTOMER"];

//   for (const name of roles) {
//     await prisma.role.upsert({
//       where: { name },
//       update: {},
//       create: { name }
//     });
//   }

//   console.log("RBAC seed completed");
// }

// main()
//   .then(async () => {
//     await prisma.$disconnect();
//   })
//   .catch(async (e) => {
//     console.error(e);
//     await prisma.$disconnect();
//     process.exit(1);
//   });


import prisma from "../src/config/prisma";

// async function main() {

//   console.log("Seeding RBAC...");

//   const permissions = await prisma.permission.findMany();
//   const permissionMap = new Map(
//     permissions.map((p) => [p.key, p.id])
//   );

//   const roles = await prisma.role.findMany();
//   const roleMap = new Map(
//     roles.map((r) => [r.name, r.id])
//   );

//   const rolePermissions: Record<string, string[]> = {

//     ADMIN: permissions.map((p) => p.key),

//     MANAGER: [
//       "dashboard.view",
//       "users.read",
//       "users.create",
//       "users.update",
//       "leads.manage",
//       "tasks.manage",
//       "reports.view"
//     ],

//     AGENT: [
//       "dashboard.view",
//       "leads.read",
//       "tasks.read"
//     ],

//     CUSTOMER: [
//       "dashboard.view"
//     ]
//   };

//   for (const [roleName, perms] of Object.entries(rolePermissions)) {

//     const roleId = roleMap.get(roleName);

//     for (const permKey of perms) {

//       const permissionId = permissionMap.get(permKey);

//       if (!permissionId || !roleId) continue;

//       await prisma.rolePermission.upsert({
//         where: {
//           roleId_permissionId: {
//             roleId,
//             permissionId
//           }
//         },
//         update: {},
//         create: {
//           roleId,
//           permissionId
//         }
//       });
//     }
//   }

//   console.log("Role permissions seeded successfully.");
// }

// main()
//   .then(async () => {
//     await prisma.$disconnect();
//   })
//   .catch(async (e) => {
//     console.error(e);
//     await prisma.$disconnect();
//     process.exit(1);
//   });

const roles = await prisma.role.findMany({
  include: {
    permissions: {
      include: {
        permission: true
      }
    }
  }
})

console.log(JSON.stringify(roles, null, 2))