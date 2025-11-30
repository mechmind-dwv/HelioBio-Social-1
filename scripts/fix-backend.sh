#!/bin/bash

echo "🔧 REPARANDO BACKEND HELIOBIO-SOCIAL..."
echo "========================================"

# Parar servicios
echo "🛑 Parando servicios..."
docker-compose down

# Verificar estructura de archivos
echo "📁 Verificando estructura..."
if [ ! -f "backend/main.py" ]; then
    echo "❌ backend/main.py no existe"
    exit 1
fi

# Reinstalar dependencias Python
echo "🐍 Reinstalando dependencias..."
cd backend
pip install -r requirements.txt
cd ..

# Reconstruir contenedores
echo "🐳 Reconstruyendo contenedores..."
docker-compose build --no-cache

echo "🚀 Iniciando servicios..."
docker-compose up -d

echo "⏳ Esperando inicialización..."
sleep 15

# Verificaciones
echo "🔍 Verificando servicios..."
docker-compose ps

echo "🌐 Probando endpoints..."
curl -f http://localhost:1110/health && echo " ✅ Backend saludable"
curl -f http://localhost:1110/ && echo " ✅ API raíz funcionando"

echo ""
echo "🎉 Reparación completada!"
echo "📚 API Docs: http://localhost:1110/docs"
echo "🔴 Redoc: http://localhost:1110/redoc"
