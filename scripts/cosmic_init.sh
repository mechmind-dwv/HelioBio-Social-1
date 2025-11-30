#!/bin/bash
# scripts/cosmic_init.sh

echo "🌌 INICIANDO CONSTRUCCIÓN DE HELIOBIO-SOCIAL 🌌"

# Verificar requisitos
echo "1. Verificando requisitos cósmicos..."
command -v docker >/dev/null 2>&1 || { echo "Docker requerido"; exit 1; }
command -v docker-compose >/dev/null 2>&1 || { echo "Docker Compose requerido"; exit 1; }

# Crear estructura de directorios
echo "2. Creando estructura cósmica..."
mkdir -p data/{solar,mental,correlations}
mkdir -p logs/{backend,frontend,database}

# Configurar entorno
echo "3. Configurando variables cósmicas..."
cp .env.example .env
echo "Por favor, edita .env con tus API keys"

# Construir y levantar servicios
echo "4. Construyendo realidad heliobiosocial..."
docker-compose up --build -d

# Esperar que los servicios estén listos
echo "5. Esperando inicialización cósmica..."
sleep 30

# Ejecutar migraciones de base de datos
echo "6. Aplicando migraciones cósmicas..."
docker-compose exec backend python -m alembic upgrade head

# Cargar datos iniciales de prueba
echo "7. Cargando datos cósmicos iniciales..."
docker-compose exec backend python scripts/load_sample_data.py

echo "🎉 ¡HELIOBIO-SOCIAL ESTÁ VIVO! 🎉"
echo "🌐 Frontend: http://localhost:3000"
echo "🔧 Backend: http://localhost:8000"
echo "📊 Adminer: http://localhost:8080"
