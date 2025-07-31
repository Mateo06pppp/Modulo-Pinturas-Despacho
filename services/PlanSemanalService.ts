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

  // 🧠 VALIDACIÓN 1: suma de colores no puede superar la cantidad_producción
  const totalColores = colores.reduce((sum, c) => sum + Number(c.cantidad), 0);
  if (totalColores > cantidad_produccion) {
    throw new Error(`La suma de colores (${totalColores}) no puede superar la cantidad de producción (${cantidad_produccion})`);
  }

  // 🧠 VALIDACIÓN 2: cantidad_producción no puede superar el objetivo
  if (cantidad_produccion > cantidad_objetivo) {
    throw new Error(`La cantidad de producción (${cantidad_produccion}) no puede superar el objetivo (${cantidad_objetivo})`);
  }

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

  // ✅ Validación mensual en plan_maestro
  const mes = semana.split(' ')[2]; // ej: "Semana 3 Julio" → ["Semana", "3", "Julio"]
  const [producciones]: any = await db.query(
    'SELECT cantidad_produccion FROM plan_semanal WHERE semana LIKE ? AND id_producto = ?',
    [`%${mes}%`, id_producto]
  );

  const totalMensual = producciones.reduce((sum: number, r: any) => sum + Number(r.cantidad_produccion), 0);

  const [maestroRows]: any = await db.query(
    'SELECT * FROM plan_maestro WHERE mes = ? AND id_producto = ?',
    [mes, id_producto]
  );

  const maestro = maestroRows[0];

  if (maestro && totalMensual > Number(maestro.cantidad_objetivo)) {
    throw new Error(`La producción mensual (${totalMensual}) supera el objetivo mensual (${maestro.cantidad_objetivo})`);
  }

  // ✅ Actualiza plan_maestro
  if (maestro) {
    await db.query(
      'UPDATE plan_maestro SET cantidad_produccion = ? WHERE id_plan_maestro = ?',
      [totalMensual, maestro.id_plan_maestro]
    );
  }

  return { id_plan_semanal: idPlan };
}


  async update(id: number, data: PlanSemanalDTO) {
  const { semana, id_producto, cantidad_objetivo, cantidad_produccion, colores } = data;

  // 🧠 VALIDACIÓN 1: suma de colores no puede superar la cantidad_producción
  const totalColores = colores.reduce((sum, c) => sum + Number(c.cantidad), 0);
  if (totalColores > cantidad_produccion) {
    throw new Error(`La suma de colores (${totalColores}) no puede superar la cantidad de producción (${cantidad_produccion})`);
  }

  // 🧠 VALIDACIÓN 2: cantidad_producción no puede superar el objetivo
  if (cantidad_produccion > cantidad_objetivo) {
    throw new Error(`La cantidad de producción (${cantidad_produccion}) no puede superar el objetivo (${cantidad_objetivo})`);
  }

  // ✅ Actualizar plan semanal
  await db.query(`
    UPDATE plan_semanal
    SET semana = ?, id_producto = ?, cantidad_objetivo = ?, cantidad_produccion = ?
    WHERE id_plan_semanal = ?
  `, [semana, id_producto, cantidad_objetivo, cantidad_produccion, id]);

  // ✅ Eliminar colores actuales
  await db.query(`DELETE FROM plan_color WHERE tipo_plan = 'semanal' AND id_plan = ?`, [id]);

  // ✅ Insertar nuevos colores
  for (const c of colores) {
    await db.query(`
      INSERT INTO plan_color (tipo_plan, id_plan, color, cantidad)
      VALUES ('semanal', ?, ?, ?)
    `, [id, c.color, c.cantidad]);
  }

  // ✅ Validación mensual en plan_maestro
  const mes = semana.split(' ')[2]; // Ej: "Semana 1 - Enero 2024" → "Enero"
  const [producciones]: any = await db.query(
    'SELECT cantidad_produccion FROM plan_semanal WHERE semana LIKE ? AND id_producto = ?',
    [`%${mes}%`, id_producto]
  );

  const totalMensual = producciones.reduce((sum: number, r: any) => sum + Number(r.cantidad_produccion), 0);

  const [maestroRows]: any = await db.query(
    'SELECT * FROM plan_maestro WHERE mes = ? AND id_producto = ?',
    [mes, id_producto]
  );

  const maestro = maestroRows[0];

  if (maestro && totalMensual > Number(maestro.cantidad_objetivo)) {
    throw new Error(`La producción mensual (${totalMensual}) supera el objetivo mensual (${maestro.cantidad_objetivo})`);
  }

  if (maestro) {
    await db.query(
      'UPDATE plan_maestro SET cantidad_produccion = ? WHERE id_plan_maestro = ?',
      [totalMensual, maestro.id_plan_maestro]
    );
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
