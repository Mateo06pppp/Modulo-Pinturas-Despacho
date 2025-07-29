import db from "../config/config-db";
import { PlanSemanalDTO } from "../dto/PlanSemanalDto";

class PlanSemanalService {
  async getAll() {
    const [rows] = await db.query(`
      SELECT ps.*, p.nombre AS producto
      FROM plan_semanal ps
      JOIN producto p ON ps.id_producto = p.id_producto
    `);
    return rows;
  }

  async create(data: PlanSemanalDTO) {
    const { semana, id_producto, cantidad_objetivo, cantidad_produccion, colores } = data;

    const [result] = await db.query(`
      INSERT INTO plan_semanal (semana, id_producto, cantidad_objetivo, cantidad_produccion)
      VALUES (?, ?, ?, ?)
    `, [semana, id_producto, cantidad_objetivo, cantidad_produccion]);

    const idPlan = (result as any).insertId;

    for (const c of colores) {
      await db.query(`
        INSERT INTO plan_color (tipo_plan, id_plan, color, cantidad)
        VALUES ('semanal', ?, ?, ?)
      `, [idPlan, c.color, c.cantidad]);
    }

    return { id_plan_semanal: idPlan };
  }

    async update(id: number, data: PlanSemanalDTO) {
        const { semana, id_producto, cantidad_objetivo, cantidad_produccion, colores } = data;

        // 1. Actualizar datos del plan
        await db.query(`
            UPDATE plan_semanal
            SET semana = ?, id_producto = ?, cantidad_objetivo = ?, cantidad_produccion = ?
            WHERE id_plan_semanal = ?
        `, [semana, id_producto, cantidad_objetivo, cantidad_produccion, id]);

        // 2. Eliminar colores actuales
        await db.query(`
            DELETE FROM plan_color
            WHERE tipo_plan = 'semanal' AND id_plan = ?
        `, [id]);

        // 3. Insertar nuevos colores
        for (const c of colores) {
            await db.query(`
            INSERT INTO plan_color (tipo_plan, id_plan, color, cantidad)
            VALUES ('semanal', ?, ?, ?)
            `, [id, c.color, c.cantidad]);
        }

        return { id_plan_semanal: id };
    }


  async delete(id: number) {
    await db.query(`DELETE FROM plan_color WHERE tipo_plan = 'semanal' AND id_plan = ?`, [id]);
    await db.query(`DELETE FROM plan_semanal WHERE id_plan_semanal = ?`, [id]);
  }

  async getById(id: number) {
    const [plan] = await db.query(`SELECT * FROM plan_semanal WHERE id_plan_semanal = ?`, [id]);
    const [colores] = await db.query(`SELECT color, cantidad FROM plan_color WHERE tipo_plan = 'semanal' AND id_plan = ?`, [id]);
    return { ...(plan as any)[0], colores };
  }
}

export default new PlanSemanalService();
