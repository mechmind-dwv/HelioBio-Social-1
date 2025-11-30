#!/usr/bin/env bash
# Quickstart: prepara .env, construye y levanta servicios con docker-compose,
# espera a que el backend responda y ejecuta migraciones básicas.
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
COMPOSE_FILE="${ROOT_DIR}/docker-compose.yml"

function echo_err() { echo "ERROR: $*" >&2; }

# Check dependencies
if ! command -v docker >/dev/null 2>&1; then
  echo_err "Docker no está instalado. Instálalo primero: https://docs.docker.com/get-docker/"
  exit 1
fi

if ! command -v docker-compose >/dev/null 2>&1; then
  echo_err "docker-compose no está instalado. Instálalo o usa 'docker compose' integrado."
  exit 1
fi

# Prepare .env
if [ ! -f "${ROOT_DIR}/.env" ]; then
  if [ -f "${ROOT_DIR}/.env.example" ]; then
    cp "${ROOT_DIR}/.env.example" "${ROOT_DIR}/.env"
    echo ".env creado a partir de .env.example"
    echo "Por favor revisa ${ROOT_DIR}/.env y añade tus API keys / credenciales antes de continuar,"
    echo "o ejecuta este script de nuevo para proceder automáticamente."
    read -p "¿Deseas abrir .env ahora para editar? (y/N): " edit_env
    if [[ "${edit_env,,}" == "y" ]]; then
      ${EDITOR:-vi} "${ROOT_DIR}/.env"
    else
      echo "Continuando con valores por defecto contenidos en .env (si existen)."
    fi
  else
    echo_err ".env.example no encontrado. Crea un fichero .env antes de continuar."
    exit 1
  fi
else
  echo ".env encontrado."
fi

# Build & start
echo "Construyendo y levantando servicios (puede tardar varios minutos)..."
docker-compose -f "${COMPOSE_FILE}" up --build -d

# Wait for backend health endpoint
BACKEND_HEALTH_URL="http://localhost:8000/health"
MAX_WAIT=120
SLEEP=5
echo "Esperando a que el backend responda en ${BACKEND_HEALTH_URL} (timeout ${MAX_WAIT}s)..."

elapsed=0
while ! curl -fs "${BACKEND_HEALTH_URL}" >/dev/null 2>&1; do
  if [ "$elapsed" -ge "$MAX_WAIT" ]; then
    echo_err "Timeout esperando al endpoint de salud del backend."
    echo "Revisa los logs con: docker-compose -f ${COMPOSE_FILE} logs backend --tail=200"
    exit 1
  fi
  sleep "${SLEEP}"
  elapsed=$((elapsed + SLEEP))
  printf "."
done
echo
echo "Backend operativo."

# Run database migrations (best-effort)
echo "Ejecutando migraciones (si están disponibles en el contenedor 'backend')..."
if docker-compose -f "${COMPOSE_FILE}" exec -T backend bash -lc "command -v alembic >/dev/null 2>&1"; then
  docker-compose -f "${COMPOSE_FILE}" exec backend bash -lc "alembic upgrade head"
  echo "Migraciones aplicadas con Alembic."
else
  echo "Alem bic no detectado en el contenedor backend; si utilzas Alembic, aplícalas manualmente."
fi

# Seed (optional)
if [ -f "${ROOT_DIR}/backend/database/seeds/historical_data.sql" ]; then
  echo "Cargando datos seeds/historical_data.sql en Postgres (esto es opcional y puede tomar tiempo)..."
  docker exec -i "$(docker-compose -f "${COMPOSE_FILE}" ps -q postgres)" psql -U "${POSTGRES_USER:-heliobio}" -d "${POSTGRES_DB:-heliobio_db}" < "${ROOT_DIR}/backend/database/seeds/historical_data.sql" || true
  echo "Seed intentado (ignora errores si ya están cargados)."
fi

cat <<EOF

Quickstart finalizado.

Accesos:
- Frontend:  http://localhost:3000
- Backend:   http://localhost:8000  (OpenAPI UI: http://localhost:8000/docs)
- Jupyter:   http://localhost:8888
- Nginx:     http://localhost:80

Comandos útiles:
- Ver logs: docker-compose -f ${COMPOSE_FILE} logs -f
- Parar todo: docker-compose -f ${COMPOSE_FILE} down
- Reconstruir un servicio: docker-compose -f ${COMPOSE_FILE} up --build -d <service>

Consejo:
- Asegúrate de actualizar .env con tus API keys y credenciales reales antes de usar en producción.
- Da permisos de ejecución al script si hace falta: chmod +x quickstart.sh

EOF
