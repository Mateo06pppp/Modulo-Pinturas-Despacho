import promisePool from '../config/config-db';
import ProgramacionDto from '../dto/ProgramacionPinturaDto';

class ProgramacionRepository {
  static async crearProgramacion(data: ProgramacionDto) {
    const sql = `
      INSERT INTO PROGRAMACION_PINTURA 
      (id_producto, id_operario, fecha_programada, hora_inicio, hora_fin, fecha_registro_avance, avance_porcentaje, estado_programacion)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

    const params = [
      data.id_producto,
      data.id_operario,
      data.fecha_programada,
      data.hora_inicio,
      data.hora_fin,
      data.fecha_registro_avance,
      data.avance_porcentaje,
      data.estado_programacion
    ];

    const [result] = await promisePool.execute(sql, params);
    return result;
  }

  static async obtenerProgramaciones() {
    const sql = `
      SELECT pp.*, p.nombre AS nombre_producto, o.nombre AS nombre_operario 
      FROM PROGRAMACION_PINTURA pp
      JOIN PRODUCTO p ON pp.id_producto = p.id_producto
      JOIN OPERARIO o ON pp.id_operario = o.id_operario
    `;
    const [rows] = await promisePool.execute(sql);
    return rows;
  }
}

export default ProgramacionRepository;
