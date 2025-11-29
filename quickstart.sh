#!/bin/bash

# Script de inicio rápido para HelioBio-Social

echo "🚀 Iniciando configuración de HelioBio-Social..."

# 1. Verificar si docker y docker-compose están instalados
if ! command -v docker &> /dev/null || ! command -v docker-compose &> /dev/null
then
    echo "❌ Error: Docker o Docker Compose no están instalados."
    echo "Por favor, instala Docker Desktop o Docker Engine y Docker Compose."
    exit 1
fi

# 2. Crear archivo .env si no existe
if [ ! -f .env ]; then
    echo "⚙️ Creando archivo .env a partir de .env.example"
    cp .env.example .env
    echo "¡Advertencia! Edita el archivo .env para añadir tus claves API."
fi

# 3. Construir las imágenes de Docker
echo "🏗️ Construyendo imágenes de Docker (esto puede tardar unos minutos)..."
docker-compose build

# 4. Iniciar los servicios (backend, db, redis)
echo "▶️ Iniciando servicios (backend, base de datos, caché)..."
docker-compose up -d backend db redis

# 5. Esperar a que la base de datos esté lista (opcional, pero recomendado)
echo "⏳ Esperando a que la base de datos se inicialice..."
sleep 15

# 6. Ejecutar migraciones de la base de datos (si aplica)
echo "💾 Ejecutando migraciones de la base de datos..."
docker-compose exec backend python3 -m alembic upgrade head

# 7. Cargar datos iniciales (seeds)
echo "🌱 Cargando datos iniciales (opcional)..."
# docker-compose exec backend python3 backend/main.py load-seeds

echo "✅ Configuración completa."
echo "El sistema está corriendo en segundo plano."
echo "Backend API: http://localhost:8000"
echo "Frontend Dashboard: http://localhost:3000 (necesita ser construido/iniciado por separado)"
echo ""
echo "Para iniciar el frontend, ve a la carpeta 'frontend' y ejecuta 'npm install && npm run dev'."
echo "Para detener los servicios: 'docker-compose down'"
