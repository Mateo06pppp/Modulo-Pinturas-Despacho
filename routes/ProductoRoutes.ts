import express from 'express';
import ProductoController from '../controllers/ProductoController';

const router = express.Router();

router.get('/listar', ProductoController.listarProductos);

export default router;