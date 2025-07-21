import { Router } from 'express';
import bodegaPinturaController from '../controllers/BodegaPinturaController';

const router = Router();

router.get('/listar', bodegaPinturaController.getAllBodegaPintura);
router.get('/detalle/:id', bodegaPinturaController.getBodegaPinturaById);
router.post('/crear', bodegaPinturaController.createBodegaPintura);
router.put('/actualizar/:id', bodegaPinturaController.updateBodegaPintura);
router.delete('/eliminar/:id', bodegaPinturaController.deleteBodegaPintura);

export default router;
