
import React, { useState, useEffect } from 'react';

const WebcamIndicator: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [webcamEnabled, setWebcamEnabled] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('webcam-consent');
    setWebcamEnabled(consent === 'true');
    
    if (consent === 'true') {
      // Simulate webcam face detection
      const interval = setInterval(() => {
        setIsActive(Math.random() > 0.3); // 70% chance of face being detected
      }, 2000);
      
      return () => clearInterval(interval);
    }
  }, []);

  if (!webcamEnabled) return null;

  return (
    <div className="relative group">
      <div className={`w-3 h-3 rounded-full transition-all duration-300 ${
        isActive 
          ? 'bg-green-500 shadow-green-500/50 shadow-lg animate-pulse' 
          : 'bg-gray-400'
      }`} />
      
      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        {isActive ? 'Personalization Active' : 'Face Not Detected'}
      </div>
    </div>
  );
};

export default WebcamIndicator;
