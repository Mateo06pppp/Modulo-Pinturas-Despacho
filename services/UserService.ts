import generateHash from "../helpers/generateHash";
import UserRepository from "../repositories/UserRepository";
import User from "../dto/UserDto";
import Login from "../dto/LoginDto";


class usuarioService{
    static async registro (user: User){
        user.password_hash = await generateHash(user.password_hash);
        return await UserRepository.crearUsuario(user);
    }

    static async login(Login: Login){
        return await UserRepository.buscarUsuario(Login);
    }
}
export default usuarioService