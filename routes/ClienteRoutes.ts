import { Router } from 'express';
import clienteController from '../controllers/ClienteController';

const router = Router();

router.get('/listar', clienteController.getClientes);
router.get('/detalle/:id', clienteController.getClienteById);
router.post('/crear', clienteController.createCliente);
router.put('/actualizar/:id', clienteController.updateCliente);
router.delete('/eliminar/:id', clienteController.deleteCliente);

export default router;
