import React from 'react';

export default function MetricCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  color = '#10B981',
  bgColor = 'rgba(16, 185, 129, 0.1)',
  isDark = true,
}) {
  return (
    <div
      className="glass-panel"
      style={{
        padding: '20px',
        backgroundColor: isDark ? 'rgba(19, 27, 42, 0.75)' : '#FFFFFF',
        border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(15, 23, 42, 0.08)'}`,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Top Accent Bleed */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '2px',
          backgroundColor: color,
        }}
      />

      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '14px' }}>
        <div>
          <span
            style={{
              fontSize: '11px',
              fontWeight: '700',
              letterSpacing: '1px',
              textTransform: 'uppercase',
              color: isDark ? '#94A3B8' : '#64748B',
            }}
          >
            {title}
          </span>
          <div
            style={{
              fontSize: '28px',
              fontWeight: '700',
              fontFamily: 'var(--font-heading)',
              color: isDark ? '#F8FAFC' : '#0F172A',
              marginTop: '4px',
              letterSpacing: '-0.5px',
            }}
          >
            {value}
          </div>
        </div>

        {Icon && (
          <div
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: bgColor,
              border: `1px solid ${color}33`,
            }}
          >
            <Icon size={22} color={color} />
          </div>
        )}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: '12px', color: isDark ? '#64748B' : '#94A3B8' }}>
          {subtitle}
        </span>
        {trend && (
          <span
            style={{
              fontSize: '12px',
              fontWeight: '600',
              color: trend.startsWith('+') ? '#10B981' : '#F43F5E',
              backgroundColor: trend.startsWith('+') ? 'rgba(16, 185, 129, 0.1)' : 'rgba(244, 63, 94, 0.1)',
              padding: '2px 8px',
              borderRadius: '6px',
            }}
          >
            {trend}
          </span>
        )}
      </div>
    </div>
  );
}

