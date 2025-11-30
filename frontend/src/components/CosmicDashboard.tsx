// frontend/src/components/CosmicDashboard.tsx
import React, { useEffect, useState } from 'react';
import { RealTimeChart } from './charts/RealTimeChart';
import { CorrelationMatrix } from './charts/CorrelationMatrix';
import { SolarActivityPanel } from './panels/SolarActivityPanel';
import { MentalHealthPanel } from './panels/MentalHealthPanel';
import { PredictionAlerts } from './alerts/PredictionAlerts';

export const CosmicDashboard: React.FC = () => {
  const [solarData, setSolarData] = useState<SolarData[]>([]);
  const [mentalData, setMentalData] = useState<MentalHealthData[]>([]);
  const [correlations, setCorrelations] = useState<Correlation[]>([]);
  
  useEffect(() => {
    // Conectar WebSocket para datos en tiempo real
    const ws = new WebSocket(process.env.REACT_APP_WS_URL);
    
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      
      switch(data.type) {
        case 'solar_update':
          setSolarData(prev => [...prev.slice(-100), data.payload]);
          break;
        case 'mental_update':
          setMentalData(prev => [...prev.slice(-100), data.payload]);
          break;
        case 'correlation_update':
          setCorrelations(data.payload);
          break;
      }
    };
    
    return () => ws.close();
  }, []);
  
  return (
    <div className="cosmic-dashboard">
      <div className="dashboard-header">
        <h1>🌌 HelioBio-Social Dashboard</h1>
        <p>Conectando actividad solar con salud mental global</p>
      </div>
      
      <div className="dashboard-grid">
        <SolarActivityPanel data={solarData} />
        <MentalHealthPanel data={mentalData} />
        <RealTimeChart solarData={solarData} mentalData={mentalData} />
        <CorrelationMatrix correlations={correlations} />
        <PredictionAlerts correlations={correlations} />
      </div>
    </div>
  );
};
