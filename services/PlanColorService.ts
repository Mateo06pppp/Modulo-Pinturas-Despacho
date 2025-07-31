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

  async createOrUpdateColor(data: PlanColorDTO) {
    const { tipo_plan, id_plan, color, cantidad } = data;

    // Buscar si ya existe el color
    const [existing] = await db.query(`
      SELECT * FROM plan_color WHERE tipo_plan = ? AND id_plan = ? AND color = ?
    `, [tipo_plan, id_plan, color]);

    let nuevaCantidad = cantidad;

    if ((existing as any[]).length > 0) {
      const actual = (existing as any)[0];
      nuevaCantidad += actual.cantidad;

      // Sumar los demás colores (excluyendo este)
      const [sum] = await db.query(`
        SELECT SUM(cantidad) as total FROM plan_color
        WHERE tipo_plan = ? AND id_plan = ? AND id <> ?
      `, [tipo_plan, id_plan, actual.id]);

      const totalSinEste = (sum as any)[0].total || 0;
      const totalFinal = Number (totalSinEste) + Number (nuevaCantidad);

      // Validar contra plan_semanal
      const [plan] : any = await db.query(`
        SELECT cantidad_objetivo, id_producto FROM plan_semanal WHERE id_plan_semanal = ?
      `, [id_plan]);
      const objetivo = plan[0].cantidad_objetivo;
      const id_producto = plan[0].id_producto;

      if (totalFinal > objetivo) {
        throw new Error(`Suma de colores (${totalFinal}) supera el objetivo (${objetivo})`);
      }

      // Actualizar el color existente
      await db.query(`
        UPDATE plan_color SET cantidad = ? WHERE id = ?
      `, [nuevaCantidad, actual.id]);

    } else {
      // SUMAR todos los colores actuales
      const [sum] = await db.query(`
        SELECT SUM(cantidad) as total FROM plan_color WHERE tipo_plan = ? AND id_plan = ?
      `, [tipo_plan, id_plan]);

      const totalActual = (sum as any)[0].total || 0;
      const totalFinal = Number (totalActual) + Number (cantidad);

      const [plan] : any = await db.query(`
        SELECT cantidad_objetivo, id_producto FROM plan_semanal WHERE id_plan_semanal = ?
      `, [id_plan]);
      const objetivo = plan[0].cantidad_objetivo;
      const id_producto = plan[0].id_producto;

      if (totalFinal > objetivo) {
        throw new Error(`Suma de colores (${totalFinal}) supera el objetivo (${objetivo})`);
      }

      // Insertar nuevo color
      await db.query(`
        INSERT INTO plan_color (tipo_plan, id_plan, color, cantidad)
        VALUES (?, ?, ?, ?)
      `, [tipo_plan, id_plan, color, cantidad]);
    }

    // ✅ Actualizar producción en plan_semanal
    await db.query(`
      UPDATE plan_semanal
      SET cantidad_produccion = (
        SELECT SUM(cantidad) FROM plan_color
        WHERE tipo_plan = 'semanal' AND id_plan = ?
      )
      WHERE id_plan_semanal = ?
    `, [id_plan, id_plan]);

    // ✅ Actualizar producción en plan_maestro
    const [resProducto] : any = await db.query(`
      SELECT id_producto FROM plan_semanal WHERE id_plan_semanal = ?
    `, [id_plan]);
    const producto = resProducto[0].id_producto;

    await db.query(`
      UPDATE plan_maestro
      SET cantidad_produccion = (
        SELECT SUM(cantidad_produccion)
        FROM plan_semanal
        WHERE id_producto = ?
      )
      WHERE id_producto = ?
    `, [producto, producto]);

    // ✅ Validar que la producción total mensual no exceda el objetivo
    const [maestro] : any = await db.query(`
      SELECT cantidad_produccion, cantidad_objetivo
      FROM plan_maestro
      WHERE id_producto = ?
    `, [producto]);

    if (maestro[0].cantidad_produccion > maestro[0].cantidad_objetivo) {
      throw new Error(`La producción mensual (${maestro[0].cantidad_produccion}) supera el objetivo mensual (${maestro[0].cantidad_objetivo}).`);
    }

    return { message: "Color agregado o actualizado con éxito" };
  }


  async update(id: number, data: PlanColorDTO) {
    const { tipo_plan, id_plan, color, cantidad } = data;

    // Verificar si otro color igual ya existe en ese plan
    const [existeDuplicado] = await db.query(`
      SELECT * FROM plan_color 
      WHERE tipo_plan = ? AND id_plan = ? AND color = ? AND id <> ?
    `, [tipo_plan, id_plan, color, id]);

    if ((existeDuplicado as any[]).length > 0) {
      throw new Error(`Ya existe un color '${color}' para este plan.`);
    }

    await db.query(`
      UPDATE plan_color
      SET tipo_plan = ?, id_plan = ?, color = ?, cantidad = ?
      WHERE id = ?
    `, [tipo_plan, id_plan, color, cantidad, id]);

    return { message: "Color actualizado correctamente", id };
  }

  async delete(id: number) {
    await db.query(`DELETE FROM plan_color WHERE id = ?`, [id]);
  }
}

export default new PlanColorService();
