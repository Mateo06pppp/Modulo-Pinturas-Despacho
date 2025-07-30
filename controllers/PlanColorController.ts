import { Request, Response } from "express";
import PlanColorService from "../services/PlanColorService";

class PlanColorController {
  async getAll(req: Request, res: Response) {
    const colores = await PlanColorService.getAll();
    res.json(colores);
  }

  async getById(req: Request, res: Response) {
    const color = await PlanColorService.getById(parseInt(req.params.id));
    res.json(color);
  }

  async getByPlan(req: Request, res: Response) {
    const { tipo_plan, id_plan } = req.params;
    const colores = await PlanColorService.getByPlan(tipo_plan, parseInt(id_plan));
    res.json(colores);
  }

  async create(req: Request, res: Response) {
    const nuevo = await PlanColorService.create(req.body);
    res.status(201).json(nuevo);
  }

  async update(req: Request, res: Response) {
    const actualizado = await PlanColorService.update(parseInt(req.params.id), req.body);
    res.json(actualizado);
  }

  async delete(req: Request, res: Response) {
    await PlanColorService.delete(parseInt(req.params.id));
    res.status(204).send();
  }
}

export default new PlanColorController();
