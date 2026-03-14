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


import bcrypt from "bcrypt"

async function seedAdmin() {

  const adminEmail = "demoadmin@digitalpylot.com"
  const adminPassword = "Admin123!"

  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail }
  })

  if (existingAdmin) {
    console.log("Admin already exists")
    return
  }

  const adminRole = await prisma.role.findUnique({
    where: { name: "ADMIN" }
  })

  if (!adminRole) {
    throw new Error("ADMIN role not found")
  }

  const hashedPassword = await bcrypt.hash(adminPassword, 10)

  await prisma.user.create({
    data: {
      name: "System Admin",
      email: adminEmail,
      password: hashedPassword,
      roleId: adminRole.id
    }
  })

  console.log("Admin user created")
}

async function main() {

 

  await seedAdmin()

}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (error) => {
    console.error(error)
    await prisma.$disconnect()
    process.exit(1)
  })
export default seedAdmin