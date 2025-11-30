import requests
import aiohttp
import asyncio
from datetime import datetime, timedelta
import json

class NOAASolarConnector:
    def __init__(self):
        self.base_url = "https://services.swpc.noaa.gov"
        
    async def get_real_time_kp(self):
        """Obtiene índice Kp en tiempo real desde NOAA"""
        try:
            async with aiohttp.ClientSession() as session:
                async with session.get(f"{self.base_url}/products/geospace/geospace_prediction.json") as response:
                    if response.status == 200:
                        data = await response.json()
                        return self._parse_kp_data(data)
                    else:
                        return self._get_fallback_data()
        except Exception as e:
            print(f"Error fetching Kp data: {e}")
            return self._get_fallback_data()
    
    async def get_sunspot_data(self):
        """Obtiene número de manchas solares"""
        try:
            # NOAA no tiene API directa para sunspots, usamos datos históricos + predicción
            async with aiohttp.ClientSession() as session:
                async with session.get(f"{self.base_url}/json/sunspots/recent.json") as response:
                    if response.status == 200:
                        data = await response.json()
                        return self._parse_sunspot_data(data)
                    else:
                        return {"sunspot_number": 45, "source": "NOAA_FALLBACK"}
        except Exception as e:
            print(f"Error fetching sunspot data: {e}")
            return {"sunspot_number": 45, "source": "NOAA_ERROR"}
    
    async def get_solar_wind(self):
        """Obtiene datos de viento solar desde DSCOVR"""
        try:
            async with aiohttp.ClientSession() as session:
                async with session.get(f"{self.base_url}/products/plots/solar-wind/ace.json") as response:
                    if response.status == 200:
                        data = await response.json()
                        return self._parse_solar_wind_data(data)
                    else:
                        return {"solar_wind_speed": 400, "source": "NOAA_FALLBACK"}
        except Exception as e:
            print(f"Error fetching solar wind data: {e}")
            return {"solar_wind_speed": 400, "source": "NOAA_ERROR"}
    
    def _parse_kp_data(self, data):
        """Parsea datos Kp de NOAA"""
        if data and len(data) > 0:
            latest = data[0]
            return {
                "kp_index": latest.get('kp_index', 3.0),
                "ap_index": latest.get('ap_index', 15),
                "timestamp": datetime.utcnow().isoformat(),
                "source": "NOAA_SWPC"
            }
        return {"kp_index": 3.0, "ap_index": 15, "source": "NOAA_EMPTY"}
    
    def _parse_sunspot_data(self, data):
        """Parsea datos de manchas solares"""
        # NOAA proporciona datos históricos, estimamos el actual
        if data and 'sunspots' in data and len(data['sunspots']) > 0:
            recent = data['sunspots'][-1]
            sunspot_number = recent.get('ssn', 45)
            return {
                "sunspot_number": sunspot_number,
                "wolf_number": int(sunspot_number * 0.6),  # Estimación
                "source": "NOAA_SUNSPOTS"
            }
        return {"sunspot_number": 45, "wolf_number": 27, "source": "NOAA_ESTIMATED"}
    
    def _parse_solar_wind_data(self, data):
        """Parsea datos de viento solar"""
        if data and len(data) > 0:
            latest = data[-1]  # El más reciente
            return {
                "solar_wind_speed": latest.get('speed', 400),
                "proton_density": latest.get('density', 5.0),
                "source": "NOAA_DSCOVR"
            }
        return {"solar_wind_speed": 400, "proton_density": 5.0, "source": "NOAA_DEFAULT"}
    
    def _get_fallback_data(self):
        """Datos de respaldo cuando NOAA no está disponible"""
        return {
            "kp_index": 3.0,
            "ap_index": 15,
            "timestamp": datetime.utcnow().isoformat(),
            "source": "NOAA_FALLBACK"
        }

# Instancia global
noaa_connector = NOAASolarConnector()
