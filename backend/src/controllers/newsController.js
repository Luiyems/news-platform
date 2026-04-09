
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
import { logger } from "../config/logger.js";
import xss from "xss";

const sanitize = (str) => (str ? xss(str) : str);

const validateId = (id) => {
    const num = parseInt(id, 10);
    return !isNaN(num) && num > 0;
};
/**
 * Obtener todas las noticias
 */
export const fetchAllNews = async (req, res) => {
    try {
        const news = await getAllNews();
        const sanitized = news.map(item => ({
            ...item,
            title: sanitize(item.title),
            summary: sanitize(item.summary),
        }));
        res.json(sanitized);
    } catch (error) {
        logger.error("Error obteniendo noticias:", error);
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
        if (!validateId(id)) {
            return res.status(400).json({
                error: "ID inválido"
            });
        }
        const news = await getNewsById(id);
        if (!news) {
            return res.status(404).json({
                error: "Noticia no encontrada"
            });
        }
        res.json({
            ...news,
            title: sanitize(news.title),
            summary: sanitize(news.summary),
        });
    } catch (error) {
        logger.error("Error obtienen noticia por ID:", error);
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
        if (!validateId(id)) {
            return res.status(400).json({
                error: "ID de categoría inválido"
            });
        }
        const news = await getNewsByCategory(id);
        const sanitized = news.map(item => ({
            ...item,
            title: sanitize(item.title),
            summary: sanitize(item.summary),
        }));
        res.json(sanitized);
    } catch (error) {
        logger.error("Error obteniendo noticias por categoría:", error);
        res.status(500).json({
            error: "Error interno del servidor"
        });
    }
};