
/**
 * swagger.js
 * 
 * Configuración de Swagger (OpenAPI)
 * para documentar y probar la API.
 */
import swaggerJSDoc from "swagger-jsdoc";

const appBaseUrl = process.env.APP_BASE_URL || "http://localhost:3000";
/**
 * Opciones de configuración de Swagger
 */
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API de Noticias",
            version: "1.0.0",
            description: "Documentación de la API REST para la plataforma de noticias"
        },
        servers: [
            {
                url: appBaseUrl
            }
        ]
    },
    apis: ["./backend/src/routes/*.js"]
};
/**
 * Generar documentación Swagger
 */
const swaggerSpec = swaggerJSDoc(options);
export default swaggerSpec;
