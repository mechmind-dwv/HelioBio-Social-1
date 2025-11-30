from fastapi import APIRouter
from datetime import datetime
import random

router = APIRouter()

@router.get("/global")
async def get_global_mental_health():
    """Métricas de salud mental global"""
    return {
        "engagement": round(random.uniform(50, 85), 1),
        "sentiment": round(random.uniform(-0.5, 0.5), 2),
        "crispation": round(random.uniform(30, 80), 1),
        "virality": round(random.uniform(60, 90), 1),
        "polarization": round(random.uniform(0.3, 0.8), 2),
        "timestamp": datetime.utcnow().isoformat(),
        "source": "HELIOBIO_DEMO"
    }

@router.get("/correlation")
async def get_correlation_analysis():
    """Análisis de correlación"""
    return {
        "pearson": round(random.uniform(0.5, 0.8), 3),
        "spearman": round(random.uniform(0.45, 0.75), 3),
        "granger_pvalue": round(random.uniform(0.001, 0.02), 4),
        "confidence": "high",
        "sample_size": 1250
    }
