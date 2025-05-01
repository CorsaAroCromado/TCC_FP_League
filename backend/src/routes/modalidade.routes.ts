import { Router } from "express";
import { getModalidade } from "../controllers/modalidade.controller";

const router = Router();

router.get("/", getModalidade);

export default router;