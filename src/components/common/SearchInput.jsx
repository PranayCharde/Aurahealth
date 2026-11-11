import React from 'react';
import { Search, X } from 'lucide-react';

export default function SearchInput({ value, onChange, placeholder = 'Search users, emails, goals...', isDark = true }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        backgroundColor: isDark ? 'rgba(11, 15, 23, 0.8)' : '#F1F5F9',
        border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(15, 23, 42, 0.12)'}`,
        borderRadius: '12px',
        padding: '8px 14px',
        width: '100%',
        maxWidth: '380px',
        transition: 'border-color 0.2s',
      }}
    >
      <Search size={18} color={isDark ? '#64748B' : '#94A3B8'} style={{ marginRight: '8px', flexShrink: 0 }} />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          background: 'transparent',
          border: 'none',
          color: isDark ? '#F8FAFC' : '#0F172A',
          fontSize: '13px',
          width: '100%',
        }}
      />
      {value && (
        <button
          onClick={() => onChange('')}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <X size={15} color={isDark ? '#94A3B8' : '#64748B'} />
        </button>
      )}
    </div>
  );
}
