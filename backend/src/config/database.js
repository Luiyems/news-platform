/**
 * database.js
 * 
 * Este archivo configura la conexión con la base de datos PostgreSQL.
 * Se utiliza la librería "pg", que es el driver oficial de PostgreSQL para Node.js.
 */

import pkg from "pg";

const { Pool } = pkg;

/**
 * Crear un pool de conexiones.
 * 
 * Un pool permite reutilizar conexiones abiertas a la base de datos,
 * lo cual mejora el rendimiento y evita abrir y cerrar conexiones constantemente.
 */
const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});

/**
 * Función para ejecutar consultas SQL.
 * 
 * @param {string} text - consulta SQL
 * @param {array} params - parámetros de la consulta
 */
export const query = (text, params) => pool.query(text, params);

export default pool;
