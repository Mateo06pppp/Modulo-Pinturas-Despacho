import { Router } from 'express';
import detallePedidocontroller from '../controllers/DetallePedidoController';

const router = Router();

router.post('/crear', detallePedidocontroller.crear);
router.get('/listar/:id', detallePedidocontroller.listarPorPedido);
router.put('/actualizar/:id', detallePedidocontroller.actualizar);
router.delete('/eliminar/:id', detallePedidocontroller.eliminar);
router.post('/lote', detallePedidocontroller.crearLote);

export default router;
