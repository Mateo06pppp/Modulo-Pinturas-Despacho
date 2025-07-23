import pool from "../config/config-db";
import { LiderArea } from "../models/LiderArea";

export const crearLider = async (lider: LiderArea) => {
  const query = `INSERT INTO lider_area (nombre, descripcion) VALUES (?, ?)`;
  const [result]: any = await pool.execute(query, [lider.nombre, lider.descripcion]);
  return result.insertId;
};

export const listarLideres = async () => {
  const [rows] = await pool.execute(`SELECT * FROM lider_area`);
  return rows;
};

export const obtenerLider = async (id: number) => {
  const [rows]: any = await pool.execute(`SELECT * FROM lider_area WHERE id_lider = ?`, [id]);
  return rows[0];
};

export const actualizarLider = async (id: number, lider: LiderArea) => {
  const query = `UPDATE lider_area SET nombre = ?, descripcion = ? WHERE id_lider = ?`;
  const [result] = await pool.execute(query, [lider.nombre, lider.descripcion, id]);
  return result;
};

export const eliminarLider = async (id: number) => {
  const [result] = await pool.execute(`DELETE FROM lider_area WHERE id_lider = ?`, [id]);
  return result;
};
