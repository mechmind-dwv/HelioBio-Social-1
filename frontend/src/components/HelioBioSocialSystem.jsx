import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { solarAPI, mentalHealthAPI } from '../services/api';

// Iconos simples como componentes SVG (sin lucide-react)
const SunIcon = () => <span>☀️</span>;
const ZapIcon = () => <span>⚡</span>;
const TrendingUpIcon = () => <span>📈</span>;
const AlertTriangleIcon = () => <span>⚠️</span>;
const BrainIcon = () => <span>🧠</span>;
const SettingsIcon = () => <span>⚙️</span>;
const PlayIcon = () => <span>▶️</span>;
const PauseIcon = () => <span>⏸️</span>;
const DownloadIcon = () => <span>📥</span>;

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
    sunspotNumber: 0,
    kpIndex: 0,
    solarWindVelocity: 0,
    flareClass: 'N/A',
    source: 'DEMO'
  });
  
  const [socialMetrics, setSocialMetrics] = useState({
    engagement: 0,
    sentiment: 0,
    crispation: 0,
    polarization: 0
  });
  
  const [correlationData, setCorrelationData] = useState({
    pearson: 0,
    spearman: 0
  });

  const [timeSeriesData, setTimeSeriesData] = useState([]);

  const fetchRealData = async () => {
    if (!apiConfig.useRealAPI) return;
    
    setLoading(true);
    try {
      // Fetch solar data
      const solarResponse = await solarAPI.getCurrent();
      if (solarResponse.data) {
        setSolarMetrics(prev => ({
          ...prev,
          ...solarResponse.data
        }));
      }

      // Fetch mental health data
      const mentalResponse = await mentalHealthAPI.getGlobal();
      if (mentalResponse.data) {
        setSocialMetrics(prev => ({
          ...prev,
          ...mentalResponse.data
        }));
      }

      // Fetch correlation data
      const correlationResponse = await mentalHealthAPI.getCorrelation();
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
          time: timestamp.getHours() + ':' + String(timestamp.getMinutes()).padStart(2, '0'),
          sunspots: solarResponse.data?.sunspot_number || solarMetrics.sunspotNumber,
          engagement: mentalResponse.data?.engagement || socialMetrics.engagement,
          correlation: (correlationResponse.data?.pearson || correlationData.pearson) * 100
        });
        
        if (newData.length > 20) newData.shift();
        return newData;
      });

    } catch (error) {
      console.error('Error fetching real data:', error);
      // Fallback to demo data
      updateDemoData();
    } finally {
      setLoading(false);
    }
  };

  const updateDemoData = () => {
    setSolarMetrics(prev => ({
      sunspotNumber: Math.max(0, prev.sunspotNumber + (Math.random() - 0.5) * 8),
      kpIndex: Math.max(0, Math.min(9, prev.kpIndex + (Math.random() - 0.5) * 0.4)),
      solarWindVelocity: Math.max(250, Math.min(800, prev.solarWindVelocity + (Math.random() - 0.5) * 25)),
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
    <div className={`bg-gray-900 bg-opacity-70 border-2 ${color} rounded-lg p-4 backdrop-blur-md ${critical ? 'animate-pulse' : ''} transition-all duration-300 hover:scale-105`}>
      <div className="flex items-center justify-between mb-2">
        <Icon />
        <span className="text-xs text-gray-400 font-mono uppercase">{title}</span>
      </div>
      <div className="text-3xl font-bold text-white font-mono mb-1">
        {typeof value === 'number' ? value.toFixed(2) : value}
        <span className="text-sm ml-2 text-gray-400">{unit}</span>
      </div>
      <div className="text-xs text-gray-400">{subtitle}</div>
    </div>
  );

  const DashboardView = () => (
    <>
      <div className="grid grid-cols-4 gap-4 mb-6">
        <MetricCard icon={SunIcon} title="Solar Activity" value={solarMetrics.sunspotNumber} unit="SSN"
          subtitle={`Kp: ${solarMetrics.kpIndex.toFixed(1)}`} color="border-yellow-500"
          critical={solarMetrics.sunspotNumber > 150} />
        <MetricCard icon={ZapIcon} title="Flare Activity" value={solarMetrics.flareClass} unit="Class"
          subtitle={`Wind: ${solarMetrics.solarWindVelocity} km/s`} color="border-orange-500"
          critical={solarMetrics.flareClass.startsWith('M') || solarMetrics.flareClass.startsWith('X')} />
        <MetricCard icon={TrendingUpIcon} title="Engagement" value={socialMetrics.engagement} unit="%"
          subtitle="Social Activity" color="border-cyan-500" />
        <MetricCard icon={AlertTriangleIcon} title="Crispation" value={socialMetrics.crispation} unit="CI"
          subtitle={`Polarization: ${(socialMetrics.polarization * 100).toFixed(0)}%`}
          color="border-red-500" critical={socialMetrics.crispation > 70} />
      </div>

      <div className="mb-6 bg-gray-900 bg-opacity-80 border-2 border-cyan-500 rounded-xl p-6 backdrop-blur-md">
        <div className="flex items-center gap-3 mb-4">
          <span>🎯</span>
          <h2 className="text-2xl font-bold text-cyan-400">Correlation Analysis</h2>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-800 bg-opacity-60 p-4 rounded-lg border border-cyan-500">
            <div className="text-xs text-gray-400 mb-2">PEARSON r</div>
            <div className="text-2xl font-bold text-cyan-400">{correlationData.pearson.toFixed(3)}</div>
          </div>
          <div className="bg-gray-800 bg-opacity-60 p-4 rounded-lg border border-blue-500">
            <div className="text-xs text-gray-400 mb-2">SPEARMAN ρ</div>
            <div className="text-2xl font-bold text-blue-400">{correlationData.spearman.toFixed(3)}</div>
          </div>
        </div>
      </div>

      <div className="bg-gray-900 bg-opacity-80 border-2 border-cyan-500 rounded-xl p-5 backdrop-blur-md">
        <h3 className="text-lg font-bold text-cyan-400 mb-4">Real-Time Correlation</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={timeSeriesData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="time" stroke="#9CA3AF" style={{ fontSize: '12px' }} />
            <YAxis stroke="#9CA3AF" style={{ fontSize: '12px' }} />
            <Tooltip contentStyle={{ backgroundColor: 'rgba(17, 24, 39, 0.9)', border: '1px solid #06B6D4' }} />
            <Legend />
            <Line type="monotone" dataKey="sunspots" stroke="#FCD34D" strokeWidth={2} name="Solar" />
            <Line type="monotone" dataKey="engagement" stroke="#06B6D4" strokeWidth={2} name="Social" />
            <Line type="monotone" dataKey="correlation" stroke="#A78BFA" strokeWidth={3} name="Correlation" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </>
  );

  const ConfigView = () => (
    <div className="space-y-6">
      <div className="bg-gray-900 bg-opacity-80 border-2 border-cyan-500 rounded-xl p-6 backdrop-blur-md">
        <h2 className="text-2xl font-bold text-cyan-400 mb-4 flex items-center gap-2">
          <SettingsIcon />
          API Configuration
        </h2>
        
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={apiConfig.useRealAPI}
                onChange={(e) => setApiConfig({...apiConfig, useRealAPI: e.target.checked})}
                className="w-4 h-4"
              />
              <span className="text-sm text-gray-300">Use Real API Data</span>
            </label>

            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-300">Update Interval:</label>
              <input
                type="number"
                value={apiConfig.updateInterval}
                onChange={(e) => setApiConfig({...apiConfig, updateInterval: parseInt(e.target.value)})}
                className="w-20 bg-gray-800 border border-gray-600 rounded px-2 py-1 text-white text-sm"
                min="1000"
                step="1000"
              />
              <span className="text-xs text-gray-500">ms</span>
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              onClick={fetchRealData}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-medium transition-colors"
            >
              Test APIs
            </button>
          </div>
        </div>
      </div>

      <div className="bg-gray-900 bg-opacity-80 border-2 border-green-500 rounded-xl p-6 backdrop-blur-md">
        <h2 className="text-2xl font-bold text-green-400 mb-4">System Info</h2>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <div className="text-gray-400">Version</div>
            <div className="text-white font-mono">v3.0.0</div>
          </div>
          <div>
            <div className="text-gray-400">Status</div>
            <div className="text-green-400 font-mono">{loading ? 'LOADING' : 'OPERATIONAL'}</div>
          </div>
          <div>
            <div className="text-gray-400">Data Points</div>
            <div className="text-white font-mono">{timeSeriesData.length}</div>
          </div>
          <div>
            <div className="text-gray-400">Data Source</div>
            <div className="text-white font-mono">{solarMetrics.source}</div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white p-4 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: 'linear-gradient(rgba(59,130,246,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.2) 1px, transparent 1px)',
        backgroundSize: '40px 40px'
      }} />

      <div className="relative z-10 max-w-[1800px] mx-auto">
        <div className="mb-6 bg-gray-900 bg-opacity-80 border-2 border-cyan-500 rounded-xl p-6 backdrop-blur-md">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <BrainIcon />
              <div>
                <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                  HelioBio-Social
                </h1>
                <p className="text-cyan-400 text-sm font-mono mt-1">
                  Heliobiological Correlation Analysis System v3.0.0
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-2xl font-mono text-cyan-400">{time.toLocaleTimeString()}</div>
                <div className="text-sm text-gray-400 font-mono">{time.toLocaleDateString()}</div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setIsLive(!isLive)}
                  className={`p-2 rounded-lg ${isLive ? 'bg-red-600' : 'bg-green-600'} hover:opacity-80 transition-opacity`}
                  title={isLive ? 'Pause' : 'Resume'}
                >
                  {isLive ? <PauseIcon /> : <PlayIcon />}
                </button>
                <button
                  onClick={() => {
                    const data = { solarMetrics, socialMetrics, correlationData, timeSeriesData };
                    console.log('Export:', data);
                    alert('Data exported to console');
                  }}
                  className="p-2 rounded-lg bg-blue-600 hover:opacity-80 transition-opacity"
                  title="Export Data"
                >
                  <DownloadIcon />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-6 flex gap-2">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              activeTab === 'dashboard'
                ? 'bg-cyan-600 text-white'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab('config')}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              activeTab === 'config'
                ? 'bg-cyan-600 text-white'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            Configuration
          </button>
        </div>

        {activeTab === 'dashboard' ? <DashboardView /> : <ConfigView />}

        <div className="mt-6 bg-gray-900 bg-opacity-80 border-2 border-cyan-500 rounded-xl p-4 backdrop-blur-md text-center">
          <p className="text-sm text-gray-400 italic">
            "The solar storms inscribe themselves in the source code of collective consciousness"
          </p>
          <p className="text-xs text-gray-500 mt-1">— Alexander Chizhevsky</p>
          <p className="text-xs text-cyan-400 mt-2 font-mono">
            HelioBio-Social v3.0.0 · Open Source
          </p>
        </div>
      </div>
    </div>
  );
};

export default HelioBioSocialSystem;
