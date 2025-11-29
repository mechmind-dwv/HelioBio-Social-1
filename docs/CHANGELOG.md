# CHANGELOG

Todos los cambios importantes de este proyecto se registran en este archivo.

## [2.0.1] - 2025-11-29
### Añadido
- Estructura del proyecto reorganizada para separar backend, frontend y análisis.
- Motor de correlación con soporte para Pearson, Spearman, Granger, Wavelet y Transfer Entropy.
- Conectores iniciales para NOAA, NASA DONKI, WHO y Google Trends.
- Endpoints API básicos: /solar/current, /mental/global, /correlation/analyze, /predict/7days, /alerts/active.
- Notebooks analíticos y scripts batch en analysis/.

### Mejorado
- Integración de TimescaleDB para series temporales.
- Pipeline de CI con tests automáticos y análisis de seguridad (codeql).

### Corregido
- Varios bugs menores en el parseo de series temporales (detalles en los commits).

Notas
- Esta versión es mayormente una reorganización del proyecto y la estabilización de APIs internas. Recomendamos revisar breaking changes en la sección de migración si se actualizan endpoints o modelos almacenados.

---
Mantén este archivo actualizado con cada versión; para releases formales, añade el enlace al tag/PR correspondiente.
