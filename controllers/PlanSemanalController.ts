import { Request, Response } from "express";
import PlanSemanalService from "../services/PlanSemanalService";

class PlanSemanalController {
  async getAll(req: Request, res: Response) {
    const planes = await PlanSemanalService.getAll();
    res.json(planes);
  }

  async getById(req: Request, res: Response) {
    const plan = await PlanSemanalService.getById(parseInt(req.params.id));
    res.json(plan);
  }

  async create(req: Request, res: Response) {
    const nuevo = await PlanSemanalService.create(req.body);
    res.status(201).json(nuevo);
  }

    async update(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        const actualizado = await PlanSemanalService.update(id, req.body);
        res.json(actualizado);
    }


  async delete(req: Request, res: Response) {
    await PlanSemanalService.delete(parseInt(req.params.id));
    res.status(204).send();
  }
}

export default new PlanSemanalController();
