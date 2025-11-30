from datetime import datetime, timedelta
import asyncio
from typing import Dict, List

class HelioBioAlertSystem:
    def __init__(self):
        self.alert_rules = {
            'high_kp_alert': {
                'condition': lambda data: data.get('kp_index', 0) > 5,
                'message': "⚠️ ALTA ACTIVIDAD SOLAR: Kp > 5 detectado",
                'level': 'warning'
            },
            'solar_storm_alert': {
                'condition': lambda data: data.get('kp_index', 0) > 7,
                'message': "🚨 TORMENTA GEOMAGNÉTICA: Kp > 7 - Alto impacto esperado",
                'level': 'critical'
            },
            'high_correlation_alert': {
                'condition': lambda data: data.get('correlation', 0) > 0.6,
                'message': "📊 CORRELACIÓN ELEVADA: r > 0.6 detectada",
                'level': 'info'
            },
            'crispation_spike': {
                'condition': lambda data: data.get('crispation', 0) > 70,
                'message': "🧠 ALTA CRISPACIÓN SOCIAL: >70 detectado",
                'level': 'warning'
            }
        }
    
    async def check_alerts(self, solar_data: Dict, mental_data: Dict, correlation_data: Dict):
        """Verifica condiciones de alerta"""
        alerts = []
        combined_data = {**solar_data, **mental_data, **correlation_data}
        
        for rule_name, rule in self.alert_rules.items():
            if rule['condition'](combined_data):
                alerts.append({
                    'rule': rule_name,
                    'message': rule['message'],
                    'level': rule['level'],
                    'timestamp': datetime.utcnow().isoformat(),
                    'data': combined_data
                })
        
        return alerts
    
    async def generate_health_advisory(self, alerts: List, forecast_data: Dict):
        """Genera asesoramiento para sistemas de salud"""
        critical_alerts = [a for a in alerts if a['level'] in ['warning', 'critical']]
        
        if not critical_alerts:
            return None
        
        advisory = {
            'timestamp': datetime.utcnow().isoformat(),
            'alert_level': 'high' if any(a['level'] == 'critical' for a in alerts) else 'medium',
            'expected_impact': self._calculate_expected_impact(alerts, forecast_data),
            'recommended_actions': self._generate_recommendations(alerts),
            'timeframe': '3-5 días'  # Lag típico de efecto
        }
        
        return advisory
    
    def _calculate_expected_impact(self, alerts, forecast_data):
        """Calcula impacto esperado en salud mental"""
        impact_factors = {
            'high_kp_alert': 0.3,
            'solar_storm_alert': 0.7,
            'high_correlation_alert': 0.4,
            'crispation_spike': 0.5
        }
        
        total_impact = sum(impact_factors.get(alert['rule'], 0) for alert in alerts)
        return min(total_impact, 1.0)
    
    def _generate_recommendations(self, alerts):
        """Genera recomendaciones específicas"""
        recommendations = []
        
        if any('solar' in alert['rule'] for alert in alerts):
            recommendations.extend([
                "Aumentar capacidad de líneas de ayuda psicológica",
                "Alertar servicios de urgencias psiquiátricas",
                "Monitorear indicadores de salud mental"
            ])
        
        if any('crispation' in alert['rule'] for alert in alerts):
            recommendations.extend([
                "Activar protocolos de contención social",
                "Reforzar mensajes de calma en redes sociales",
                "Coordinar con medios de comunicación"
            ])
        
        return recommendations
