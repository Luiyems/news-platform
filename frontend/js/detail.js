
/**
 * URL base de la API
 */
const API_URL = "http://localhost:3000/api/news";

/**
 * Contenedor donde se renderiza la noticia
 */
const container = document.getElementById("news-detail");

/**
 * Obtener parámetros de la URL
 * Ejemplo: detail.html?id=10
 */
const params = new URLSearchParams(window.location.search);

/**
 * Obtener ID de la noticia
 */
const id = params.get("id");

/**
 * Obtener noticia desde la API
 */
async function fetchDetail() {

    /**
     * Validación: si no hay ID, evitar error
     */
    if (!id) {
        container.innerHTML = "<p>Error: noticia no encontrada</p>";
        return;
    }

    try {

        /**
         * Petición al backend
         */
        const res = await fetch(`${API_URL}/${id}`);
        const news = await res.json();

        /**
         * Validación: si no hay datos
         */
        if (!news) {
            container.innerHTML = "<p>No se encontró la noticia</p>";
            return;
        }

        /**
         * Renderizar contenido
         * NOTA:
         * Los RSS no suelen incluir contenido completo,
         * por lo que se muestra un resumen + enlace externo
         */
        container.innerHTML = `
            <article>
                <h1>${news.title}</h1>

                <p>${news.content || "No hay contenido disponible"}</p>

                <small>Fuente: ${news.source || "Desconocida"}</small>

                <br><br>

                ${
                    news.link
                        ? `<a href="${news.link}" target="_blank" rel="noopener noreferrer">
                                Leer noticia completa en la fuente original
                           </a>`
                        : ""
                }
            </article>
        `;

    } catch (error) {

        console.error("Error cargando detalle:", error);

        container.innerHTML = "<p>Error cargando la noticia</p>";
    }
}

/**
 * ==========================
 * INICIALIZACIÓN
 * ==========================
 * Ejecutar función al cargar la página
 */
fetchDetail();