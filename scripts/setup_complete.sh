#!/bin/bash

echo "🌌 CONSTRUYENDO HELIOBIO-SOCIAL COMPLETO..."
echo "=============================================="

# 1. Verificar que estamos en el directorio correcto
if [ ! -f "docker-compose.yml" ]; then
    echo "❌ Error: No estás en el directorio raíz de HelioBio-Social"
    exit 1
fi

# 2. Crear archivos esenciales si no existen
echo "📁 Creando estructura de archivos..."

# Backend __init__.py files
find backend -type d -exec touch {}/__init__.py \;

# Frontend estructura básica
mkdir -p frontend/public
cat > frontend/public/index.html << 'HTML'
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HelioBio-Social Dashboard</title>
</head>
<body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
</body>
</html>
HTML

# 3. Configurar entorno
echo "🔧 Configurando entorno..."
if [ ! -f ".env" ]; then
    cp .env.example .env
    echo "✅ Archivo .env creado. Por favor edita con tus configuraciones."
else
    echo "✅ Archivo .env ya existe."
fi

# 4. Construir y levantar servicios
echo "🐳 Construyendo contenedores Docker..."
docker-compose down
docker-compose build --no-cache
docker-compose up -d

# 5. Esperar que los servicios estén listos
echo "⏳ Esperando inicialización de servicios..."
sleep 30

# 6. Verificar servicios
echo "🔍 Verificando servicios..."
docker-compose ps

# 7. Ejecutar migraciones de base de datos (cuando estén listas)
echo "🗄️ Inicializando base de datos..."
# Esto se ejecutará cuando tengamos las migraciones

echo ""
echo "🎉 ¡HELIOBIO-SOCIAL CONSTRUIDO EXITOSAMENTE!"
echo ""
echo "🌐 URLs de acceso:"
echo "   Frontend:    http://localhost:1113"
echo "   Backend API: http://localhost:1110/docs" 
echo "   Jupyter:     http://localhost:1114"
echo "   Adminer:     http://localhost:1116"
echo ""
echo "📊 Next steps:"
echo "   1. Configurar API keys en .env"
echo "   2. Ejecutar migraciones de base de datos"
echo "   3. Cargar datos iniciales"
echo "   4. ¡Comenzar a desarrollar!"
