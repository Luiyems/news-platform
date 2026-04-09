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
    const parsedId = parseInt(id, 10);
    if (isNaN(parsedId) || parsedId <= 0) return null;
    
    const sql = `
        SELECT 
            id, title, summary, content, image_url, 
            source, category_id, published_at, created_at, link
        FROM news
        WHERE id = $1
    `;
    const result = await query(sql, [parsedId]);
    return result.rows[0] || null;
};

/**
 * Obtener noticias por categoría
 */
export const getNewsByCategory = async (categoryId) => {
    const parsedId = parseInt(categoryId, 10);
    if (isNaN(parsedId) || parsedId <= 0) return [];
    
    const sql = `
        SELECT 
            id, title, summary, image_url, 
            source, published_at
        FROM news
        WHERE category_id = $1
        ORDER BY published_at DESC
        LIMIT 20
    `;
    const result = await query(sql, [parsedId]);
    return result.rows;
};