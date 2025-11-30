# backend/engines/correlation_engine.py
import numpy as np
from scipy import stats
from statsmodels.tsa.stattools import grangercausalitytests

class CorrelationEngine:
    def __init__(self):
        self.min_data_points = 30
        self.significance_level = 0.05
        
    def compute_pearson_correlation(self, solar_data, mental_data):
        """Calcula correlación de Pearson con bootstrap"""
        correlation, p_value = stats.pearsonr(solar_data, mental_data)
        
        # Bootstrap para intervalos de confianza
        bootstrap_ci = self._bootstrap_correlation(solar_data, mental_data)
        
        return {
            'correlation': correlation,
            'p_value': p_value,
            'confidence_interval': bootstrap_ci,
            'significant': p_value < self.significance_level
        }
    
    def granger_causality_test(self, cause_series, effect_series, max_lag=14):
        """Test de causalidad de Granger"""
        # Preparar datos para test de Granger
        data = np.column_stack([effect_series, cause_series])
        
        # Ejecutar test
        granger_test = grangercausalitytests(data, maxlag=max_lag, verbose=False)
        
        # Extraer p-values para cada lag
        p_values = [granger_test[i+1][0]['ssr_ftest'][1] for i in range(max_lag)]
        
        return {
            'p_values': p_values,
            'optimal_lag': np.argmin(p_values) + 1,
            'min_p_value': min(p_values),
            'causal_relationship': min(p_values) < self.significance_level
        }
