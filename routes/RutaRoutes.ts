import { Router } from 'express';
import rutaController from '../controllers/RutaController';

const router = Router();

router.get('/listar', rutaController.getRutas);
router.get('/detalle/:id', rutaController.getRutaById);
router.post('/crear', rutaController.createRuta);
router.put('/actualizar/:id', rutaController.updateRuta);
router.delete('/eliminar/:id', rutaController.deleteRuta);

export default router;
