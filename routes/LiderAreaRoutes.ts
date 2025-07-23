import { Router } from "express";
import LiderAreaController from "../controllers/LiderAreaController";

const router = Router();

router.post("/crear", LiderAreaController.crear);
router.get("/listar", LiderAreaController.listar);
router.get("/detalle/:id", LiderAreaController.obtener);
router.put("/actualizar/:id", LiderAreaController.actualizar);
router.delete("/eliminar/:id", LiderAreaController.eliminar);

export default router;
