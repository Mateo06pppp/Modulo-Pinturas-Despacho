export interface PlanMaestroColorDTO {
  color: string;
  cantidad: number;
}

export interface PlanMaestroDTO {
  mes: string;
  id_producto: number;
  cantidad_objetivo: number;
  cantidad_produccion: number;
  colores: PlanMaestroColorDTO[];
}
