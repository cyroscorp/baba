// Toggle.tsx
import React, { useState } from 'react';
import type { FC } from 'react';

export const Toggle: FC = function Toggle() {
  const [showIframe, setShowIframe] = useState<boolean>(false);

  const toggleIframe = (): void => {
    setShowIframe(!showIframe);
  };

  return (
    <>
      <button onClick={toggleIframe}>
        {showIframe ? 'Close iFrame' : 'Open iFrame'}
      </button>
      {showIframe && (
        <div style={popupStyle}>
          <div style={iframeContainerStyle}>
            <button onClick={toggleIframe} style={closeButtonStyle}>
              X
            </button>
            <iframe
              src="https://example.com"
              title="Iframe Popup"
              style={iframeStyle}
            ></iframe>
          </div>
        </div>
      )}
    </>
  );
};

// Define styles
const popupStyle: React.CSSProperties = {
  position: 'fixed',
  top: '0',
  left: '0',
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000,
};

const iframeContainerStyle: React.CSSProperties = {
  position: 'relative',
  width: '80%',
  height: '80%',
  backgroundColor: '#fff',
  borderRadius: '8px',
  overflow: 'hidden',
};

const closeButtonStyle: React.CSSProperties = {
  position: 'absolute',
  top: '10px',
  right: '10px',
  backgroundColor: 'red',
  color: '#fff',
  border: 'none',
  borderRadius: '50%',
  width: '30px',
  height: '30px',
  cursor: 'pointer',
  zIndex: 1001,
};

const iframeStyle: React.CSSProperties = {
  width: '100%',
  height: '100%',
  border: 'none',
};
