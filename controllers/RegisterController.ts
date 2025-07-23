import { Request, Response } from "express";
import User from "../dto/UserDto";
import usuarioService from "../services/UserService";
import promisePool from "../config/config-db";

const registro = async (req: Request, res: Response) => {
    try {
        const { nombre, password_hash, estado, id_lider } = req.body;

        console.log("📩 Datos recibidos:", { nombre, password_hash, estado, id_lider });

        // 1. 🔍 Verificar si el nombre ya está registrado ANTES de intentar insertarlo
        const [existeNombre]: any = await promisePool.execute(
            'SELECT id_usuario FROM USUARIO WHERE nombre = ?',
            [nombre]
        );

        if (existeNombre.length > 0) {
            console.log(`❌ Nombre ya registrado: ${nombre}`);
            return res.status(400).json({
                status: "error",
                message: "Este nombre ya está registrado"
            });
        }

        // 2. ✅ Si no existe, proceder a registrar
        console.log(`✅ Registrando usuario...`);
        const user = new User(nombre, password_hash, estado, id_lider);
        await usuarioService.registro(user);

        console.log(`✅ Usuario registrado exitosamente - Nombre: ${nombre}, Rol: ${id_lider}`);
        return res.status(201).json({
            status: "success",
            message: "Usuario registrado exitosamente.",
        });

    } catch (error: any) {
        console.error("❌ Error al registrar usuario:", error);

        if (error?.code === "ER_DUP_ENTRY") {
            return res.status(400).json({
                status: "error",
                message: "Este usuario ya está registrado"
            });
        }

        return res.status(500).json({
            status: "error",
            message: "Error en el servidor al registrar usuario"
        });
    }
}

export default {
    registro
};