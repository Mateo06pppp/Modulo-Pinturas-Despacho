import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import login from "./routes/LoginRoutes";
import register from "./routes/RegistroRoutes";
import programacionPinturaRoutes from "./routes/ProgramacionPinturaRoutes";
import ProductoRoutes from "./routes/ProductoRoutes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 10101;

// ✅ Configurar CORS para permitir solicitudes del frontend
app.use(cors({
  origin: "http://localhost:5173", // Asegúrate que coincida con tu frontend
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true
}));

// ✅ Middlewares para procesar el body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 🛠️ Middleware para registrar las solicitudes
app.use((req, res, next) => {
  console.log(`📡 ${req.method} ${req.originalUrl} - ${new Date().toISOString()}`);
  console.log("Body:", req.body);
  console.log("Params:", req.params);
  next();
});

// 🔐 Rutas de autenticación

app.use('/login', login);
app.use('/registro', register);
app.use('/programacion', programacionPinturaRoutes);
app.use('/producto', ProductoRoutes);

// ❌ Manejo global de errores
app.use((err: any, req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error("❌ Error global:", err);
  res.status(500).json({
    error: "Error interno del servidor",
    message: err.message,
    path: req.path,
    timestamp: new Date().toISOString()
  });
});

// 🚀 Iniciar el servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
});

export default app;