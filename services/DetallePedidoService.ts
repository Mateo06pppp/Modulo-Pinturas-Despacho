import { DetallePedido } from '../models/DetallePedido';
import promisePool from "../config/config-db";

export const crearDetallePedido = async (detalle: DetallePedido) => {
  const query = 'INSERT INTO detalle_pedido (id_pedido, id_producto, cantidad_producto) VALUES (?, ?, ?)';
  const [result] = await promisePool.execute(query, [detalle.id_pedido, detalle.id_producto, detalle.cantidad_producto]);
  return result;
};

export const obtenerDetallesPorPedido = async (id_pedido: number) => {
  const query = 'SELECT * FROM detalle_pedido WHERE id_pedido = ?';
  const [rows] = await promisePool.execute(query, [id_pedido]);
  return rows;
};

export const actualizarDetallePedido = async (id: number, detalle: DetallePedido) => {
  const query = 'UPDATE detalle_pedido SET id_producto = ?, cantidad_producto = ? WHERE id_detalle = ?';
  const [result] = await promisePool.execute(query, [detalle.id_producto, detalle.cantidad_producto, id]);
  return result;
};

export const eliminarDetallePedido = async (id: number) => {
  const query = 'DELETE FROM detalle_pedido WHERE id_detalle = ?';
  const [result] = await promisePool.execute(query, [id]);
  return result;
};
