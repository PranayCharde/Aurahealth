import React, { useState } from 'react';
import { Database, Server, CheckCircle2, AlertTriangle, Play, RefreshCw, Zap, ShieldCheck } from 'lucide-react';

export default function DatabaseInspector({ systemMetrics, isDark = true }) {
  const [testResult, setTestResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const collections = [
    { name: 'users', docCount: 1420, size: '240 KB', desc: 'Registered user credentials, profiles & goals' },
    { name: 'nutritionlogs', docCount: 8940, size: '2.4 MB', desc: 'Daily meals, macros, micros & bodybuilding supplements' },
    { name: 'vitallogs', docCount: 14200, size: '4.8 MB', desc: 'Heart rate, HRV, BP, Glucose, SpO2 & ECG records' },
    { name: 'sleeplogs', docCount: 8900, size: '1.9 MB', desc: 'Sleep architecture, hypnogram stages & debt' },
    { name: 'activitylogs', docCount: 7850, size: '2.2 MB', desc: 'Workouts, daily strain scores & calories burned' },
    { name: 'hydrationlogs', docCount: 6420, size: '890 KB', desc: 'Cellular water intake logs & daily target progress' },
    { name: 'mindfulnesslogs', docCount: 4200, size: '650 KB', desc: 'Guided breathwork & meditation sessions' },
  ];

  const handleTestEndpoint = async (endpoint, method = 'GET', body = null) => {
    setLoading(true);
    setTestResult(null);
    try {
      const res = await fetch(`http://localhost:5000${endpoint}`, {
        method,
        headers: { 'Content-Type': 'application/json' },
        ...(body && { body: JSON.stringify(body) }),
      });
      const data = await res.json();
      setTestResult({
        endpoint,
        status: res.status,
        ok: res.ok,
        data,
      });
    } catch (err) {
      setTestResult({
        endpoint,
        status: 500,
        ok: false,
        error: err.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const isConnected = systemMetrics?.mongoStatus === 'CONNECTED';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* 1. Connection Status Banner */}
      <div
        className="glass-panel"
        style={{
          padding: '24px',
          backgroundColor: isDark ? 'rgba(19, 27, 42, 0.75)' : '#FFFFFF',
          border: `1px solid ${isConnected ? 'rgba(16, 185, 129, 0.3)' : 'rgba(245, 158, 11, 0.3)'}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div
            style={{
              width: '52px',
              height: '52px',
              borderRadius: '14px',
              backgroundColor: isConnected ? 'rgba(16, 185, 129, 0.15)' : 'rgba(245, 158, 11, 0.15)',
              border: `1.5px solid ${isConnected ? '#10B981' : '#F59E0B'}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Database size={26} color={isConnected ? '#10B981' : '#F59E0B'} />
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: '700', color: isDark ? '#F8FAFC' : '#0F172A' }}>
                MongoDB Database Telemetry
              </h2>
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: '700',
                  padding: '3px 8px',
                  borderRadius: '6px',
                  backgroundColor: isConnected ? 'rgba(16, 185, 129, 0.15)' : 'rgba(245, 158, 11, 0.15)',
                  color: isConnected ? '#10B981' : '#F59E0B',
                }}
              >
                {isConnected ? 'ONLINE & SYNCHRONIZED' : 'LOCAL PENDING SETUP'}
              </span>
            </div>
            <p style={{ fontSize: '13px', color: isDark ? '#94A3B8' : '#64748B', marginTop: '4px' }}>
              Connection: <code style={{ color: '#10B981' }}>mongodb://127.0.0.1:27017/aurahealth</code> • Express REST API: <code style={{ color: '#0EA5E9' }}>http://localhost:5000</code>
            </p>
          </div>
        </div>

        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '12px', color: isDark ? '#64748B' : '#94A3B8' }}>Latency</div>
          <div style={{ fontSize: '20px', fontWeight: '700', color: '#10B981' }}>{systemMetrics?.apiLatency || '12ms'}</div>
        </div>
      </div>

      {/* 2. MongoDB Collections Table */}
      <div
        className="glass-panel"
        style={{
          padding: '24px',
          backgroundColor: isDark ? 'rgba(19, 27, 42, 0.75)' : '#FFFFFF',
          border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(15, 23, 42, 0.08)'}`,
        }}
      >
        <h3 style={{ fontSize: '18px', fontWeight: '700', color: isDark ? '#F8FAFC' : '#0F172A', marginBottom: '16px' }}>
          Database Collections Registry ({collections.length})
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px' }}>
          {collections.map((col) => (
            <div
              key={col.name}
              style={{
                padding: '16px',
                borderRadius: '12px',
                backgroundColor: isDark ? 'rgba(11, 15, 23, 0.6)' : '#F8FAFC',
                border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(15, 23, 42, 0.05)'}`,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ fontFamily: 'monospace', fontWeight: '700', color: '#10B981', fontSize: '14px' }}>
                  {col.name}
                </span>
                <span style={{ fontSize: '11px', color: isDark ? '#94A3B8' : '#64748B' }}>
                  {col.size}
                </span>
              </div>
              <div style={{ fontSize: '16px', fontWeight: '700', color: isDark ? '#F8FAFC' : '#0F172A', marginBottom: '4px' }}>
                {col.docCount.toLocaleString()} documents
              </div>
              <div style={{ fontSize: '12px', color: isDark ? '#64748B' : '#94A3B8' }}>
                {col.desc}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Live API Endpoint Probe Tool */}
      <div
        className="glass-panel"
        style={{
          padding: '24px',
          backgroundColor: isDark ? 'rgba(19, 27, 42, 0.75)' : '#FFFFFF',
          border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(15, 23, 42, 0.08)'}`,
        }}
      >
        <h3 style={{ fontSize: '18px', fontWeight: '700', color: isDark ? '#F8FAFC' : '#0F172A', marginBottom: '6px' }}>
          Interactive Backend API Tester
        </h3>
        <p style={{ fontSize: '13px', color: isDark ? '#94A3B8' : '#64748B', marginBottom: '16px' }}>
          Test real HTTP requests to the Express server running on port 5000:
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '18px' }}>
          <button
            onClick={() => handleTestEndpoint('/api/health', 'GET')}
            style={{
              padding: '10px 16px',
              borderRadius: '10px',
              backgroundColor: isDark ? 'rgba(16, 185, 129, 0.15)' : 'rgba(5, 150, 105, 0.12)',
              color: '#10B981',
              fontWeight: '700',
              fontSize: '12px',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <Play size={14} />
            <span>GET /api/health</span>
          </button>

          <button
            onClick={() =>
              handleTestEndpoint('/api/nutrition/analyze-meal', 'POST', {
                query: '200g chicken breast and 1 cup rice',
              })
            }
            style={{
              padding: '10px 16px',
              borderRadius: '10px',
              backgroundColor: isDark ? 'rgba(14, 165, 233, 0.15)' : 'rgba(2, 132, 199, 0.12)',
              color: '#0EA5E9',
              fontWeight: '700',
              fontSize: '12px',
              border: '1px solid rgba(14, 165, 233, 0.3)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <Play size={14} />
            <span>POST /api/nutrition/analyze-meal</span>
          </button>

          <button
            onClick={() => handleTestEndpoint('/api/auth/demo', 'POST')}
            style={{
              padding: '10px 16px',
              borderRadius: '10px',
              backgroundColor: isDark ? 'rgba(139, 92, 246, 0.15)' : 'rgba(124, 58, 237, 0.12)',
              color: '#8B5CF6',
              fontWeight: '700',
              fontSize: '12px',
              border: '1px solid rgba(139, 92, 246, 0.3)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <Play size={14} />
            <span>POST /api/auth/demo</span>
          </button>
        </div>

        {/* Test Result Viewer */}
        {loading && (
          <div style={{ color: '#10B981', fontSize: '13px', fontWeight: '600' }}>
            Dispatching HTTP request to backend...
          </div>
        )}

        {testResult && (
          <div
            style={{
              padding: '16px',
              borderRadius: '12px',
              backgroundColor: isDark ? '#080C14' : '#F1F5F9',
              border: `1px solid ${testResult.ok ? 'rgba(16, 185, 129, 0.3)' : 'rgba(244, 63, 94, 0.3)'}`,
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontWeight: '700', color: testResult.ok ? '#10B981' : '#F43F5E', fontSize: '12px' }}>
                HTTP STATUS: {testResult.status} {testResult.ok ? 'OK' : 'FAILED'} — {testResult.endpoint}
              </span>
              <span style={{ fontSize: '11px', color: isDark ? '#64748B' : '#94A3B8' }}>Response Payload</span>
            </div>
            <pre
              style={{
                fontFamily: 'monospace',
                fontSize: '12px',
                color: isDark ? '#A7F3D0' : '#065F46',
                overflowX: 'auto',
                whiteSpace: 'pre-wrap',
              }}
            >
              {JSON.stringify(testResult.data || testResult.error, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}

