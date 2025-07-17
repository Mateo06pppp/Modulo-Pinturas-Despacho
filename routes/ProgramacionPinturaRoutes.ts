import { Router } from "express";
import { ProgramacionController } from "../controllers/ProgramacionPinturaController";

const router = Router();

router.post("/crear", ProgramacionController.crear);
router.get("/listar", ProgramacionController.listar);
router.get('/detalle/:id', ProgramacionController.detalle);
router.put('/actualizar/:id', ProgramacionController.actualizar);
router.delete('/eliminar/:id', ProgramacionController.eliminar);

export default router;
