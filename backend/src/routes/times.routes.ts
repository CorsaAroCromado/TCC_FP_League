import { Router } from "express";
import { inserirTime } from "../controllers/times.controller";

const router = Router();

router.post("/", inserirTime);

export default router;
