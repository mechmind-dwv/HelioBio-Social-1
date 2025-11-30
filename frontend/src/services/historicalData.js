// Servicio para generar datos históricos realistas basados en patrones solares
export const generateRealisticHistoricalData = (hours = 24) => {
  const now = new Date();
  const data = [];
  
  // Patrones basados en ciclos solares reales
  const solarCycle = (hour) => {
    // Ciclo de 12 horas aproximado
    return Math.sin(hour * Math.PI / 12) * 0.8 + Math.sin(hour * Math.PI / 6) * 0.4;
  };
  
  const socialCycle = (hour) => {
    // Patrones sociales (mayor actividad durante el día)
    const isDaytime = hour >= 8 && hour <= 20;
    return isDaytime ? 0.6 : 0.3;
  };
  
  for (let i = hours; i >= 0; i--) {
    const time = new Date(now);
    time.setHours(now.getHours() - i);
    const hour = time.getHours();
    
    const solarPattern = solarCycle(hour);
    const socialPattern = socialCycle(hour);
    const randomFactor = Math.random() * 0.3 - 0.15; // Ruido aleatorio
    
    // Kp Index (0-9 escala real)
    const kpIndex = 3 + solarPattern * 2.5 + randomFactor * 1.5;
    
    // Sunspots (basado en actividad solar real)
    const sunspots = 50 + solarPattern * 60 + randomFactor * 25;
    
    // Engagement social (0-100%)
    const engagement = 60 + socialPattern * 25 + randomFactor * 15;
    
    // Crispation (tensión social)
    const crispation = 40 + (1 - socialPattern) * 30 + randomFactor * 20;
    
    // Correlación (basada en patrones observados)
    const correlation = 0.5 + solarPattern * 0.3 + randomFactor * 0.2;
    
    data.push({
      hour: `${hour}:00`,
      kpIndex: Math.max(0, Math.min(9, kpIndex)),
      sunspots: Math.max(0, Math.min(200, sunspots)),
      engagement: Math.max(0, Math.min(100, engagement)),
      crispation: Math.max(0, Math.min(100, crispation)),
      correlation: Math.max(0, Math.min(1, correlation)),
      timestamp: time.toISOString()
    });
  }
  
  return data;
};

// Datos de eventos solares significativos (para tooltips)
export const solarEvents = [
  { time: '08:00', type: 'CME', intensity: 'Moderate', description: 'Coronal Mass Ejection detected' },
  { time: '14:00', type: 'Flare', intensity: 'M2.5', description: 'Solar flare activity increased' },
  { time: '20:00', type: 'Wind', intensity: 'High', description: 'Solar wind velocity peaked' }
];
