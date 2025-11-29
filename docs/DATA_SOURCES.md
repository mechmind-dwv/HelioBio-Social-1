# Catálogo de fuentes de datos

Listado de fuentes usadas o integradas en HelioBio-Social, con notas sobre acceso y licencias.

Datos solares
- NOAA SWPC (KP, solar wind): https://www.swpc.noaa.gov/  
  Uso: actividad geomagnética, índices KP.
- NASA DONKI (CME, SEPs): https://iswa.gsfc.nasa.gov/donki/  
  Uso: eventos CME y hora de impacto.
- ESA Space Weather: https://swe.ssa.esa.int/  
  Uso: complementario para eventos y modelos.

Datos de salud pública
- WHO Global Health Observatory: https://www.who.int/data/gho  
  Uso: indicadores de salud mental por país.
- CDC WONDER: https://wonder.cdc.gov/  
  Uso: mortalidad y tasas específicas (EE. UU.).
- IHME GBD: http://ghdx.healthdata.org/gbd-results-tool  
  Uso: carga de enfermedad estandarizada.
- Eurostat: https://ec.europa.eu/eurostat/  
  Uso: series regionales en Europa.

Datos sociales / búsquedas
- Google Trends: https://trends.google.com/  
  Uso: volumen de búsqueda por términos relacionados (ansiedad, depresión).
- Reddit (PRAW): https://www.reddit.com/dev/api/  
  Uso: volumen y sentimiento de posts en subreddits seleccionados.
- Twitter Academic API: https://developer.twitter.com/  
  Uso: frecuencia de tweets y análisis de sentimiento (sujeto a políticas de uso).

Metadatos y fuentes auxiliares
- Datasets epidemiológicos abiertos, calendarios festivos y datos meteorológicos (para ajustar confounders).

Licencias y cumplimiento legal
- Revise los términos de servicio de cada proveedor (especialmente Twitter y Google).
- Atribución: mantén la cita de la fuente cuando publiques resultados.
- Privacidad: los datos personales deben agregarse/anonymizarse antes de análisis (no almacenar PII).

Cómo añadir nuevas fuentes
- Implementar connector en backend/connectors/ siguiendo la plantilla existente.
- Añadir tests en backend/tests/test_connectors/ y documentar en este fichero.
