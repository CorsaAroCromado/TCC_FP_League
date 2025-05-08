import { Router } from "express";
import { inseriruser, login, mostradados, refreshToken, logout } from "../controllers/user.controllers";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

router.post("/", inseriruser);
router.post("/login", login);
router.post("/refresh", refreshToken);
router.post("/logout", logout);

router.get("/getuser", authMiddleware, mostradados);

export default router;