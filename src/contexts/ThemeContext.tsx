import React, { createContext, useContext, useState, useEffect } from 'react';

export type Theme = 'default' | 'dark' | 'ocean' | 'sunset' | 'forest';

export type ThemeColors = {
  themeBg: string;
  themeSurface: string;
  themeBorder: string;
  themeText: string;
  themeMuted: string;
  themePrimary: string;
  themeHover: string;
};

interface ThemeContextType {
  theme: Theme;
  themeColors: ThemeColors;
  setTheme: (theme: Theme) => void;
  setColors: (colors: ThemeColors) => void;
}

const defaultColors: ThemeColors = {
  themeBg: '#ffffff',
  themeSurface: '#f0f0f0',
  themeBorder: '#e5e7eb',
  themeText: '#111827',
  themeMuted: '#6b7280',
  themePrimary: '#3b82f6',
  themeHover: '#2563eb',
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('default');
  const [themeColors, setThemeColors] = useState<ThemeColors>(defaultColors);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme;
    const savedColor = localStorage.getItem('themeColors');

    if (savedColor) {
      try {
        const parsed = JSON.parse(savedColor);
        if (parsed && typeof parsed === 'object') {
          setThemeColors(parsed);
        }
      } catch (error) {
        console.error('Failed to parse saved colors', error);
      }
    }

    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', theme);
    localStorage.setItem('themeColors', JSON.stringify(themeColors));

    const root = document.documentElement;
    root.className = `theme-${theme}`;
  }, [theme, themeColors]);

  const setColors = (colors: ThemeColors) => {
    setThemeColors(colors);
  };

  return (
    <ThemeContext.Provider value={{ theme, themeColors, setTheme, setColors }}>
      {children}
    </ThemeContext.Provider>
  );
};
