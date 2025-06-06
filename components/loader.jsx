import React from 'react';

const Loader = ({
  size = 72,
  speed = 1.5,
  label = 'Loading...',
  showLabel = true,
}) => {
  const ringStyle = {
    width: size,
    height: size,
    border: `${size * 0.08}px solid white`,
    borderRadius: '50%',
    animation: `pulse ${2 / speed}s ease-in-out infinite`,
    boxSizing: 'border-box',
  };

  const styleSheet = `
    @keyframes pulse {
      0%, 100% {
        transform: scale(0.9);
        opacity: 0.6;
      }
      50% {
        transform: scale(1.1);
        opacity: 1;
      }
    }
  `;

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '1rem',
      fontFamily: 'system-ui, sans-serif',
    }}>
      <style>{styleSheet}</style>
      <div style={ringStyle}></div>
      {showLabel && (
        <span style={{
          fontSize: '0.75rem',
          color: '#ccc',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
        }}>
          {label}
        </span>
      )}
    </div>
  );
};

export default Loader;
