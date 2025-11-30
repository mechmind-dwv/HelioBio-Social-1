from pydantic_settings import BaseSettings
from typing import List
import os

class Settings(BaseSettings):
    # Database
    database_url: str = "postgresql://heliobio:heliobio_pass@postgres:5432/heliobio_db"
    
    # Redis
    redis_url: str = "redis://redis:6379"
    
    # External APIs
    noaa_swpc_base_url: str = "https://services.swpc.noaa.gov"
    nasa_donki_base_url: str = "https://api.nasa.gov/DONKI"
    nasa_api_key: str = "DEMO_KEY"
    who_gho_base_url: str = "https://ghoapi.azureedge.net/api"
    
    # Application
    debug: bool = True
    secret_key: str = "your-secret-key-change-in-production"
    cors_origins: List[str] = ["http://localhost:1113", "http://127.0.0.1:1113"]
    
    class Config:
        env_file = ".env"

def get_settings() -> Settings:
    return Settings()
