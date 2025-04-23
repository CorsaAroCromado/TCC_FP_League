import { Router } from "express";
import { getEvento } from "../controllers/eventos.controller";

const router = Router();

router.get("/", getEvento);

export default router;