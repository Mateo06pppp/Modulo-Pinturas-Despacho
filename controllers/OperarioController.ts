import { Request, Response } from 'express';
import promisePool from "../config/config-db";

const createOperario = async (req: Request, res: Response) => {
  const { nombre, especialidad, estado } = req.body;
  try {
    await promisePool.query('CALL sp_create_operario(?, ?, ?)', [nombre, especialidad, estado]);
    res.json({ message: 'Operario creado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear operario', error });
  }
};

const listOperarios = async (_req: Request, res: Response) => {
  try {
    const [rows] = await promisePool.query('CALL sp_list_operarios()');
    const data = rows as any[];
    res.json(data[0]);
  } catch (error) {
    res.status(500).json({ message: 'Error al listar operarios', error });
  }
};
const getOperarioById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const [rows] = await promisePool.query('CALL sp_get_operario_by_id(?)', [id]);
    const data = rows as any[];
    res.json(data[0][0]);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener operario', error });
  }
};

const updateOperario = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { nombre, especialidad, estado } = req.body;
  try {
    await promisePool.query('CALL sp_update_operario(?, ?, ?, ?)', [id, nombre, especialidad, estado]);
    res.json({ message: 'Operario actualizado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar operario', error });
  }
};

const deleteOperario = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await promisePool.query('CALL sp_delete_operario(?)', [id]);
    res.json({ message: 'Operario eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar operario', error });
  }
};


export default {
    createOperario,
    listOperarios,
    getOperarioById,
    updateOperario,
    deleteOperario
}
