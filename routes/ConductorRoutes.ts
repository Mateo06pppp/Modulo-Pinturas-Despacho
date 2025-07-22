import { Router } from 'express';
import conductorController from '../controllers/ConductorController';

const router = Router();

router.get('/listar', conductorController.getConductores);
router.get('/detalle/:id', conductorController.getConductorById);
router.post('/crear', conductorController.createConductor);
router.put('/actualizar/:id', conductorController.updateConductor);
router.delete('/eliminar/:id', conductorController.deleteConductor);

export default router;
