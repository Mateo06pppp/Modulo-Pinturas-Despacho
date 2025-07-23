import { Request, Response } from "express";
import usuarioServi from "../services/UserService";
import Login from "../dto/LoginDto";
import generateToken from '../helpers/generateToken';
import dotenv from "dotenv";

dotenv.config();

interface LoginResponse {
  logged: boolean;
  status: string;
  id?: number;
  nombre?: string;
  id_lider?: number;
}

const login = async (req: Request, res: Response) => {
    try{
        const {nombre, password_hash} = req.body;

        if (!nombre || !password_hash){
            return res.status(400).json({
                status: "Error",
                message: "Nombre y Contraseña son Requeridos"
            });
        }

        console.log("🔐 Intento de login para:", nombre);

        const loginResult: LoginResponse = await usuarioServi.login(new Login(nombre, password_hash));

        if (loginResult.logged === true) {
            // ✅ LOGIN EXITOSO
            if (!loginResult.id || !loginResult.nombre || loginResult.id_lider === undefined) {
                console.error("❌ DATOS FALTANTES EN EL RESULTADO:", {
                id: loginResult.id,
                name_person: loginResult.nombre,
                id_lider: loginResult.id_lider
                });
                return res.status(500).json({ 
                status: "error",
                message: "Error del sistema: Datos de usuario incompletos" 
                });
            }

            const userData = {
                id: loginResult.id,
                nombre: loginResult.nombre,
                id_lider: loginResult.id_lider
            };

            console.log("✅ Login exitoso para:", userData.nombre);

            return res.status(200).json({
                status: "success",
                token: generateToken({
                id: userData.id,
                nombre: userData.nombre,
                id_lider: userData.id_lider
                }, 5),
                user: userData,
            });
        }
    }catch (error: any) {
        console.error("❌ Error en login:", error);
        return res.status(500).json({ 
        status: "error",
        message: "Error en el servidor",
        details: error.message 
        });
    }
};

export default {
    login
};