-- Migración a TimescaleDB para datos temporales
CREATE EXTENSION IF NOT EXISTS timescaledb;

-- Convertir tablas existentes a hypertables
SELECT create_hypertable('solar_activity', 'timestamp');
SELECT create_hypertable('mental_health_metrics', 'timestamp');

-- Índices para consultas rápidas
CREATE INDEX idx_solar_timestamp ON solar_activity (timestamp DESC);
CREATE INDEX idx_mental_timestamp ON mental_health_metrics (timestamp DESC);
CREATE INDEX idx_solar_kp ON solar_activity (kp_index);
CREATE INDEX idx_mental_crispation ON mental_health_metrics (crispation);
