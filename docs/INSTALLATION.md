# Guía de instalación paso a paso

Este documento describe cómo levantar HelioBio-Social en un entorno de desarrollo y producción básico.

Requisitos previos
- Docker & Docker Compose (recomendado) o Python 3.9+ y Node.js 18+
- PostgreSQL (TimescaleDB recomendado)
- Redis (opcional, para caché)
- Git
- Acceso a las API keys necesarias (ver .env.example)

Instalación rápida (Docker Compose)
1. Clona el repositorio:
   git clone https://github.com/mechmind-dwv/HelioBio-Social.git
   cd HelioBio-Social

2. Copia y ajusta variables de entorno:
   cp .env.example .env
   Edita .env y añade tus credenciales (Postgres, Redis, API keys).

3. Levanta todos los servicios:
   docker-compose up --build

4. Accede:
   - Backend: http://localhost:8000 (FastAPI + OpenAPI UI)
   - Frontend: http://localhost:3000

Instalación manual (sin Docker)
Backend (Python)
1. Crear entorno virtual:
   python -m venv .venv
   source .venv/bin/activate

2. Instalar dependencias:
   pip install -r backend/requirements.txt

3. Configurar variables de entorno:
   cp .env.example .env
   Edita las credenciales en .env

4. Inicializar base de datos (TimescaleDB):
   - Crea la DB y aplica migrations (Alembic):
     psql -U <user> -d <db> -f database/timescale_setup.sql
     alembic upgrade head

5. Ejecutar la app:
   uvicorn backend.main:app --reload --port 8000

Frontend (React + TypeScript)
1. Instalar dependencias:
   cd frontend
   npm install

2. Configurar env:
   Create .env.local si necesitas variables específicas para el frontend (API_URL).

3. Ejecutar:
   npm start

Base de datos y migraciones
- Las migraciones se gestionan con Alembic (backend/database/migrations).
- Asegúrate de que la URI de la DB en backend/config.py o en .env apunta a la instancia correcta.

Pruebas
- Backend:
  pytest -q
- Frontend:
  npm test

Despliegue
- Se incluyen manifiestos para Docker y Kubernetes en deployment/.
- Para producción recomendamos:
  - Ejecutar backend con Uvicorn + Gunicorn o ASGI server en contenedor.
  - Servir frontend con un CDN o Nginx (ver docker/nginx.conf).
  - Habilitar HTTPS y secretos seguros (Vault/Secrets Manager).

Notas finales
- No comitees archivos en secrets/.
- Revisa los límites de uso de las APIs externas antes de lanzar en producción.
