import { useState, useEffect } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Dashboard from "../components/Dashboard";
import WebcamModal from "../components/WebcamModal";
import { ThemeProvider } from "../contexts/ThemeContext";

const Index = () => {
  const [showWebcamModal, setShowWebcamModal] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    // Check if user has previously consented to webcam
    const hasConsented = localStorage.getItem("webcam-consent");
    if (!hasConsented) {
      setShowWebcamModal(true);
    }
  }, []);

  return (
    <div className="min-h-screen text-theme-text transition-colors duration-200">
      <main className={`flex-1 transition-all duration-300 `}>
        <Dashboard />
      </main>

      {showWebcamModal && (
        <WebcamModal onClose={() => setShowWebcamModal(false)} />
      )}
    </div>
  );
};

export default Index;
