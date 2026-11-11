import React from 'react';

export default function Badge({ label, variant = 'primary', size = 'sm' }) {
  const stylesByVariant = {
    primary: {
      bg: 'rgba(16, 185, 129, 0.15)',
      color: '#10B981',
      border: 'rgba(16, 185, 129, 0.3)',
    },
    secondary: {
      bg: 'rgba(244, 63, 94, 0.15)',
      color: '#F43F5E',
      border: 'rgba(244, 63, 94, 0.3)',
    },
    tertiary: {
      bg: 'rgba(14, 165, 233, 0.15)',
      color: '#0EA5E9',
      border: 'rgba(14, 165, 233, 0.3)',
    },
    accent: {
      bg: 'rgba(139, 92, 246, 0.15)',
      color: '#8B5CF6',
      border: 'rgba(139, 92, 246, 0.3)',
    },
    warning: {
      bg: 'rgba(245, 158, 11, 0.15)',
      color: '#F59E0B',
      border: 'rgba(245, 158, 11, 0.3)',
    },
    muted: {
      bg: 'rgba(148, 163, 184, 0.1)',
      color: '#94A3B8',
      border: 'rgba(148, 163, 184, 0.2)',
    },
  };

  const style = stylesByVariant[variant] || stylesByVariant.primary;
  const isSmall = size === 'sm';

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: isSmall ? '2px 8px' : '4px 12px',
        borderRadius: '9999px',
        fontSize: isSmall ? '11px' : '13px',
        fontWeight: '600',
        letterSpacing: '0.3px',
        backgroundColor: style.bg,
        color: style.color,
        border: `1px solid ${style.border}`,
        textTransform: 'uppercase',
      }}
    >
      <span
        style={{
          width: '5px',
          height: '5px',
          borderRadius: '50%',
          backgroundColor: style.color,
          marginRight: '6px',
        }}
      />
      {label}
    </span>
  );
}

