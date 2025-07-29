import { Router } from "express";
import PlanMaestroController from "../controllers/PlanMaestroController";

const router = Router();

router.get("/listar", PlanMaestroController.getAll);
router.get("/detalle/:id", PlanMaestroController.getById);
router.post("/crear", PlanMaestroController.create);
router.put("/actualizar/:id", PlanMaestroController.update);
router.delete("/eliminar/:id", PlanMaestroController.delete);

export default router;
