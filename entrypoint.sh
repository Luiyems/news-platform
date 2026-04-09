#!/bin/sh
# entrypoint.sh
# Startup script for El rayo Docker container

set -e

echo "=========================================="
echo "El rayo - Starting application..."
echo "=========================================="

# Wait for PostgreSQL to be ready
echo "Waiting for database to be ready..."
until pg_isready -h "$DB_HOST" -U "$DB_USER" 2>/dev/null; do
    echo "Database is unavailable - sleeping"
    sleep 2
done

echo "Database is ready!"
echo "=========================================="
echo "Starting El rayo application..."
echo "=========================================="

# Execute the main command
exec npm start