import ProductoRepository from '../repositories/ProductoRepository';

class ProductoService {
  static async listar() {
    return await ProductoRepository.obtenerProductos();
  }
}

export default ProductoService;