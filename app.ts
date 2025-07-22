import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import login from "./routes/LoginRoutes"
import register from "./routes/RegistroRoutes"
import programacionPinturaRoutes from "./routes/ProgramacionPinturaRoutes"
import ProductoRoutes from "./routes/ProductoRoutes"
import bodegaPinturaRoutes from "./routes/BodegaPinturaRoutes"
import despachoRoutes from "./routes/DespachoRoutes"
import bodegaRoutes from "./routes/BodegaAlistamientoRoutes"
import clienteRoutes from "./routes/ClienteRoutes"
import rutaRoutes from "./routes/RutaRoutes"
import operarioRoutes from "./routes/OperarioRoutes"
import reportesRoutes from "./routes/ReportesRoutes"
import auxiliarRoutes from './routes/AuxiliarRoutes'
import conductorRoutes from "./routes/ConductorRoutes"
import ruta_DestinoRoutes from "./routes/Ruta_DestinoRoutes"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 10101

// ✅ Configurar CORS para permitir solicitudes del frontend
app.use(
  cors({
    origin: "http://localhost:5173", // Asegúrate que coincida con tu frontend
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  }),
)

// ✅ Middlewares para procesar el body
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// 🛠️ Middleware para registrar las solicitudes
app.use((req, res, next) => {
  console.log(`📡 ${req.method} ${req.originalUrl} - ${new Date().toISOString()}`)
  console.log("Body:", req.body)
  console.log("Params:", req.params)
  next()
})

// 🔐 Rutas de autenticación

app.use("/login", login)
app.use("/registro", register)
app.use("/programacion", programacionPinturaRoutes)
app.use("/producto", ProductoRoutes)
app.use("/bodega-pintura", bodegaPinturaRoutes)
app.use("/despachos", despachoRoutes)
app.use("/bodega-alistamiento", bodegaRoutes)
app.use("/clientes", clienteRoutes)
app.use("/rutas", rutaRoutes)
app.use("/operario", operarioRoutes)
app.use("/reportes", reportesRoutes)
app.use("/auxiliares", auxiliarRoutes)
app.use("/conductor", conductorRoutes)
app.use("/ruta_destino", ruta_DestinoRoutes)

// ❌ Manejo global de errores
app.use((err: any, req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error("❌ Error global:", err)
  res.status(500).json({
    error: "Error interno del servidor",
    message: err.message,
    path: req.path,
    timestamp: new Date().toISOString(),
  })
})

// 🚀 Iniciar el servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`)
})

export default app
