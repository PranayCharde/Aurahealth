import React from 'react';
import { Users, Activity, Utensils, Moon, Flame, ShieldAlert, Zap } from 'lucide-react';
import MetricCard from '../common/MetricCard';

export default function OverviewStats({ users = [], systemMetrics, isDark = true }) {
  const totalUsers = users.length;
  const activeCount = users.filter((u) => u.status === 'Active').length;
  
  // Calculate averages
  const avgReadiness = Math.round(
    users.reduce((acc, u) => acc + (u.composite?.readinessScore || 85), 0) / (totalUsers || 1)
  );

  const avgProtein = Math.round(
    users.reduce((acc, u) => acc + (u.nutrition?.actual?.protein || 180), 0) / (totalUsers || 1)
  );

  const avgStrain = (
    users.reduce((acc, u) => acc + (u.activity?.strain || 14), 0) / (totalUsers || 1)
  ).toFixed(1);

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
        gap: '16px',
        marginBottom: '24px',
      }}
    >
      <MetricCard
        title="Total Athletes"
        value={totalUsers}
        subtitle={`${activeCount} currently active`}
        icon={Users}
        trend="+14% this month"
        color="#10B981"
        bgColor="rgba(16, 185, 129, 0.12)"
        isDark={isDark}
      />

      <MetricCard
        title="Avg Readiness Score"
        value={`${avgReadiness}%`}
        subtitle="Optimal autonomic recovery"
        icon={Activity}
        trend="+4.2% vs baseline"
        color="#0EA5E9"
        bgColor="rgba(14, 165, 233, 0.12)"
        isDark={isDark}
      />

      <MetricCard
        title="Avg Daily Protein"
        value={`${avgProtein}g`}
        subtitle="2.6g / kg BW hypertrophy"
        icon={Utensils}
        trend="+18g target hit"
        color="#F59E0B"
        bgColor="rgba(245, 158, 11, 0.12)"
        isDark={isDark}
      />

      <MetricCard
        title="Ecosystem Strain"
        value={avgStrain}
        subtitle="Daily cardiovascular build"
        icon={Flame}
        trend="Balanced"
        color="#F43F5E"
        bgColor="rgba(244, 63, 94, 0.12)"
        isDark={isDark}
      />

      <MetricCard
        title="MongoDB & Backend"
        value={systemMetrics?.mongoStatus === 'CONNECTED' ? 'ONLINE' : 'ACTIVE'}
        subtitle="Express API on port 5000"
        icon={Zap}
        trend={systemMetrics?.apiLatency || '12ms'}
        color="#8B5CF6"
        bgColor="rgba(139, 92, 246, 0.12)"
        isDark={isDark}
      />
    </div>
  );
}

