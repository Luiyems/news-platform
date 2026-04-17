-- Tabla de categorías
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL
);

-- Datos iniciales de categorías
INSERT INTO categories (id, name) VALUES
(1, 'General'),
(2, 'Tecnología'),
(3, 'Deportes'),
(4, 'Economía'),
(5, 'Internacional')
ON CONFLICT (id) DO NOTHING;

-- Tabla de noticias
CREATE TABLE news (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    summary TEXT,
    image_url TEXT,
    source VARCHAR(255),
    category_id INT,
    published_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    link TEXT UNIQUE,

    CONSTRAINT fk_category
    FOREIGN KEY(category_id)
    REFERENCES categories(id)
);

-- Índices para mejorar rendimiento de consultas
CREATE INDEX idx_news_category_id ON news(category_id);
CREATE INDEX idx_news_published_at ON news(published_at DESC);
CREATE INDEX idx_news_source ON news(source);