# El rayo - Docker Container
# Dockerfile for building the application container

# Base image: Node.js 18 LTS (Alpine for smaller size)
FROM node:18-alpine

# Metadata labels
LABEL maintainer="elrayo"
LABEL description="El rayo - Newspaper web application with Docker"

# Working directory
WORKDIR /app

# Copy package files first (optimizes Docker cache layer)
COPY package*.json ./

# Install ALL dependencies (including dev for tests)
RUN npm ci

# Copy application code
COPY backend/ ./backend/
COPY frontend/ ./frontend/
COPY database/ ./database/
COPY tests/ ./tests/
COPY server.js ./
COPY Jenkinsfile ./

# Ensure node_modules exists
RUN mkdir -p node_modules || true

# Environment variables
ENV NODE_ENV=production
ENV DB_HOST=localhost
ENV DB_PORT=5432
ENV PORT=3000

# Expose port
EXPOSE 3000

# Default port
ENV PORT=3000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/ || exit 1

# Start command
CMD ["npm", "start"]