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

/**
 * Exportar la aplicación
 */
export default app;
