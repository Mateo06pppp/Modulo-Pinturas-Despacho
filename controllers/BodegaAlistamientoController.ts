import { Request, Response } from 'express';
import promisePool from "../config/config-db";

const getAllBodega = async (_req: Request, res: Response) => {
  try {
    const [rows] = await promisePool.query('SELECT * FROM BODEGA_ALISTAMIENTO');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los registros', error });
  }
};

const getBodegaById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const [rows] = await promisePool.query('SELECT * FROM BODEGA_ALISTAMIENTO WHERE id_bodega_alistamiento = ?', [id]);
    const data = rows as any[];
    if (data.length === 0) {
      return res.status(404).json({ message: 'Registro no encontrado' });
    }
    res.json(data[0]);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el registro', error });
  }
};

const createBodega = async (req: Request, res: Response) => {
  const { referencia, nombre_producto, color, estado, fecha_pintura } = req.body;
  try {
    const [result] = await promisePool.query(
      'INSERT INTO BODEGA_ALISTAMIENTO (referencia, nombre_producto, color, estado, fecha_pintura) VALUES (?, ?, ?, ?, ?)',
      [referencia, nombre_producto, color, estado, fecha_pintura]
    );
    res.status(201).json({ message: 'Registro creado', id: (result as any).insertId });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el registro', error });
  }
};

const updateBodega = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { referencia, nombre_producto, color, estado, fecha_pintura } = req.body;
  try {
    const [result] = await promisePool.query(
      'UPDATE BODEGA_ALISTAMIENTO SET referencia = ?, nombre_producto = ?, color = ?, estado = ?, fecha_pintura = ? WHERE id_bodega_alistamiento = ?',
      [referencia, nombre_producto, color, estado, fecha_pintura, id]
    );
    res.json({ message: 'Registro actualizado' });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el registro', error });
  }
};

const deleteBodega = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await promisePool.query('DELETE FROM BODEGA_ALISTAMIENTO WHERE id_bodega_alistamiento = ?', [id]);
    res.json({ message: 'Registro eliminado' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el registro', error });
  }
};


export default {
    getAllBodega,
    getBodegaById,
    createBodega,
    updateBodega,
    deleteBodega
}
