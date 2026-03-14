import dotenv from "dotenv"

dotenv.config()

function requireEnv(name: string): string {
  const value = process.env[name]

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`)
  }

  return value
}

export const env = {
  PORT: process.env.PORT || "5000",

  JWT_SECRET: requireEnv("JWT_SECRET"),

  JWT_REFRESH_SECRET: requireEnv("JWT_REFRESH_SECRET"),

  DATABASE_URL: requireEnv("DATABASE_URL")
}