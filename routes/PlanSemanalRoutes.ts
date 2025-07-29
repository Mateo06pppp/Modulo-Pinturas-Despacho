import { Router } from "express";
import PlanSemanalController from "../controllers/PlanSemanalController";

const router = Router();

router.get("/listar", PlanSemanalController.getAll);
router.get("/detalle/:id", PlanSemanalController.getById);
router.post("/crear", PlanSemanalController.create);
router.put("/actualizar/:id", PlanSemanalController.update);
router.delete("/eliminar/:id", PlanSemanalController.delete);

export default router;
