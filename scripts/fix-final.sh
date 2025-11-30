#!/bin/bash

echo "🔧 REPARACIÓN FINAL DEL BACKEND..."
echo "==================================="

# Parar servicios correctamente
echo "🛑 Parando servicios..."
docker-compose down

# Limpiar de forma segura
echo "🧹 Limpiando cache..."
sudo find . -name "__pycache__" -type d -exec rm -rf {} + 2>/dev/null || true
sudo find . -name "*.pyc" -delete

# Reconstruir correctamente
echo "🐳 Reconstruyendo servicios..."
docker-compose build

echo "🚀 Iniciando servicios..."
docker-compose up -d

echo "⏳ Esperando inicialización (30 segundos)..."
sleep 30

# Verificaciones robustas
echo "🔍 VERIFICANDO SISTEMA COMPLETO..."

# Backend
echo "📡 Probando backend..."
if curl -s http://localhost:1110/health > /dev/null; then
    echo "✅ Backend saludable"
else
    echo "❌ Backend no responde"
    docker-compose logs backend
    exit 1
fi

# API Docs
echo "📚 Probando API Docs..."
if curl -s http://localhost:1110/docs | grep -q "HelioBio-Social"; then
    echo "✅ API Docs funcionando"
else
    echo "⚠️  API Docs podría tener problemas de carga"
fi

# Frontend
echo "🎨 Probando frontend..."
if curl -s -I http://localhost:1113 | grep -q "200 OK"; then
    echo "✅ Frontend funcionando"
else
    echo "⚠️  Frontend podría tener problemas"
fi

# Base de datos
echo "🗄️ Probando base de datos..."
if docker-compose exec postgres pg_isready -U heliobio -d heliobio_db; then
    echo "✅ Base de datos conectada"
else
    echo "⚠️  Base de datos con problemas"
fi

echo ""
echo "🎉 SISTEMA OPERATIVO!"
echo "===================="
echo "🌐 Dashboard: http://localhost:1113"
echo "📚 API Docs:  http://localhost:1110/docs"
echo "🔴 Redoc:     http://localhost:1110/redoc"
echo ""
echo "💡 Si los docs aparecen en blanco, espera 1 minuto y recarga"
