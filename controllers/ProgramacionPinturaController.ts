import { Request, Response } from "express";
import ProgramacionDto from "../dto/ProgramacionPinturaDto";
import ProgramacionService from "../services/ProgramacionPinturaService";

class ProgramacionController {
  static async crear(req: Request, res: Response) {
    try {
      const {
        id_producto,
        id_operario,
        fecha_programada,
        hora_inicio,
        hora_fin,
        fecha_registro_avance,
        avance_porcentaje,
        estado_programacion,
        cantidad_programada,
        color
      } = req.body;

      const nueva = new ProgramacionDto(
        id_producto,
        id_operario,
        fecha_programada,
        hora_inicio,
        hora_fin,
        fecha_registro_avance,
        avance_porcentaje,
        estado_programacion,
        cantidad_programada,
        color
      );

      const resultado = await ProgramacionService.registrar(nueva);
      return res.status(201).json({
        status: "success",
        message: "Programación registrada exitosamente",
        data: resultado,
      });
    } catch (error: any) {
      console.error("❌ Error al crear programación:", error);
      return res.status(500).json({
        status: "error",
        message: "Error en el servidor",
        details: error.message
      });
    }
  }

  static async listar(_req: Request, res: Response) {
    try {
      const data = await ProgramacionService.listar();
      return res.status(200).json({
        status: "success",
        data
      });
    } catch (error: any) {
      console.error("❌ Error al obtener programaciones:", error);
      return res.status(500).json({
        status: "error",
        message: "Error en el servidor",
        details: error.message
      });
    }
  }

  static async detalle(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const data = await ProgramacionService.detalle(id);
      return res.status(200).json({
        status: "success",
        data
      });
    } catch (error: any) {
      console.error("❌ Error al obtener detalle:", error);
      return res.status(500).json({
        status: "error",
        message: "Error en el servidor",
        details: error.message
      });
    }
  }

  static async actualizar(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const {
        id_producto,
        id_operario,
        fecha_programada,
        hora_inicio,
        hora_fin,
        fecha_registro_avance,
        avance_porcentaje,
        estado_programacion,
        cantidad_programada,
        color
      } = req.body;

      const actualizada = new ProgramacionDto(
        id_producto,
        id_operario,
        fecha_programada,
        hora_inicio,
        hora_fin,
        fecha_registro_avance,
        avance_porcentaje,
        estado_programacion,
        cantidad_programada,
        color
      );

      const resultado = await ProgramacionService.actualizar(id, actualizada);
      return res.status(200).json({
        status: "success",
        message: "Programación actualizada",
        data: resultado
      });
    } catch (error: any) {
      console.error("❌ Error al actualizar:", error);
      return res.status(500).json({
        status: "error",
        message: "Error en el servidor",
        details: error.message
      });
    }
  }

  static async eliminar(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      await ProgramacionService.eliminar(id);
      return res.status(200).json({
        status: "success",
        message: "Programación eliminada correctamente"
      });
    } catch (error: any) {
      console.error("❌ Error al eliminar:", error);
      return res.status(500).json({
        status: "error",
        message: "Error en el servidor",
        details: error.message
      });
    }
  }
}

export { ProgramacionController };
