# scripts/verify_cosmic_connection.py
import asyncio
import requests
from backend.engines.solar_engine import SolarDataEngine
from backend.engines.correlation_engine import CorrelationEngine

async def verify_cosmic_connection():
    """Verifica que todos los sistemas estén conectados"""
    print("🔭 VERIFICANDO CONEXIÓN CÓSMICA...")
    
    # Verificar datos solares
    solar_engine = SolarDataEngine()
    solar_data = await solar_engine.fetch_real_time_kp()
    print(f"✅ Datos solares: Kp = {solar_data.get('kp_index', 'N/A')}")
    
    # Verificar API backend
    try:
        response = requests.get("http://localhost:8000/health")
        print(f"✅ Backend API: {response.status_code}")
    except:
        print("❌ Backend API no responde")
    
    # Verificar base de datos
    try:
        response = requests.get("http://localhost:8000/database/health")
        print(f"✅ Base de datos: {response.json().get('status', 'N/A')}")
    except:
        print("❌ Base de datos no conectada")
    
    print("🌌 VERIFICACIÓN CÓSMICA COMPLETADA")

if __name__ == "__main__":
    asyncio.run(verify_cosmic_connection())
