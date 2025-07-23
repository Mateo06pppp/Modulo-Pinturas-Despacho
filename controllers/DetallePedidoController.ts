import { Request, Response } from 'express';
import * as service from '../services/DetallePedidoService';

const crear = async (req: Request, res: Response) => {
  try {
    const detalle = req.body;
    const result = await service.crearDetallePedido(detalle);
    res.status(201).json({ message: 'Detalle creado', result });
  } catch (err) {
    res.status(500).json({ message: 'Error al crear detalle', error: err });
  }
};

const listarPorPedido = async (req: Request, res: Response) => {
  try {
    const { id_pedido } = req.params;
    const result = await service.obtenerDetallesPorPedido(Number(id_pedido));
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener detalles', error: err });
  }
};

const actualizar = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const detalle = req.body;
    const result = await service.actualizarDetallePedido(Number(id), detalle);
    res.status(200).json({ message: 'Detalle actualizado', result });
  } catch (err) {
    res.status(500).json({ message: 'Error al actualizar', error: err });
  }
};

const eliminar = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await service.eliminarDetallePedido(Number(id));
    res.status(200).json({ message: 'Detalle eliminado', result });
  } catch (err) {
    res.status(500).json({ message: 'Error al eliminar', error: err });
  }
};

const crearLote = async (req: Request, res: Response) => {
  try {
    const { id_pedido, productos } = req.body;

    if (!id_pedido || !Array.isArray(productos) || productos.length === 0) {
      return res.status(400).json({ message: 'Datos inválidos: se requiere id_pedido y lista de productos' });
    }

    for (const producto of productos) {
      if (!producto.id_producto || !producto.cantidad_producto) {
        return res.status(400).json({ message: 'Cada producto debe tener id_producto y cantidad_producto' });
      }
    }

    const resultados = await Promise.all(
      productos.map(producto =>
        service.crearDetallePedido({
          id_pedido,
          id_producto: producto.id_producto,
          cantidad_producto: producto.cantidad_producto,
        })
      )
    );

    res.status(201).json({
      message: 'Detalles creados en lote',
      cantidad_registros: resultados.length,
    });
  } catch (err) {
    res.status(500).json({ message: 'Error al crear detalles en lote', error: err });
  }
};


export default {
    crear,
    listarPorPedido,
    actualizar,
    eliminar,
    crearLote
}