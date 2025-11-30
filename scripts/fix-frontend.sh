#!/bin/bash

echo "🔧 REPARANDO FRONTEND..."
echo "========================"

# Parar servicios
docker-compose down

# Reinstalar dependencias en el host para cache
cd frontend
npm install
cd ..

# Reconstruir
docker-compose build --no-cache
docker-compose up -d

echo "⏳ Esperando que los servicios inicien..."
sleep 20

# Verificar
echo "🔍 Verificando..."
curl -f http://localhost:1110/health && echo "✅ Backend OK"
curl -f http://localhost:1113 && echo "✅ Frontend OK"

echo ""
echo "🎉 Frontend reparado!"
echo "🌐 Accede en: http://localhost:1113"
