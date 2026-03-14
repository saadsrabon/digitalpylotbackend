import app from "./app";
import { env } from "./config/env";
import prisma from "./config/prisma";

const PORT = process.env.PORT || 5000;

const server = app.listen(env.PORT, () => {
  console.log(`Server running on port ${env.PORT}`);
});
async function shutdown() {

  console.log("Shutting down server...")

  await prisma.$disconnect()

  server.close(() => {
    console.log("Server closed")
    process.exit(0)
  })
}

process.on("SIGINT", shutdown)
process.on("SIGTERM", shutdown)