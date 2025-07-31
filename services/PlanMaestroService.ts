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
    return (plan as any)[0]; // sin incluir colores
  }

  async create(data: PlanMaestroDTO) {
    const { mes, id_producto, cantidad_objetivo, cantidad_produccion } = data;

    if (cantidad_produccion > cantidad_objetivo) {
      throw new Error("La cantidad de producción no puede superar la cantidad objetivo.");
    }

    const [result] = await db.query(`
      INSERT INTO plan_maestro (mes, id_producto, cantidad_objetivo, cantidad_produccion)
      VALUES (?, ?, ?, ?)
    `, [mes, id_producto, cantidad_objetivo, cantidad_produccion]);

    const idPlan = (result as any).insertId;

    return { id_plan_maestro: idPlan };
  }

  async update(id: number, data: PlanMaestroDTO) {
    const { mes, id_producto, cantidad_objetivo, cantidad_produccion } = data;

    if (cantidad_produccion > cantidad_objetivo) {
      throw new Error("La cantidad de producción no puede superar la cantidad objetivo.");
    }

    await db.query(`
      UPDATE plan_maestro
      SET mes = ?, id_producto = ?, cantidad_objetivo = ?, cantidad_produccion = ?
      WHERE id_plan_maestro = ?
    `, [mes, id_producto, cantidad_objetivo, cantidad_produccion, id]);

    return { id_plan_maestro: id };
  }

  async delete(id: number) {
    await db.query(`DELETE FROM plan_maestro WHERE id_plan_maestro = ?`, [id]);
  }
}

export default new PlanMaestroService();

