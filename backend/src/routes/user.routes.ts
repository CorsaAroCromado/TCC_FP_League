import { Router } from "express";
import { inserirU } from "../controllers/user.controllers";

const router = Router();

router.post("/", inserirU);

export default router;