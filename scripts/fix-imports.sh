#!/bin/bash

echo "🔧 REPARANDO IMPORTS DEL BACKEND..."
echo "===================================="

# Parar servicios
echo "🛑 Parando servicios..."
docker-compose down

# Limpiar pycache (puede causar problemas)
echo "🧹 Limpiando cache..."
find . -name "__pycache__" -type d -exec rm -rf {} + 2>/dev/null || true
find . -name "*.pyc" -delete

# Reconstruir
echo "🐳 Reconstruyendo backend..."
docker-compose build backend --no-cache

echo "🚀 Iniciando servicios..."
docker-compose up -d backend

echo "⏳ Esperando inicialización..."
sleep 10

# Verificar
echo "🔍 Verificando..."
if curl -s http://localhost:1110/health > /dev/null; then
    echo "✅ Backend saludable"
    
    # Probar docs
    if curl -s http://localhost:1110/docs | grep -q "HelioBio-Social"; then
        echo "✅ API Docs funcionando"
    else
        echo "⚠️  API Docs podría tener problemas"
    fi
else
    echo "❌ Backend no responde"
    docker-compose logs backend
fi

echo ""
echo "🎉 Reparación completada!"
echo "📚 API Docs: http://localhost:1110/docs"
echo "🔴 Redoc: http://localhost:1110/redoc"
