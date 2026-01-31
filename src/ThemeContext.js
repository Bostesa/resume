import { createContext, useContext, useState, useEffect } from 'react';

// ==================== COLOR THEMES ====================
export const themes = {
  cyber: {
    name: 'Cyber',
    primary: '#00f5ff',      // Electric cyan
    secondary: '#bf00ff',    // Vivid magenta
    accent: '#39ff14',       // Neon green
    highlight: '#ff006e',    // Hot pink
    warm: '#ffbe0b',         // Golden yellow
    success: '#00ff88',      // Mint
    glow: '#8b5cf6',         // Purple glow
    text: '#ffffff',
    muted: '#a0aec0',
    bg: '#0a0a1f',
    bgGradient: 'linear-gradient(180deg, #0a0a1f 0%, #1a0a2e 50%, #0a0a1f 100%)'
  },
  ocean: {
    name: 'Ocean',
    primary: '#0ea5e9',      // Sky blue
    secondary: '#6366f1',    // Indigo
    accent: '#14b8a6',       // Teal
    highlight: '#f472b6',    // Pink
    warm: '#38bdf8',         // Light blue
    success: '#22d3ee',      // Cyan
    glow: '#818cf8',         // Light indigo
    text: '#f0f9ff',
    muted: '#7dd3fc',
    bg: '#0c1929',
    bgGradient: 'linear-gradient(180deg, #0c1929 0%, #0f172a 50%, #0c1929 100%)'
  },
  sunset: {
    name: 'Sunset',
    primary: '#f97316',      // Orange
    secondary: '#ec4899',    // Pink
    accent: '#fbbf24',       // Amber
    highlight: '#f43f5e',    // Rose
    warm: '#fb923c',         // Light orange
    success: '#facc15',      // Yellow
    glow: '#f472b6',         // Pink glow
    text: '#fef3c7',
    muted: '#fdba74',
    bg: '#1c0a1a',
    bgGradient: 'linear-gradient(180deg, #1c0a1a 0%, #2d1a24 50%, #1c0a1a 100%)'
  },
  aurora: {
    name: 'Aurora',
    primary: '#a855f7',      // Purple
    secondary: '#22d3ee',    // Cyan
    accent: '#4ade80',       // Green
    highlight: '#f472b6',    // Pink
    warm: '#c084fc',         // Light purple
    success: '#34d399',      // Emerald
    glow: '#67e8f9',         // Light cyan
    text: '#f5f3ff',
    muted: '#c4b5fd',
    bg: '#0f0f23',
    bgGradient: 'linear-gradient(180deg, #0f0f23 0%, #1a1a3e 50%, #0f0f23 100%)'
  },
  midnight: {
    name: 'Midnight',
    primary: '#6366f1',      // Indigo
    secondary: '#8b5cf6',    // Violet
    accent: '#06b6d4',       // Cyan
    highlight: '#f43f5e',    // Rose
    warm: '#f59e0b',         // Amber
    success: '#10b981',      // Emerald
    glow: '#a855f7',         // Purple
    text: '#f8fafc',
    muted: '#94a3b8',
    bg: '#08081a',
    bgGradient: 'linear-gradient(180deg, #08081a 0%, #0d0d26 50%, #08081a 100%)'
  },
  forest: {
    name: 'Forest',
    primary: '#22c55e',      // Green
    secondary: '#84cc16',    // Lime
    accent: '#14b8a6',       // Teal
    highlight: '#f59e0b',    // Amber
    warm: '#65a30d',         // Olive
    success: '#10b981',      // Emerald
    glow: '#4ade80',         // Light green
    text: '#f0fdf4',
    muted: '#86efac',
    bg: '#0a1a0f',
    bgGradient: 'linear-gradient(180deg, #0a1a0f 0%, #14291a 50%, #0a1a0f 100%)'
  },
  ruby: {
    name: 'Ruby',
    primary: '#ef4444',      // Red
    secondary: '#f43f5e',    // Rose
    accent: '#fb7185',       // Light rose
    highlight: '#fbbf24',    // Amber
    warm: '#f87171',         // Light red
    success: '#f97316',      // Orange
    glow: '#ec4899',         // Pink
    text: '#fef2f2',
    muted: '#fca5a5',
    bg: '#1a0a0a',
    bgGradient: 'linear-gradient(180deg, #1a0a0a 0%, #2a1515 50%, #1a0a0a 100%)'
  },
  gold: {
    name: 'Gold',
    primary: '#fbbf24',      // Amber
    secondary: '#f59e0b',    // Orange-amber
    accent: '#eab308',       // Yellow
    highlight: '#fcd34d',    // Light amber
    warm: '#facc15',         // Yellow
    success: '#fde047',      // Light yellow
    glow: '#fbbf24',         // Amber glow
    text: '#fefce8',
    muted: '#fde68a',
    bg: '#1a1408',
    bgGradient: 'linear-gradient(180deg, #1a1408 0%, #2a2010 50%, #1a1408 100%)'
  },
  synthwave: {
    name: 'Synthwave',
    primary: '#ff00ff',      // Magenta
    secondary: '#00ffff',    // Cyan
    accent: '#ff6ec7',       // Hot pink
    highlight: '#ffff00',    // Yellow
    warm: '#ff1493',         // Deep pink
    success: '#39ff14',      // Neon green
    glow: '#bc13fe',         // Electric purple
    text: '#ffffff',
    muted: '#ff69b4',
    bg: '#0d0221',
    bgGradient: 'linear-gradient(180deg, #0d0221 0%, #1a0533 50%, #0d0221 100%)'
  },
  ice: {
    name: 'Ice',
    primary: '#a5f3fc',      // Light cyan
    secondary: '#e0f2fe',    // Light blue
    accent: '#bae6fd',       // Sky blue
    highlight: '#f0f9ff',    // Ice white
    warm: '#7dd3fc',         // Light sky
    success: '#67e8f9',      // Cyan
    glow: '#22d3ee',         // Bright cyan
    text: '#f0f9ff',
    muted: '#bae6fd',
    bg: '#0c1929',
    bgGradient: 'linear-gradient(180deg, #0c1929 0%, #0f2744 50%, #0c1929 100%)'
  },
  volcano: {
    name: 'Volcano',
    primary: '#ff4500',      // Orange-red
    secondary: '#ff6b35',    // Light orange
    accent: '#ffbe0b',       // Golden
    highlight: '#ff0000',    // Pure red
    warm: '#ff8c00',         // Dark orange
    success: '#ffa500',      // Orange
    glow: '#ff4444',         // Red glow
    text: '#fff5ee',
    muted: '#ffb088',
    bg: '#1a0a05',
    bgGradient: 'linear-gradient(180deg, #1a0a05 0%, #2d1508 50%, #1a0a05 100%)'
  }
};

// Theme context
const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  // Load saved theme from localStorage or default to 'cyber'
  const [currentTheme, setCurrentTheme] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved && themes[saved] ? saved : 'cyber';
  });
  const colors = themes[currentTheme];

  // Save theme to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('theme', currentTheme);
  }, [currentTheme]);

  return (
    <ThemeContext.Provider value={{ colors, currentTheme, setTheme: setCurrentTheme, themes }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
