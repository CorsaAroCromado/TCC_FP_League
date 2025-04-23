import { Router } from "express";
import { getPartidasPorEvento } from "../controllers/partidas.controller";

const router = Router();

router.get("/:nomeEvento/partidas", getPartidasPorEvento);

export default router;