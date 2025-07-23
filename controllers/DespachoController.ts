import { Request, Response } from "express";
import * as DespachoService from "../services/DespachoService";
import * as RutaService from "../services/RutaService";

const crear = async (req: Request, res: Response) => {
  try {
    const {
      ruta,
      destino,
      id_conductor,
      id_auxiliar,
      ...datosDespacho
    } = req.body;

    const id_ruta = await RutaService.crearRutaSiNoExiste(
      id_conductor,
      id_auxiliar,
      ruta,
      destino
    );

    const despacho = { ...datosDespacho, id_ruta, id_conductor: id_conductor ?? null, id_auxiliar: id_auxiliar ?? null };
    const id_despacho = await DespachoService.crearDespacho(despacho);
    res.status(201).json({ message: "Despacho creado", id_despacho });
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: "Error al crear despacho", error: err.message });
    } else {
      res.status(500).json({ message: "Error desconocido al crear despacho" });
    }
  }
};

const listar = async (req: Request, res: Response) => {
  const result = await DespachoService.listarDespachos();
  res.status(200).json(result);
};

const obtener = async (req: Request, res: Response) => {
  const result = await DespachoService.obtenerDespacho(Number(req.params.id));
  res.status(200).json(result);
};

const actualizar = async (req: Request, res: Response) => {
  try {
    const {
      ruta,
      destino,
      id_conductor,
      id_auxiliar,
      ...datosDespacho
    } = req.body;

    const id_ruta = await RutaService.crearRutaSiNoExiste(
      id_conductor,
      id_auxiliar,
      ruta,
      destino
    );

    const despacho = { ...datosDespacho, id_ruta, id_conductor: id_conductor ?? null, id_auxiliar: id_auxiliar ?? null };
    const result = await DespachoService.actualizarDespacho(Number(req.params.id), despacho);
    res.status(200).json({ message: "Despacho actualizado", result });
  } catch (err) {
    res.status(500).json({ message: "Error al actualizar", error: (err as Error).message });
  }
};

const eliminar = async (req: Request, res: Response) => {
  const result = await DespachoService.eliminarDespacho(Number(req.params.id));
  res.status(200).json({ message: "Despacho eliminado", result });
};

export default { crear, listar, obtener, actualizar, eliminar };
