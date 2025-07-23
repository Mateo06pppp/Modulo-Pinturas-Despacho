import { Pedido } from "../models/Pedido";
import pool from "../config/config-db";

// Crear
export const crearPedidoConDetalles = async (pedido: Pedido) => {
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();

    const pedidoQuery = `
      INSERT INTO pedido (numero_pedido, fecha_creacion, estado_pedido, observaciones, id_cliente)
      VALUES (?, ?, ?, ?, ?)
    `;
    const [pedidoResult]: any = await conn.execute(pedidoQuery, [
      pedido.numero_pedido,
      pedido.fecha_creacion,
      pedido.estado_pedido,
      pedido.observaciones,
      pedido.id_cliente
    ]);
    const id_pedido = pedidoResult.insertId;

    const detalleQuery = `
      INSERT INTO detalle_pedido (id_pedido, id_producto, cantidad_producto)
      VALUES (?, ?, ?)
    `;

    for (const producto of pedido.productos) {
      await conn.execute(detalleQuery, [
        id_pedido,
        producto.id_producto,
        producto.cantidad_producto
      ]);
    }

    await conn.commit();
    return { id_pedido, cantidad_productos: pedido.productos.length };
  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    conn.release();
  }
};

// Listar todos
export const obtenerPedidos = async () => {
  const [pedidos]: any = await pool.execute("SELECT * FROM pedido");
  return pedidos;
};

// Listar uno con detalles
export const obtenerPedidoConDetalles = async (id_pedido: number) => {
  const [[pedido]]: any = await pool.execute("SELECT * FROM pedido WHERE id_pedido = ?", [id_pedido]);
  const [productos]: any = await pool.execute(
    "SELECT id_producto, cantidad_producto FROM detalle_pedido WHERE id_pedido = ?",
    [id_pedido]
  );

  if (!pedido) return null;
  return { ...pedido, productos };
};

// Actualizar pedido y sus productos
export const actualizarPedido = async (id_pedido: number, pedido: Pedido) => {
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();

    const updatePedido = `
      UPDATE pedido SET numero_pedido = ?, fecha_creacion = ?, estado_pedido = ?, observaciones = ?, id_cliente = ?
      WHERE id_pedido = ?
    `;
    await conn.execute(updatePedido, [
      pedido.numero_pedido,
      pedido.fecha_creacion,
      pedido.estado_pedido,
      pedido.observaciones,
      pedido.id_cliente,
      id_pedido
    ]);

    // Eliminar productos anteriores
    await conn.execute("DELETE FROM detalle_pedido WHERE id_pedido = ?", [id_pedido]);

    // Insertar nuevos productos
    const detalleQuery = `
      INSERT INTO detalle_pedido (id_pedido, id_producto, cantidad_producto)
      VALUES (?, ?, ?)
    `;

    for (const producto of pedido.productos) {
      await conn.execute(detalleQuery, [
        id_pedido,
        producto.id_producto,
        producto.cantidad_producto
      ]);
    }

    await conn.commit();
    return { id_pedido, cantidad_productos: pedido.productos.length };
  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    conn.release();
  }
};

// Eliminar pedido y detalles
export const eliminarPedido = async (id_pedido: number) => {
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();
    await conn.execute("DELETE FROM detalle_pedido WHERE id_pedido = ?", [id_pedido]);
    await conn.execute("DELETE FROM pedido WHERE id_pedido = ?", [id_pedido]);
    await conn.commit();
    return true;
  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    conn.release();
  }
};
