import prisma from "../src/config/prisma";

async function main() {

  const permissions = [
    "dashboard.view",

    "users.read",
    "users.create",
    "users.update",
    "users.delete",

    "permissions.manage",

    "audit.read",

    "leads.read",
    "leads.manage",

    "tasks.read",
    "tasks.manage",

    "reports.view",

    "settings.manage"
  ];

  for (const key of permissions) {
    await prisma.permission.upsert({
      where: { key },
      update: {},
      create: {
        key,
        description: key
      }
    });
  }

  const roles = ["ADMIN", "MANAGER", "AGENT", "CUSTOMER"];

  for (const name of roles) {
    await prisma.role.upsert({
      where: { name },
      update: {},
      create: { name }
    });
  }

  console.log("RBAC seed completed");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });