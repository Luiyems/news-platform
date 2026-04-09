/**
 * rssService.js
 * 
 * Servicio encargado de obtener noticias desde fuentes externas (RSS)
 * y guardarlas en la base de datos con clasificación por categorías.
 */
import Parser from "rss-parser";
import { query } from "../config/database.js";
const parser = new Parser();

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

export const classifyCategory = (text) => {
    const content = text.toLowerCase();

    if (
        content.includes("government") ||
        content.includes("president") ||
        content.includes("election") ||
        content.includes("gobierno") ||
        content.includes("elecciones")
    ) {
        return 1;
    }

    if (
        content.includes("economy") ||
        content.includes("inflation") ||
        content.includes("market") ||
        content.includes("economía") ||
        content.includes("bolsa")
    ) {
        return 2;
    }

    if (
        content.includes("football") ||
        content.includes("soccer") ||
        content.includes("liga") ||
        content.includes("champions") ||
        content.includes("deporte")
    ) {
        return 3;
    }

    if (
        content.includes("technology") ||
        content.includes("ai") ||
        content.includes("software") ||
        content.includes("apple") ||
        content.includes("google")
    ) {
        return 5;
    }

    return 4;
};

const saveNews = async (item, source) => {
    try {
        const text = item.title + " " + (item.contentSnippet || "");
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
            item.link || item.guid || item.title
        ];
        await query(sql, values);
    } catch (error) {
        console.error("Error guardando noticia:", error);
    }
};

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