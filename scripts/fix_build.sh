#!/bin/bash

echo "🔧 REPARANDO CONSTRUCCIÓN DE HELIOBIO-SOCIAL..."
echo "=============================================="

# Parar servicios existentes
echo "🛑 Parando servicios..."
docker-compose down

# Verificar que los Dockerfiles existen
echo "📁 Verificando archivos..."
if [ ! -f "backend/Dockerfile" ]; then
    echo "❌ backend/Dockerfile no existe"
    exit 1
fi

if [ ! -f "frontend/Dockerfile" ]; then
    echo "❌ frontend/Dockerfile no existe" 
    exit 1
fi

# Reconstruir
echo "🐳 Reconstruyendo contenedores..."
docker-compose build --no-cache

echo "🚀 Iniciando servicios..."
docker-compose up -d

echo "⏳ Esperando que los servicios estén listos..."
sleep 15

# Verificar servicios
echo "🔍 Verificando estado..."
docker-compose ps

echo ""
echo "✅ Reparación completada!"
echo "🌐 URLs:"
echo "   Backend:  http://localhost:1110"
echo "   Frontend: http://localhost:1113"
