import jwt from "jsonwebtoken";

const ACCESS_TOKEN_SECRET = process.env.JWT_SECRET as string;

export function generateAccessToken(payload: object) {
  return jwt.sign(payload, ACCESS_TOKEN_SECRET, {
    expiresIn: "15m"
  });
}

export function verifyAccessToken(token: string) {
  return jwt.verify(token, ACCESS_TOKEN_SECRET);
}