import numpy as np
from scipy import stats
from statsmodels.tsa.stattools import grangercausalitytests
import pandas as pd

class ScientificCorrelationEngine:
    def __init__(self):
        self.min_samples = 30
        self.significance_level = 0.05
        
    def pearson_with_bootstrap(self, solar_data, mental_data, n_bootstrap=10000):
        """Correlación de Pearson con intervalos de confianza bootstrap"""
        correlation, p_value = stats.pearsonr(solar_data, mental_data)
        
        # Bootstrap para CI
        bootstrap_corrs = []
        n = len(solar_data)
        
        for _ in range(n_bootstrap):
            indices = np.random.choice(n, n, replace=True)
            bs_solar = solar_data[indices]
            bs_mental = mental_data[indices]
            if len(np.unique(bs_solar)) > 1 and len(np.unique(bs_mental)) > 1:
                bs_corr, _ = stats.pearsonr(bs_solar, bs_mental)
                bootstrap_corrs.append(bs_corr)
        
        ci_lower = np.percentile(bootstrap_corrs, 2.5)
        ci_upper = np.percentile(bootstrap_corrs, 97.5)
        
        return {
            'correlation': correlation,
            'p_value': p_value,
            'confidence_interval': (ci_lower, ci_upper),
            'significant': p_value < self.significance_level,
            'n_samples': n
        }
    
    def granger_causality_test(self, cause_series, effect_series, max_lag=14):
        """Test de causalidad de Granger para series temporales"""
        # Preparar datos
        data = pd.DataFrame({
            'effect': effect_series,
            'cause': cause_series
        }).dropna()
        
        if len(data) < max_lag * 2:
            return {'error': 'Insufficient data for Granger test'}
        
        # Ejecutar test
        try:
            granger_test = grangercausalitytests(
                data[['effect', 'cause']], 
                maxlag=max_lag, 
                verbose=False
            )
            
            # Extraer p-values
            p_values = []
            for lag in range(1, max_lag + 1):
                p_value = granger_test[lag][0]['ssr_ftest'][1]
                p_values.append(p_value)
            
            optimal_lag = np.argmin(p_values) + 1
            min_p_value = min(p_values)
            
            return {
                'p_values': p_values,
                'optimal_lag': optimal_lag,
                'min_p_value': min_p_value,
                'causal_relationship': min_p_value < self.significance_level,
                'interpretation': f"Solar activity Granger-causes mental health indicators at lag {optimal_lag} (p={min_p_value:.4f})"
            }
            
        except Exception as e:
            return {'error': f'Granger test failed: {str(e)}'}
