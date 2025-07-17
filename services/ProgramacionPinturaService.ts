import ProgramacionRepository from '../repositories/ProgramacionPinturaRepository';
import ProgramacionDto from '../dto/ProgramacionPinturaDto';

class ProgramacionService {
  static async registrar(data: ProgramacionDto) {
    return await ProgramacionRepository.crearProgramacion(data);
  }

  static async listar() {
    return await ProgramacionRepository.obtenerProgramaciones();
  }

  static async detalle(id: number) {
    return await ProgramacionRepository.detalleProgramacion(id);
  }

  static async actualizar(id: number, data: ProgramacionDto) {
    return await ProgramacionRepository.actualizarProgramacion(id, data);
  }

  static async eliminar(id: number) {
    return await ProgramacionRepository.eliminarProgramacion(id);
  }
}

export default ProgramacionService;
