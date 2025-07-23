import { Router } from "express";
import despachoController from "../controllers/DespachoController";

const router = Router();

router.post("/crear", despachoController.crear);
router.get("/listar", despachoController.listar);
router.get("/detalle/:id", despachoController.obtener);
router.put("/actualizar/:id", despachoController.actualizar);
router.delete("/eliminar/:id", despachoController.eliminar);

export default router;
