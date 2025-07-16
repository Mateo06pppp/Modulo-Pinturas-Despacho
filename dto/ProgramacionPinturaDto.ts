class ProgramacionDto {
  constructor(
    public id_producto: number,
    public id_operario: number,
    public fecha_programada: string,
    public hora_inicio: string,
    public hora_fin: string,
    public fecha_registro_avance: string,
    public avance_porcentaje: number,
    public estado_programacion: string
  ) {}
}

export default ProgramacionDto;
