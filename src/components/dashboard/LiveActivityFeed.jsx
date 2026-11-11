import React from 'react';
import { Activity, Utensils, HeartPulse, Flame, Moon, Droplets, CheckCircle2 } from 'lucide-react';

export default function LiveActivityFeed({ isDark = true }) {
  const events = [
    {
      id: 'e1',
      user: 'Elena Vance',
      action: 'Logged Post-Workout Anabolic Fuel',
      detail: 'Whey Protein Isolate (35g) + 250g Steamed Jasmine Rice (455 kcal • 34g Protein)',
      time: '4 mins ago',
      icon: Utensils,
      color: '#10B981',
      bg: 'rgba(16, 185, 129, 0.12)',
    },
    {
      id: 'e2',
      user: 'Marcus Brody',
      action: 'Completed Heavy Posterior Chain Session',
      detail: '80 mins • 680 kcal burned • Avg HR 154 bpm • Peak 184 bpm',
      time: '18 mins ago',
      icon: Flame,
      color: '#F43F5E',
      bg: 'rgba(244, 63, 94, 0.12)',
    },
    {
      id: 'e3',
      user: 'Dr. Samantha Chen',
      action: 'Sleep Architecture Telemetry Synchronized',
      detail: '8h 35m total sleep • 94% Sleep Score • 26% Slow-Wave Deep Sleep',
      time: '45 mins ago',
      icon: Moon,
      color: '#8B5CF6',
      bg: 'rgba(139, 92, 246, 0.12)',
    },
    {
      id: 'e4',
      user: 'Elena Vance',
      action: 'Manual ECG Clinical Assessment Recorded',
      detail: 'Single-Lead Normal Sinus Rhythm • 62 bpm • QTc 408ms (Verified Normal)',
      time: '1 hour ago',
      icon: HeartPulse,
      color: '#10B981',
      bg: 'rgba(16, 185, 129, 0.12)',
    },
    {
      id: 'e5',
      user: 'Liam Gallagher',
      action: 'Hit 100% Cellular Hydration Target',
      detail: '3,500 ml water consumed • Intra-cellular fluid balance optimal',
      time: '2 hours ago',
      icon: Droplets,
      color: '#0EA5E9',
      bg: 'rgba(14, 165, 233, 0.12)',
    },
  ];

  return (
    <div
      className="glass-panel"
      style={{
        padding: '22px',
        backgroundColor: isDark ? 'rgba(19, 27, 42, 0.75)' : '#FFFFFF',
        border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(15, 23, 42, 0.08)'}`,
        marginBottom: '24px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <div>
          <span style={{ fontSize: '11px', fontWeight: '700', letterSpacing: '1px', textTransform: 'uppercase', color: '#10B981' }}>
            REAL-TIME ACTIVITY TELEMETRY
          </span>
          <h3 style={{ fontSize: '18px', fontWeight: '700', color: isDark ? '#F8FAFC' : '#0F172A', marginTop: '2px' }}>
            Live Athlete Stream
          </h3>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', fontSize: '11px', color: '#10B981', fontWeight: '700' }}>
          <span className="pulse-dot" style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#10B981', marginRight: '6px' }} />
          STREAMING LIVE
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {events.map((ev) => {
          const Icon = ev.icon;
          return (
            <div
              key={ev.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 16px',
                borderRadius: '12px',
                backgroundColor: isDark ? 'rgba(11, 15, 23, 0.6)' : '#F8FAFC',
                border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(15, 23, 42, 0.05)'}`,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '10px',
                    backgroundColor: ev.bg,
                    border: `1px solid ${ev.color}33`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Icon size={18} color={ev.color} />
                </div>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: '700', color: isDark ? '#F8FAFC' : '#0F172A' }}>
                    <span style={{ color: ev.color, marginRight: '6px' }}>{ev.user}</span>
                    <span style={{ fontWeight: '500', color: isDark ? '#94A3B8' : '#64748B' }}>— {ev.action}</span>
                  </div>
                  <div style={{ fontSize: '12px', color: isDark ? '#64748B' : '#94A3B8', marginTop: '2px' }}>
                    {ev.detail}
                  </div>
                </div>
              </div>

              <div style={{ fontSize: '11px', fontWeight: '600', color: isDark ? '#475569' : '#94A3B8', whiteSpace: 'nowrap', marginLeft: '16px' }}>
                {ev.time}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

