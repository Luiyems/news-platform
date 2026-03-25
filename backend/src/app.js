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
import newsRoutes from "./routes/newsRoutes.js";
// Importa el middleware de Swagger UI para Express.
// Este paquete permite mostrar una interfaz web interactiva
// donde puedes visualizar y probar los endpoints de tu API.
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
 * Middleware de seguridad HTTP
 */
app.use(helmet());
/**
 * Middleware para permitir peticiones entre dominios
 */
app.use(cors());
/**
 * Middleware para parsear JSON
 */
app.use(express.json());
/**
 * Ruta básica de prueba
 */
app.get("/", (req, res) => {
    res.json({
        message: "API de noticias funcionando correctamente"
    });
});
// Define la ruta base "/api/news" y asocia todas las rutas
// relacionadas con noticias que están definidas en newsRoutes.
app.use("/api/news", newsRoutes);
// Configura la ruta "/api-docs" para mostrar la documentación interactiva
// de la API usando Swagger UI, cargando la interfaz y utilizando
// la especificación definida en swaggerSpec.
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
/**
 * Exportar la aplicación
 */
export default app;
