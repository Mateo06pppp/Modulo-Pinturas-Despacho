export interface PlanSemanalColorDTO {
  color: string;
  cantidad: number;
}

export interface PlanSemanalDTO {
  semana: string;
  id_producto: number;
  cantidad_objetivo: number;
  cantidad_produccion: number;
  colores: PlanSemanalColorDTO[];
}
