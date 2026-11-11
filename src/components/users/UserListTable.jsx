import React, { useState, useMemo } from 'react';
import { Eye, Edit3, Trash2, ArrowUpDown, Filter, ChevronRight, Activity, Utensils, HeartPulse, Moon } from 'lucide-react';
import Badge from '../common/Badge';

export default function UserListTable({
  users = [],
  searchQuery = '',
  onSelectUser,
  onDeleteUser,
  isDark = true,
}) {
  const [roleFilter, setRoleFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortField, setSortField] = useState('name');
  const [sortAsc, setSortAsc] = useState(true);

  // Extract unique roles
  const roles = ['All', ...new Set(users.map((u) => u.role))];

  // Filtered & Sorted users
  const filteredUsers = useMemo(() => {
    return users
      .filter((user) => {
        const matchesSearch =
          !searchQuery.trim() ||
          user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.profile.goal.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesRole = roleFilter === 'All' || user.role === roleFilter;
        const matchesStatus = statusFilter === 'All' || user.status === statusFilter;

        return matchesSearch && matchesRole && matchesStatus;
      })
      .sort((a, b) => {
        let valA = a[sortField];
        let valB = b[sortField];
        if (sortField === 'readiness') {
          valA = a.composite?.readinessScore || 0;
          valB = b.composite?.readinessScore || 0;
        } else if (sortField === 'protein') {
          valA = a.nutrition?.actual?.protein || 0;
          valB = b.nutrition?.actual?.protein || 0;
        }
        if (valA < valB) return sortAsc ? -1 : 1;
        if (valA > valB) return sortAsc ? 1 : -1;
        return 0;
      });
  }, [users, searchQuery, roleFilter, statusFilter, sortField, sortAsc]);

  const handleSort = (field) => {
    if (sortField === field) setSortAsc(!sortAsc);
    else {
      setSortField(field);
      setSortAsc(true);
    }
  };

  return (
    <div
      className="glass-panel"
      style={{
        padding: '24px',
        backgroundColor: isDark ? 'rgba(19, 27, 42, 0.75)' : '#FFFFFF',
        border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(15, 23, 42, 0.08)'}`,
      }}
    >
      {/* Table Header Controls */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
          marginBottom: '20px',
        }}
      >
        <div>
          <h2 style={{ fontSize: '18px', fontWeight: '700', color: isDark ? '#F8FAFC' : '#0F172A' }}>
            Registered Athletes & Telemetry Directory
          </h2>
          <p style={{ fontSize: '12px', color: isDark ? '#94A3B8' : '#64748B', marginTop: '2px' }}>
            Showing {filteredUsers.length} of {users.length} total athletes in database
          </p>
        </div>

        {/* Filter Pills */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{
              padding: '6px 12px',
              borderRadius: '8px',
              backgroundColor: isDark ? 'rgba(11, 15, 23, 0.8)' : '#F1F5F9',
              border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(15, 23, 42, 0.1)'}`,
              color: isDark ? '#F8FAFC' : '#0F172A',
              fontSize: '12px',
              fontWeight: '600',
            }}
          >
            <option value="All">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>

          {/* Role Filter */}
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            style={{
              padding: '6px 12px',
              borderRadius: '8px',
              backgroundColor: isDark ? 'rgba(11, 15, 23, 0.8)' : '#F1F5F9',
              border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(15, 23, 42, 0.1)'}`,
              color: isDark ? '#F8FAFC' : '#0F172A',
              fontSize: '12px',
              fontWeight: '600',
            }}
          >
            {roles.map((r) => (
              <option key={r} value={r}>
                {r === 'All' ? 'All Roles' : r}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Responsive Table */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr
              style={{
                borderBottom: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(15, 23, 42, 0.08)'}`,
                fontSize: '11px',
                fontWeight: '700',
                letterSpacing: '0.8px',
                textTransform: 'uppercase',
                color: isDark ? '#64748B' : '#94A3B8',
              }}
            >
              <th style={{ padding: '12px 14px', cursor: 'pointer' }} onClick={() => handleSort('name')}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span>Athlete</span>
                  <ArrowUpDown size={12} />
                </div>
              </th>
              <th style={{ padding: '12px 14px' }}>Status</th>
              <th style={{ padding: '12px 14px' }}>Role & Phase</th>
              <th style={{ padding: '12px 14px' }}>Physical Stats</th>
              <th style={{ padding: '12px 14px', cursor: 'pointer' }} onClick={() => handleSort('readiness')}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span>Readiness</span>
                  <ArrowUpDown size={12} />
                </div>
              </th>
              <th style={{ padding: '12px 14px', cursor: 'pointer' }} onClick={() => handleSort('protein')}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span>Protein Target</span>
                  <ArrowUpDown size={12} />
                </div>
              </th>
              <th style={{ padding: '12px 14px' }}>Last Telemetry</th>
              <th style={{ padding: '12px 14px', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan={8} style={{ padding: '40px', textAlign: 'center', color: isDark ? '#64748B' : '#94A3B8' }}>
                  No athletes found matching criteria.
                </td>
              </tr>
            ) : (
              filteredUsers.map((user) => {
                const readiness = user.composite?.readinessScore || 85;
                const readinessColor = readiness >= 90 ? '#10B981' : readiness >= 80 ? '#0EA5E9' : '#F59E0B';
                const proteinActual = user.nutrition?.actual?.protein || 0;
                const proteinTarget = user.nutrition?.targets?.protein || 195;

                return (
                  <tr
                    key={user.id}
                    style={{
                      borderBottom: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.04)' : 'rgba(15, 23, 42, 0.04)'}`,
                      fontSize: '13px',
                      transition: 'background-color 0.15s ease',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = isDark ? 'rgba(255, 255, 255, 0.02)' : '#F8FAFC')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                  >
                    {/* User Profile */}
                    <td style={{ padding: '14px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <img
                          src={user.avatar}
                          alt={user.name}
                          style={{
                            width: '38px',
                            height: '38px',
                            borderRadius: '50%',
                            objectFit: 'cover',
                            border: `2px solid ${readinessColor}`,
                          }}
                        />
                        <div>
                          <div style={{ fontWeight: '700', color: isDark ? '#F8FAFC' : '#0F172A' }}>
                            {user.name}
                          </div>
                          <div style={{ fontSize: '11px', color: isDark ? '#64748B' : '#94A3B8' }}>
                            {user.email}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Status */}
                    <td style={{ padding: '14px' }}>
                      <Badge
                        label={user.status}
                        variant={user.status === 'Active' ? 'primary' : 'muted'}
                        size="sm"
                      />
                    </td>

                    {/* Role & Phase */}
                    <td style={{ padding: '14px' }}>
                      <div style={{ fontWeight: '600', color: isDark ? '#F8FAFC' : '#0F172A' }}>
                        {user.role}
                      </div>
                      <div style={{ fontSize: '11px', color: '#10B981', fontWeight: '600' }}>
                        {user.nutrition?.phase || 'LEAN HYPERTROPHY'}
                      </div>
                    </td>

                    {/* Stats */}
                    <td style={{ padding: '14px' }}>
                      <div style={{ color: isDark ? '#F8FAFC' : '#0F172A' }}>
                        {user.profile.weight} • {user.profile.height}
                      </div>
                      <div style={{ fontSize: '11px', color: isDark ? '#64748B' : '#94A3B8' }}>
                        Age {user.profile.age} • BF: {user.profile.bodyFat || '18%'}
                      </div>
                    </td>

                    {/* Readiness */}
                    <td style={{ padding: '14px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span
                          style={{
                            fontFamily: 'var(--font-heading)',
                            fontWeight: '700',
                            fontSize: '15px',
                            color: readinessColor,
                          }}
                        >
                          {readiness}%
                        </span>
                        <span style={{ fontSize: '11px', color: isDark ? '#64748B' : '#94A3B8' }}>
                          {user.composite?.recoveryStatus || 'Normal'}
                        </span>
                      </div>
                    </td>

                    {/* Protein Target */}
                    <td style={{ padding: '14px' }}>
                      <div style={{ fontWeight: '700', color: '#F59E0B' }}>
                        {proteinActual}g / {proteinTarget}g
                      </div>
                      <div style={{ fontSize: '11px', color: isDark ? '#64748B' : '#94A3B8' }}>
                        {user.nutrition?.proteinRatio || '2.8g/kg'}
                      </div>
                    </td>

                    {/* Last Active */}
                    <td style={{ padding: '14px', fontSize: '12px', color: isDark ? '#94A3B8' : '#64748B' }}>
                      {user.lastActive}
                    </td>

                    {/* Actions */}
                    <td style={{ padding: '14px', textAlign: 'right' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '6px' }}>
                        <button
                          onClick={() => onSelectUser(user)}
                          title="Inspect Telemetry"
                          style={{
                            padding: '6px 10px',
                            borderRadius: '8px',
                            backgroundColor: isDark ? 'rgba(16, 185, 129, 0.15)' : 'rgba(5, 150, 105, 0.12)',
                            color: '#10B981',
                            fontSize: '11px',
                            fontWeight: '700',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                          }}
                        >
                          <Eye size={13} />
                          <span>Inspect</span>
                        </button>

                        <button
                          onClick={() => onDeleteUser(user.id)}
                          title="Remove Athlete"
                          style={{
                            padding: '6px',
                            borderRadius: '8px',
                            backgroundColor: 'transparent',
                            color: '#F43F5E',
                            display: 'flex',
                            alignItems: 'center',
                          }}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

