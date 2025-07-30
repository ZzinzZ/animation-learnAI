import React, { useState, useEffect } from "react";
import { Settings, LogOut } from "lucide-react";
import WebcamIndicator from "./WebcamIndicator";

interface HeaderProps {
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({
  sidebarCollapsed,
  setSidebarCollapsed,
}) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [userName] = useState("Alex Chen"); // In a real app, this would come from auth

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  return (
    <header className="w-[100vw] backdrop-blur-md bg-white/25 border-b border-theme-border h-16 flex items-center justify-between px-6 sticky top-0 z-40">
      <div className="flex items-center space-x-4">
        <button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className="p-2 hover:bg-theme-hover rounded-lg transition-colors lg:hidden"
        >
          <div className="w-5 h-5 flex flex-col justify-between">
            <span className="h-0.5 bg-current"></span>
            <span className="h-0.5 bg-current"></span>
            <span className="h-0.5 bg-current"></span>
          </div>
        </button>

        <div className="flex items-center space-x-2">
          <h1 className="text-2xl font-bold text-theme-primary">LearnAI</h1>
          <span className="text-sm text-theme-muted hidden sm:inline">
            Your Path to Mastery
          </span>
        </div>
      </div>

      <div className="flex items-center space-x-6">
        <div className="text-center hidden md:block">
          <h2 className="text-lg font-semibold">
            {getGreeting()}, {userName}!
          </h2>
          <p className="text-sm text-theme-muted section-title-text">
            Ready to continue learning?
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <WebcamIndicator />

          <button className="p-2 hover:bg-theme-hover rounded-full transition-colors">
            <Settings className="w-5 h-5" />
          </button>

          <button className="p-2 hover:bg-theme-hover rounded-full transition-colors">
            <LogOut className="w-5 h-5" />
          </button>

          <div className="w-10 h-10 bg-theme-primary rounded-full flex items-center justify-center text-white font-semibold">
            AC
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
