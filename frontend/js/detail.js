/**
 * EL RAYO - Detail.js
 */

const API_URL = '/api/news';

const elements = {
    container: document.getElementById('news-detail'),
    loading: document.getElementById('loading'),
    currentYear: document.getElementById('current-year')
};

function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function formatDate(dateStr) {
    try {
        const date = new Date(dateStr);
        return date.toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    } catch {
        return dateStr;
    }
}

function showError(message) {
    if (elements.loading) elements.loading.style.display = 'none';
    if (elements.container) {
        elements.container.innerHTML = `
            <div class="detail-error">
                <h2>Error al cargar la noticia</h2>
                <p>${escapeHtml(message)}</p>
                <a href="index.html">← Volver a noticias</a>
            </div>
        `;
    }
}

function render(news) {
    if (elements.loading) elements.loading.style.display = 'none';
    if (!elements.container) return;
    
    document.title = `${news.title} - El rayo`;
    
    const title = escapeHtml(news.title || 'Sin título');
    const content = escapeHtml(news.content || news.summary || 'No hay contenido disponible');
    const source = escapeHtml(news.source || 'Desconocida');
    const date = news.published_at ? formatDate(news.published_at) : '';
    const category = escapeHtml(news.category || 'General');
    const link = news.link || '';
    
    elements.container.innerHTML = `
        <header class="detail-header">
            <span class="detail-category">${category}</span>
            <h1 class="detail-title">${title}</h1>
            <div class="detail-meta">
                <span class="detail-source">${source}</span>
                ${date ? `<span class="detail-date">${date}</span>` : ''}
            </div>
        </header>
        
        <div class="detail-body">
            <p>${content}</p>
        </div>
        
        ${link ? `
            <div class="detail-actions">
                <a href="${escapeHtml(link)}" 
                   class="detail-link"
                   target="_blank" 
                   rel="noopener noreferrer">
                    Leer fuente original ↗
                </a>
            </div>
        ` : ''}
    `;
}

function fetchDetail() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    
    if (!id) {
        showError('Noticia no encontrada');
        return;
    }
    
    if (isNaN(id)) {
        showError('ID inválido');
        return;
    }
    
    fetch(`${API_URL}/${id}`)
        .then(res => {
            if (!res.ok) throw new Error('Noticia no encontrada');
            return res.json();
        })
        .then(news => render(news))
        .catch(err => showError(err.message));
}

function init() {
    if (elements.currentYear) {
        elements.currentYear.textContent = new Date().getFullYear();
    }
    fetchDetail();
}

init();