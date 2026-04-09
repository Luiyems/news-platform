/**
 * EL RAYO - App.js
 * Periódico minimalista con interactividad
 */

const API_URL = '/api/news';

const elements = {
    container: document.getElementById('news-container'),
    loading: document.getElementById('loading'),
    noResults: document.getElementById('no-results'),
    select: document.getElementById('categoria-select'),
    searchInput: document.getElementById('search-input'),
    increaseFont: document.getElementById('increase-font'),
    decreaseFont: document.getElementById('decrease-font'),
    highContrast: document.getElementById('high-contrast'),
    resetAccessibility: document.getElementById('reset-accessibility'),
    cookieBanner: document.getElementById('cookie-banner'),
    acceptCookies: document.getElementById('accept-cookies'),
    rejectCookies: document.getElementById('reject-cookies'),
    currentDate: document.getElementById('current-date'),
    currentYear: document.getElementById('current-year')
};

let allNews = [];
let currentCategory = 'all';
let fontSize = 18;

function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function showLoading() {
    if (elements.loading) elements.loading.style.display = 'block';
    if (elements.noResults) elements.noResults.style.display = 'none';
    if (elements.container) elements.container.innerHTML = '';
}

function hideLoading() {
    if (elements.loading) elements.loading.style.display = 'none';
}

function showNoResults() {
    if (elements.noResults) {
        elements.noResults.style.display = 'block';
        elements.noResults.hidden = false;
    }
}

function showError(message) {
    hideLoading();
    if (elements.container) {
        elements.container.innerHTML = `<p style="color: red; text-align: center; padding: 20px;">Error: ${escapeHtml(message)}</p>`;
    }
}

async function fetchNews(category = 'all') {
    showLoading();
    
    try {
        let url = API_URL;
        if (category !== 'all') {
            url = `${API_URL}/category/${category}`;
        }
        
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        
        const data = await response.json();
        
        allNews = currentCategory === 'all' ? data : [...data];
        if (currentCategory === 'all') {
            localStorage.setItem('cached-news', JSON.stringify(data));
        }
        
        renderNews(data);
        
    } catch (error) {
        const cached = localStorage.getItem('cached-news');
        if (cached) {
            allNews = JSON.parse(cached);
            renderNews(allNews);
        } else {
            showError(error.message);
        }
    }
}

function renderNews(newsList) {
    hideLoading();
    
    if (!elements.container) return;
    
    elements.container.innerHTML = '';
    
    if (newsList.length === 0) {
        showNoResults();
        return;
    }
    
    newsList.forEach((news, index) => {
        const card = document.createElement('article');
        card.className = 'news-card';
        card.setAttribute('role', 'article');
        card.setAttribute('tabindex', '0');
        card.setAttribute('aria-label', `Noticia: ${news.title}`);
        
        card.innerHTML = `
            <h2>
                <a href="detail.html?id=${news.id}">${escapeHtml(news.title)}</a>
            </h2>
            <p class="summary">${escapeHtml(news.summary || '')}</p>
            <div class="meta">
                <span class="source">${escapeHtml(news.source || '')}</span>
                <span class="category">${escapeHtml(news.category || 'General')}</span>
            </div>
            <a href="detail.html?id=${news.id}" class="read-more">Leer más →</a>
        `;
        
        card.addEventListener('click', (e) => {
            if (e.target.tagName !== 'A') {
                window.location.href = `detail.html?id=${news.id}`;
            }
        });
        
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                window.location.href = `detail.html?id=${news.id}`;
            }
        });
        
        elements.container.appendChild(card);
    });
}

function filterNews(text) {
    if (!text) {
        if (currentCategory === 'all') {
            renderNews(allNews);
        } else {
            fetchNews(currentCategory);
        }
        return;
    }
    
    const filtered = allNews.filter(news => {
        const title = (news.title || '').toLowerCase();
        const summary = (news.summary || '').toLowerCase();
        return title.includes(text.toLowerCase()) || summary.includes(text.toLowerCase());
    });
    
    renderNews(filtered);
}

function setActiveCategory(category) {
    currentCategory = category;
    
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.category === category);
    });
    
    if (elements.select) {
        elements.select.value = category;
    }
    
    fetchNews(category);
}

function increaseFontSize() {
    fontSize = Math.min(fontSize + 2, 28);
    document.documentElement.style.fontSize = fontSize + 'px';
}

function decreaseFontSize() {
    fontSize = Math.max(fontSize - 2, 14);
    document.documentElement.style.fontSize = fontSize + 'px';
}

function toggleContrast() {
    document.body.classList.toggle('high-contrast-active');
}

function resetAccessibility() {
    fontSize = 18;
    document.documentElement.style.fontSize = '18px';
    document.body.classList.remove('high-contrast-active');
}

function checkCookies() {
    const consent = localStorage.getItem('elrayo-cookies');
    if (consent !== null && elements.cookieBanner) {
        elements.cookieBanner.style.display = 'none';
    }
}

function acceptCookies() {
    localStorage.setItem('elrayo-cookies', 'accepted');
    if (elements.cookieBanner) elements.cookieBanner.style.display = 'none';
}

function rejectCookies() {
    localStorage.setItem('elrayo-cookies', 'rejected');
    if (elements.cookieBanner) elements.cookieBanner.style.display = 'none';
}

function init() {
    if (elements.currentDate) {
        const now = new Date();
        elements.currentDate.textContent = now.toLocaleDateString('es-ES', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }
    
    if (elements.currentYear) {
        elements.currentYear.textContent = new Date().getFullYear();
    }
    
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            setActiveCategory(btn.dataset.category);
        });
    });
    
    if (elements.searchInput) {
        elements.searchInput.addEventListener('input', (e) => filterNews(e.target.value));
    }
    
    if (elements.select) {
        elements.select.addEventListener('change', (e) => {
            setActiveCategory(e.target.value);
        });
    }
    
    if (elements.increaseFont) {
        elements.increaseFont.addEventListener('click', increaseFontSize);
    }
    
    if (elements.decreaseFont) {
        elements.decreaseFont.addEventListener('click', decreaseFontSize);
    }
    
    if (elements.highContrast) {
        elements.highContrast.addEventListener('click', toggleContrast);
    }
    
    if (elements.resetAccessibility) {
        elements.resetAccessibility.addEventListener('click', resetAccessibility);
    }
    
    if (elements.acceptCookies) {
        elements.acceptCookies.addEventListener('click', acceptCookies);
    }
    
    if (elements.rejectCookies) {
        elements.rejectCookies.addEventListener('click', rejectCookies);
    }
    
    checkCookies();
    fetchNews();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}