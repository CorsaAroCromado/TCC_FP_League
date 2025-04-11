import { Router } from "express";
import {
  selectPessoas,
  selectPessoa,
  insertPessoa,
  updatePessoa,
  deletePessoa,
} from "../controllers/pessoas.controller";

const router = Router();

router.get("/", selectPessoas);
router.get("/:uuid", selectPessoa);
router.post("/", insertPessoa);
router.patch("/:uuid", updatePessoa);
router.delete("/:uuid", deletePessoa);

export default router;
