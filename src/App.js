import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation'
import Introduction from './components/introduction'
import About from './components/about'
import Projects from './components/projects'
import Timeline from './components/timeline'
import Footer from './components/Footer'

class App extends Component {
  render() {
    return (
      <div style={{
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        background: '#FFFFFF',
        minHeight: '100vh'
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
}

export default App;
