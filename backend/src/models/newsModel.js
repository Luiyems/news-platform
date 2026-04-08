
/**
 * newsModel.js
 * 
 * Este modelo se encarga de todas las operaciones
 * relacionadas con la tabla "news" en la base de datos.
 */
import { query } from "../config/database.js";
/**
 * Obtener todas las noticias
 */
export const getAllNews = async () => {
    const sql = `
        SELECT 
            news.id,
            news.title,
            news.summary,
            news.image_url,
            news.source,
            news.published_at,
            categories.name AS category
        FROM news
        LEFT JOIN categories
        ON news.category_id = categories.id
        ORDER BY published_at DESC
        LIMIT 20
    `;
    const result = await query(sql);
    return result.rows;
};
/**
 * Obtener una noticia por ID
 */
export const getNewsById = async (id) => {
    const sql = `
        SELECT *
        FROM news
        WHERE id = $1
    `;
    const result = await query(sql, [id]);
    return result.rows[0];
};
/**
 * Obtener noticias por categoría
 */
export const getNewsByCategory = async (categoryId) => {
    const sql = `
        SELECT *
        FROM news
        WHERE category_id = $1
        ORDER BY published_at DESC
        LIMIT 20
    `;
    const result = await query(sql, [categoryId]);
    return result.rows;
};