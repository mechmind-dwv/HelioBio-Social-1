# backend/core/__init__.py
"""
NÚCLEO HELIOBIO-SOCIAL - El cerebro que conecta cosmos y consciencia
"""

class CosmicConnector:
    def __init__(self):
        self.solar_engine = SolarDataEngine()
        self.mental_engine = MentalHealthEngine() 
        self.correlation_engine = CorrelationEngine()
        self.prediction_engine = PredictionEngine()
        
    async def connect_universal_streams(self):
        """Conecta flujos de datos solares y de salud mental"""
        return await asyncio.gather(
            self.solar_engine.stream_solar_data(),
            self.mental_engine.stream_mental_data(),
            self.correlation_engine.compute_real_time_correlations()
        )
