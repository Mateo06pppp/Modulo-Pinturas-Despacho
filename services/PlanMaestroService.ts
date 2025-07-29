import db from "../config/config-db";
import { PlanMaestroDTO } from "../dto/PlanMaestro";

class PlanMaestroService {
  async getAll() {
    const [rows] = await db.query(`
      SELECT pm.*, p.nombre AS producto
      FROM plan_maestro pm
      JOIN producto p ON pm.id_producto = p.id_producto
    `);
    return rows;
  }

  async getById(id: number) {
    const [plan] = await db.query(`SELECT * FROM plan_maestro WHERE id_plan_maestro = ?`, [id]);
    const [colores] = await db.query(`
      SELECT color, cantidad
      FROM plan_color
      WHERE tipo_plan = 'maestro' AND id_plan = ?
    `, [id]);
    return { ...(plan as any)[0], colores };
  }

  async create(data: PlanMaestroDTO) {
    const { mes, id_producto, cantidad_objetivo, cantidad_produccion, colores } = data;

    const [result] = await db.query(`
      INSERT INTO plan_maestro (mes, id_producto, cantidad_objetivo, cantidad_produccion)
      VALUES (?, ?, ?, ?)
    `, [mes, id_producto, cantidad_objetivo, cantidad_produccion]);

    const idPlan = (result as any).insertId;

    for (const c of colores) {
      await db.query(`
        INSERT INTO plan_color (tipo_plan, id_plan, color, cantidad)
        VALUES ('maestro', ?, ?, ?)
      `, [idPlan, c.color, c.cantidad]);
    }

    return { id_plan_maestro: idPlan };
  }

  async update(id: number, data: PlanMaestroDTO) {
    const { mes, id_producto, cantidad_objetivo, cantidad_produccion, colores } = data;

    await db.query(`
      UPDATE plan_maestro
      SET mes = ?, id_producto = ?, cantidad_objetivo = ?, cantidad_produccion = ?
      WHERE id_plan_maestro = ?
    `, [mes, id_producto, cantidad_objetivo, cantidad_produccion, id]);

    await db.query(`
      DELETE FROM plan_color
      WHERE tipo_plan = 'maestro' AND id_plan = ?
    `, [id]);

    for (const c of colores) {
      await db.query(`
        INSERT INTO plan_color (tipo_plan, id_plan, color, cantidad)
        VALUES ('maestro', ?, ?, ?)
      `, [id, c.color, c.cantidad]);
    }

    return { id_plan_maestro: id };
  }

  async delete(id: number) {
    await db.query(`DELETE FROM plan_color WHERE tipo_plan = 'maestro' AND id_plan = ?`, [id]);
    await db.query(`DELETE FROM plan_maestro WHERE id_plan_maestro = ?`, [id]);
  }
}

export default new PlanMaestroService();
