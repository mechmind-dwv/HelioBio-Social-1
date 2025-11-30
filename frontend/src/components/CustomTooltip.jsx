import React from 'react';

export const CustomTooltip = ({ active, payload, label, type = 'default' }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        backgroundColor: 'rgba(17, 24, 39, 0.95)',
        border: '1px solid #06b6d4',
        borderRadius: '0.5rem',
        padding: '1rem',
        color: 'white',
        fontSize: '0.875rem',
        backdropFilter: 'blur(8px)'
      }}>
        <p style={{ margin: '0 0 0.5rem 0', fontWeight: 'bold', color: '#06b6d4' }}>
          {label}
        </p>
        {payload.map((entry, index) => (
          <p key={index} style={{ 
            margin: '0.25rem 0', 
            color: entry.color,
            display: 'flex',
            justifyContent: 'space-between',
            gap: '1rem'
          }}>
            <span>{entry.name}:</span>
            <span style={{ fontFamily: 'monospace', fontWeight: 'bold' }}>
              {typeof entry.value === 'number' ? entry.value.toFixed(2) : entry.value}
            </span>
          </p>
        ))}
        {type === 'solar' && (
          <div style={{ 
            marginTop: '0.5rem', 
            paddingTop: '0.5rem', 
            borderTop: '1px solid #374151',
            fontSize: '0.75rem',
            color: '#9ca3af'
          }}>
            🌞 Solar Activity Metrics
          </div>
        )}
        {type === 'social' && (
          <div style={{ 
            marginTop: '0.5rem', 
            paddingTop: '0.5rem', 
            borderTop: '1px solid #374151',
            fontSize: '0.75rem',
            color: '#9ca3af'
          }}>
            🧠 Social Metrics
          </div>
        )}
      </div>
    );
  }
  return null;
};
