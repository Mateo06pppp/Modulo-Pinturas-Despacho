import db from "../config/config-db";
import { PlanColorDTO } from "../dto/PlanColorDto";

class PlanColorService {
  async getAll() {
    const [rows] = await db.query(`SELECT * FROM plan_color`);
    return rows;
  }

  async getById(id: number) {
    const [rows] = await db.query(`SELECT * FROM plan_color WHERE id = ?`, [id]);
    return (rows as any)[0];
  }

  async getByPlan(tipo_plan: string, id_plan: number) {
    const [rows] = await db.query(`
      SELECT * FROM plan_color WHERE tipo_plan = ? AND id_plan = ?
    `, [tipo_plan, id_plan]);
    return rows;
  }

  async create(data: PlanColorDTO) {
    const { tipo_plan, id_plan, color, cantidad } = data;
    const [result] = await db.query(`
      INSERT INTO plan_color (tipo_plan, id_plan, color, cantidad)
      VALUES (?, ?, ?, ?)
    `, [tipo_plan, id_plan, color, cantidad]);
    return { id: (result as any).insertId };
  }

  async update(id: number, data: PlanColorDTO) {
    const { tipo_plan, id_plan, color, cantidad } = data;
    await db.query(`
      UPDATE plan_color
      SET tipo_plan = ?, id_plan = ?, color = ?, cantidad = ?
      WHERE id = ?
    `, [tipo_plan, id_plan, color, cantidad, id]);
    return { id };
  }

  async delete(id: number) {
    await db.query(`DELETE FROM plan_color WHERE id = ?`, [id]);
  }
}

export default new PlanColorService();
