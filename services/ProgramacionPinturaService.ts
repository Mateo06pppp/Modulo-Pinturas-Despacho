import ProgramacionRepository from '../repositories/ProgramacionPinturaRepository';
import ProgramacionDto from '../dto/ProgramacionPinturaDto';

class ProgramacionService {
  static async registrar(data: ProgramacionDto) {
    return await ProgramacionRepository.crearProgramacion(data);
  }

  static async listar() {
    return await ProgramacionRepository.obtenerProgramaciones();
  }
}

export default ProgramacionService;
