import { Request, Response } from "express";
import * as LiderAreaService from "../services/LiderAreaService";

const crear = async (req: Request, res: Response) => {
  try {
    const id = await LiderAreaService.crearLider(req.body);
    res.status(201).json({ message: "Líder creado", id });
  } catch (err) {
    res.status(500).json({ message: "Error al crear líder", error: (err as Error).message });
  }
};

const listar = async (_req: Request, res: Response) => {
  const lideres = await LiderAreaService.listarLideres();
  res.status(200).json(lideres);
};

const obtener = async (req: Request, res: Response) => {
  const lider = await LiderAreaService.obtenerLider(Number(req.params.id));
  res.status(200).json(lider);
};

const actualizar = async (req: Request, res: Response) => {
  try {
    const result = await LiderAreaService.actualizarLider(Number(req.params.id), req.body);
    res.status(200).json({ message: "Líder actualizado", result });
  } catch (err) {
    res.status(500).json({ message: "Error al actualizar líder", error: (err as Error).message });
  }
};

const eliminar = async (req: Request, res: Response) => {
  const result = await LiderAreaService.eliminarLider(Number(req.params.id));
  res.status(200).json({ message: "Líder eliminado", result });
};

export default { crear, listar, obtener, actualizar, eliminar };
