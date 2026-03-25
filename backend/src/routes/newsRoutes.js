
/**
 * newsRoutes.js
 * 
 * Define las rutas HTTP relacionadas con noticias.
 */
import express from "express";
import {
    fetchAllNews,
    fetchNewsById,
    fetchNewsByCategory
} from "../controllers/newsController.js";
const router = express.Router();
/**
 * @swagger
 * /api/news:
 *   get:
 *     summary: Obtener todas las noticias
 *     responses:
 *       200:
 *         description: Lista de noticias
 */
router.get("/", fetchAllNews);
/**
 * @swagger
 * /api/news/{id}:
 *   get:
 *     summary: Obtener una noticia por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la noticia
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Noticia encontrada
 *       404:
 *         description: Noticia no encontrada
 */
router.get("/:id", fetchNewsById);
/**
 * @swagger
 * /api/news/category/{id}:
 *   get:
 *     summary: Obtener noticias por categoría
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de noticias
 */
router.get("/category/:id", fetchNewsByCategory);
export default router;