# Metodología científica

Este documento describe la metodología reproducible usada en HelioBio-Social para estudiar relaciones entre actividad solar y señales sociales/mentales.

1) Planteamiento
- Hipótesis: ciertos cambios en la actividad solar (ej. eventos geomagnéticos) pueden correlacionarse con variaciones en indicadores de salud mental y comportamiento social a escalas temporales específicas.

2) Datos y preprocesado
- Recolección: APIs y datasets (NOAA, NASA, WHO, Google Trends, etc.)
- Normalización temporal: convertir a series diarias, imputación de datos faltantes mediante interpolación o forward-fill cuando sea apropiado.
- Eliminación de estacionalidad: diferenciado o detrending según la prueba.
- Anotación de eventos: marcar CMEs, picos de KP, festividades locales.

3) Análisis exploratorio
- Visualizaciones: series temporales, heatmaps de correlación, scalograms wavelet.
- Estadísticas descriptivas por ventana temporal.

4) Tests de correlación y causalidad
- Correlación: Pearson y Spearman (lineal y monotónica).
- Test de causalidad: Granger causality (comprobando precondiciones de estacionariedad), Transfer Entropy para flujos de información no lineales.
- Análisis multiescala: wavelet coherence para detectar co-movimientos en bandas de periodo.

5) Corrección por comparaciones múltiples
- Uso de FDR (Benjamini–Hochberg) y control sobre pruebas múltiples al reportar p-values.

6) Robustez y validación
- Bootstrap para estimar intervalos y estabilidad.
- Split temporal y validación cruzada para modelos predictivos.
- Pruebas de sensibilidad: variación de ventanas, filtros y preprocesado.

7) Reproducibilidad
- Notebooks con pasos reproducibles en analysis/notebooks/.
- Seeds y versiones de dependencias fijadas en pyproject.toml y /backend/requirements.txt.
- Guardado de pipelines y transformaciones en formato legible (CSV/Parquet) en data/processed/.

8) Reportes científicos
- Reportes PDF generados automáticamente (backend/reports/pdf_generator.py) con metodología, resultados y anexos de datos.
- Todos los análisis incluyen un apartado de Limitaciones y Fuentes de incertidumbre.

Referencias
- Incluye papers y documentación técnica en docs/papers/
