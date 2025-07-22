import { Request, Response } from 'express';
import promisePool from "../config/config-db";
import { Conductor } from '../models/Conductor';

// Obtener todos los conductores
const getConductores = async (req: Request, res: Response) => {
  try {
    const [rows] = await promisePool.query('SELECT * FROM conductor');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener conductores' });
  }
};

// Obtener conductor por ID
const getConductorById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const [rows] = await promisePool.query('SELECT * FROM conductor WHERE id_conductor = ?', [id]);
    const data = rows as any[];
    if (data.length === 0) {
      return res.status(404).json({ message: 'Conductor no encontrado' });
    }
    res.json(data[0]);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el conductor' });
  }
};

// Crear conductor
const createConductor = async (req: Request, res: Response) => {
  try {
    const { nombre_conductor } = req.body;
    const result = await promisePool.query('INSERT INTO conductor (nombre_conductor) VALUES (?)', [nombre_conductor]);
    res.status(201).json({ message: 'Conductor creado', id: (result as any).insertId });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el conductor' });
  }
};

// Actualizar conductor
const updateConductor = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { nombre_conductor } = req.body;
    const result = await promisePool.query('UPDATE conductor SET nombre_conductor = ? WHERE id_conductor = ?', [nombre_conductor, id]);
    res.json({ message: 'Conductor actualizado' });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el conductor' });
  }
};

// Eliminar conductor
const deleteConductor = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await promisePool.query('DELETE FROM conductor WHERE id_conductor = ?', [id]);
    res.json({ message: 'Conductor eliminado' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el conductor' });
  }
};


export default {
   getConductores,
   getConductorById,
   createConductor,
   updateConductor,
   deleteConductor
}