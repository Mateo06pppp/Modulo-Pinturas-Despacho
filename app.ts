import express from 'express';
import dotenv from 'dotenv';
import login from './routes/LoginRoutes';
import register from './routes/RegistroRoutes';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 10101;

// 🔧 Middlewares globales
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 🛠️ Middleware de debug para todas las peticiones
app.use((req, res, next) => {
  console.log(`📡 ${req.method} ${req.originalUrl} - ${new Date().toISOString()}`);
  console.log('Body:', req.body);
  console.log('Params:', req.params);
  next();
});


// 🔐 Rutas de autenticación
app.use('/login', login);
app.use('/registro', register);


// ❌ Manejo global de errores
app.use((err: any, req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('❌ Error global:', err);
  res.status(500).json({
    error: 'Error interno del servidor',
    message: err.message,
    path: req.path,
    timestamp: new Date().toISOString()
  });
});

// 🚀 Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
});

export default app;
