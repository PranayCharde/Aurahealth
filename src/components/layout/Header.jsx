import React from 'react';
import { Download, RefreshCw, Server, Database, Bell, ShieldCheck } from 'lucide-react';
import SearchInput from '../common/SearchInput';

export default function Header({
  activeView,
  searchQuery,
  onSearchChange,
  isDark,
  systemMetrics,
  onRefresh,
  onExport,
  isRefreshing,
}) {
  const titles = {
    dashboard: { title: 'Telemetry Command Center', subtitle: 'Live ecosystem metrics, readiness & activity aggregation' },
    users: { title: 'User Management & Athletes', subtitle: 'Detailed clinical records, bodybuilder macro goals & telemetry' },
    nutrition: { title: 'Nutrition & Macro Inspector', subtitle: 'Deep dive into anabolic fueling, macros, micros & meal logs' },
    vitals: { title: 'Vitals & ECG Registry', subtitle: 'Clinical heart rate, HRV, blood pressure & ECG recordings' },
    activity: { title: 'Activity, Strain & Workouts', subtitle: 'Exercise records, daily strain scores and caloric burn' },
    database: { title: 'MongoDB & Backend Architecture', subtitle: 'REST API health, MongoDB connection status and cloud sync' },
    privacy: { title: 'Google Play Privacy Policy & Compliance', subtitle: 'Public disclosure documentation, telemetry registry & Data Safety compliance' },
  };

  const current = titles[activeView] || titles.dashboard;
  const isDbLive = systemMetrics?.mongoStatus === 'CONNECTED';

  return (
    <header
      style={{
        padding: '20px 32px',
        backgroundColor: isDark ? 'rgba(11, 15, 23, 0.85)' : 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(12px)',
        borderBottom: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(15, 23, 42, 0.08)'}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 15,
      }}
    >
      <div>
        <h1
          style={{
            fontSize: '22px',
            fontWeight: '700',
            fontFamily: 'var(--font-heading)',
            color: isDark ? '#F8FAFC' : '#0F172A',
            letterSpacing: '-0.3px',
          }}
        >
          {current.title}
        </h1>
        <p style={{ fontSize: '13px', color: isDark ? '#94A3B8' : '#64748B', marginTop: '2px' }}>
          {current.subtitle}
        </p>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        {/* Live Search */}
        <SearchInput
          value={searchQuery}
          onChange={onSearchChange}
          isDark={isDark}
        />

        {/* MongoDB Connection Status Capsule */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '7px 12px',
            borderRadius: '10px',
            backgroundColor: isDbLive ? 'rgba(16, 185, 129, 0.12)' : 'rgba(245, 158, 11, 0.12)',
            border: `1px solid ${isDbLive ? 'rgba(16, 185, 129, 0.25)' : 'rgba(245, 158, 11, 0.25)'}`,
            fontSize: '11px',
            fontWeight: '700',
            color: isDbLive ? '#10B981' : '#F59E0B',
            fontFamily: 'var(--font-heading)',
          }}
        >
          <Database size={13} style={{ marginRight: '6px' }} />
          <span
            className="pulse-dot"
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              backgroundColor: isDbLive ? '#10B981' : '#F59E0B',
              marginRight: '6px',
            }}
          />
          {isDbLive ? 'MONGODB CONNECTED' : 'BACKEND: PORT 5000'}
        </div>

        {/* Privacy Policy Quick Link */}
        <a
          href="/privacy-policy.html"
          target="_blank"
          rel="noopener noreferrer"
          title="Open Public Privacy Policy (Google Play Store)"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '7px 12px',
            borderRadius: '10px',
            backgroundColor: isDark ? 'rgba(59, 130, 246, 0.12)' : 'rgba(59, 130, 246, 0.1)',
            border: '1px solid rgba(59, 130, 246, 0.25)',
            fontSize: '11px',
            fontWeight: '700',
            color: '#3B82F6',
            textDecoration: 'none',
            fontFamily: 'var(--font-heading)',
          }}
        >
          <ShieldCheck size={13} />
          <span>PRIVACY POLICY</span>
        </a>

        {/* Refresh Action */}
        <button
          onClick={onRefresh}
          title="Refresh Telemetry Data"
          style={{
            width: '38px',
            height: '38px',
            borderRadius: '10px',
            backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : '#F1F5F9',
            border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(15, 23, 42, 0.1)'}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: isDark ? '#F8FAFC' : '#0F172A',
          }}
        >
          <RefreshCw size={16} className={isRefreshing ? 'animate-spin' : ''} />
        </button>

        {/* Export JSON / CSV Button */}
        <button
          onClick={onExport}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '8px 14px',
            borderRadius: '10px',
            backgroundColor: '#10B981',
            color: '#FFFFFF',
            fontSize: '12px',
            fontWeight: '700',
            boxShadow: '0 4px 12px rgba(16, 185, 129, 0.25)',
          }}
        >
          <Download size={15} />
          <span>Export Telemetry</span>
        </button>
      </div>
    </header>
  );
}

