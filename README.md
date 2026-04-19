# El RAYO - Diario Minimalista de Noticias

![Docker](https://img.shields.io/badge/Docker-Ready-blue)
![Node.js](https://img.shields.io/badge/Node.js-18-green)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-14-blue)
![WCAG 2.1 AA](https://img.shields.io/badge/WCAG-2.1%20AA-green)

---

## Descripción

**El RAYO** es un periódico digital minimalista con noticias al instante. Una plataforma de noticias moderna desarrollada con Node.js, Express y PostgreSQL, diseñada con accesibilidad WCAG 2.1 y lista para desplegar con Docker.

## Características

- Diseño minimalista al estilo periódico
- Accesibilidad WCAG 2.1 nivel AA
- Buscador de noticias en tiempo real
- Filtro por categorías (Política, Economía, Deportes, Actualidad, Tecnología)
- API RESTful con Express
- Desplegable con Docker
- Tests con Mocha + Chai
- Actualización automática de noticias RSS

---

## Tecnologías

| Componente | Tecnología |
|-----------|------------|
| Backend | Node.js 18 + Express 5 |
| Base de datos | PostgreSQL 14 |
| Frontend | HTML5 + CSS3 + Vanilla JS |
| Testing | Mocha + Chai |
| Seguridad | Helmet + xss + rate-limit |
| Contenedores | Docker + docker-compose |

---

## Requisitos Previos

- **Node.js** 18 o superior
- **PostgreSQL** 14 o superior (solo para instalación local)
- **Docker Desktop** (para contenedor)

---

>[!TIP]
>Haz clic aquí para visualizar el diagrama de arquitectura del sistema con acceso directo a los archivos:
> [Diagrama de arquitectura](https://gitdiagram.com/luiyems/news-platform)

---

## Instalación Local (Sin Docker)

### Paso 1: Clonar el repositorio

```bash
git clone https://github.com/Luiyems/news-platform.git
cd news-platform
```

### Paso 2: Instalar dependencias

```bash
npm install
```

### Paso 3: Configurar base de datos PostgreSQL

```bash
# Crear base de datos
createdb news_platform

# Ejecutar schema (ubicado en database/schema.sql)
psql -U postgres -d news_platform -f database/schema.sql
```

### Paso 4: Configurar variables de entorno

```bash
# Copiar archivo de ejemplo
cp .env.example .env

# Editar .env con tus credenciales
nano .env
```

### Paso 5: Ejecutar aplicación

```bash
# Modo desarrollo (con nodemon)
npm run dev

# O modo producción
npm start
```

### Paso 6: Abrir en navegador

```
http://localhost:3000
```

---

## Docker (Opción Recomendada)

### Requisitos

- [Docker Desktop](https://www.docker.com/products/docker-desktop) instalado y ejecutándose

### Paso 1: Clonar el repositorio

```bash
git clone https://github.com/Luiyems/news-platform.git
cd news-platform
```

### Paso 2: Crear archivo de variables de entorno

```bash
# El archivo .env.example ya está incluido
cp .env.example .env
# Las credenciales por defecto funcionan automáticamente con docker-compose
```

### Paso 3: Construir y ejecutar contenedores

```bash
# Construir imagen y ejecutar contenedores
docker-compose up --build

# (para no bloquear terminal)
docker-compose up -d
```

### Paso 4: Verificar que funciona

```bash
# Ver estado de contenedores
docker-compose ps

# Ver logs en tiempo real
docker-compose logs -f
```

### Paso 5: Abrir en navegador

```
http://localhost:3000
```

---

## Comandos Docker Útiles

| Comando | Descripción |
|---------|------------|
| `docker-compose up --build` | Construir y ejecutar |
| `docker-compose up -d` | Ejecutar en background |
| `docker-compose down` | Detener contenedores |
| `docker-compose restart` | Reiniciar contenedores |
| `docker-compose logs -f` | Ver logs en tiempo real |
| `docker-compose logs -f app` | Ver logs de la app |
| `docker-compose logs -f db` | Ver logs de la base de datos |
| `docker-compose ps` | Ver estado de contenedores |
| `docker-compose exec app sh` | Acceder a terminal del contenedor |
| `docker-compose exec app npm test` | Ejecutar tests |
| `docker-compose exec db psql -U postgres` | Acceder a PostgreSQL |

---

## Testing

### Ejecutar tests en local

```bash
npm test
```

### Ejecutar tests en Docker

```bash
docker-compose exec app npm test
```

### Tests con coverage

```bash
npm test -- --coverage
```

---

## Endpoints de la API

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/news` | Todas las noticias |
| GET | `/api/news/:id` | Noticia por ID |
| GET | `/api/news/category/:id` | Noticias por categoría |
| GET | `/` | Página principal |
| GET | `/health` | Estado de la API |

### Documentación Interactiva (Swagger)

Prueba la API directamente desde el navegador:

```
http://localhost:3000/api-docs
```

Desde Swagger podrás:
- Ver todos los endpoints disponibles
- Probar las peticiones (GET, POST, etc.)
- Ver parámetros y respuestas de cada endpoint
- Ver la documentación automática de la API

**Nota:** Swagger está disponible en modo desarrollo y producción.

### Ejemplos de uso

```bash
# Todas las noticias
curl http://localhost:3000/api/news

# Por ID
curl http://localhost:3000/api/news/1

# Por categoría (1=Política, 2=Economía, 3=Deportes, 4=Actualidad, 5=Tecnología)
curl http://localhost:3000/api/news/category/1
```

---

## Variables de Entorno

| Variable | Descripción | Valor por defecto |
|----------|-------------|--------------|
| `NODE_ENV` | Entorno de ejecución | production |
| `PORT` | Puerto del servidor | 3000 |
| `DB_HOST` | Host de PostgreSQL | localhost |
| `DB_USER` | Usuario de PostgreSQL | postgres |
| `DB_PASSWORD` | Contraseña de PostgreSQL | postgres |
| `DB_NAME` | Nombre de la base de datos | news_platform |
| `DB_PORT` | Puerto de PostgreSQL | 5432 |

---

## Estructura del Proyecto

```
news-platform/
├── backend/
│   └── src/
│       ├── config/          # Configuración (database, logger, swagger)
│       ├── controllers/   # Controladores de la API
│       ├── models/       # Modelos de datos
│       ├── routes/       # Rutas de la API
│       └── services/     # Servicios (RSS)
├── database/
│   └── schema.sql       # Schema de la base de datos
├── frontend/
│   ├── css/           # Estilos CSS
│   ├── js/            # JavaScript del cliente
│   ├── index.html     # Página principal
│   ├── detail.html   # Página de detalle de noticia
│   ├── privacy-policy.html
│   ├── terms-of-use.html
│   └── accessibility.html
├── tests/
│   └── *.test.js       # Tests Mocha + Chai
├── Dockerfile         # Imagen Docker
├── docker-compose.yml # Orquestación Docker
├── entrypoint.sh      # Script de inicio
├── package.json    # Dependencias Node
├── server.js      # Punto de entrada
└── .env.example  # Plantilla de variables de entorno
```

---

## Páginas del Sitio

| Página | URL | Descripción |
|--------|-----|-------------|
| Principal | `/` | Lista de noticias |
| Detalle | `/detail.html?id=X` | Noticia completa |
| Política de privacidad | `/privacy-policy.html` | Privacidad |
| Términos de uso | `/terms-of-use.html` | Términos |
| Accesibilidad | `/accessibility.html` | Declaración de accesibilidad |

---

## Seguridad Implementada

- **Rate Limiting**: 100 peticiones por 15 minutos por IP
- **Helmet**: Content Security Policy configurada
- **XSS Protection**: Sanitización de entradas/salidas
- **Validación de IDs**: Solo números positivos aceptados
- **Parámetros seguros**: Queries con parámetros preparados
- **Logs estructurados**: Winston con timestamps

---

## Contribuir al Proyecto

1. **Fork** el repositorio
2. Crear una rama (`git checkout -b feature/nueva-caracteristica`)
3. Realizar **commit** de tus cambios (`git commit -m 'Agregar feature'`)
4. **Push** a la rama (`git push origin feature/nueva-caracteristica`)
5. Abrir un **Pull Request**

---

## Solución de Problemas

### La aplicación no carga

```bash
# Verificar que Docker esté ejecutándose
docker ps

# Ver logs de errores
docker-compose logs app
```

### Error de conexión a la base de datos

```bash
# Verificar que PostgreSQL esté listo
docker-compose logs db

# Reiniciar contenedores
docker-compose restart
```

### Los tests fallan

```bash
# Verificar variables de entorno
cat .env

# Ejecutar tests con más detalle
docker-compose exec app npm test -- --verbose
```

---

## Licencia

  © 2026 El rayo - Diario minimalista

---

## Información Adicional

- **RSS Feed**: Las noticias se actualizan automáticamente cada 3 horas desde BBC News y El País
- **Categorías**: Política, Economía, Deportes, Actualidad, Tecnología
- **Accesibilidad**: Cumple con WCAG 2.1 nivel AA

---

¡Hecho con amor para el periodismo digital!

**El RAYO - Noticias al instante**
