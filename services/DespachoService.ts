import pool from "../config/config-db";
import { Despacho } from "../models/Despacho";

export const crearDespacho = async (despacho: Despacho) => {
  const query = `
    INSERT INTO despacho (
      fecha_programada_entrega, hora_salida_estimada, hora_llegada_estimada,
      tipo_vehiculo, fecha_real_salida, fecha_real_entrega,
      estado_despacho, id_ruta, id_cliente, id_pedido, id_conductor, id_auxiliar
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  const [result]: any = await pool.execute(query, [
    despacho.fecha_programada_entrega,
    despacho.hora_salida_estimada,
    despacho.hora_llegada_estimada,
    despacho.tipo_vehiculo,
    despacho.fecha_real_salida,
    despacho.fecha_real_entrega,
    despacho.estado_despacho,
    despacho.id_ruta,
    despacho.id_cliente,
    despacho.id_pedido,
    despacho.id_conductor,
    despacho.id_auxiliar
  ]);
  return result.insertId;
};

export const listarDespachos = async () => {
  const [rows] = await pool.execute(`SELECT * FROM despacho`);
  return rows;
};

export const obtenerDespacho = async (id: number) => {
  const [rows]: any = await pool.execute(`SELECT * FROM despacho WHERE id_despacho = ?`, [id]);
  return rows[0];
};

export const actualizarDespacho = async (id: number, despacho: Despacho) => {
  const query = `
    UPDATE despacho SET
      fecha_programada_entrega = ?, hora_salida_estimada = ?, hora_llegada_estimada = ?,
      tipo_vehiculo = ?, fecha_real_salida = ?, fecha_real_entrega = ?,
      estado_despacho = ?, id_ruta = ?, id_cliente = ?, id_pedido = ?, id_conductor = ?, id_auxiliar = ? 
    WHERE id_despacho = ?`;
  const [result] = await pool.execute(query, [
    despacho.fecha_programada_entrega,
    despacho.hora_salida_estimada,
    despacho.hora_llegada_estimada,
    despacho.tipo_vehiculo,
    despacho.fecha_real_salida,
    despacho.fecha_real_entrega,
    despacho.estado_despacho,
    despacho.id_ruta,
    despacho.id_cliente,
    despacho.id_pedido,
    despacho.id_conductor,
    despacho.id_auxiliar,
    id,
  ]);
  return result;
};

export const eliminarDespacho = async (id: number) => {
  const [result] = await pool.execute(`DELETE FROM despacho WHERE id_despacho = ?`, [id]);
  return result;
};
