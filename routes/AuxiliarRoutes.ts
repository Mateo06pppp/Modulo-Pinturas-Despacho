import { Router } from 'express';
import auxiliarController from '../controllers/AuxiliarController';

const router = Router();

router.get('/listar', auxiliarController.getAuxiliares);
router.get('/detalle/:id', auxiliarController.getAuxiliarById);
router.post('/crear', auxiliarController.createAuxiliar);
router.put('/actualizar/:id', auxiliarController.updateAuxiliar);
router.delete('/eliminar/:id', auxiliarController.deleteAuxiliar);

export default router;
