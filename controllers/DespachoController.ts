import { Request, Response } from 'express';
import promisePool from "../config/config-db";

const getAllDespachos = async (_req: Request, res: Response) => {
  const [rows] = await promisePool.query('SELECT * FROM DESPACHO');
  res.json(rows);
};

const getDespachoById = async (req: Request, res: Response) => {
  const [rows]: any = await promisePool.query('SELECT * FROM DESPACHO WHERE id_despacho = ?', [req.params.id]);
  if (rows.length === 0) return res.status(404).json({ message: 'Despacho no encontrado' });
  res.json(rows[0]);
};

const createDespacho = async (req: Request, res: Response) => {
  const nuevo: any = req.body;
  const [result]: any = await promisePool.query('INSERT INTO DESPACHO SET ?', [nuevo]);
  res.json({ id: result.insertId, ...nuevo });
};

const updateDespacho = async (req: Request, res: Response) => {
  await promisePool.query('UPDATE DESPACHO SET ? WHERE id_despacho = ?', [req.body, req.params.id]);
  res.json({ message: 'Despacho actualizado' });
};

const deleteDespacho = async (req: Request, res: Response) => {
  await promisePool.query('DELETE FROM DESPACHO WHERE id_despacho = ?', [req.params.id]);
  res.json({ message: 'Despacho eliminado' });
};

export default {
    getAllDespachos,
    getDespachoById,
    createDespacho,
    updateDespacho,
    deleteDespacho
}
