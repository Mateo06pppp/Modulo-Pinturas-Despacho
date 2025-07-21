import { Request, Response } from 'express';
import promisePool from "../config/config-db";

const getAllBodegaPintura = async (_req: Request, res: Response) => {
  const [rows] = await promisePool.query('SELECT * FROM BODEGA_PINTURA');
  res.json(rows);
};

const getBodegaPinturaById = async (req: Request, res: Response) => {
  const [rows]: any = await promisePool.query('SELECT * FROM BODEGA_PINTURA WHERE id_bodega_pintura = ?', [req.params.id]);
  if (rows.length === 0) return res.status(404).json({ message: 'No encontrado' });
  res.json(rows[0]);
};

const createBodegaPintura = async (req: Request, res: Response) => {
  const nuevo = req.body;
  const [result]: any = await promisePool.query('INSERT INTO BODEGA_PINTURA SET ?', [nuevo]);
  res.json({ id: result.insertId, ...nuevo });
};

const updateBodegaPintura = async (req: Request, res: Response) => {
  await promisePool.query('UPDATE BODEGA_PINTURA SET ? WHERE id_bodega_pintura = ?', [req.body, req.params.id]);
  res.json({ message: 'Actualizado' });
};

const deleteBodegaPintura = async (req: Request, res: Response) => {
  await promisePool.query('DELETE FROM BODEGA_PINTURA WHERE id_bodega_pintura = ?', [req.params.id]);
  res.json({ message: 'Eliminado' });
};

export default {
  getAllBodegaPintura,
  getBodegaPinturaById,
  createBodegaPintura,
  updateBodegaPintura,
  deleteBodegaPintura
}
