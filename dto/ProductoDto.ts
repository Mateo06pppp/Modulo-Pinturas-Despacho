class ProductoDto {
  constructor(
    public referencia: string,
    public nombre: string,
    public color: string,
    public cantidad_actual: number,
    public estado_producto: string,
    public fecha_recepcion: string,
    public ubicacion_bodega: string,
    public id_linea_produccion: number
  ) {}
}

export default ProductoDto;