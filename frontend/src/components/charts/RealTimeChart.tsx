// frontend/src/components/charts/RealTimeChart.tsx
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface RealTimeChartProps {
  solarData: SolarData[];
  mentalData: MentalHealthData[];
}

export const RealTimeChart: React.FC<RealTimeChartProps> = ({ solarData, mentalData }) => {
  // Combinar datos para el gráfico
  const chartData = useMemo(() => {
    return solarData.map((solar, index) => ({
      time: solar.time,
      kpIndex: solar.kp_index,
      psychiatricAdmissions: mentalData[index]?.psychiatric_admissions || 0,
      depressionIndex: mentalData[index]?.depression_index || 0
    }));
  }, [solarData, mentalData]);
  
  return (
    <div className="real-time-chart">
      <h3>Correlación en Tiempo Real</h3>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis yAxisId="left" />
          <YAxis yAxisId="right" orientation="right" />
          <Tooltip />
          <Legend />
          <Line 
            yAxisId="left"
            type="monotone" 
            dataKey="kpIndex" 
            stroke="#ff7300" 
            name="Índice Kp" 
          />
          <Line 
            yAxisId="right"
            type="monotone" 
            dataKey="psychiatricAdmissions" 
            stroke="#387908" 
            name="Admisiones Psiquiátricas" 
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
