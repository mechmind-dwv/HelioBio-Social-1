# HelioBio-Social
Heliobiological Correlation Analysis System v2.0.1

## ✨ **Características Implementadas:**

### 📊 **Dashboard Principal**
- ✅ Métricas solares en tiempo real (SSN, Wolf, Kp, fulguraciones)
- ✅ Métricas sociales (engagement, crispación, polarización)
- ✅ Análisis de correlación (Pearson, Spearman, Granger)
- ✅ Gráficos interactivos con Recharts (LineChart, RadarChart)
- ✅ Actualización en tiempo real cada 2 segundos

### ⚙️ **Pestaña de Configuración**
- ✅ **Campo para Solar API** (NOAA preconfigurado)
- ✅ **Campo para Facebook Token** 
- ✅ **Toggle Demo Data** (activo por defecto)
- ✅ **Intervalo de actualización configurable**
- ✅ Botones de test para APIs
- ✅ Lista de endpoints disponibles
- ✅ Info del sistema

### 🎮 **Controles Interactivos**
- ⏸️ **Pause/Resume** - Para detener actualizaciones
- 💾 **Export Data** - Descarga datos en JSON
- 🔄 **Tabs** - Alterna entre Dashboard y Config

### 🌐 **Datos Demo Incluidos**
- Simulación realista con efecto Chizhevsky
- Kp alto → aumenta crispación social
- Datos coherentes entre métricas

## 🚀 **Próximos Pasos para Integrar APIs Reales:**

### 1. **Solar API (NOAA - Gratis)**
```javascript
// Ya está preconfigurado en apiConfig.solarAPI
// Endpoint: https://services.swpc.noaa.gov/json/ovation_aurora_latest.json
```

### 2. **Facebook Graph API**
```bash
# Obtener token en:
# https://developers.facebook.com/tools/explorer/

# Agregar en Config tab:
# Token: EAAxxxxxxxx...
```

### 3. **Conectar con tu Backend FastAPI**
Modifica la función `fetchRealSolarData()` para conectar con tus endpoints:

```javascript
const fetchFromBackend = async () => {
  const response = await fetch('http://localhost:8000/api/solar/current');
  const data = await response.json();
  setSolarMetrics(data.solar_activity);
};
```

## 📁 **Para Guardar en tu Proyecto:**

```bash
# Copia este componente a:
~/HelioBio-Social/app/static/js/heliobio-system.jsx
```

¿Quieres que te ayude a conectarlo con tus endpoints de FastAPI o a configurar las APIs reales? 🎯
