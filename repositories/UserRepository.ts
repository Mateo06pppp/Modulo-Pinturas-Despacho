import db from '../config/config-db'
import bcrypt from "bcryptjs";
import Login from '../dto/LoginDto';
import User from '../dto/UserDto';


class UserRepository{

    static async crearUsuario(USUARIO: User) {
        const sql = 'CALL CreateUser(?, ?, ?, ?)';
        const values = [
            USUARIO.nombre,  
            USUARIO.password_hash,    
            USUARIO.estado,
            USUARIO.id_lider
        ];
        return db.execute(sql, values);
    }

    static async buscarUsuario(login: Login) {
    const { nombre, password_hash } = login;

    const [rows]: any = await db.execute(
      'SELECT * FROM USUARIO WHERE nombre = ?',
      [nombre]
    );

    if (!rows || rows.length === 0) {
      return { logged: false, status: "Usuario no encontrado" };
    }

    const user = rows[0];
    console.log("🔍 USUARIO RAW EXTRAÍDO:", user);

    // ✅ Aquí comparamos usando bcrypt
    const passwordValida = await bcrypt.compare(password_hash, user.password_hash);
    if (!passwordValida) {
      console.log("❌ Contraseña inválida");
      return { logged: false, status: "Contraseña incorrecta" };
    }

    return {
      logged: true,
      status: "success",
      id: user.id_usuario,
      nombre: user.nombre,
      id_lider: user.id_lider,
    };
  }
}

export default UserRepository;