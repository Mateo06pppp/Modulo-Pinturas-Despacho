import { Request, Response } from 'express';
import ProductoService from '../services/ProductoService';

class ProductoController {
  async getAll(req: Request, res: Response) {
    const productos = await ProductoService.getAll();
    res.json(productos);
  }

  async create(req: Request, res: Response) {
    const nuevo = await ProductoService.create(req.body);
    res.status(201).json(nuevo);
  }

  async update(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const actualizado = await ProductoService.update(id, req.body);
    res.json(actualizado);
  }

  async delete(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    await ProductoService.delete(id);
    res.status(204).send();
  }

  async getById(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const producto = await ProductoService.getById(id);
    res.json(producto);
  }
}

export default new ProductoController();
