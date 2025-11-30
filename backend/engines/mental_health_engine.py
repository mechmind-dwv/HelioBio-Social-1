# backend/engines/mental_health_engine.py
import pandas as pd
from who import WHODataConnector
from cdc import CDCDataConnector

class MentalHealthEngine:
    def __init__(self):
        self.who_connector = WHODataConnector()
        self.cdc_connector = CDCDataConnector()
        self.google_trends = GoogleTrendsConnector()
        
    async def fetch_global_mental_health(self):
        """Obtiene datos globales de salud mental"""
        who_data = await self.who_connector.get_mental_health_indicators()
        cdc_data = await self.cdc_connector.get_mortality_data()
        
        return self._merge_mental_datasets(who_data, cdc_data)
    
    async def fetch_social_sentiment(self):
        """Obtiene sentimiento social desde redes sociales"""
        reddit_data = await self._fetch_reddit_mental_health()
        twitter_data = await self._fetch_twitter_sentiment()
        
        return self._compute_social_sentiment_index(reddit_data, twitter_data)
