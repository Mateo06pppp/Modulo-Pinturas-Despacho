import { Router } from 'express';
import rutaDestinoController from '../controllers/Ruta_DestinoController';

const router = Router();

router.get('/listar', rutaDestinoController.getAll);
router.get('/detalle/:id', rutaDestinoController.getById);
router.post('/crear', rutaDestinoController.create);
router.put('/actualizar/:id', rutaDestinoController.update);
router.delete('/eliminar/:id', rutaDestinoController.remove);

export default router;
