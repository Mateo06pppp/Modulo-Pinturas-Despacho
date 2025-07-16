import { Request, Response } from "express";
import ProgramacionDto from "../dto/ProgramacionPinturaDto";
import ProgramacionService from "../services/ProgramacionPinturaService";

const crearProgramacion = async (req: Request, res: Response) => {
  try {
    const {
      id_producto,
      id_operario,
      fecha_programada,
      hora_inicio,
      hora_fin,
      fecha_registro_avance,
      avance_porcentaje,
      estado_programacion
    } = req.body;

    const nueva = new ProgramacionDto(
      id_producto,
      id_operario,
      fecha_programada,
      hora_inicio,
      hora_fin,
      fecha_registro_avance,
      avance_porcentaje,
      estado_programacion
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
};

const obtenerProgramaciones = async (_req: Request, res: Response) => {
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
};

export { crearProgramacion, obtenerProgramaciones };
