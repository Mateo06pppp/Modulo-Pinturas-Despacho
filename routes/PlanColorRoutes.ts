import { Router } from "express";
import PlanColorController from "../controllers/PlanColorController";

const router = Router();

router.get("/listar", PlanColorController.getAll);
router.get("/detalle/:id", PlanColorController.getById);
router.get("/plan/:tipo_plan/:id_plan", PlanColorController.getByPlan);
router.post("/crear", PlanColorController.createOrUpdate);
router.put("/actualizar/:id", PlanColorController.update);
router.delete("/eliminar/:id", PlanColorController.delete);

export default router;
