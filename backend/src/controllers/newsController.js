
/**
 * newsController.js
 * 
 * Controlador encargado de gestionar
 * las peticiones HTTP relacionadas con noticias.
 */
import {
    getAllNews,
    getNewsById,
    getNewsByCategory
} from "../models/newsModel.js";
/**
 * Obtener todas las noticias
 */
export const fetchAllNews = async (req, res) => {
    try {
        const news = await getAllNews();
        res.json(news);
    } catch (error) {
        console.error("Error obteniendo noticias:", error);
        res.status(500).json({
            error: "Error interno del servidor"
        });
    }
};
/**
 * Obtener una noticia por ID
 */
export const fetchNewsById = async (req, res) => {
    try {
        const { id } = req.params;
        const news = await getNewsById(id);
        if (!news) {
            return res.status(404).json({
                error: "Noticia no encontrada"
            });
        }
        res.json(news);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Error interno del servidor"
        });
    }
};
/**
 * Obtener noticias por categoría
 */
export const fetchNewsByCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const news = await getNewsByCategory(id);
        res.json(news);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Error interno del servidor"
        });
    }
};