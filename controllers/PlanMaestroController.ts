import { Request, Response } from "express";
import PlanMaestroService from "../services/PlanMaestroService";

class PlanMaestroController {
  async getAll(req: Request, res: Response) {
    const planes = await PlanMaestroService.getAll();
    res.json(planes);
  }

  async getById(req: Request, res: Response) {
    const plan = await PlanMaestroService.getById(parseInt(req.params.id));
    res.json(plan);
  }

  async create(req: Request, res: Response) {
    const nuevo = await PlanMaestroService.create(req.body);
    res.status(201).json(nuevo);
  }

  async update(req: Request, res: Response) {
    const actualizado = await PlanMaestroService.update(parseInt(req.params.id), req.body);
    res.json(actualizado);
  }

  async delete(req: Request, res: Response) {
    await PlanMaestroService.delete(parseInt(req.params.id));
    res.status(204).send();
  }
}

export default new PlanMaestroController();
