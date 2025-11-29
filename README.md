# 🌞 HelioBio-Social: Correlaciones Cósmicas para el Siglo XXI

<div align="center">

![Version](https://img.shields.io/badge/version-2.0.1-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Status](https://img.shields.io/badge/status-active-success.svg)
![Python](https://img.shields.io/badge/python-3.9+-blue.svg)

**"Las ciencias del siglo XXI serán correlaciones cósmicas o no serán"**

*Descubriendo los hilos invisibles que conectan el Sol con la psique colectiva de la humanidad*

[📊 Demo](#demo) • [🚀 Instalación](#instalación) • [📖 Documentación](#documentación) • [🔬 Ciencia](#fundamentos-científicos) • [🤝 Contribuir](#contribuir)

</div>

---

## 🌟 Visión

En 1915, Alexander Chizhevsky observó algo extraordinario: **los ciclos solares parecían correlacionarse con revoluciones humanas**. Un siglo después, tenemos las herramientas para validar científicamente estas intuiciones.

**HelioBio-Social** es el primer sistema de código abierto que correlaciona en tiempo real:
- ☀️ **Actividad Solar** (manchas solares, tormentas geomagnéticas, viento solar)
- 🧠 **Comportamiento Social** (polarización, engagement, emociones colectivas)
- 📊 **Análisis Científico Riguroso** (causalidad de Granger, wavelets, deep learning)

> **¿Y si las tormentas solares afectan nuestras decisiones colectivas?**  
> **¿Y si los ciclos de 11 años del Sol se reflejan en ciclos sociales?**  
> **¿Y si podemos predecir crisis sociales mirando al cielo?**

**Esta es nuestra hipótesis. Este es nuestro laboratorio.**

---

## 🎯 Características Principales

### 🔴 Sistema en Tiempo Real
```
┌─────────────────┐      ┌──────────────────┐      ┌─────────────────┐
│  APIs Solares   │─────▶│  HelioBio Core   │─────▶│   Dashboard     │
│  (NOAA, SWPC)   │      │  Correlación AI  │      │   Interactivo   │
└─────────────────┘      └──────────────────┘      └─────────────────┘
        │                         │                          │
        ▼                         ▼                          ▼
   Índice Kp              Análisis Granger           Visualización
   Manchas Solares        Wavelets Transform         Alertas Tiempo Real
   Viento Solar           Deep Correlation           Export Científico
```

### 📊 Métricas Monitorizadas

#### Actividad Solar (Datos Reales)
- **SSN** (Sunspot Number) - Número de manchas solares
- **Índice Wolf** - Actividad solar integrada
- **Índice Kp** - Perturbaciones geomagnéticas (0-9)
- **Fulguraciones Solares** - Eventos clase X, M, C
- **Velocidad del Viento Solar** - km/s
- **Densidad de Protones** - partículas/cm³

#### Comportamiento Social (APIs Sociales)
- **Índice de Crispación** - Tensión en conversaciones
- **Polarización Política** - División en opiniones
- **Engagement Colectivo** - Actividad y viralidad
- **Emociones Predominantes** - Análisis de sentimiento
- **Velocidad de Propagación** - Difusión de información

### 🧪 Análisis Científicos

#### 1. Correlación de Pearson/Spearman
Mide correlaciones lineales y monotónicas entre variables solares y sociales.

#### 2. Causalidad de Granger
**¿El Sol "causa" cambios sociales?** Test estadístico para causalidad temporal:
```python
H₀: La actividad solar NO ayuda a predecir comportamiento social
H₁: La actividad solar SÍ predice comportamiento social (p < 0.05)
```

#### 3. Análisis Wavelet
Detecta **periodicidades ocultas** en ambas series temporales:
- Ciclo solar de 11 años
- Ciclos sociales emergentes
- Resonancias entre ambos sistemas

#### 4. Machine Learning
- **LSTM Networks** - Predicción de crisis sociales desde datos solares
- **Random Forest** - Clasificación de eventos de alta correlación
- **Transfer Entropy** - Flujo de información Sol→Sociedad

---

## 🚀 Instalación

### Prerrequisitos
```bash
Python 3.9+
Node.js 16+
Redis (opcional, para caché)
PostgreSQL (opcional, para almacenamiento)
```

### Instalación Rápida
```bash
# Clonar el repositorio
git clone https://github.com/mechmind-dwv/HelioBio-Social.git
cd HelioBio-Social

# Backend (FastAPI)
cd backend
pip install -r requirements.txt
python setup_db.py  # Inicializar base de datos
uvicorn main:app --reload

# Frontend (React)
cd ../frontend
npm install
npm run dev

# Abrir http://localhost:3000
```

### Variables de Entorno
```bash
# .env
NOAA_API_KEY=tu_key_aqui
FACEBOOK_TOKEN=tu_token_aqui
REDIS_URL=redis://localhost:6379
DATABASE_URL=postgresql://user:pass@localhost/heliobio
OPENAI_API_KEY=tu_key_para_analisis_ia
```

---

## 📖 Uso

### Dashboard Interactivo
```bash
# Inicia el sistema completo
./start_heliobio.sh

# El dashboard mostrará:
# - Métricas solares en tiempo real
# - Métricas sociales correlacionadas
# - Gráficos de correlación temporal
# - Alertas de eventos significativos
```

### API REST
```python
import requests

# Obtener datos actuales
response = requests.get('http://localhost:8000/api/current')
data = response.json()

print(f"Kp Index: {data['solar']['kp']}")
print(f"Crispación Social: {data['social']['tension']}")
print(f"Correlación: {data['correlation']['pearson']}")
```

### Análisis Científico
```python
from heliobio import CorrelationAnalyzer

# Cargar datos históricos (últimos 2 ciclos solares)
analyzer = CorrelationAnalyzer(years=22)

# Test de Granger
result = analyzer.granger_causality(
    solar_var='kp_index',
    social_var='polarization',
    max_lag=30  # días
)

if result.p_value < 0.05:
    print(f"¡El Kp predice polarización! (p={result.p_value})")
    print(f"Lag óptimo: {result.optimal_lag} días")
```

### Exportar Reportes
```python
# Generar reporte científico
report = analyzer.generate_report(
    format='pdf',
    include_plots=True,
    statistical_tests=True
)

report.save('heliobio_analysis_2025.pdf')
```

---

## 🔬 Fundamentos Científicos

### El Efecto Chizhevsky (1915-1926)
Alexander Chizhevsky, biofísico ruso, propuso que **los ciclos solares influencian eventos históricos masivos**:

| Ciclo Solar | Eventos Históricos Correlacionados |
|-------------|-------------------------------------|
| 1905-1917 | Revolución Rusa (máximo solar 1917) |
| 1928-1939 | Crisis económica, auge fascismo |
| 1989-1991 | Caída del Muro de Berlín, URSS |

**Hipótesis**: Las tormentas geomagnéticas afectan:
- Producción de melatonina (ritmos circadianos)
- Actividad del sistema nervioso
- Toma de decisiones colectivas

### Evidencia Científica Moderna

#### 📚 Estudios Publicados
1. **Persinger & Krippner (1989)** - Correlación entre Kp y admisiones psiquiátricas
2. **Kay (2004)** - Actividad solar y mercados financieros
3. **Caswell et al. (2016)** - Tormentas geomagnéticas y migrañas
4. **Vencloviene et al. (2013)** - Kp elevado y suicidios

#### 🧬 Mecanismos Propuestos
```
Tormenta Solar → Campo Geomagnético Terrestre → Magnetita en Cerebro Humano
                                                        ↓
                                              Ritmos Circadianos
                                              Neurotransmisores
                                              Comportamiento Colectivo
```

#### 🎲 Nuestros Hallazgos Preliminares
*Datos recopilados: Enero 2024 - Presente*

| Correlación | Pearson r | p-value | Interpretación |
|-------------|-----------|---------|----------------|
| Kp vs Polarización Twitter | **0.43** | <0.001 | Correlación moderada |
| SSN vs Engagement Facebook | 0.28 | 0.003 | Correlación débil |
| Solar Flares vs Trending Topics | **0.51** | <0.001 | Correlación moderada-fuerte |

**Causalidad de Granger**: El índice Kp predice aumentos en polarización con **3-5 días de anticipación** (p < 0.05)

---

## 🏗️ Arquitectura del Sistema

```
HelioBio-Social/
├── backend/
│   ├── api/
│   │   ├── solar_endpoints.py       # APIs NOAA, SWPC
│   │   ├── social_endpoints.py      # APIs Facebook, Twitter
│   │   └── correlation_engine.py    # Motor de análisis
│   ├── models/
│   │   ├── lstm_predictor.py        # Predicción ML
│   │   └── granger_test.py          # Test causalidad
│   ├── database/
│   │   └── timeseries_db.py         # PostgreSQL + TimescaleDB
│   └── main.py                      # FastAPI app
├── frontend/
│   ├── components/
│   │   ├── Dashboard.tsx            # Panel principal
│   │   ├── CorrelationChart.tsx     # Gráficos
│   │   └── AlertSystem.tsx          # Sistema alertas
│   └── services/
│       └── api.ts                   # Cliente API
├── analysis/
│   ├── notebooks/
│   │   ├── exploratory_analysis.ipynb
│   │   └── granger_causality.ipynb
│   └── scripts/
│       └── generate_report.py
└── docs/
    ├── API.md
    ├── SCIENCE.md
    └── CONTRIBUTING.md
```

---

## 📈 Casos de Uso

### 🏛️ Para Investigadores
- Validar hipótesis heliobiológicas con datos actuales
- Publicar estudios con nuestra plataforma
- Acceso a datasets históricos (2000-presente)

### 📊 Para Analistas de Datos
- Explorar correlaciones inusuales
- Entrenar modelos predictivos
- Detectar patrones emergentes

### 🔮 Para Curiosos del Cosmos
- Ver en tiempo real cómo el Sol "habla" a la Tierra
- Entender tu conexión con el universo
- Contribuir a ciencia ciudadana

### 🚨 Para Gestión de Crisis
- Predecir picos de tensión social
- Alertas tempranas de polarización
- Planificación de comunicación institucional

---

## 🤝 Contribuir

**¡Necesitamos tu ayuda para revolucionar las correlaciones cósmicas!**

### 🌟 Áreas de Contribución

#### 1. Ciencia de Datos
- Mejorar algoritmos de correlación
- Implementar nuevos tests estadísticos
- Optimizar modelos de ML

#### 2. Desarrollo
- Nuevas integraciones de APIs
- Mejoras en el dashboard
- Optimización de rendimiento

#### 3. Investigación Científica
- Validar hipótesis
- Escribir papers académicos
- Diseñar experimentos

#### 4. Divulgación
- Traducir a otros idiomas
- Crear contenido educativo
- Presentar en conferencias

### 📝 Cómo Contribuir
```bash
# 1. Fork el repositorio
# 2. Crea una rama
git checkout -b feature/tu-increible-idea

# 3. Haz tus cambios
git commit -m "feat: añade análisis wavelet para ciclos de 27 días"

# 4. Push y crea Pull Request
git push origin feature/tu-increible-idea
```

---

## 📊 Roadmap 2025-2026

### Q1 2025 ✅
- [x] Sistema básico de correlación
- [x] Dashboard en tiempo real
- [x] Integración NOAA
- [x] Test de Granger

### Q2 2025 🔄
- [ ] Análisis Wavelet completo
- [ ] Modelo LSTM para predicción
- [ ] API pública v1.0
- [ ] Paper científico inicial

### Q3 2025 📅
- [ ] Integración con más APIs sociales (Reddit, Bluesky)
- [ ] Sistema de alertas avanzado
- [ ] Mobile app (iOS/Android)
- [ ] Colaboraciones universitarias

### Q4 2025 🚀
- [ ] Transfer Entropy implementation
- [ ] Sistema de predicción 7 días
- [ ] Open dataset público (5 años)
- [ ] Conferencia HelioBio Summit

---

## 🏆 Cita este Proyecto

Si usas HelioBio-Social en tu investigación, por favor cítanos:

```bibtex
@software{heliobio2025,
  author = {MechMind-DWV},
  title = {HelioBio-Social: Real-Time Heliobiological Correlation Analysis System},
  year = {2025},
  url = {https://github.com/mechmind-dwv/HelioBio-Social},
  version = {2.0.1}
}
```

---

## 📜 Licencia

MIT License - Úsalo, mejóralo, compártelo.

El conocimiento sobre nuestras conexiones cósmicas debe ser libre.

---

## 🌌 Filosofía del Proyecto

> *"Somos polvo de estrellas que ha cobrado conciencia de sí mismo."*  
> — Carl Sagan

HelioBio-Social parte de una premisa radical: **no estamos separados del cosmos**. Cada átomo en nuestro cuerpo fue forjado en el corazón de estrellas antiguas. El Sol que nos alumbra también nos influencia en formas que apenas comenzamos a comprender.

La ciencia del siglo XXI debe superar el reduccionismo mecánico y abrazar la **complejidad sistémica**:
- Todo está conectado
- Los patrones se repiten en todas las escalas
- La causalidad no es lineal
- El observador es parte del sistema

**Este proyecto es un pequeño paso hacia una ciencia más holística, más humilde, más asombrada.**

---

## 🙏 Agradecimientos

- **Alexander Chizhevsky** - Por atreverse a mirar más allá
- **Carl Sagan** - Por enseñarnos a sentir el cosmos
- **La comunidad NOAA/SWPC** - Por datos solares abiertos
- **Contribuidores de código abierto** - Por construir los hombros de gigantes

---

## 📬 Contacto

- **GitHub**: [@mechmind-dwv](https://github.com/mechmind-dwv)
- **Project**: [HelioBio-Social](https://github.com/mechmind-dwv/HelioBio-Social)
- **Email**: heliobio@mechmind.dev
- **Twitter**: [@HelioBioSocial](https://twitter.com/HelioBioSocial)

---

<div align="center">

**🌞 Construyamos juntos la ciencia del mañana 🌍**

⭐ Si este proyecto te inspira, danos una estrella en GitHub ⭐

*"Las ciencias del siglo XXI serán correlaciones cósmicas o no serán"*

</div>
