import React, { useState } from 'react';
import {
  X,
  Activity,
  Utensils,
  HeartPulse,
  Moon,
  Flame,
  Droplets,
  Wind,
  ShieldCheck,
  Calendar,
  CheckCircle2,
  Clock,
  Dumbbell,
  Scale,
} from 'lucide-react';
import Badge from '../common/Badge';

export default function UserDetailModal({ user, onClose, isDark = true }) {
  const [activeTab, setActiveTab] = useState('overview');

  if (!user) return null;

  const tabs = [
    { id: 'overview', label: 'Composite Overview', icon: Activity },
    { id: 'nutrition', label: 'Nutrition & Macros', icon: Utensils },
    { id: 'vitals', label: 'Vitals & ECG', icon: HeartPulse },
    { id: 'sleep', label: 'Sleep Architecture', icon: Moon },
    { id: 'activity', label: 'Strain & Workouts', icon: Flame },
  ];

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 50,
        padding: '24px',
      }}
      onClick={onClose}
    >
      <div
        className="glass-panel animate-fade-in"
        style={{
          width: '100%',
          maxWidth: '880px',
          maxHeight: '90vh',
          backgroundColor: isDark ? '#0F1623' : '#FFFFFF',
          border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(15, 23, 42, 0.12)'}`,
          boxShadow: '0 24px 60px rgba(0, 0, 0, 0.5)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            padding: '20px 28px',
            borderBottom: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(15, 23, 42, 0.08)'}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            {user.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  if (e.currentTarget.nextSibling) {
                    e.currentTarget.nextSibling.style.display = 'flex';
                  }
                }}
                style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '2px solid #10B981',
                }}
              />
            ) : null}
            <div
              style={{
                display: user.avatar ? 'none' : 'flex',
                width: '52px',
                height: '52px',
                borderRadius: '50%',
                backgroundColor: 'rgba(16, 185, 129, 0.15)',
                border: '2px solid #10B981',
                color: '#10B981',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: '700',
                fontSize: '20px',
                flexShrink: 0,
              }}
            >
              {(user.name || 'U').charAt(0).toUpperCase()}
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h2 style={{ fontSize: '20px', fontWeight: '700', color: isDark ? '#F8FAFC' : '#0F172A' }}>
                  {user.name || 'Athlete Profile'}
                </h2>
                <Badge label={user.status || 'Active'} variant={user.status === 'Active' ? 'primary' : 'muted'} size="sm" />
                <Badge label={user.role || 'Athlete'} variant="tertiary" size="sm" />
              </div>
              <p style={{ fontSize: '13px', color: isDark ? '#94A3B8' : '#64748B', marginTop: '2px' }}>
                {user.email} • ID: {user.id || user._id} • Registered: {user.registeredDate || '2025-11-14'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : '#F1F5F9',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: isDark ? '#F8FAFC' : '#0F172A',
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Navigation Tabs */}
        <div
          style={{
            display: 'flex',
            padding: '0 28px',
            borderBottom: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(15, 23, 42, 0.08)'}`,
            backgroundColor: isDark ? 'rgba(11, 15, 23, 0.4)' : '#F8FAFC',
          }}
        >
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '12px 18px',
                  borderBottom: `2px solid ${isActive ? '#10B981' : 'transparent'}`,
                  color: isActive ? '#10B981' : isDark ? '#94A3B8' : '#64748B',
                  fontWeight: isActive ? '700' : '500',
                  fontSize: '13px',
                  backgroundColor: 'transparent',
                }}
              >
                <Icon size={16} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Modal Scrollable Body */}
        <div style={{ padding: '24px 28px', overflowY: 'auto', flex: 1 }}>
          {/* TAB 1: COMPOSITE OVERVIEW */}
          {activeTab === 'overview' && (
            <div>
              {/* Profile Bio Grid */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 1fr)',
                  gap: '12px',
                  marginBottom: '20px',
                }}
              >
                {[
                  { label: 'WEIGHT & HEIGHT', val: `${user.profile?.weight || '--'} / ${user.profile?.height || '--'}` },
                  { label: 'AGE & GENDER', val: `${user.profile?.age || '--'} yrs • ${user.profile?.gender || 'Unspecified'}` },
                  { label: 'BODY FAT %', val: user.profile?.bodyFat || '--' },
                  { label: 'PRIMARY GOAL', val: user.profile?.goal || 'Optimal Health & Longevity' },
                ].map((stat, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: '12px',
                      borderRadius: '10px',
                      backgroundColor: isDark ? 'rgba(255, 255, 255, 0.03)' : '#F1F5F9',
                      border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(15, 23, 42, 0.06)'}`,
                    }}
                  >
                    <div style={{ fontSize: '10px', fontWeight: '700', color: isDark ? '#94A3B8' : '#64748B', letterSpacing: '0.5px' }}>
                      {stat.label}
                    </div>
                    <div style={{ fontSize: '14px', fontWeight: '700', color: isDark ? '#F8FAFC' : '#0F172A', marginTop: '4px' }}>
                      {stat.val}
                    </div>
                  </div>
                ))}
              </div>

              {/* Top Biometric Scores */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '14px',
                  marginBottom: '20px',
                }}
              >
                {/* Readiness Card */}
                <div
                  style={{
                    padding: '18px',
                    borderRadius: '14px',
                    backgroundColor: isDark ? 'rgba(16, 185, 129, 0.08)' : '#F0FDF4',
                    border: '1px solid rgba(16, 185, 129, 0.25)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '11px', fontWeight: '700', color: '#10B981' }}>DAILY READINESS</span>
                    <Activity size={18} color="#10B981" />
                  </div>
                  <div style={{ fontSize: '32px', fontWeight: '700', color: '#10B981', marginTop: '4px' }}>
                    {user.composite?.readinessScore ?? 88}%
                  </div>
                  <div style={{ fontSize: '12px', color: isDark ? '#94A3B8' : '#64748B' }}>
                    {user.composite?.recoveryStatus || 'Optimal State'} ({user.composite?.recoveryPct ?? 85}% recovered)
                  </div>
                </div>

                {/* Sleep Card */}
                <div
                  style={{
                    padding: '18px',
                    borderRadius: '14px',
                    backgroundColor: isDark ? 'rgba(139, 92, 246, 0.08)' : '#F5F3FF',
                    border: '1px solid rgba(139, 92, 246, 0.25)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '11px', fontWeight: '700', color: '#8B5CF6' }}>SLEEP ARCHITECTURE</span>
                    <Moon size={18} color="#8B5CF6" />
                  </div>
                  <div style={{ fontSize: '32px', fontWeight: '700', color: '#8B5CF6', marginTop: '4px' }}>
                    {user.sleep?.score ?? 89}%
                  </div>
                  <div style={{ fontSize: '12px', color: isDark ? '#94A3B8' : '#64748B' }}>
                    {user.sleep?.duration || '8h 12m'} total • {user.sleep?.deepPct ?? 22}% Deep Sleep
                  </div>
                </div>

                {/* Strain Card */}
                <div
                  style={{
                    padding: '18px',
                    borderRadius: '14px',
                    backgroundColor: isDark ? 'rgba(244, 63, 94, 0.08)' : '#FFF1F2',
                    border: '1px solid rgba(244, 63, 94, 0.25)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '11px', fontWeight: '700', color: '#F43F5E' }}>CARDIO STRAIN</span>
                    <Flame size={18} color="#F43F5E" />
                  </div>
                  <div style={{ fontSize: '32px', fontWeight: '700', color: '#F43F5E', marginTop: '4px' }}>
                    {user.activity?.strain ?? user.activity?.strainScore ?? 14.8} <span style={{ fontSize: '16px' }}>/21</span>
                  </div>
                  <div style={{ fontSize: '12px', color: isDark ? '#94A3B8' : '#64748B' }}>
                    {user.activity?.caloriesBurned ?? user.activity?.calories ?? user.activity?.activeCalories ?? 620} kcal burned • {user.activity?.activeMinutes ?? user.activity?.exerciseMinutes ?? 68} mins active
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: NUTRITION & BODYBUILDER MACROS */}
          {activeTab === 'nutrition' && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                <div>
                  <span style={{ fontSize: '11px', fontWeight: '700', color: '#10B981' }}>ANABOLIC TARGETS & PHASE</span>
                  <h3 style={{ fontSize: '18px', fontWeight: '700', color: isDark ? '#F8FAFC' : '#0F172A' }}>
                    Phase: {user.nutrition?.phase || 'LEAN HYPERTROPHY'}
                  </h3>
                </div>
                <Badge label={user.nutrition?.proteinRatio || '3.0g / kg BW'} variant="primary" size="sm" />
              </div>

              {/* Macro Bar Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '20px' }}>
                <div style={{ padding: '14px', borderRadius: '12px', backgroundColor: isDark ? 'rgba(16, 185, 129, 0.1)' : '#F0FDF4', border: '1px solid rgba(16, 185, 129, 0.25)' }}>
                  <span style={{ fontSize: '11px', fontWeight: '700', color: '#10B981' }}>PROTEIN</span>
                  <div style={{ fontSize: '20px', fontWeight: '700', color: isDark ? '#F8FAFC' : '#0F172A', marginTop: '2px' }}>
                    {user.nutrition?.actual?.protein ?? 0}g
                  </div>
                  <span style={{ fontSize: '11px', color: isDark ? '#94A3B8' : '#64748B' }}>Target: {user.nutrition?.targets?.protein ?? 195}g</span>
                </div>

                <div style={{ padding: '14px', borderRadius: '12px', backgroundColor: isDark ? 'rgba(14, 165, 233, 0.1)' : '#F0F9FF', border: '1px solid rgba(14, 165, 233, 0.25)' }}>
                  <span style={{ fontSize: '11px', fontWeight: '700', color: '#0EA5E9' }}>CARBS</span>
                  <div style={{ fontSize: '20px', fontWeight: '700', color: isDark ? '#F8FAFC' : '#0F172A', marginTop: '2px' }}>
                    {user.nutrition?.actual?.carbs ?? 0}g
                  </div>
                  <span style={{ fontSize: '11px', color: isDark ? '#94A3B8' : '#64748B' }}>Target: {user.nutrition?.targets?.carbs ?? 250}g</span>
                </div>

                <div style={{ padding: '14px', borderRadius: '12px', backgroundColor: isDark ? 'rgba(244, 63, 94, 0.1)' : '#FFF1F2', border: '1px solid rgba(244, 63, 94, 0.25)' }}>
                  <span style={{ fontSize: '11px', fontWeight: '700', color: '#F43F5E' }}>FATS</span>
                  <div style={{ fontSize: '20px', fontWeight: '700', color: isDark ? '#F8FAFC' : '#0F172A', marginTop: '2px' }}>
                    {user.nutrition?.actual?.fats ?? 0}g
                  </div>
                  <span style={{ fontSize: '11px', color: isDark ? '#94A3B8' : '#64748B' }}>Target: {user.nutrition?.targets?.fats ?? 65}g</span>
                </div>

                <div style={{ padding: '14px', borderRadius: '12px', backgroundColor: isDark ? 'rgba(245, 158, 11, 0.1)' : '#FFFBEB', border: '1px solid rgba(245, 158, 11, 0.25)' }}>
                  <span style={{ fontSize: '11px', fontWeight: '700', color: '#F59E0B' }}>CALORIES</span>
                  <div style={{ fontSize: '20px', fontWeight: '700', color: isDark ? '#F8FAFC' : '#0F172A', marginTop: '2px' }}>
                    {user.nutrition?.actual?.calories ?? 0}
                  </div>
                  <span style={{ fontSize: '11px', color: isDark ? '#94A3B8' : '#64748B' }}>Goal: {user.nutrition?.targets?.calories ?? 2500} kcal</span>
                </div>
              </div>

              {/* Meals Feed */}
              <h4 style={{ fontSize: '14px', fontWeight: '700', color: isDark ? '#F8FAFC' : '#0F172A', marginBottom: '10px' }}>
                Logged Meals Timeline ({user.nutrition?.meals?.length || 0})
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
                {user.nutrition?.meals && user.nutrition.meals.length > 0 ? (
                  user.nutrition.meals.map((m, idx) => (
                    <div
                      key={idx}
                      style={{
                        padding: '12px 14px',
                        borderRadius: '10px',
                        backgroundColor: isDark ? 'rgba(11, 15, 23, 0.6)' : '#F8FAFC',
                        border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(15, 23, 42, 0.05)'}`,
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                        <span style={{ fontWeight: '700', color: '#10B981' }}>{m.category || 'Meal'}</span>
                        <span style={{ fontSize: '11px', color: isDark ? '#64748B' : '#94A3B8' }}>{m.time || 'Logged Today'}</span>
                      </div>
                      <div style={{ fontSize: '12px', color: isDark ? '#F8FAFC' : '#0F172A' }}>
                        {Array.isArray(m.foods) ? m.foods.join(' • ') : 'Balanced meal session'}
                      </div>
                    </div>
                  ))
                ) : (
                  <p style={{ color: isDark ? '#64748B' : '#94A3B8', fontSize: '13px' }}>No meals logged yet for this period.</p>
                )}
              </div>

              {/* Supplements Stack */}
              <h4 style={{ fontSize: '14px', fontWeight: '700', color: isDark ? '#F8FAFC' : '#0F172A', marginBottom: '10px' }}>
                Daily Anabolic Supplement Stack
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                {user.nutrition?.supplements && user.nutrition.supplements.length > 0 ? (
                  user.nutrition.supplements.map((s, idx) => (
                    <div
                      key={idx}
                      style={{
                        padding: '10px 14px',
                        borderRadius: '10px',
                        backgroundColor: isDark ? 'rgba(16, 185, 129, 0.05)' : '#F0FDF4',
                        border: '1px solid rgba(16, 185, 129, 0.2)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <div>
                        <div style={{ fontWeight: '700', fontSize: '13px', color: isDark ? '#F8FAFC' : '#0F172A' }}>
                          {s.name}
                        </div>
                        <div style={{ fontSize: '11px', color: isDark ? '#94A3B8' : '#64748B' }}>{s.dosage}</div>
                      </div>
                      <CheckCircle2 size={18} color={s.taken ? '#10B981' : '#64748B'} />
                    </div>
                  ))
                ) : (
                  <p style={{ color: isDark ? '#64748B' : '#94A3B8', fontSize: '13px' }}>No active supplement stack logged.</p>
                )}
              </div>
            </div>
          )}

          {/* TAB 3: VITALS & ECG */}
          {activeTab === 'vitals' && (
            <div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '20px' }}>
                <div style={{ padding: '14px', borderRadius: '12px', backgroundColor: isDark ? 'rgba(255, 255, 255, 0.03)' : '#F1F5F9', border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(15, 23, 42, 0.06)'}` }}>
                  <span style={{ fontSize: '10px', fontWeight: '700', color: '#F43F5E' }}>HEART RATE & HRV</span>
                  <div style={{ fontSize: '20px', fontWeight: '700', color: isDark ? '#F8FAFC' : '#0F172A', marginTop: '2px' }}>
                    {user.vitals?.heartRate?.current ?? 68} bpm / {user.vitals?.heartRate?.hrv ?? 75} ms
                  </div>
                  <span style={{ fontSize: '11px', color: '#10B981' }}>Resting: {user.vitals?.heartRate?.resting ?? 58} bpm</span>
                </div>

                <div style={{ padding: '14px', borderRadius: '12px', backgroundColor: isDark ? 'rgba(255, 255, 255, 0.03)' : '#F1F5F9', border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(15, 23, 42, 0.06)'}` }}>
                  <span style={{ fontSize: '10px', fontWeight: '700', color: '#0EA5E9' }}>BLOOD PRESSURE</span>
                  <div style={{ fontSize: '20px', fontWeight: '700', color: isDark ? '#F8FAFC' : '#0F172A', marginTop: '2px' }}>
                    {user.vitals?.bloodPressure?.systolic ?? 120}/{user.vitals?.bloodPressure?.diastolic ?? 80} mmHg
                  </div>
                  <span style={{ fontSize: '11px', color: isDark ? '#94A3B8' : '#64748B' }}>MAP: {user.vitals?.bloodPressure?.map ?? 93} • {user.vitals?.bloodPressure?.category || 'Optimal'}</span>
                </div>

                <div style={{ padding: '14px', borderRadius: '12px', backgroundColor: isDark ? 'rgba(255, 255, 255, 0.03)' : '#F1F5F9', border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(15, 23, 42, 0.06)'}` }}>
                  <span style={{ fontSize: '10px', fontWeight: '700', color: '#8B5CF6' }}>GLUCOSE & OXYGEN</span>
                  <div style={{ fontSize: '20px', fontWeight: '700', color: isDark ? '#F8FAFC' : '#0F172A', marginTop: '2px' }}>
                    {user.vitals?.bloodGlucose?.value ?? 92} mg/dL • {user.vitals?.oxygen?.value ?? 99}%
                  </div>
                  <span style={{ fontSize: '11px', color: isDark ? '#94A3B8' : '#64748B' }}>{user.vitals?.bloodGlucose?.state || 'Normal'}</span>
                </div>
              </div>

              {/* ECG Records */}
              <h4 style={{ fontSize: '14px', fontWeight: '700', color: isDark ? '#F8FAFC' : '#0F172A', marginBottom: '10px' }}>
                Single-Lead ECG Records ({user.vitals?.ecgRecords?.length || 0})
              </h4>
              {!user.vitals?.ecgRecords || user.vitals?.ecgRecords?.length === 0 ? (
                <p style={{ color: isDark ? '#64748B' : '#94A3B8', fontSize: '13px' }}>No ECG records saved for this user.</p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {user.vitals?.ecgRecords?.map((r) => (
                    <div
                      key={r.id || r._id}
                      style={{
                        padding: '12px 16px',
                        borderRadius: '10px',
                        backgroundColor: isDark ? 'rgba(16, 185, 129, 0.05)' : '#F0FDF4',
                        border: '1px solid rgba(16, 185, 129, 0.2)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <div>
                        <div style={{ fontWeight: '700', color: isDark ? '#F8FAFC' : '#0F172A' }}>
                          {r.title || 'ECG Clinical Trace'}
                        </div>
                        <div style={{ fontSize: '12px', color: '#10B981', marginTop: '2px' }}>
                          {r.rhythm || 'Normal Sinus Rhythm'} • {r.bpm || 60} bpm • QTc: {r.qtc || 410}ms
                        </div>
                      </div>
                      <span style={{ fontSize: '11px', color: isDark ? '#94A3B8' : '#64748B' }}>{r.time || 'Today'}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: SLEEP */}
          {activeTab === 'sleep' && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                <div>
                  <span style={{ fontSize: '11px', fontWeight: '700', color: '#8B5CF6' }}>NOCTURNAL RESTORATION</span>
                  <h3 style={{ fontSize: '20px', fontWeight: '700', color: isDark ? '#F8FAFC' : '#0F172A' }}>
                    {user.sleep?.duration || '8h 12m'} Total Duration • Score: {user.sleep?.score ?? 89}/100
                  </h3>
                </div>
                <div style={{ fontSize: '12px', color: isDark ? '#94A3B8' : '#64748B' }}>
                  {user.sleep?.bedtime || '10:45 PM'} → {user.sleep?.wakeTime || '07:00 AM'}
                </div>
              </div>

              {/* Hypnogram Stages */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', marginTop: '14px' }}>
                {[
                  { label: 'SLOW-WAVE DEEP', pct: user.sleep?.deepPct ?? 22, col: '#8B5CF6' },
                  { label: 'REM SLEEP', pct: user.sleep?.remPct ?? 24, col: '#0EA5E9' },
                  { label: 'LIGHT SLEEP', pct: user.sleep?.lightPct ?? 48, col: '#10B981' },
                  { label: 'AWAKE TIME', pct: user.sleep?.awakePct ?? 6, col: '#F43F5E' },
                ].map((st, i) => (
                  <div
                    key={i}
                    style={{
                      padding: '12px',
                      borderRadius: '10px',
                      backgroundColor: isDark ? 'rgba(255, 255, 255, 0.03)' : '#F1F5F9',
                      border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(15, 23, 42, 0.06)'}`,
                    }}
                  >
                    <span style={{ fontSize: '10px', fontWeight: '700', color: st.col }}>{st.label}</span>
                    <div style={{ fontSize: '18px', fontWeight: '700', color: isDark ? '#F8FAFC' : '#0F172A', marginTop: '2px' }}>
                      {st.pct}%
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: ACTIVITY & WORKOUTS */}
          {activeTab === 'activity' && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                <div>
                  <span style={{ fontSize: '11px', fontWeight: '700', color: '#F43F5E' }}>CARDIOVASCULAR STRAIN</span>
                  <h3 style={{ fontSize: '20px', fontWeight: '700', color: isDark ? '#F8FAFC' : '#0F172A' }}>
                    Daily Strain: {user.activity?.strain ?? user.activity?.strainScore ?? 14.8}/21 • {user.activity?.caloriesBurned ?? user.activity?.calories ?? user.activity?.activeCalories ?? 620} kcal
                  </h3>
                </div>
                <Badge label={`${user.activity?.streak ?? 7} Day Streak`} variant="secondary" size="sm" />
              </div>

              <h4 style={{ fontSize: '14px', fontWeight: '700', color: isDark ? '#F8FAFC' : '#0F172A', marginBottom: '10px' }}>
                Completed Exercise Sessions ({user.activity?.workouts?.length || 0})
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {user.activity?.workouts && user.activity.workouts.length > 0 ? (
                  user.activity.workouts.map((w, idx) => (
                    <div
                      key={idx}
                      style={{
                        padding: '14px',
                        borderRadius: '10px',
                        backgroundColor: isDark ? 'rgba(244, 63, 94, 0.05)' : '#FFF1F2',
                        border: '1px solid rgba(244, 63, 94, 0.2)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <div>
                        <div style={{ fontWeight: '700', color: isDark ? '#F8FAFC' : '#0F172A' }}>
                          {w.name || w.type || 'Workout Session'}
                        </div>
                        <div style={{ fontSize: '12px', color: isDark ? '#94A3B8' : '#64748B', marginTop: '2px' }}>
                          {w.duration || '45 mins'} • {w.calories || 350} kcal • Avg HR: {w.avgHr || w.avgBpm || 135} bpm • Peak: {w.maxHr || w.maxBpm || 165} bpm
                        </div>
                      </div>
                      <Flame size={20} color="#F43F5E" />
                    </div>
                  ))
                ) : (
                  <p style={{ color: isDark ? '#64748B' : '#94A3B8', fontSize: '13px' }}>No workouts logged today.</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

