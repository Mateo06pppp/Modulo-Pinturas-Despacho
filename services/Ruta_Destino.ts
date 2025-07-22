import { IRutaDestino } from '../models/Ruta_Destino';
import promisePool from "../config/config-db";

export const getAllRutaDestinos = async (): Promise<IRutaDestino[]> => {
  const [rows] = await promisePool.query('SELECT * FROM ruta_destino');
  return rows as IRutaDestino[];
};

export const getRutaDestinoById = async (id: number): Promise<IRutaDestino | null> => {
  const [rows] = await promisePool.query('SELECT * FROM ruta_destino WHERE id_ruta_destino = ?', [id]);
  const data = rows as any[];
  const ruta = data[0];
  return ruta || null;
};

export const createRutaDestino = async (data: IRutaDestino): Promise<void> => {
  await promisePool.query('INSERT INTO ruta_destino (ruta, destino) VALUES (?, ?)', [data.ruta, data.destino]);
};

export const updateRutaDestino = async (id: number, data: IRutaDestino): Promise<void> => {
  await promisePool.query('UPDATE ruta_destino SET ruta = ?, destino = ? WHERE id_ruta_destino = ?', [data.ruta, data.destino, id]);
};

export const deleteRutaDestino = async (id: number): Promise<void> => {
  await promisePool.query('DELETE FROM ruta_destino WHERE id_ruta_destino = ?', [id]);
};
