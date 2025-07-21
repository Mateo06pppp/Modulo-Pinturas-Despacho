import { Router } from 'express';
import bodegaAlistamientoController from '../controllers/BodegaAlistamientoController';

const router = Router();

router.get('/listar', bodegaAlistamientoController.getAllBodega);
router.get('/detalle/:id', bodegaAlistamientoController.getBodegaById);
router.post('/crear', bodegaAlistamientoController.createBodega);
router.put('/actualizar/:id', bodegaAlistamientoController.updateBodega);
router.delete('/eliminar/:id', bodegaAlistamientoController.deleteBodega);

export default router;
