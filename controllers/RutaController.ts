import { Request, Response } from 'express';
import promisePool from "../config/config-db";

const getRutas = async (_: Request, res: Response) => {
  const [rows] = await promisePool.query('SELECT * FROM ruta');
  res.json(rows);
};

const getRutaById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const [rows] = await promisePool.query('SELECT * FROM ruta WHERE id_ruta = ?', [id]);
  const data = rows as any[];
  if (data.length === 0) return res.status(404).json({ message: 'Ruta no encontrada' });
  res.json(data[0]);
};

const createRuta = async (req: Request, res: Response) => {
  const { nombre_ruta, conductor, vehiculo } = req.body;
  await promisePool.query('INSERT INTO ruta (nombre_ruta, conductor, vehiculo) VALUES (?, ?, ?)', 
  [nombre_ruta, conductor, vehiculo]);
  res.json({ message: 'Ruta creada' });
};

const updateRuta = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { nombre_ruta, conductor, vehiculo } = req.body;
  await promisePool.query('UPDATE ruta SET nombre_ruta = ?, conductor = ?, vehiculo = ? WHERE id_ruta = ?', 
  [nombre_ruta, conductor, vehiculo, id]);
  res.json({ message: 'Ruta actualizada' });
};

const deleteRuta = async (req: Request, res: Response) => {
  const { id } = req.params;
  await promisePool.query('DELETE FROM ruta WHERE id_ruta = ?', [id]);
  res.json({ message: 'Ruta eliminada' });
};


export default {
    getRutas,
    getRutaById,
    createRuta,
    updateRuta,
    deleteRuta
}
