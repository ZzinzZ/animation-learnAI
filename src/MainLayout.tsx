import React, { useEffect, useState } from "react";
import { ThemeProvider } from "./contexts/ThemeContext";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { Outlet } from "react-router-dom";
import { WavyBackground } from "./components/WavyBackground";


function MainLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <ThemeProvider>
        <WavyBackground>
          <div className="min-h-screen text-theme-text transition-colors duration-200 ">
          <Header
            sidebarCollapsed={sidebarCollapsed}
            setSidebarCollapsed={setSidebarCollapsed}
          />

          <div className="flex">
            <Sidebar collapsed={sidebarCollapsed} />

            <main
              className={`flex-1 transition-all duration-300 ${
                sidebarCollapsed ? "ml-16" : "ml-64"
              }`}
            >
              <Outlet />
            </main>
          </div>
        </div>
        </WavyBackground>
    </ThemeProvider>
  );
}

export default MainLayout;
