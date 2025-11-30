from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import random
from datetime import datetime

app = FastAPI(title="HelioBio-Social API", version="3.0.0")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class SolarMetrics(BaseModel):
    sunspot_number: float
    kp_index: float
    solar_wind_speed: float
    flare_class: str
    source: str

class SocialMetrics(BaseModel):
    engagement: float
    sentiment: float
    crispation: float
    polarization: float

class CorrelationData(BaseModel):
    pearson: float
    spearman: float

@app.get("/")
async def root():
    return {"message": "HelioBio-Social API v3.0.0", "status": "operational"}

@app.get("/health")
async def health():
    return {"status": "healthy", "timestamp": datetime.utcnow().isoformat()}

@app.get("/solar/current")
async def get_solar_current():
    """Get current solar metrics"""
    return {
        "sunspot_number": random.uniform(20, 80),
        "kp_index": random.uniform(2, 6),
        "solar_wind_speed": random.uniform(300, 600),
        "flare_class": random.choice(["A1.2", "B3.7", "C2.1", "M1.5"]),
        "source": "HELIOBIO_SIM"
    }

@app.get("/mental-health/global")
async def get_mental_health_global():
    """Get global mental health metrics"""
    return {
        "engagement": random.uniform(50, 80),
        "sentiment": random.uniform(-0.3, 0.4),
        "crispation": random.uniform(30, 70),
        "polarization": random.uniform(0.4, 0.8)
    }

@app.get("/correlation")
async def get_correlation():
    """Get correlation data"""
    return {
        "pearson": random.uniform(0.6, 0.8),
        "spearman": random.uniform(0.55, 0.75)
    }

@app.get("/solar/historical")
async def get_solar_historical(hours: int = 24):
    """Get historical solar data"""
    data = []
    for i in range(hours):
        data.append({
            "timestamp": f"{-i}h",
            "kp_index": random.uniform(1, 7),
            "sunspots": random.uniform(10, 100),
            "flare_class": random.choice(["A", "B", "C", "M"])
        })
    return data

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=1110)
