# backend/engines/solar_engine.py
import aiohttp
from datetime import datetime, timedelta

class SolarDataEngine:
    def __init__(self):
        self.noaa_base_url = "https://services.swpc.noaa.gov"
        self.nasa_base_url = "https://api.nasa.gov/DONKI"
        
    async def fetch_real_time_kp(self):
        """Obtiene índice Kp en tiempo real desde NOAA"""
        async with aiohttp.ClientSession() as session:
            async with session.get(f"{self.noaa_base_url}/products/geospace/geospace_prediction.json") as response:
                data = await response.json()
                return self._parse_kp_data(data)
    
    async def fetch_sunspot_data(self):
        """Obtiene número de manchas solares"""
        async with aiohttp.ClientSession() as session:
            async with session.get(f"{self.noaa_base_url}/json/sunspots/recent.json") as response:
                return await response.json()
    
    async def fetch_solar_wind(self):
        """Obtiene datos de viento solar desde DSCOVR"""
        async with aiohttp.ClientSession() as session:
            async with session.get(f"{self.noaa_base_url}/products/plots/solar-wind/ace.json") as response:
                return await response.json()
