import React, { useState } from 'react';
import { Utensils, Flame, Dumbbell, Zap, Scale, Plus, CheckCircle2, ChevronRight, Apple } from 'lucide-react';
import Badge from '../common/Badge';

export default function NutritionTelemetryInspector({ users = [], isDark = true }) {
  const [selectedUser, setSelectedUser] = useState(users[0] || null);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '20px' }}>
      {/* Left Athlete Selector */}
      <div
        className="glass-panel"
        style={{
          padding: '20px',
          backgroundColor: isDark ? 'rgba(19, 27, 42, 0.75)' : '#FFFFFF',
          border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(15, 23, 42, 0.08)'}`,
          height: 'fit-content',
        }}
      >
        <span style={{ fontSize: '11px', fontWeight: '700', letterSpacing: '1px', textTransform: 'uppercase', color: '#10B981' }}>
          ATHLETE MACRO PROFILES
        </span>
        <h3 style={{ fontSize: '18px', fontWeight: '700', color: isDark ? '#F8FAFC' : '#0F172A', marginTop: '2px', marginBottom: '14px' }}>
          Select Athlete ({users.length})
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {users.map((u) => {
            const isSelected = selectedUser?.id === u.id;
            return (
              <button
                key={u.id}
                onClick={() => setSelectedUser(u)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 14px',
                  borderRadius: '12px',
                  backgroundColor: isSelected
                    ? isDark ? 'rgba(16, 185, 129, 0.15)' : '#F0FDF4'
                    : isDark ? 'rgba(255, 255, 255, 0.02)' : '#F8FAFC',
                  border: isSelected
                    ? '1.5px solid #10B981'
                    : `1px solid ${isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(15, 23, 42, 0.05)'}`,
                  textAlign: 'left',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <img src={u.avatar} alt={u.name} style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }} />
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: '700', color: isDark ? '#F8FAFC' : '#0F172A' }}>
                      {u.name}
                    </div>
                    <div style={{ fontSize: '11px', color: '#10B981', fontWeight: '600' }}>
                      {u.nutrition?.phase || 'LEAN HYPERTROPHY'}
                    </div>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '12px', fontWeight: '700', color: '#F59E0B' }}>
                    {u.nutrition?.actual?.protein}g P
                  </div>
                  <div style={{ fontSize: '10px', color: isDark ? '#64748B' : '#94A3B8' }}>
                    {u.nutrition?.actual?.calories} kcal
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Right Detailed Nutrition Telemetry Inspector */}
      {selectedUser && (
        <div
          className="glass-panel"
          style={{
            padding: '24px',
            backgroundColor: isDark ? 'rgba(19, 27, 42, 0.75)' : '#FFFFFF',
            border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(15, 23, 42, 0.08)'}`,
          }}
        >
          {/* Header Banner */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
            <div>
              <span style={{ fontSize: '11px', fontWeight: '700', letterSpacing: '1px', textTransform: 'uppercase', color: '#10B981' }}>
                DAILY ANABOLIC INTAKE TELEMETRY
              </span>
              <h2 style={{ fontSize: '22px', fontWeight: '700', color: isDark ? '#F8FAFC' : '#0F172A', marginTop: '2px' }}>
                {selectedUser.name} — {selectedUser.nutrition?.phase}
              </h2>
            </div>
            <Badge label={selectedUser.nutrition?.proteinRatio || '3.0g / kg BW'} variant="primary" size="md" />
          </div>

          {/* Caloric & Macronutrient Gauges */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px', marginBottom: '24px' }}>
            {[
              { label: 'PROTEIN', actual: selectedUser.nutrition?.actual?.protein, target: selectedUser.nutrition?.targets?.protein, unit: 'g', col: '#10B981', bg: 'rgba(16, 185, 129, 0.1)' },
              { label: 'CARBOHYDRATES', actual: selectedUser.nutrition?.actual?.carbs, target: selectedUser.nutrition?.targets?.carbs, unit: 'g', col: '#0EA5E9', bg: 'rgba(14, 165, 233, 0.1)' },
              { label: 'FATS', actual: selectedUser.nutrition?.actual?.fats, target: selectedUser.nutrition?.targets?.fats, unit: 'g', col: '#F43F5E', bg: 'rgba(244, 63, 94, 0.1)' },
              { label: 'CALORIES', actual: selectedUser.nutrition?.actual?.calories, target: selectedUser.nutrition?.targets?.calories, unit: 'kcal', col: '#F59E0B', bg: 'rgba(245, 158, 11, 0.1)' },
            ].map((m, idx) => {
              const pct = Math.min(100, Math.round((m.actual / (m.target || 1)) * 100));
              return (
                <div
                  key={idx}
                  style={{
                    padding: '16px',
                    borderRadius: '14px',
                    backgroundColor: m.bg,
                    border: `1px solid ${m.col}33`,
                  }}
                >
                  <span style={{ fontSize: '11px', fontWeight: '700', color: m.col }}>{m.label}</span>
                  <div style={{ fontSize: '24px', fontWeight: '700', color: isDark ? '#F8FAFC' : '#0F172A', marginTop: '4px' }}>
                    {m.actual} <span style={{ fontSize: '13px', color: isDark ? '#94A3B8' : '#64748B' }}>{m.unit}</span>
                  </div>
                  <div style={{ fontSize: '11px', color: isDark ? '#94A3B8' : '#64748B', marginBottom: '8px' }}>
                    Goal: {m.target} {m.unit} ({pct}%)
                  </div>
                  <div style={{ height: '5px', borderRadius: '3px', backgroundColor: 'rgba(255, 255, 255, 0.1)', overflow: 'hidden' }}>
                    <div style={{ width: `${pct}%`, height: '100%', backgroundColor: m.col, borderRadius: '3px' }} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Micronutrients: Fiber & Sodium */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '14px',
              padding: '16px',
              borderRadius: '12px',
              backgroundColor: isDark ? 'rgba(11, 15, 23, 0.6)' : '#F8FAFC',
              border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(15, 23, 42, 0.05)'}`,
              marginBottom: '24px',
            }}
          >
            <div>
              <span style={{ fontSize: '11px', fontWeight: '700', color: '#8B5CF6' }}>DIETARY FIBER (SATIETY & DIGESTION)</span>
              <div style={{ fontSize: '18px', fontWeight: '700', color: isDark ? '#F8FAFC' : '#0F172A', marginTop: '2px' }}>
                {selectedUser.nutrition?.actual?.fiber}g <span style={{ fontSize: '12px', color: isDark ? '#94A3B8' : '#64748B' }}>/ {selectedUser.nutrition?.targets?.fiber}g target</span>
              </div>
            </div>

            <div>
              <span style={{ fontSize: '11px', fontWeight: '700', color: '#0EA5E9' }}>INTRA-CELLULAR SODIUM (VASCULARITY & PUMP)</span>
              <div style={{ fontSize: '18px', fontWeight: '700', color: isDark ? '#F8FAFC' : '#0F172A', marginTop: '2px' }}>
                {selectedUser.nutrition?.actual?.sodium}mg <span style={{ fontSize: '12px', color: isDark ? '#94A3B8' : '#64748B' }}>/ {selectedUser.nutrition?.targets?.sodium}mg target</span>
              </div>
            </div>
          </div>

          {/* Meals List */}
          <h3 style={{ fontSize: '16px', fontWeight: '700', color: isDark ? '#F8FAFC' : '#0F172A', marginBottom: '12px' }}>
            Athlete Meal Log Entries ({selectedUser.nutrition?.meals?.length || 0})
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {selectedUser.nutrition?.meals?.map((meal, index) => (
              <div
                key={index}
                style={{
                  padding: '14px',
                  borderRadius: '12px',
                  backgroundColor: isDark ? 'rgba(255, 255, 255, 0.02)' : '#F1F5F9',
                  border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(15, 23, 42, 0.06)'}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontWeight: '700', color: '#10B981', fontSize: '14px' }}>{meal.category}</span>
                    <span style={{ fontSize: '11px', color: isDark ? '#64748B' : '#94A3B8' }}>{meal.time}</span>
                  </div>
                  <div style={{ fontSize: '13px', color: isDark ? '#F8FAFC' : '#0F172A', marginTop: '4px' }}>
                    {meal.foods.join(' • ')}
                  </div>
                </div>
                <Utensils size={18} color="#10B981" />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

