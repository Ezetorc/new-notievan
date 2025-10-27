import { Router } from "express";
import { ArticlesController } from "../controllers/articles.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import multer from "multer"
const upload = multer()

export const ArticlesRouter = Router()

ArticlesRouter.get("/own", authMiddleware, ArticlesController.getOwn)

ArticlesRouter.get("/random", ArticlesController.getRandom)

ArticlesRouter.get("/:id", ArticlesController.getById)

ArticlesRouter.get("/", ArticlesController.getAll)

ArticlesRouter.delete("/:id", authMiddleware, ArticlesController.delete)

ArticlesRouter.patch("/:id", upload.single("image"), authMiddleware, ArticlesController.update)

ArticlesRouter.post("/", authMiddleware, upload.single("image"), ArticlesController.create);