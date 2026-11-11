import React, { useState } from 'react';
import { Activity, Dumbbell, PieChart, TrendingUp, Sparkles, Flame, Moon } from 'lucide-react';

export default function AnalyticsCharts({ users = [], isDark = true }) {
  const [activeTab, setActiveTab] = useState('readiness');

  // Days of week
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const readinessTrends = [82, 85, 91, 79, 88, 94, 92];
  const strainTrends = [12.4, 15.1, 16.8, 11.2, 17.4, 13.9, 14.8];

  // Calculate phase counts
  const phases = {
    'LEAN HYPERTROPHY': 0,
    'AGGRESSIVE BULK': 0,
    'CUTTING / VASCULARITY': 0,
    'RECOMPOSITION': 0,
  };

  users.forEach((u) => {
    const phase = u.nutrition?.phase || 'LEAN HYPERTROPHY';
    if (phases[phase] !== undefined) phases[phase]++;
    else phases['LEAN HYPERTROPHY']++;
  });

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '2fr 1fr',
        gap: '20px',
        marginBottom: '24px',
      }}
    >
      {/* 1. Readiness & Strain Telemetry Curve */}
      <div
        className="glass-panel"
        style={{
          padding: '22px',
          backgroundColor: isDark ? 'rgba(19, 27, 42, 0.75)' : '#FFFFFF',
          border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(15, 23, 42, 0.08)'}`,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
          <div>
            <span style={{ fontSize: '11px', fontWeight: '700', letterSpacing: '1px', textTransform: 'uppercase', color: '#10B981' }}>
              AUTONOMIC ECOSYSTEM TRENDS
            </span>
            <h3 style={{ fontSize: '18px', fontWeight: '700', color: isDark ? '#F8FAFC' : '#0F172A', marginTop: '2px' }}>
              Readiness Score vs Daily Strain
            </h3>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <span style={{ display: 'flex', alignItems: 'center', fontSize: '12px', color: '#10B981', fontWeight: '600' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10B981', marginRight: '6px' }} />
              Readiness (%)
            </span>
            <span style={{ display: 'flex', alignItems: 'center', fontSize: '12px', color: '#F43F5E', fontWeight: '600', marginLeft: '12px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#F43F5E', marginRight: '6px' }} />
              Strain (/21)
            </span>
          </div>
        </div>

        {/* SVG Telemetry Visualization */}
        <div style={{ height: '220px', width: '100%', position: 'relative' }}>
          <svg style={{ width: '100%', height: '100%', overflow: 'visible' }}>
            {/* Grid Lines */}
            {[0, 25, 50, 75, 100].map((level) => (
              <line
                key={level}
                x1="0"
                y1={200 - level * 1.8}
                x2="100%"
                y2={200 - level * 1.8}
                stroke={isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(15, 23, 42, 0.06)'}
                strokeDasharray="4 4"
              />
            ))}

            {/* Bars for Strain */}
            {strainTrends.map((strain, index) => {
              const xPct = (index / (days.length - 1)) * 88 + 6;
              const barHeight = (strain / 21) * 160;
              return (
                <rect
                  key={`strain-${index}`}
                  x={`${xPct - 2.5}%`}
                  y={200 - barHeight}
                  width="5%"
                  height={barHeight}
                  rx="4"
                  fill="rgba(244, 63, 94, 0.35)"
                  stroke="#F43F5E"
                  strokeWidth="1.2"
                />
              );
            })}

            {/* Polyline for Readiness */}
            <polyline
              fill="none"
              stroke="#10B981"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              points={readinessTrends
                .map((val, i) => {
                  const xPct = (i / (days.length - 1)) * 88 + 6;
                  const yVal = 200 - (val / 100) * 180;
                  return `${xPct}%,${yVal}`;
                })
                .join(' ')}
            />

            {/* Points for Readiness */}
            {readinessTrends.map((val, i) => {
              const xPct = (i / (days.length - 1)) * 88 + 6;
              const yVal = 200 - (val / 100) * 180;
              return (
                <g key={`pt-${i}`}>
                  <circle cx={`${xPct}%`} cy={yVal} r="5" fill="#10B981" stroke="#0B0F17" strokeWidth="2" />
                  <text
                    x={`${xPct}%`}
                    y={yVal - 10}
                    textAnchor="middle"
                    fill={isDark ? '#F8FAFC' : '#0F172A'}
                    fontSize="10"
                    fontWeight="700"
                    fontFamily="var(--font-heading)"
                  >
                    {val}%
                  </text>
                </g>
              );
            })}
          </svg>

          {/* X Axis Labels */}
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 6%', marginTop: '8px' }}>
            {days.map((day) => (
              <span key={day} style={{ fontSize: '11px', fontWeight: '600', color: isDark ? '#64748B' : '#94A3B8' }}>
                {day}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Bodybuilding Hypertrophy Phase Distribution */}
      <div
        className="glass-panel"
        style={{
          padding: '22px',
          backgroundColor: isDark ? 'rgba(19, 27, 42, 0.75)' : '#FFFFFF',
          border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(15, 23, 42, 0.08)'}`,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <span style={{ fontSize: '11px', fontWeight: '700', letterSpacing: '1px', textTransform: 'uppercase', color: '#0EA5E9' }}>
            ANABOLIC FOCUS
          </span>
          <h3 style={{ fontSize: '18px', fontWeight: '700', color: isDark ? '#F8FAFC' : '#0F172A', marginTop: '2px', marginBottom: '16px' }}>
            Bodybuilder Phase Breakdown
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {Object.entries(phases).map(([phase, count]) => {
              const total = users.length || 1;
              const pct = Math.round((count / total) * 100);
              const colorMap = {
                'LEAN HYPERTROPHY': '#10B981',
                'AGGRESSIVE BULK': '#F59E0B',
                'CUTTING / VASCULARITY': '#F43F5E',
                'RECOMPOSITION': '#8B5CF6',
              };
              const col = colorMap[phase] || '#10B981';

              return (
                <div key={phase}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '4px' }}>
                    <span style={{ fontWeight: '600', color: isDark ? '#F8FAFC' : '#0F172A' }}>{phase}</span>
                    <span style={{ color: col, fontWeight: '700' }}>{count} ({pct}%)</span>
                  </div>
                  <div style={{ height: '6px', borderRadius: '3px', backgroundColor: isDark ? 'rgba(255, 255, 255, 0.06)' : '#E2E8F0', overflow: 'hidden' }}>
                    <div style={{ width: `${pct}%`, height: '100%', backgroundColor: col, borderRadius: '3px' }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div
          style={{
            marginTop: '16px',
            padding: '10px 12px',
            borderRadius: '10px',
            backgroundColor: isDark ? 'rgba(16, 185, 129, 0.08)' : 'rgba(5, 150, 105, 0.08)',
            border: `1px solid rgba(16, 185, 129, 0.2)`,
            display: 'flex',
            alignItems: 'center',
            fontSize: '11px',
            color: '#10B981',
          }}
        >
          <Sparkles size={14} style={{ marginRight: '6px', flexShrink: 0 }} />
          <span>Optimal macro compliance across 86% of active athlete profiles.</span>
        </div>
      </div>
    </div>
  );
}

