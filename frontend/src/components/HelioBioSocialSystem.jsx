import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area, BarChart, Bar } from 'recharts';
import { solarAPI, mentalHealthAPI } from '../services/api';

// Estilos inline completos
const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #3730a3 100%)',
    color: 'white',
    padding: '1rem',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  },
  header: {
    background: 'rgba(30, 41, 59, 0.8)',
    border: '2px solid #06b6d4',
    borderRadius: '1rem',
    padding: '1.5rem',
    backdropFilter: 'blur(12px)',
    marginBottom: '1.5rem'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '1rem',
    marginBottom: '1.5rem'
  },
  metricCard: {
    background: 'rgba(17, 24, 39, 0.7)',
    border: '2px solid',
    borderRadius: '0.5rem',
    padding: '1rem',
    backdropFilter: 'blur(8px)',
    transition: 'all 0.3s ease',
    cursor: 'pointer'
  },
  chartContainer: {
    background: 'rgba(17, 24, 39, 0.8)',
    border: '2px solid #06b6d4',
    borderRadius: '1rem',
    padding: '1.25rem',
    backdropFilter: 'blur(12px)',
    marginBottom: '1.5rem'
  },
  timelineContainer: {
    background: 'rgba(17, 24, 39, 0.8)',
    border: '2px solid #f59e0b',
    borderRadius: '1rem',
    padding: '1.25rem',
    backdropFilter: 'blur(12px)',
    marginBottom: '1.5rem'
  },
  button: {
    padding: '0.75rem 1.5rem',
    borderRadius: '0.5rem',
    border: 'none',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'background-color 0.2s'
  },
  tabButton: {
    padding: '0.75rem 1.5rem',
    borderRadius: '0.5rem',
    fontWeight: '500',
    cursor: 'pointer',
    border: 'none',
    marginRight: '0.5rem'
  }
};

// Iconos como componentes
const SunIcon = () => <span style={{ fontSize: '1.5rem' }}>☀️</span>;
const ZapIcon = () => <span style={{ fontSize: '1.5rem' }}>⚡</span>;
const TrendingUpIcon = () => <span style={{ fontSize: '1.5rem' }}>📈</span>;
const AlertTriangleIcon = () => <span style={{ fontSize: '1.5rem' }}>⚠️</span>;
const BrainIcon = () => <span style={{ fontSize: '4rem' }}>🧠</span>;
const SettingsIcon = () => <span style={{ fontSize: '1.5rem' }}>⚙️</span>;
const PlayIcon = () => <span style={{ fontSize: '1.25rem' }}>▶️</span>;
const PauseIcon = () => <span style={{ fontSize: '1.25rem' }}>⏸️</span>;
const DownloadIcon = () => <span style={{ fontSize: '1.25rem' }}>📥</span>;
const HistoryIcon = () => <span style={{ fontSize: '1.5rem' }}>📅</span>;
const TimelineIcon = () => <span style={{ fontSize: '1.5rem' }}>📊</span>;

const HelioBioSocialSystem = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isLive, setIsLive] = useState(true);
  const [time, setTime] = useState(new Date());
  const [loading, setLoading] = useState(false);
  
  const [apiConfig, setApiConfig] = useState({
    useRealAPI: true,
    updateInterval: 5000
  });

  const [solarMetrics, setSolarMetrics] = useState({
    sunspotNumber: 45,
    kpIndex: 3.7,
    solarWindSpeed: 425,
    flareClass: 'M2.5',
    source: 'HELIOBIO'
  });
  
  const [socialMetrics, setSocialMetrics] = useState({
    engagement: 67.4,
    sentiment: 0.23,
    crispation: 54.2,
    polarization: 0.61
  });
  
  const [correlationData, setCorrelationData] = useState({
    pearson: 0.731,
    spearman: 0.685
  });

  const [timeSeriesData, setTimeSeriesData] = useState([]);
  const [historicalData, setHistoricalData] = useState([]);

  // Generar datos históricos de ejemplo (últimas 24 horas)
  const generateHistoricalData = () => {
    const now = new Date();
    const data = [];
    
    for (let i = 24; i >= 0; i--) {
      const time = new Date(now);
      time.setHours(now.getHours() - i);
      
      data.push({
        hour: time.getHours() + ':00',
        kpIndex: 2 + Math.sin(i * 0.5) * 3 + Math.random() * 1.5,
        sunspots: 30 + Math.sin(i * 0.3) * 40 + Math.random() * 20,
        engagement: 50 + Math.sin(i * 0.4) * 20 + Math.random() * 10,
        crispation: 40 + Math.sin(i * 0.6) * 25 + Math.random() * 15,
        correlation: 0.4 + Math.sin(i * 0.2) * 0.3 + Math.random() * 0.1
      });
    }
    
    return data;
  };

  const fetchRealData = async () => {
    if (!apiConfig.useRealAPI) return;
    
    setLoading(true);
    try {
      const [solarResponse, mentalResponse, correlationResponse] = await Promise.all([
        solarAPI.getCurrent(),
        mentalHealthAPI.getGlobal(),
        mentalHealthAPI.getCorrelation()
      ]);

      if (solarResponse.data) {
        setSolarMetrics(prev => ({
          ...prev,
          ...solarResponse.data
        }));
      }

      if (mentalResponse.data) {
        setSocialMetrics(prev => ({
          ...prev,
          ...mentalResponse.data
        }));
      }

      if (correlationResponse.data) {
        setCorrelationData(prev => ({
          ...prev,
          ...correlationResponse.data
        }));
      }

      // Update time series
      const timestamp = new Date();
      setTimeSeriesData(prev => {
        const newData = [...prev];
        newData.push({
          time: `${timestamp.getHours()}:${String(timestamp.getMinutes()).padStart(2, '0')}`,
          sunspots: solarResponse.data?.sunspot_number || solarMetrics.sunspotNumber,
          engagement: mentalResponse.data?.engagement || socialMetrics.engagement,
          correlation: (correlationResponse.data?.pearson || correlationData.pearson) * 100
        });
        
        if (newData.length > 15) newData.shift();
        return newData;
      });

    } catch (error) {
      console.error('Error fetching real data:', error);
      updateDemoData();
    } finally {
      setLoading(false);
    }
  };

  const updateDemoData = () => {
    setSolarMetrics(prev => ({
      sunspotNumber: Math.max(0, prev.sunspotNumber + (Math.random() - 0.5) * 8),
      kpIndex: Math.max(0, Math.min(9, prev.kpIndex + (Math.random() - 0.5) * 0.4)),
      solarWindSpeed: Math.max(250, Math.min(800, prev.solarWindSpeed + (Math.random() - 0.5) * 25)),
      flareClass: ['A', 'B', 'C', 'M', 'X'][Math.floor(Math.random() * 5)] + (Math.random() * 9).toFixed(1),
      source: 'DEMO'
    }));
    
    setSocialMetrics(prev => ({
      engagement: Math.max(0, Math.min(100, prev.engagement + (Math.random() - 0.48) * 4)),
      sentiment: Math.max(-1, Math.min(1, prev.sentiment + (Math.random() - 0.5) * 0.08)),
      crispation: Math.max(0, Math.min(100, prev.crispation + (solarMetrics.kpIndex > 5 ? Math.random() * 3.5 : (Math.random() - 0.5) * 2.5))),
      polarization: Math.max(0, Math.min(1, prev.polarization + (Math.random() - 0.5) * 0.05))
    }));
    
    setCorrelationData(prev => ({
      pearson: Math.max(0, Math.min(1, prev.pearson + (Math.random() - 0.5) * 0.04)),
      spearman: Math.max(0, Math.min(1, prev.spearman + (Math.random() - 0.5) * 0.04))
    }));
  };

  useEffect(() => {
    // Initial data load
    fetchRealData();
    setHistoricalData(generateHistoricalData());
    
    if (!isLive) return;
    
    const timer = setInterval(() => {
      setTime(new Date());
      if (apiConfig.useRealAPI) {
        fetchRealData();
      } else {
        updateDemoData();
      }
    }, apiConfig.updateInterval);

    return () => clearInterval(timer);
  }, [isLive, apiConfig]);

  const MetricCard = ({ icon: Icon, title, value, unit, subtitle, color, critical }) => (
    <div 
      style={{ 
        ...styles.metricCard, 
        borderColor: color,
        transform: critical ? 'scale(1.02)' : 'scale(1)',
        animation: critical ? 'pulse 2s infinite' : 'none'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
        <Icon />
        <span style={{ fontSize: '0.75rem', color: '#9ca3af', textTransform: 'uppercase', fontFamily: 'monospace' }}>
          {title}
        </span>
      </div>
      <div style={{ fontSize: '1.875rem', fontWeight: 'bold', color: 'white', fontFamily: 'monospace', marginBottom: '0.25rem' }}>
        {typeof value === 'number' ? value.toFixed(2) : value}
        <span style={{ fontSize: '0.875rem', marginLeft: '0.5rem', color: '#9ca3af' }}>{unit}</span>
      </div>
      <div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>{subtitle}</div>
    </div>
  );

  const HistoricalTimeline = () => (
    <div style={styles.timelineContainer}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
        <TimelineIcon />
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#f59e0b', margin: 0 }}>
          Historical Timeline (24h)
        </h2>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
        {/* Solar Activity Timeline */}
        <div>
          <h3 style={{ fontSize: '1rem', fontWeight: 'bold', color: '#f59e0b', marginBottom: '0.5rem' }}>
            Solar Activity
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={historicalData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="hour" stroke="#9ca3af" style={{ fontSize: '10px' }} />
              <YAxis stroke="#9ca3af" style={{ fontSize: '10px' }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(17, 24, 39, 0.9)', 
                  border: '1px solid #f59e0b',
                  borderRadius: '0.5rem',
                  color: 'white'
                }} 
              />
              <Area type="monotone" dataKey="kpIndex" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.3} name="Kp Index" />
              <Area type="monotone" dataKey="sunspots" stroke="#ea580c" fill="#ea580c" fillOpacity={0.3} name="Sunspots" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        
        {/* Social Metrics Timeline */}
        <div>
          <h3 style={{ fontSize: '1rem', fontWeight: 'bold', color: '#06b6d4', marginBottom: '0.5rem' }}>
            Social Metrics
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={historicalData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="hour" stroke="#9ca3af" style={{ fontSize: '10px' }} />
              <YAxis stroke="#9ca3af" style={{ fontSize: '10px' }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(17, 24, 39, 0.9)', 
                  border: '1px solid #06b6d4',
                  borderRadius: '0.5rem',
                  color: 'white'
                }} 
              />
              <Area type="monotone" dataKey="engagement" stroke="#06b6d4" fill="#06b6d4" fillOpacity={0.3} name="Engagement" />
              <Area type="monotone" dataKey="crispation" stroke="#ef4444" fill="#ef4444" fillOpacity={0.3} name="Crispation" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      {/* Correlation Timeline */}
      <div>
        <h3 style={{ fontSize: '1rem', fontWeight: 'bold', color: '#a78bfa', marginBottom: '0.5rem' }}>
          Correlation Evolution
        </h3>
        <ResponsiveContainer width="100%" height={120}>
          <BarChart data={historicalData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="hour" stroke="#9ca3af" style={{ fontSize: '9px' }} />
            <YAxis stroke="#9ca3af" style={{ fontSize: '9px' }} domain={[0, 1]} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(17, 24, 39, 0.9)', 
                border: '1px solid #a78bfa',
                borderRadius: '0.5rem',
                color: 'white'
              }} 
            />
            <Bar dataKey="correlation" fill="#a78bfa" name="Correlation" radius={[2, 2, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  const DashboardView = () => (
    <>
      <div style={styles.grid}>
        <MetricCard 
          icon={SunIcon} 
          title="Solar Activity" 
          value={solarMetrics.sunspotNumber} 
          unit="SSN"
          subtitle={`Kp: ${solarMetrics.kpIndex.toFixed(1)}`} 
          color="#f59e0b"
          critical={solarMetrics.sunspotNumber > 150} 
        />
        <MetricCard 
          icon={ZapIcon} 
          title="Flare Activity" 
          value={solarMetrics.flareClass} 
          unit="Class"
          subtitle={`Wind: ${Math.round(solarMetrics.solarWindSpeed)} km/s`} 
          color="#ea580c"
          critical={solarMetrics.flareClass.startsWith('M') || solarMetrics.flareClass.startsWith('X')} 
        />
        <MetricCard 
          icon={TrendingUpIcon} 
          title="Engagement" 
          value={socialMetrics.engagement} 
          unit="%"
          subtitle="Social Activity" 
          color="#06b6d4" 
        />
        <MetricCard 
          icon={AlertTriangleIcon} 
          title="Crispation" 
          value={socialMetrics.crispation} 
          unit="CI"
          subtitle={`Polarization: ${(socialMetrics.polarization * 100).toFixed(0)}%`}
          color="#ef4444" 
          critical={socialMetrics.crispation > 70} 
        />
      </div>

      <div style={styles.chartContainer}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
          <span style={{ fontSize: '1.5rem' }}>🎯</span>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#06b6d4', margin: 0 }}>
            Correlation Analysis
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
          <div style={{ background: 'rgba(31, 41, 55, 0.6)', padding: '1rem', borderRadius: '0.5rem', border: '1px solid #06b6d4' }}>
            <div style={{ fontSize: '0.75rem', color: '#9ca3af', marginBottom: '0.5rem' }}>PEARSON r</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#06b6d4', fontFamily: 'monospace' }}>
              {correlationData.pearson.toFixed(3)}
            </div>
          </div>
          <div style={{ background: 'rgba(31, 41, 55, 0.6)', padding: '1rem', borderRadius: '0.5rem', border: '1px solid #3b82f6' }}>
            <div style={{ fontSize: '0.75rem', color: '#9ca3af', marginBottom: '0.5rem' }}>SPEARMAN ρ</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#3b82f6', fontFamily: 'monospace' }}>
              {correlationData.spearman.toFixed(3)}
            </div>
          </div>
        </div>

        <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#06b6d4', marginBottom: '1rem' }}>
          Real-Time Correlation
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={timeSeriesData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="time" stroke="#9ca3af" style={{ fontSize: '12px' }} />
            <YAxis stroke="#9ca3af" style={{ fontSize: '12px' }} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(17, 24, 39, 0.9)', 
                border: '1px solid #06b6d4',
                borderRadius: '0.5rem',
                color: 'white'
              }} 
            />
            <Legend />
            <Line type="monotone" dataKey="sunspots" stroke="#f59e0b" strokeWidth={2} name="Solar Activity" dot={false} />
            <Line type="monotone" dataKey="engagement" stroke="#06b6d4" strokeWidth={2} name="Social Engagement" dot={false} />
            <Line type="monotone" dataKey="correlation" stroke="#a78bfa" strokeWidth={3} name="Correlation %" dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <HistoricalTimeline />
    </>
  );

  const ConfigView = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={styles.chartContainer}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#06b6d4', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <SettingsIcon />
          API Configuration
        </h2>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#d1d5db' }}>
            <input
              type="checkbox"
              checked={apiConfig.useRealAPI}
              onChange={(e) => setApiConfig({...apiConfig, useRealAPI: e.target.checked})}
              style={{ width: '1rem', height: '1rem' }}
            />
            <span>Use Real API Data</span>
          </label>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <label style={{ color: '#d1d5db', fontSize: '0.875rem' }}>Update Interval:</label>
            <input
              type="number"
              value={apiConfig.updateInterval}
              onChange={(e) => setApiConfig({...apiConfig, updateInterval: parseInt(e.target.value)})}
              style={{ 
                width: '5rem', 
                background: 'rgba(31, 41, 55, 0.6)', 
                border: '1px solid #4b5563', 
                borderRadius: '0.25rem', 
                padding: '0.25rem 0.5rem',
                color: 'white'
              }}
              min="1000"
              step="1000"
            />
            <span style={{ color: '#6b7280', fontSize: '0.75rem' }}>ms</span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <button
            onClick={fetchRealData}
            style={{ 
              ...styles.button, 
              backgroundColor: '#2563eb',
              color: 'white'
            }}
          >
            Test APIs
          </button>
        </div>
      </div>

      <div style={styles.chartContainer}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#10b981', marginBottom: '1rem' }}>System Info</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', fontSize: '0.875rem' }}>
          <div>
            <div style={{ color: '#9ca3af' }}>Version</div>
            <div style={{ color: 'white', fontFamily: 'monospace' }}>v3.0.0</div>
          </div>
          <div>
            <div style={{ color: '#9ca3af' }}>Status</div>
            <div style={{ color: '#10b981', fontFamily: 'monospace' }}>{loading ? 'LOADING' : 'OPERATIONAL'}</div>
          </div>
          <div>
            <div style={{ color: '#9ca3af' }}>Data Points</div>
            <div style={{ color: 'white', fontFamily: 'monospace' }}>{timeSeriesData.length}</div>
          </div>
          <div>
            <div style={{ color: '#9ca3af' }}>Data Source</div>
            <div style={{ color: 'white', fontFamily: 'monospace' }}>{solarMetrics.source}</div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div style={styles.container}>
      {/* Fondo de patrón sutil */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: 'linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)',
        backgroundSize: '50px 50px',
        pointerEvents: 'none',
        zIndex: 0
      }} />

      <div style={{ position: 'relative', zIndex: 10, maxWidth: '1800px', margin: '0 auto' }}>
        {/* Header */}
        <div style={styles.header}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <BrainIcon />
              <div>
                <h1 style={{ 
                  fontSize: '3rem', 
                  fontWeight: 'bold', 
                  background: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 50%, #8b5cf6 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent',
                  margin: 0
                }}>
                  HelioBio-Social
                </h1>
                <p style={{ color: '#06b6d4', fontSize: '0.875rem', fontFamily: 'monospace', margin: '0.25rem 0 0 0' }}>
                  Heliobiological Correlation Analysis System v3.0.0
                </p>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '1.5rem', fontFamily: 'monospace', color: '#06b6d4' }}>
                  {time.toLocaleTimeString()}
                </div>
                <div style={{ fontSize: '0.875rem', color: '#9ca3af', fontFamily: 'monospace' }}>
                  {time.toLocaleDateString()}
                </div>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  onClick={() => setIsLive(!isLive)}
                  style={{ 
                    ...styles.button,
                    backgroundColor: isLive ? '#dc2626' : '#16a34a',
                    color: 'white'
                  }}
                  title={isLive ? 'Pause' : 'Resume'}
                >
                  {isLive ? <PauseIcon /> : <PlayIcon />}
                </button>
                <button
                  onClick={() => {
                    const data = { solarMetrics, socialMetrics, correlationData, timeSeriesData, historicalData };
                    console.log('Export:', data);
                    alert('Data exported to console');
                  }}
                  style={{ 
                    ...styles.button,
                    backgroundColor: '#2563eb',
                    color: 'white'
                  }}
                  title="Export Data"
                >
                  <DownloadIcon />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div style={{ marginBottom: '1.5rem', display: 'flex', gap: '0.5rem' }}>
          <button
            onClick={() => setActiveTab('dashboard')}
            style={{
              ...styles.tabButton,
              backgroundColor: activeTab === 'dashboard' ? '#0891b2' : '#374151',
              color: activeTab === 'dashboard' ? 'white' : '#9ca3af'
            }}
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab('config')}
            style={{
              ...styles.tabButton,
              backgroundColor: activeTab === 'config' ? '#0891b2' : '#374151',
              color: activeTab === 'config' ? 'white' : '#9ca3af'
            }}
          >
            Configuration
          </button>
        </div>

        {/* Main Content */}
        {activeTab === 'dashboard' ? <DashboardView /> : <ConfigView />}

        {/* Footer */}
        <div style={{
          ...styles.chartContainer,
          textAlign: 'center',
          marginTop: '1.5rem'
        }}>
          <p style={{ fontSize: '0.875rem', color: '#9ca3af', fontStyle: 'italic', margin: 0 }}>
            "The solar storms inscribe themselves in the source code of collective consciousness"
          </p>
          <p style={{ fontSize: '0.75rem', color: '#6b7280', margin: '0.25rem 0 0 0' }}>
            — Alexander Chizhevsky
          </p>
          <p style={{ fontSize: '0.75rem', color: '#06b6d4', fontFamily: 'monospace', margin: '0.5rem 0 0 0' }}>
            HelioBio-Social v3.0.0 · Open Source
          </p>
        </div>
      </div>

      {/* Estilos CSS globales inline */}
      <style>
        {`
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.7; }
          }
        `}
      </style>
    </div>
  );
};

export default HelioBioSocialSystem;
