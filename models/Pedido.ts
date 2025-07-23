export interface DetalleProducto {
  id_producto: number;
  cantidad_producto: number;
}

export interface Pedido {
  id_pedido?: number;
  numero_pedido: string;
  fecha_creacion: string;
  estado_pedido: string;
  observaciones?: string;
  id_cliente: number;
  productos: DetalleProducto[];
}
