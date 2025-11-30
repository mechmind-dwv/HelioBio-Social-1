from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from datetime import datetime

# Importar módulos directamente sin el prefijo 'backend.'
from api.v1 import solar, mental_health

app = FastAPI(
    title="HelioBio-Social API",
    description="Sistema de correlación entre actividad solar y salud mental global",
    version="3.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(solar.router, prefix="/api/v1/solar", tags=["solar"])
app.include_router(mental_health.router, prefix="/api/v1/mental", tags=["mental-health"])

@app.get("/")
async def root():
    return {
        "message": "🌌 HelioBio-Social API v3.0.0",
        "status": "operational",
        "timestamp": datetime.utcnow().isoformat(),
        "endpoints": {
            "health": "/health",
            "solar_current": "/api/v1/solar/current",
            "mental_global": "/api/v1/mental/global", 
            "docs": "/docs",
            "redoc": "/redoc"
        }
    }

@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "service": "heliobio-backend",
        "timestamp": datetime.utcnow().isoformat(),
        "version": "3.0.0"
    }

if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True
    )
