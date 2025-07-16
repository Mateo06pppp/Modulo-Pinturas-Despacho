import { Router } from "express";
import { crearProgramacion, obtenerProgramaciones } from "../controllers/ProgramacionPinturaController";

const router = Router();

router.post("/crear", crearProgramacion);
router.get("/listar", obtenerProgramaciones);

export default router;
