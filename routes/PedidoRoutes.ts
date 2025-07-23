import { Router } from "express";
import pedidoController from "../controllers/PedidoController";

const router = Router();

router.post("/crear", pedidoController.crear);
router.get("/listar", pedidoController.listar);
router.get("/obtener/:id", pedidoController.obtenerPorId);
router.put("/actualizar/:id", pedidoController.actualizar);
router.delete("/eliminar/:id", pedidoController.eliminar);

export default router;
