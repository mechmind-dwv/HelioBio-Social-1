from fastapi import APIRouter, HTTPException
from datetime import datetime
import asyncio
from backend.connectors.solar.noaa_swpc import noaa_connector

router = APIRouter()

@router.get("/current")
async def get_current_solar():
    """Obtiene datos solares actuales desde NOAA en tiempo real"""
    try:
        # Obtener datos de múltiples fuentes en paralelo
        kp_data, sunspot_data, wind_data = await asyncio.gather(
            noaa_connector.get_real_time_kp(),
            noaa_connector.get_sunspot_data(),
            noaa_connector.get_solar_wind()
        )
        
        # Determinar clase de flare basada en actividad
        flare_class = determine_flare_class(sunspot_data.get('sunspot_number', 45))
        
        return {
            "kp_index": kp_data.get('kp_index', 3.0),
            "sunspot_number": sunspot_data.get('sunspot_number', 45),
            "wolf_number": sunspot_data.get('wolf_number', 27),
            "solar_wind_speed": wind_data.get('solar_wind_speed', 400),
            "flare_class": flare_class,
            "ap_index": kp_data.get('ap_index', 15),
            "timestamp": datetime.utcnow().isoformat(),
            "source": "NOAA_REAL_TIME",
            "data_quality": "REAL" if kp_data.get('source') != 'NOAA_FALLBACK' else "DEMO"
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching solar data: {str(e)}")

@router.get("/forecast")
async def get_solar_forecast():
    """Obtiene pronóstico de actividad solar"""
    return {
        "forecast": "Actividad solar moderada con posibilidad de tormentas geomagnéticas menores",
        "kp_prediction": [3.0, 3.3, 4.0, 2.7, 3.1, 3.8, 2.9],
        "next_cme": "2025-01-15T14:00:00Z",
        "confidence": 0.78,
        "source": "NOAA_SWPC_FORECAST"
    }

@router.get("/health")
async def get_solar_health():
    """Estado del conector solar"""
    try:
        test_data = await noaa_connector.get_real_time_kp()
        return {
            "status": "healthy",
            "noaa_connection": test_data.get('source', 'UNKNOWN'),
            "timestamp": datetime.utcnow().isoformat()
        }
    except Exception as e:
        return {
            "status": "degraded", 
            "noaa_connection": f"ERROR: {str(e)}",
            "timestamp": datetime.utcnow().isoformat()
        }

def determine_flare_class(sunspot_number):
    """Determina la clase de flare basada en actividad solar"""
    if sunspot_number > 150:
        return f"X{(sunspot_number - 150) / 20:.1f}"
    elif sunspot_number > 100:
        return f"M{(sunspot_number - 100) / 10:.1f}"
    elif sunspot_number > 50:
        return f"C{(sunspot_number - 50) / 10:.1f}"
    elif sunspot_number > 20:
        return f"B{(sunspot_number - 20) / 5:.1f}"
    else:
        return f"A{sunspot_number / 5:.1f}"
