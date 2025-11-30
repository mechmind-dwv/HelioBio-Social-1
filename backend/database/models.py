# backend/database/models.py
from sqlalchemy import Column, Integer, Float, String, DateTime, Boolean, JSON
from sqlalchemy.ext.declarative import declarative_base
import datetime

Base = declarative_base()

class SolarActivity(Base):
    __tablename__ = "solar_activity"
    
    id = Column(Integer, primary_key=True, index=True)
    time = Column(DateTime, default=datetime.datetime.utcnow, index=True)
    kp_index = Column(Float)
    sunspot_number = Column(Integer) 
    solar_wind_speed = Column(Float)
    proton_density = Column(Float)
    cme_events = Column(JSON)

class MentalHealthMetrics(Base):
    __tablename__ = "mental_health_metrics"
    
    id = Column(Integer, primary_key=True, index=True)
    time = Column(DateTime, default=datetime.datetime.utcnow, index=True)
    region = Column(String(100))
    suicide_rate = Column(Float)
    psychiatric_admissions = Column(Integer)
    depression_index = Column(Float)
    anxiety_searches = Column(Float)
    social_sentiment = Column(Float)

class CosmicCorrelation(Base):
    __tablename__ = "cosmic_correlations"
    
    id = Column(Integer, primary_key=True, index=True)
    calculation_time = Column(DateTime, default=datetime.datetime.utcnow)
    correlation_type = Column(String(50))
    solar_metric = Column(String(50))
    mental_metric = Column(String(50))
    correlation_coefficient = Column(Float)
    p_value = Column(Float)
    lag_days = Column(Integer)
    significance = Column(Boolean)
