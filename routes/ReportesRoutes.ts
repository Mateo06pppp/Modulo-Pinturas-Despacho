import { Router } from "express"
import reportesController from "../controllers/ReportesController"

const router = Router()

// Rutas para diferentes tipos de reportes
router.get("/operarios", reportesController.getReporteOperarios)
router.get("/operarios-con-programaciones", reportesController.getReporteOperariosConProgramaciones)
router.get("/operarios-simulado", reportesController.getReporteOperariosSimulado)
router.get("/lineas", reportesController.getReporteLineas)
router.get("/colores", reportesController.getReporteColores)
router.get("/cumplimiento", reportesController.getReporteCumplimiento)
router.get("/indicadores-resumen", reportesController.getIndicadoresResumen)
router.get("/estados-programaciones", reportesController.getReporteEstadoProgramaciones)
router.get("/productividad", reportesController.getReporteProductividad)
router.get("/pedidos", reportesController.getReportePedidos)
router.get("/despachos", reportesController.getReporteDespachos)
router.get("/bodegas", reportesController.getReporteBodegas)

// 🔍 Rutas de diagnóstico para verificar datos
router.get("/debug/operarios", reportesController.getDebugOperarios)
router.get("/debug/programaciones", reportesController.getDebugProgramaciones)
router.get("/debug/tablas", reportesController.getDebugTablas)

export default router
