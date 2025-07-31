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

  async createOrUpdate(req: Request, res: Response) {
    try {
      const result = await PlanColorService.createOrUpdateColor(req.body);
      res.json(result);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const actualizado = await PlanColorService.update(parseInt(req.params.id), req.body);
      res.json(actualizado);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }


  async delete(req: Request, res: Response) {
    await PlanColorService.delete(parseInt(req.params.id));
    res.status(204).send();
  }
}

export default new PlanColorController();
