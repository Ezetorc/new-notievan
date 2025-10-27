import jwt, { type JwtPayload } from "jsonwebtoken";
import { env } from "../configuration/env.configuration.js";
import { prisma } from "../configuration/prisma.configuration.js";
import type { JWTUser } from "../models/jwt-user.model.js";
import type { Request, Response, NextFunction } from "express";

export const authMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const authHeader =
    request.headers.authorization || request.headers.Authorization;

  if (typeof authHeader !== "string" || !authHeader.startsWith("Bearer ")) {
    return response.status(401).json({ error: "Token no proporcionado" });
  }

  const token = authHeader.split(" ")[1];
  let payload: JwtPayload;

  try {
    payload = jwt.verify(token, env.jwt.secret, { algorithms: ["HS256"] }) as JwtPayload;
  } catch (err: any) {
    if (err.name === "TokenExpiredError") {
      return response.status(401).json({ error: "Token expirado" });
    }
    return response.status(401).json({ error: "Token inválido" });
  }

  const user = await prisma.user.findUnique({
    where: { id: payload.sub as string },
    select: { id: true, role: true },
  });

  if (!user) {
    return response.status(404).json({ error: "Usuario no encontrado" });
  }

  request.user = { id: user.id, role: user.role } as JWTUser;

  next();
};
