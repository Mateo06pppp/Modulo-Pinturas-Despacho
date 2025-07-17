import { Router } from 'express';
import {
  getAllBodegaPintura,
  getBodegaPinturaById,
  createBodegaPintura,
  updateBodegaPintura,
  deleteBodegaPintura
} from '../controllers/BodegaPinturaController';

const router = Router();

router.get('/listar', getAllBodegaPintura);
router.get('/detalle/:id', getBodegaPinturaById);
router.post('/crear', createBodegaPintura);
router.put('/actualizar/:id', updateBodegaPintura);
router.delete('/eliminar/:id', deleteBodegaPintura);

export default router;
