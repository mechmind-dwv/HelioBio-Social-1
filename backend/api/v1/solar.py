from fastapi import APIRouter, HTTPException
from datetime import datetime
import random

router = APIRouter()

@router.get("/current")
async def get_current_solar():
    """Obtiene datos solares actuales"""
    try:
        return {
            "kp_index": round(random.uniform(1.0, 8.0), 1),
            "sunspot_number": random.randint(20, 180),
            "solar_wind_speed": random.randint(300, 700),
            "flare_class": f"{random.choice(['A', 'B', 'C', 'M', 'X'])}{random.uniform(0.1, 9.9):.1f}",
            "timestamp": datetime.utcnow().isoformat(),
            "source": "HELIOBIO_DEMO"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error: {str(e)}")

@router.get("/forecast")
async def get_solar_forecast():
    """Pronóstico solar"""
    return {
        "forecast": "Actividad solar moderada",
        "kp_prediction": [3.0, 3.3, 4.0, 2.7, 3.1],
        "confidence": 0.78,
        "source": "HELIOBIO_FORECAST"
    }
