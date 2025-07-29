import { Router } from 'express';
import ProductoController from '../controllers/ProductoController';

const router = Router();

router.get('/listar', ProductoController.getAll);
router.get('/detalle/:id', ProductoController.getById);
router.post('/crear', ProductoController.create);
router.put('/actualizar/:id', ProductoController.update);
router.delete('/eliminar/:id', ProductoController.delete);

export default router;