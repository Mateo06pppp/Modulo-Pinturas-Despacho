import { Request, Response } from 'express';
import * as rutaDestinoService from '../services/Ruta_Destino';

const getAll = async (req: Request, res: Response) => {
  const rutas = await rutaDestinoService.getAllRutaDestinos();
  res.json(rutas);
};

const getById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const ruta = await rutaDestinoService.getRutaDestinoById(Number(id));
  ruta ? res.json(ruta) : res.status(404).json({ message: 'Ruta no encontrada' });
};

const create = async (req: Request, res: Response) => {
  await rutaDestinoService.createRutaDestino(req.body);
  res.status(201).json({ message: 'Ruta creada correctamente' });
};

const update = async (req: Request, res: Response) => {
  const { id } = req.params;
  await rutaDestinoService.updateRutaDestino(Number(id), req.body);
  res.json({ message: 'Ruta actualizada correctamente' });
};

const remove = async (req: Request, res: Response) => {
  const { id } = req.params;
  await rutaDestinoService.deleteRutaDestino(Number(id));
  res.json({ message: 'Ruta eliminada correctamente' });
};

export default {
    getAll,
    getById,
    create,
    update,
    remove
}
