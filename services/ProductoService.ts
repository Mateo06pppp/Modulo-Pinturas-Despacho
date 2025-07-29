import db from '../config/config-db';
import ProductoDTO from '../dto/ProductoDto';

class ProductoService {
  async getAll() {
    const [rows] = await db.query(`
      SELECT p.*, 
             f.nombre AS familia, 
             l.nombre AS linea, 
             m.nombre AS modelo, 
             pl.nombre AS planta,
             t.descripcion AS tiempo_entrega
      FROM producto p
      LEFT JOIN familia f ON p.id_familia = f.id_familia
      LEFT JOIN linea l ON p.id_linea = l.id_linea
      LEFT JOIN modelo m ON p.id_modelo = m.id_modelo
      LEFT JOIN planta pl ON p.id_planta = pl.id_planta
      LEFT JOIN tiempo_entrega t ON p.id_tiempo = t.id_tiempo
    `);
    return rows;
  }

  async create(producto: ProductoDTO) {
    const [result] = await db.query('INSERT INTO producto SET ?', [producto]);
    return result;
  }

  async update(id: number, data: ProductoDTO) {
    const [result] = await db.query('UPDATE producto SET ? WHERE id_producto = ?', [data, id]);
    return result;
  }

  async delete(id: number) {
    const [result] = await db.query('DELETE FROM producto WHERE id_producto = ?', [id]);
    return result;
  }

  async getById(id: number) {
    const [rows] = await db.query('SELECT * FROM producto WHERE id_producto = ?', [id]);
    const data = rows as any[];
    return data[0];
  }
}

export default new ProductoService();
