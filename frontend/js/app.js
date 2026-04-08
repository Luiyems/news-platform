
/**
 * URL base de la API
 * Aquí se realizan todas las peticiones HTTP al backend
 */
const API_URL = "http://localhost:3000/api/news";
/**
 * Referencias al DOM
 * Se obtienen los elementos HTML para manipularlos dinámicamente
 */
const container = document.getElementById("news-container");
const select = document.getElementById("categoria-select");
const searchInput = document.getElementById("search-input");
/**
 * Controles de accesibilidad
 */
const increaseFontBtn = document.getElementById("increase-font");
const decreaseFontBtn = document.getElementById("decrease-font");
const contrastBtn = document.getElementById("high-contrast");
/**
 * Variables globales
 */
let allNews = [];   // almacena todas las noticias
let fontSize = 16;  // tamaño base de fuente
/**
 * Mostrar fecha actual en el header
 */
document.getElementById("current-date").textContent = 
    new Date().toLocaleDateString();
/**
 * Obtener noticias desde la API
 * @param {string} category - categoría seleccionada
 */
async function fetchNews(category = "all") {
    let url = API_URL;
    /**
     * Si hay categoría seleccionada,
     * se construye la URL específica
     */
    if (category !== "all") {
        url = `${API_URL}/category/${category}`;
    }
    /**
     * Petición HTTP al backend
     */
    const res = await fetch(url);
    const data = await res.json();
    /**
     * Guardamos datos globalmente para buscador
     */
    allNews = data;
    /**
     * Renderizamos noticias en pantalla
     */
    renderNews(data);
}

/**
 * Renderizar noticias en el DOM
 * @param {Array} newsList - lista de noticias
 */
function renderNews(newsList) {
    /**
     * Limpiar contenido previo
     */
    container.innerHTML = "";
    /**
     * Recorrer noticias y crear elementos HTML
     */
    newsList.forEach(news => {
        const article = document.createElement("article");
        article.innerHTML = `
            <h2>
                <a href="detail.html?id=${news.id}">
                    ${news.title}
                </a>
            </h2>
            <p>${news.summary || ""}</p>
            <small>${news.source}</small>
        `;
        container.appendChild(article);
    });
}

/**
 * BUSCADOR DINÁMICO
 * Filtra noticias sin volver a llamar a la API
 */
searchInput.addEventListener("input", () => {
    const text = searchInput.value.toLowerCase();
    const filtered = allNews.filter(n =>
        n.title.toLowerCase().includes(text)
    );
    renderNews(filtered);
});
/**
 * FILTRO POR CATEGORÍA
 */
select.addEventListener("change", (e) => {
    fetchNews(e.target.value);
});
/**
 * ==========================
 * ACCESIBILIDAD (WCAG)
 * ==========================
 */
// Aumentar tamaño de fuente
increaseFontBtn.addEventListener("click", () => {
    fontSize += 2;
    document.body.style.fontSize = fontSize + "px";
});
// Disminuir tamaño de fuente
decreaseFontBtn.addEventListener("click", () => {
    fontSize -= 2;
    document.body.style.fontSize = fontSize + "px";
});
// Activar/desactivar alto contraste
contrastBtn.addEventListener("click", () => {
    document.body.classList.toggle("high-contrast");
});
/**
 * ==========================
 * GESTIÓN DE COOKIES (RGPD)
 * ==========================
 */
/**
 * Referencias al banner de cookies
 */
const banner = document.getElementById("cookie-banner");
const acceptBtn = document.getElementById("accept-cookies");
const rejectBtn = document.getElementById("reject-cookies");
/**
 * Verificar si el usuario ya ha dado consentimiento
 * Si existe en localStorage, no se muestra el banner
 */
function checkCookies() {
    const consent = localStorage.getItem("cookiesAccepted");
    if (consent !== null) {
        banner.style.display = "none";
    }
}
/**
 * Evento: aceptar cookies
 * Guarda consentimiento en localStorage
 */
acceptBtn.addEventListener("click", () => {
    localStorage.setItem("cookiesAccepted", "true");
    banner.style.display = "none";
});
/**
 * Evento: rechazar cookies
 * También se guarda la decisión del usuario
 */
rejectBtn.addEventListener("click", () => {
    localStorage.setItem("cookiesAccepted", "false");
    banner.style.display = "none";
});
/**
 * Inicialización del sistema de cookies
 */
checkCookies();
/**
 * ==========================
 * INICIALIZACIÓN DE LA APP
 * ==========================
 */
/**
 * Cargar noticias al iniciar la aplicación
 */
fetchNews();