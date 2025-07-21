import { Router } from 'express';
import DespachoController from '../controllers/DespachoController';

const router = Router();

router.get('/listar', DespachoController.getAllDespachos);
router.get('/detalle/:id', DespachoController.getDespachoById);
router.post('/crear', DespachoController.createDespacho);
router.put('/actualizar/:id', DespachoController.updateDespacho);
router.delete('/eliminar/:id', DespachoController.deleteDespacho);

export default router;
