// Carga automáticamente las variables de entorno desde el archivo .env
// y las hace accesibles en la aplicación mediante process.env
import "dotenv/config";
/**
 * server.js
 * 
 * Punto de entrada principal del servidor.
 * Este archivo inicia la aplicación Express
 * y define el puerto donde se ejecutará la API.
 */

import app from "./backend/src/app.js";

/**
 * Puerto donde se ejecutará el servidor.
 * Si existe una variable de entorno PORT la utiliza,
 * de lo contrario utiliza el puerto 3000.
 */
const PORT = process.env.PORT || 3000;

/**
 * Inicia el servidor HTTP
 */
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en puerto ${PORT}`);
});