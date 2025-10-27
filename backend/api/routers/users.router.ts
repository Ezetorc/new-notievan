import { UsersController } from "../controllers/users.controller.js";
import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";

export const UsersRouter = Router()

UsersRouter.get("/", UsersController.getAll)

UsersRouter.patch("/:id/role", authMiddleware, UsersController.updateRole)

UsersRouter.get("/:id/name", UsersController.getNameById)
