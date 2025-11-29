# Documentación de la API REST (resumen)

Base URL (desarrollo)
- http://localhost:8000/api/v1

Autenticación
- API Key (X-API-KEY header) o token en Authorization: Bearer <token>
- Ver backend/api/middleware/auth.py para detalles de validación.

Rate limiting
- Se aplica un rate limiter por clave y por IP. Ver backend/api/middleware/rate_limiter.py.

Formato de respuestas
- JSON con estructura consistente:
  {
    "status": "ok" | "error",
    "data": ...,
    "meta": { "request_id": "...", "took_ms": 123 }
  }

Endpoints principales

1) GET /api/v1/solar/current
- Descripción: Devuelve parámetros de actividad solar reciente (KP, SSN, flujos, eventos CME recientes).
- Query params:
  - source (opcional): "noaa" | "nasa" | "esa"
- Ejemplo:
  curl -H "X-API-KEY: <key>" "http://localhost:8000/api/v1/solar/current"

2) GET /api/v1/mental/global
- Descripción: Estadísticas agregadas de indicadores de salud mental (por país/región, series temporales).
- Query params:
  - country (opcional): ISO2/ISO3
  - start_date, end_date (YYYY-MM-DD)
- Ejemplo:
  curl "http://localhost:8000/api/v1/mental/global?country=US&start_date=2020-01-01"

3) GET /api/v1/correlation/analyze
- Descripción: Ejecuta el motor de correlación sobre series solicitadas.
- Query params / Body (POST también soportado):
  - series_a: identificador de serie (ej. "noaa_kp")
  - series_b: identificador de serie (ej. "who_anxiety_searches")
  - methods: ["pearson","spearman","granger","wavelet"]
  - window: tamaño de ventana en días (opcional)
- Respuesta: matriz de resultados con métricas, p-values y metadatos de preprocesado.

4) GET /api/v1/predict/7days
- Descripción: Predicciones a 7 días para una serie objetivo usando modelos entrenados.
- Query params:
  - series: identificador
  - model (opcional): "lstm" | "transformer" | "rf"
- Respuesta: serie predictiva con intervalos de confianza.

5) GET /api/v1/alerts/active
- Descripción: Lista de alertas activas (picos solares, correlaciones significativas).
- Query params:
  - severity (opcional): low|medium|high
- Respuesta: lista con id, tipo, timestamp, involucrados.

WebSocket / Real-time
- Endpoint: /ws/updates
- Usos: transmisiones de métricas en tiempo real, alertas push.

Manejo de errores
- 400 Bad Request: parámetros inválidos
- 401 Unauthorized: clave faltante/incorrecta
- 429 Too Many Requests: rate limit excedido
- 500 Internal Server Error: fallo del servidor

OpenAPI / Postman
- OpenAPI: public-api/openapi.yaml
- Colección Postman: public-api/postman_collection.json

Notas
- Para detalles completos, ejemplos de payload y schemas revisa public-api/openapi.yaml o la UI de Swagger en /docs (FastAPI).
