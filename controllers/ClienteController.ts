import { Request, Response } from 'express';
import promisePool from "../config/config-db";

const getClientes = async (_: Request, res: Response) => {
  const [rows] = await promisePool.query('SELECT * FROM cliente');
  res.json(rows);
};

const getClienteById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const [rows] = await promisePool.query('SELECT * FROM cliente WHERE id_cliente = ?', [id]);
  const data = rows as any[];
  if (data.length === 0) return res.status(404).json({ message: 'Cliente no encontrado' });
  res.json(data[0]);
};

const createCliente = async (req: Request, res: Response) => {
  const { nombre_cliente, direccion, telefono, email } = req.body;
  await promisePool.query('INSERT INTO cliente (nombre_cliente, direccion, telefono, email) VALUES (?, ?, ?, ?)', 
  [nombre_cliente, direccion, telefono, email]);
  res.json({ message: 'Cliente creado' });
};

const updateCliente = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { nombre_cliente, direccion, telefono, email } = req.body;
  await promisePool.query('UPDATE cliente SET nombre_cliente = ?, direccion = ?, telefono = ?, email = ? WHERE id_cliente = ?', 
  [nombre_cliente, direccion, telefono, email, id]);
  res.json({ message: 'Cliente actualizado' });
};

const deleteCliente = async (req: Request, res: Response) => {
  const { id } = req.params;
  await promisePool.query('DELETE FROM cliente WHERE id_cliente = ?', [id]);
  res.json({ message: 'Cliente eliminado' });
};

export default {
    getClientes,
    getClienteById,
    createCliente,
    updateCliente,
    deleteCliente
}
