import { Router } from "express";
import { inseriruser, login, mostradados } from "../controllers/user.controllers";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

router.post("/", inseriruser);
router.post("/login", login);

router.get("/getuser", authMiddleware, mostradados);

export default router;