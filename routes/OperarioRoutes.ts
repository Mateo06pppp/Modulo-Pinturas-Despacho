import { Router } from 'express';
import operarioController from '../controllers/OperarioController';

const router = Router();

router.post('/crear', operarioController.createOperario);
router.get('/listar', operarioController.listOperarios);
router.get('/detalle/:id', operarioController.getOperarioById);
router.put('/actualizar/:id', operarioController.updateOperario);
router.delete('/eliminar/:id', operarioController.deleteOperario);

export default router;
