import React from 'react';
import './App.css';
import { ThemeProvider, useTheme } from './ThemeContext';
import Navigation from './components/Navigation'
import Introduction from './components/introduction'
import About from './components/about'
import Projects from './components/projects'
import Timeline from './components/timeline'
import Footer from './components/Footer'

function AppContent() {
  const { colors } = useTheme();

  return (
    <div style={{
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      background: colors.bgGradient,
      minHeight: '100vh',
      transition: 'background 0.5s ease'
    }}>
      <Navigation />
      <Introduction />
      <About />
      <Projects />
      <Timeline />
      <Footer />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
