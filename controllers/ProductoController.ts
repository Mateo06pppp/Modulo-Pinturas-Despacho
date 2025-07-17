import { Request, Response } from 'express';
import ProductoService from '../services/ProductoService';

const listarProductos = async (_req: Request, res: Response) => {
  try {
    const productos = await ProductoService.listar();
    return res.status(200).json({
      status: 'success',
      data: productos,
    });
  } catch (error: any) {
    console.error('❌ Error al obtener productos:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Error en el servidor',
      details: error.message,
    });
  }
};

export default {
  listarProductos
};