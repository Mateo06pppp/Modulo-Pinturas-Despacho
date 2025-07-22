import { Request, Response } from 'express';
import promisePool from "../config/config-db";
import { Auxiliar } from '../models/Auxiliar';

// Obtener todos los auxiliares
const getAuxiliares = async (req: Request, res: Response) => {
  try {
    const [rows] = await promisePool.query('SELECT * FROM auxiliar_transporte');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener auxiliares' });
  }
};

// Obtener auxiliar por ID
const getAuxiliarById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const [rows] = await promisePool.query('SELECT * FROM auxiliar_transporte WHERE id_auxiliar = ?', [id]);
    const data = rows as any[];
    if (data.length === 0) {
      return res.status(404).json({ message: 'Auxiliar no encontrado' });
    }
    res.json(data[0]);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el auxiliar' });
  }
};

// Crear auxiliar
const createAuxiliar = async (req: Request, res: Response) => {
  try {
    const { nombre_auxiliar } = req.body;
    const result = await promisePool.query('INSERT INTO auxiliar_transporte (nombre_auxiliar) VALUES (?)', [nombre_auxiliar]);
    res.status(201).json({ message: 'Auxiliar creado', id: (result as any).insertId });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el auxiliar' });
  }
};

// Actualizar auxiliar
const updateAuxiliar = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { nombre_auxiliar } = req.body;
    const result = await promisePool.query('UPDATE auxiliar_transporte SET nombre_auxiliar = ? WHERE id_auxiliar = ?', [nombre_auxiliar, id]);
    res.json({ message: 'Auxiliar actualizado' });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el auxiliar' });
  }
};

// Eliminar auxiliar
const deleteAuxiliar = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await promisePool.query('DELETE FROM auxiliar_transporte WHERE id_auxiliar = ?', [id]);
    res.json({ message: 'Auxiliar eliminado' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el auxiliar' });
  }
};


export default {
   getAuxiliares,
   getAuxiliarById,
   createAuxiliar,
   updateAuxiliar,
   deleteAuxiliar
}