import promisePool from '../config/config-db';

class ProductoRepository {
  static async obtenerProductos() {
    const [rows] = await promisePool.execute(
      `SELECT * FROM PRODUCTO`
    );
    return rows;
  }
}

export default ProductoRepository;