import React from 'react';

interface GTMEventData {
  event: string;
  category: string;
  action: string;
  label: string;
  value: number;
  timestamp: string;
  debug: boolean;
}

declare global {
  interface Window {
    dataLayer: Record<string, any>[];
  }
}

const ButtonClickTracker: React.FC = () => {
  const handleButtonClick = () => {
    try {
      const eventData: GTMEventData = {
        event: 'button_click',
        category: 'Button',
        action: 'Click',
        label: 'Test Button Click',
        value: 1,
        timestamp: new Date().toISOString(),
        debug: true
      };

      window.dataLayer = window.dataLayer || [];

      window.dataLayer.push(eventData);

      console.group('[GTM Debug] Button Click Event');
      console.log('📤 Pushed to dataLayer:', eventData);
      console.log('📋 Current dataLayer state:', window.dataLayer);
      console.trace('🔍 Click stack trace:');
      console.groupEnd();
    } catch (err) {
      console.error('Error pushing to dataLayer:', err);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <button onClick={handleButtonClick} style={{ padding: '1rem 2rem', fontSize: '1.2rem' }}>
        Click Me to Track (With Debug)
      </button>
    </div>
  );
};

export default ButtonClickTracker;
