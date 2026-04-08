/**
 * rssService.js
 * 
 * Servicio encargado de obtener noticias desde fuentes externas (RSS)
 * y guardarlas en la base de datos con clasificación por categorías.
 */
import Parser from "rss-parser";
import { query } from "../config/database.js";
const parser = new Parser();
/**
 * Lista de fuentes RSS
 */
const feeds = [
    {
        url: "https://feeds.bbci.co.uk/news/rss.xml",
        source: "BBC"
    },
    {
        url: "https://feeds.elpais.com/mrss-s/pages/ep/site/elpais.com/portada",
        source: "El País"
    }
];

/**
 * Clasifica una noticia según su contenido
 * Devuelve el ID de la categoría
 */
const classifyCategory = (text) => {

    const content = text.toLowerCase();

    // Política
    if (
        content.includes("government") ||
        content.includes("president") ||
        content.includes("election") ||
        content.includes("gobierno") ||
        content.includes("elecciones")
    ) {
        return 1;
    }

    // Economía
    if (
        content.includes("economy") ||
        content.includes("inflation") ||
        content.includes("market") ||
        content.includes("economía") ||
        content.includes("bolsa")
    ) {
        return 2;
    }

    // Deportes
    if (
        content.includes("football") ||
        content.includes("soccer") ||
        content.includes("liga") ||
        content.includes("champions") ||
        content.includes("deporte")
    ) {
        return 3;
    }

    // Tecnología
    if (
        content.includes("technology") ||
        content.includes("ai") ||
        content.includes("software") ||
        content.includes("apple") ||
        content.includes("google")
    ) {
        return 5;
    }

    // Por defecto → Actualidad
    return 4;
};

/**
 * Guarda una noticia en la base de datos
 */
const saveNews = async (item, source) => {

    try {

        // Unimos título + contenido para analizar
        const text = item.title + " " + (item.contentSnippet || "");
        // Clasificamos categoría automáticamente
        const categoryId = classifyCategory(text);
        const sql = `
            INSERT INTO news (
                title,
                content,
                summary,
                source,
                published_at,
                category_id,
                link
            )
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            ON CONFLICT (link) DO NOTHING
        `;
        const values = [
            item.title,
            item.contentSnippet || "",
            item.contentSnippet || "",
            source,
            item.pubDate || new Date(),
            categoryId,
            item.link || item.guid || item.title // fallback por si falta link
        ];
        await query(sql, values);
        console.log("Guardada:", item.title);
    } catch (error) {
        console.error("Error guardando noticia:", error);
    }
};
/**
 * Función principal para obtener noticias desde RSS
 */
export const fetchRSSNews = async () => {
    try {
        console.log("Actualizando noticias RSS...");
        for (const feed of feeds) {
            const data = await parser.parseURL(feed.url);
            for (const item of data.items) {
                await saveNews(item, feed.source);
            }
        }
        console.log("Noticias RSS actualizadas correctamente");
    } catch (error) {
        console.error("Error obteniendo RSS:", error);
    }
};