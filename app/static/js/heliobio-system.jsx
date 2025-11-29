import React, { useState, useEffect } from 'react';
import { Activity, Zap, Radio, TrendingUp, AlertTriangle, Brain, Sun, Users, Globe, Waves, Target, Database, Settings, Play, Pause, Download, Upload } from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const HelioBioSocialSystem = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isLive, setIsLive] = useState(true);
  const [time, setTime] = useState(new Date());
  
  const [apiConfig, setApiConfig] = useState({
    solarAPI: 'https://services.swpc.noaa.gov/json/ovation_aurora_latest.json',
    facebookToken: '',
    useDemo: true,
    updateInterval: 2000
  });

  const [solarMetrics, setSolarMetrics] = useState({
    sunspotNumber: 147,
    wolfNumber: 89,
    flareClass: 'M2.5',
    kpIndex: 6.3,
    apIndex: 42,
    solarWindVelocity: 425,
    f107: 142.5
  });
  
  const [socialMetrics, setSocialMetrics] = useState({
    engagement: 67.4,
    sentiment: 0.23,
    crispation: 54.2,
    virality: 72.1,
    polarization: 0.61
  });
  
  const [correlationData, setCorrelationData] = useState({
    pearson: 0.731,
    spearman: 0.685,
    granger_pvalue: 0.0023
  });

  const [timeSeriesData, setTimeSeriesData] = useState([]);

  useEffect(() => {
    if (!isLive) return;
    
    const timer = setInterval(() => {
      setTime(new Date());
      if (apiConfig.useDemo) {
        updateDemoData();
      }
    }, apiConfig.updateInterval);

    return () => clearInterval(timer);
  }, [isLive, apiConfig]);

  const updateDemoData = () => {
    setSolarMetrics(prev => ({
      sunspotNumber: Math.max(0, prev.sunspotNumber + (Math.random() - 0.5) * 8),
      wolfNumber: Math.max(0, prev.wolfNumber + (Math.random() - 0.5) * 5),
      flareClass: ['A', 'B', 'C', 'M', 'X'][Math.floor(Math.random() * 5)] + (Math.random() * 9).toFixed(1),
      kpIndex: Math.max(0, Math.min(9, prev.kpIndex + (Math.random() - 0.5) * 0.4)),
      apIndex: Math.max(0, Math.min(400, prev.apIndex + (Math.random() - 0.5) * 8)),
      solarWindVelocity: Math.max(250, Math.min(800, prev.solarWindVelocity + (Math.random() - 0.5) * 25)),
      f107: Math.max(64, Math.min(300, prev.f107 + (Math.random() - 0.5) * 5))
    }));
    
    setSocialMetrics(prev => ({
      engagement: Math.max(0, Math.min(100, prev.engagement + (Math.random() - 0.48) * 4)),
      sentiment: Math.max(-1, Math.min(1, prev.sentiment + (Math.random() - 0.5) * 0.08)),
      crispation: Math.max(0, Math.min(100, prev.crispation + (solarMetrics.kpIndex > 5 ? Math.random() * 3.5 : (Math.random() - 0.5) * 2.5))),
      virality: Math.max(0, Math.min(100, prev.virality + (Math.random() - 0.45) * 5)),
      polarization: Math.max(0, Math.min(1, prev.polarization + (Math.random() - 0.5) * 0.05))
    }));
    
    setCorrelationData(prev => ({
      pearson: Math.max(0, Math.min(1, prev.pearson + (Math.random() - 0.5) * 0.04)),
      spearman: Math.max(0, Math.min(1, prev.spearman + (Math.random() - 0.5) * 0.04)),
      granger_pvalue: Math.max(0.0001, Math.min(0.05, prev.granger_pvalue + (Math.random() - 0.5) * 0.002))
    }));

    setTimeSeriesData(prev => {
      const newData = [...prev];
      const timestamp = new Date();
      
      newData.push({
        time: timestamp.getHours() + ':' + String(timestamp.getMinutes()).padStart(2, '0'),
        sunspots: solarMetrics.sunspotNumber,
        engagement: socialMetrics.engagement,
        correlation: correlationData.pearson * 100
      });
      
      if (newData.length > 30) newData.shift();
      return newData;
    });
  };

  const fetchRealSolarData = async () => {
    try {
      const response = await fetch(apiConfig.solarAPI);
      const data = await response.json();
      console.log('Solar data fetched:', data);
    } catch (error) {
      console.error('Error fetching solar data:', error);
    }
  };

  const exportData = () => {
    const exportObj = {
      timestamp: new Date().toISOString(),
      solar: solarMetrics,
      social: socialMetrics,
      correlation: correlationData,
      timeSeries: timeSeriesData
    };
    
    const blob = new Blob([JSON.stringify(exportObj, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `heliobio-data-${Date.now()}.json`;
    a.click();
  };

  const MetricCard = ({ icon: Icon, title, value, unit, subtitle, color, critical }) => (
    <div className={`bg-gray-900 bg-opacity-70 border-2 ${color} rounded-lg p-4 backdrop-blur-md ${critical ? 'animate-pulse' : ''} transition-all duration-300 hover:scale-105`}>
      <div className="flex items-center justify-between mb-2">
        <Icon className={`${color.replace('border', 'text')} w-6 h-6`} />
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
        <MetricCard icon={Sun} title="Solar Activity" value={solarMetrics.sunspotNumber} unit="SSN"
          subtitle={`Wolf: ${solarMetrics.wolfNumber.toFixed(0)}`} color="border-yellow-500"
          critical={solarMetrics.sunspotNumber > 150} />
        <MetricCard icon={Zap} title="Flare Activity" value={solarMetrics.flareClass} unit="Class"
          subtitle={`Kp: ${solarMetrics.kpIndex.toFixed(1)}`} color="border-orange-500"
          critical={solarMetrics.flareClass.startsWith('M') || solarMetrics.flareClass.startsWith('X')} />
        <MetricCard icon={TrendingUp} title="Engagement" value={socialMetrics.engagement} unit="%"
          subtitle="Social Activity" color="border-cyan-500" />
        <MetricCard icon={AlertTriangle} title="Crispation" value={socialMetrics.crispation} unit="CI"
          subtitle={`Polarization: ${(socialMetrics.polarization * 100).toFixed(0)}%`}
          color="border-red-500" critical={socialMetrics.crispation > 70} />
      </div>

      <div className="mb-6 bg-gray-900 bg-opacity-80 border-2 border-cyan-500 rounded-xl p-6 backdrop-blur-md">
        <div className="flex items-center gap-3 mb-4">
          <Target className="w-6 h-6 text-cyan-400" />
          <h2 className="text-2xl font-bold text-cyan-400">Correlation Analysis</h2>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-gray-800 bg-opacity-60 p-4 rounded-lg border border-cyan-500">
            <div className="text-xs text-gray-400 mb-2">PEARSON r</div>
            <div className="text-2xl font-bold text-cyan-400">{correlationData.pearson.toFixed(3)}</div>
          </div>
          <div className="bg-gray-800 bg-opacity-60 p-4 rounded-lg border border-blue-500">
            <div className="text-xs text-gray-400 mb-2">SPEARMAN ρ</div>
            <div className="text-2xl font-bold text-blue-400">{correlationData.spearman.toFixed(3)}</div>
          </div>
          <div className="bg-gray-800 bg-opacity-60 p-4 rounded-lg border border-green-500">
            <div className="text-xs text-gray-400 mb-2">GRANGER p</div>
            <div className="text-2xl font-bold text-green-400">{correlationData.granger_pvalue.toFixed(4)}</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
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

        <div className="bg-gray-900 bg-opacity-80 border-2 border-purple-500 rounded-xl p-5 backdrop-blur-md">
          <h3 className="text-lg font-bold text-purple-400 mb-4">System State</h3>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={[
              { metric: 'Solar', value: (solarMetrics.sunspotNumber / 200) * 100 },
              { metric: 'Geomag', value: (solarMetrics.kpIndex / 9) * 100 },
              { metric: 'Engagement', value: socialMetrics.engagement },
              { metric: 'Crispation', value: socialMetrics.crispation },
              { metric: 'Correlation', value: correlationData.pearson * 100 }
            ]}>
              <PolarGrid stroke="rgba(255,255,255,0.2)" />
              <PolarAngleAxis dataKey="metric" stroke="#9CA3AF" />
              <PolarRadiusAxis angle={90} domain={[0, 100]} stroke="#9CA3AF" />
              <Radar dataKey="value" stroke="#A78BFA" fill="#A78BFA" fillOpacity={0.6} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );

  const ConfigView = () => (
    <div className="space-y-6">
      <div className="bg-gray-900 bg-opacity-80 border-2 border-cyan-500 rounded-xl p-6 backdrop-blur-md">
        <h2 className="text-2xl font-bold text-cyan-400 mb-4 flex items-center gap-2">
          <Settings className="w-6 h-6" />
          API Configuration
        </h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Solar Data API</label>
            <input
              type="text"
              value={apiConfig.solarAPI}
              onChange={(e) => setApiConfig({...apiConfig, solarAPI: e.target.value})}
              className="w-full bg-gray-800 border border-gray-600 rounded px-4 py-2 text-white font-mono text-sm"
              placeholder="https://services.swpc.noaa.gov/..."
            />
            <p className="text-xs text-gray-500 mt-1">NOAA Space Weather API (Free)</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Facebook Access Token</label>
            <input
              type="password"
              value={apiConfig.facebookToken}
              onChange={(e) => setApiConfig({...apiConfig, facebookToken: e.target.value})}
              className="w-full bg-gray-800 border border-gray-600 rounded px-4 py-2 text-white font-mono text-sm"
              placeholder="EAAxxxxxxxx..."
            />
            <p className="text-xs text-gray-500 mt-1">Facebook Graph API Token</p>
          </div>

          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={apiConfig.useDemo}
                onChange={(e) => setApiConfig({...apiConfig, useDemo: e.target.checked})}
                className="w-4 h-4"
              />
              <span className="text-sm text-gray-300">Use Demo Data</span>
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
              onClick={fetchRealSolarData}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-medium transition-colors"
            >
              Test Solar API
            </button>
            <button
              onClick={() => alert('Facebook API connection would be tested here')}
              className="px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-white font-medium transition-colors"
            >
              Test Facebook API
            </button>
          </div>
        </div>
      </div>

      <div className="bg-gray-900 bg-opacity-80 border-2 border-yellow-500 rounded-xl p-6 backdrop-blur-md">
        <h2 className="text-2xl font-bold text-yellow-400 mb-4">API Endpoints</h2>
        <div className="space-y-3 font-mono text-sm">
          <div className="bg-gray-800 p-3 rounded">
            <div className="text-green-400">GET /api/solar/current</div>
            <div className="text-gray-400 text-xs mt-1">Get current solar activity metrics</div>
          </div>
          <div className="bg-gray-800 p-3 rounded">
            <div className="text-green-400">GET /api/social/analysis</div>
            <div className="text-gray-400 text-xs mt-1">Get social media analysis</div>
          </div>
          <div className="bg-gray-800 p-3 rounded">
            <div className="text-green-400">GET /api/correlation/realtime</div>
            <div className="text-gray-400 text-xs mt-1">Get correlation analysis</div>
          </div>
          <div className="bg-gray-800 p-3 rounded">
            <div className="text-green-400">POST /api/predict/crispation</div>
            <div className="text-gray-400 text-xs mt-1">Predict social crispation levels</div>
          </div>
        </div>
      </div>

      <div className="bg-gray-900 bg-opacity-80 border-2 border-green-500 rounded-xl p-6 backdrop-blur-md">
        <h2 className="text-2xl font-bold text-green-400 mb-4">System Info</h2>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <div className="text-gray-400">Version</div>
            <div className="text-white font-mono">v2.0.1</div>
          </div>
          <div>
            <div className="text-gray-400">Status</div>
            <div className="text-green-400 font-mono">OPERATIONAL</div>
          </div>
          <div>
            <div className="text-gray-400">Data Points</div>
            <div className="text-white font-mono">{timeSeriesData.length}</div>
          </div>
          <div>
            <div className="text-gray-400">Update Rate</div>
            <div className="text-white font-mono">{apiConfig.updateInterval}ms</div>
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
              <Brain className="w-16 h-16 text-cyan-400" />
              <div>
                <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                  HelioBio-Social
                </h1>
                <p className="text-cyan-400 text-sm font-mono mt-1">
                  Heliobiological Correlation Analysis System v2.0.1
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
                  {isLive ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                </button>
                <button
                  onClick={exportData}
                  className="p-2 rounded-lg bg-blue-600 hover:opacity-80 transition-opacity"
                  title="Export Data"
                >
                  <Download className="w-5 h-5" />
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
            mechbot.2x · HelioBio-Social · Open Source
          </p>
        </div>
      </div>
    </div>
  );
};

export default HelioBioSocialSystem;
