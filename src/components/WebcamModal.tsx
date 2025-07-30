
import React, { useState } from 'react';
import { Camera, Shield, X } from 'lucide-react';

interface WebcamModalProps {
  onClose: () => void;
}

const WebcamModal: React.FC<WebcamModalProps> = ({ onClose }) => {
  const [consent, setConsent] = useState<boolean | null>(null);

  const handleConsent = (agree: boolean) => {
    setConsent(agree);
    localStorage.setItem('webcam-consent', agree.toString());
    setTimeout(() => {
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-theme-surface rounded-2xl p-8 max-w-md w-full border border-theme-border">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-theme-primary/20 rounded-xl flex items-center justify-center">
              <Camera className="w-6 h-6 text-theme-primary" />
            </div>
            <h2 className="text-xl font-bold text-theme-text">Enhanced Learning Experience</h2>
          </div>
          <button
            onClick={() => handleConsent(false)}
            className="p-2 hover:bg-theme-hover rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {consent === null && (
          <>
            <div className="mb-6">
              <p className="text-theme-text mb-4">
                To provide you with a more personalized learning experience, LearnAI can use your camera to:
              </p>
              <ul className="space-y-2 text-sm text-theme-muted">
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-theme-primary rounded-full" />
                  <span>Adapt content based on your engagement levels</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-theme-primary rounded-full" />
                  <span>Suggest breaks when you seem tired</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-theme-primary rounded-full" />
                  <span>Provide better learning recommendations</span>
                </li>
              </ul>
            </div>

            <div className="bg-theme-bg rounded-xl p-4 mb-6 border border-theme-border">
              <div className="flex items-center space-x-2 mb-2">
                <Shield className="w-4 h-4 text-green-500" />
                <span className="text-sm font-medium text-theme-text">Privacy Protection</span>
              </div>
              <p className="text-xs text-theme-muted">
                Your camera feed is processed locally and never stored or transmitted. You can disable this feature anytime in settings.
              </p>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => handleConsent(false)}
                className="flex-1 py-3 px-4 border border-theme-border rounded-xl hover:bg-theme-hover transition-colors text-theme-text font-medium"
              >
                No Thanks
              </button>
              <button
                onClick={() => handleConsent(true)}
                className="flex-1 py-3 px-4 bg-theme-primary text-white rounded-xl hover:bg-opacity-90 transition-colors font-medium"
              >
                Enable
              </button>
            </div>
          </>
        )}

        {consent === true && (
          <div className="text-center">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Camera className="w-8 h-8 text-green-500" />
            </div>
            <h3 className="text-lg font-semibold text-theme-text mb-2">Camera Access Enabled</h3>
            <p className="text-theme-muted">Your learning experience is now personalized!</p>
          </div>
        )}

        {consent === false && (
          <div className="text-center">
            <div className="w-16 h-16 bg-theme-bg rounded-full flex items-center justify-center mx-auto mb-4 border border-theme-border">
              <Camera className="w-8 h-8 text-theme-muted" />
            </div>
            <h3 className="text-lg font-semibold text-theme-text mb-2">Camera Access Disabled</h3>
            <p className="text-theme-muted">You can enable this feature anytime in settings.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WebcamModal;
