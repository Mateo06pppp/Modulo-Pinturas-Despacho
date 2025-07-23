import { Request, Response } from "express";
import * as pedidoService from "../services/PedidoService";

const crear = async (req: Request, res: Response) => {
  try {
    const pedido = req.body;
    const result = await pedidoService.crearPedidoConDetalles(pedido);
    res.status(201).json({ message: "Pedido creado", result });
  } catch (err) {
    res.status(500).json({ message: "Error al crear pedido", error: err });
  }
};

const listar = async (_req: Request, res: Response) => {
  try {
    const result = await pedidoService.obtenerPedidos();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: "Error al listar pedidos", error: err });
  }
};

const obtenerPorId = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await pedidoService.obtenerPedidoConDetalles(Number(id));
    if (!result) return res.status(404).json({ message: "Pedido no encontrado" });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: "Error al obtener pedido", error: err });
  }
};

const actualizar = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const pedido = req.body;
    const result = await pedidoService.actualizarPedido(Number(id), pedido);
    res.status(200).json({ message: "Pedido actualizado", result });
  } catch (err) {
    res.status(500).json({ message: "Error al actualizar pedido", error: err });
  }
};

const eliminar = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await pedidoService.eliminarPedido(Number(id));
    res.status(200).json({ message: "Pedido eliminado" });
  } catch (err) {
    res.status(500).json({ message: "Error al eliminar pedido", error: err });
  }
};

export default {
  crear,
  listar,
  obtenerPorId,
  actualizar,
  eliminar
};
