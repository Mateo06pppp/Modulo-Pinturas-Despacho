import pool from '../config/config-db';

export const crearRutaSiNoExiste = async (
  id_conductor: number,
  id_auxiliar: number,
  ruta: string,
  destino: string
): Promise<number> => {
  const [rows]: any = await pool.execute(
    'SELECT id_ruta_destino FROM ruta_destino WHERE ruta = ? AND destino = ?',
    [ruta, destino]
  );
  if (rows.length === 0) throw new Error("Ruta y destino no registrados");

  const id_ruta_destino = rows[0].id_ruta_destino;

  const [existing]: any = await pool.execute(
    `SELECT id_ruta FROM ruta WHERE id_conductor = ? AND id_auxiliar = ? AND id_ruta_destino = ?`,
    [id_conductor, id_auxiliar, id_ruta_destino]
  );

  if (existing.length > 0) return existing[0].id_ruta;

  const [result]: any = await pool.execute(
    `INSERT INTO ruta (id_conductor, id_auxiliar, id_ruta_destino) VALUES (?, ?, ?)`,
    [id_conductor, id_auxiliar, id_ruta_destino]
  );

  return result.insertId;
};

