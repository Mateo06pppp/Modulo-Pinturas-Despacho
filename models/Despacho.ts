export interface Despacho {
  id_despacho?: number;
  fecha_programada_entrega: string;
  hora_salida_estimada: string;
  hora_llegada_estimada: string;
  estado_despacho: string;
  transportista: string;
  tipo_vehiculo: string;
  fecha_real_salida?: string;
  fecha_real_entrega?: string;
  id_ruta: number;
  id_cliente: number;
  id_pedido: number;
}
