import React from 'react';
import {
  LayoutDashboard,
  Users,
  Utensils,
  HeartPulse,
  Flame,
  Database,
  ShieldCheck,
  Activity,
  Sun,
  Moon,
  ExternalLink,
} from 'lucide-react';

export default function Sidebar({
  currentView,
  onSelectView,
  isDark,
  onToggleTheme,
  userCount = 0,
}) {
  const navItems = [
    { id: 'dashboard', label: 'Command Center', icon: LayoutDashboard, badge: 'Live' },
    { id: 'users', label: 'All Users & Athletes', icon: Users, badge: userCount ? `${userCount}` : null },
    { id: 'nutrition', label: 'Nutrition & Macros', icon: Utensils },
    { id: 'vitals', label: 'Vitals & ECG Registry', icon: HeartPulse },
    { id: 'activity', label: 'Strain & Workouts', icon: Flame },
    { id: 'database', label: 'MongoDB & Backend', icon: Database },
  ];

  return (
    <aside
      style={{
        width: '260px',
        backgroundColor: isDark ? '#080C14' : '#FFFFFF',
        borderRight: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(15, 23, 42, 0.08)'}`,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '24px 16px',
        height: '100vh',
        position: 'sticky',
        top: 0,
        flexShrink: 0,
        zIndex: 20,
      }}
    >
      <div>
        {/* Brand Emblem */}
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '32px', paddingLeft: '8px' }}>
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '12px',
              backgroundColor: isDark ? 'rgba(16, 185, 129, 0.15)' : 'rgba(5, 150, 105, 0.12)',
              border: `1.5px solid #10B981`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: '12px',
            }}
          >
            <Activity size={22} color="#10B981" />
          </div>
          <div>
            <div style={{ fontSize: '18px', fontWeight: '700', fontFamily: 'var(--font-heading)', color: isDark ? '#F8FAFC' : '#0F172A' }}>
              Aura<span style={{ color: '#10B981' }}>Health</span>
            </div>
            <div style={{ fontSize: '10px', letterSpacing: '1px', textTransform: 'uppercase', color: isDark ? '#94A3B8' : '#64748B', fontWeight: '600' }}>
              ADMIN COMMAND PANEL
            </div>
          </div>
        </div>

        {/* Navigation List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <div style={{ fontSize: '10px', fontWeight: '700', letterSpacing: '1px', textTransform: 'uppercase', color: isDark ? '#475569' : '#94A3B8', padding: '0 12px 6px 12px' }}>
            TELEMETRY MODULES
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectView(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '11px 14px',
                  borderRadius: '12px',
                  backgroundColor: isActive
                    ? isDark ? 'rgba(16, 185, 129, 0.15)' : 'rgba(5, 150, 105, 0.12)'
                    : 'transparent',
                  color: isActive ? '#10B981' : isDark ? '#94A3B8' : '#475569',
                  border: isActive
                    ? '1px solid rgba(16, 185, 129, 0.3)'
                    : '1px solid transparent',
                  textAlign: 'left',
                  fontSize: '13px',
                  fontWeight: isActive ? '700' : '500',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Icon
                    size={18}
                    color={isActive ? '#10B981' : isDark ? '#64748B' : '#94A3B8'}
                    style={{ marginRight: '10px' }}
                  />
                  <span>{item.label}</span>
                </div>

                {item.badge && (
                  <span
                    style={{
                      fontSize: '10px',
                      fontWeight: '700',
                      padding: '2px 7px',
                      borderRadius: '8px',
                      backgroundColor: isActive ? '#10B981' : isDark ? 'rgba(255, 255, 255, 0.08)' : '#E2E8F0',
                      color: isActive ? '#FFFFFF' : isDark ? '#94A3B8' : '#475569',
                    }}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}

          {/* Compliance & Store Section */}
          <div style={{ fontSize: '10px', fontWeight: '700', letterSpacing: '1px', textTransform: 'uppercase', color: isDark ? '#475569' : '#94A3B8', padding: '14px 12px 6px 12px' }}>
            STORE & COMPLIANCE
          </div>

          <button
            onClick={() => onSelectView('privacy')}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '11px 14px',
              borderRadius: '12px',
              backgroundColor: currentView === 'privacy'
                ? isDark ? 'rgba(16, 185, 129, 0.15)' : 'rgba(5, 150, 105, 0.12)'
                : 'transparent',
              color: currentView === 'privacy' ? '#10B981' : isDark ? '#94A3B8' : '#475569',
              border: currentView === 'privacy'
                ? '1px solid rgba(16, 185, 129, 0.3)'
                : '1px solid transparent',
              textAlign: 'left',
              fontSize: '13px',
              fontWeight: currentView === 'privacy' ? '700' : '500',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <ShieldCheck
                size={18}
                color={currentView === 'privacy' ? '#10B981' : isDark ? '#64748B' : '#94A3B8'}
                style={{ marginRight: '10px' }}
              />
              <span>Privacy Policy</span>
            </div>
            <span
              style={{
                fontSize: '10px',
                fontWeight: '700',
                padding: '2px 7px',
                borderRadius: '8px',
                backgroundColor: currentView === 'privacy' ? '#10B981' : isDark ? 'rgba(16, 185, 129, 0.15)' : '#DCFCE7',
                color: currentView === 'privacy' ? '#FFFFFF' : '#10B981',
              }}
            >
              Play Store
            </span>
          </button>

          <a
            href="/privacy-policy.html"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '9px 14px',
              borderRadius: '12px',
              backgroundColor: isDark ? 'rgba(255, 255, 255, 0.02)' : 'rgba(15, 23, 42, 0.02)',
              color: isDark ? '#64748B' : '#94A3B8',
              textDecoration: 'none',
              fontSize: '12px',
              fontWeight: '500',
              cursor: 'pointer',
              border: '1px dashed rgba(255, 255, 255, 0.08)',
              marginTop: '2px',
            }}
          >
            <span>Open Standalone Web URL</span>
            <ExternalLink size={13} />
          </a>
        </div>
      </div>

      {/* Footer System Status & Theme Switcher */}
      <div>
        {/* Day / Night Switcher */}
        <button
          onClick={onToggleTheme}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '10px 14px',
            borderRadius: '12px',
            backgroundColor: isDark ? 'rgba(255, 255, 255, 0.04)' : '#F1F5F9',
            border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(15, 23, 42, 0.08)'}`,
            color: isDark ? '#F8FAFC' : '#0F172A',
            fontSize: '12px',
            fontWeight: '600',
            marginBottom: '14px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {isDark ? <Sun size={16} color="#FBBF24" style={{ marginRight: '8px' }} /> : <Moon size={16} color="#8B5CF6" style={{ marginRight: '8px' }} />}
            <span>{isDark ? 'Day Porcelain Mode' : 'Night Obsidian Mode'}</span>
          </div>
          <span style={{ fontSize: '10px', color: isDark ? '#94A3B8' : '#64748B' }}>
            TOGGLE
          </span>
        </button>

        {/* Administrator Profile Capsule */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '10px 12px',
            borderRadius: '12px',
            backgroundColor: isDark ? 'rgba(19, 27, 42, 0.6)' : '#F8FAFC',
            border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(15, 23, 42, 0.08)'}`,
          }}
        >
          <div
            style={{
              width: '34px',
              height: '34px',
              borderRadius: '50%',
              backgroundColor: '#10B981',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              fontWeight: '700',
              fontSize: '13px',
              marginRight: '10px',
            }}
          >
            AD
          </div>
          <div style={{ overflow: 'hidden' }}>
            <div style={{ fontSize: '13px', fontWeight: '700', color: isDark ? '#F8FAFC' : '#0F172A', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
              System Admin
            </div>
            <div style={{ fontSize: '11px', color: '#10B981', display: 'flex', alignItems: 'center' }}>
              <ShieldCheck size={11} style={{ marginRight: '3px' }} />
              Superuser Access
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

