export default interface ProductoDTO {
  referencia: string;
  nombre: string;
  color: string;
  cantidad_actual: number;
  estado_producto: string;
  fecha_recepcion: string;
  ubicacion_bodega: string;
  id_linea_produccion: number;
  id_familia: number;
  id_linea: number;
  id_modelo: number;
  id_planta: number;
  id_tiempo: number;
}
