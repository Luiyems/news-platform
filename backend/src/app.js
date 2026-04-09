/**
 * app.js
 * 
 * Configuración principal de la aplicación Express.
 * Aquí se cargan los middlewares globales
 * y las rutas principales de la API.
 */
import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import newsRoutes from "./routes/newsRoutes.js";
import cron from "node-cron";
import { fetchRSSNews } from "./services/rssService.js";
import { logger } from "./config/logger.js";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
// Importa el middleware de Swagger UI para Express.
// Este paquete permite mostrar una interfaz web interactiva
// donde puedes visualizar y probar los endpoints de la API.
import swaggerUi from "swagger-ui-express";
// Importa la configuración de Swagger (OpenAPI) que has definido.
// Este archivo (swagger.js) contiene la documentación de la API,
// incluyendo rutas, métodos, parámetros, respuestas, etc.
import swaggerSpec from "./config/swagger.js";
/**
 * Crear instancia de la aplicación Express
 */
const app = express();

/**
 * Middleware para servir archivos estáticos del frontend
 */
app.use(express.static(path.join(__dirname, "../../frontend")));

/**
 * Middleware de seguridad HTTP
 */
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            imgSrc: ["'self'", "data:", "https:"],
            connectSrc: ["'self'"],
            frameSrc: ["'none'"],
        },
    },
    crossOriginEmbedderPolicy: false,
}));

/**
 * Rate limiting - 100 peticiones por 15 minutos por IP
 */
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: { error: "Demasiadas peticiones. Intenta más tarde." },
    standardHeaders: true,
    legacyHeaders: false,
});
app.use("/api", limiter);

/**
 * Middleware para permitir peticiones entre dominios
 */
app.use(cors());

/**
 * Middleware para parsear JSON con límite de tamaño
 */
app.use(express.json({ limit: "10kb" }));
app.use((req, res, next) => {
    logger.info(`${req.method} ${req.path}`);
    next();
});

/**
 * Ruta raíz - sirve el frontend
 */
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/index.html"));
});

/**
 * Ruta de health para la API
 */
app.get("/health", (req, res) => {
    res.json({ status: "ok" });
});
// Define la ruta base "/api/news" y asocia todas las rutas
// relacionadas con noticias que están definidas en newsRoutes.
app.use("/api/news", newsRoutes);
// Configura la ruta "/api-docs" para mostrar la documentación interactiva
// de la API usando Swagger UI (solo en desarrollo)
if (process.env.NODE_ENV !== "production") {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

// probar RSS
/**
 * Exportar la aplicación
 */
/**
 * Ejecutar actualización de noticias automáticamente cada 30 minutos
 */
cron.schedule("*/180 * * * *", async () => {
    await fetchRSSNews();
});

if (process.env.NODE_ENV !== "test") {
    fetchRSSNews();
}

export default app;
