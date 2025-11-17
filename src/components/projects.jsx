import React, { Component } from 'react'

export default class Projects extends Component {
  render() {
    return (
      <section
        id="projects"
        style={{
          padding: '120px 48px',
          background: '#FAFAFA'
        }}
      >
        <div style={{
          maxWidth: '1100px',
          margin: '0 auto'
        }}>
          {/* Featured Projects Section */}
          <h2 style={{
            fontSize: 'clamp(32px, 4vw, 48px)',
            fontWeight: '600',
            color: '#0A0A0A',
            marginBottom: '64px',
            letterSpacing: '-1px'
          }}>
            Featured Projects
          </h2>

          {/* Projects Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '24px',
            marginBottom: '120px',
            alignItems: 'stretch'
          }}>
            {/* Project 1 - BankBuddy */}
            <a
              href="https://github.com/Bostesa/BankBuddy"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: 'none', display: 'flex' }}
            >
              <div
                style={{
                  padding: '32px',
                  border: '1px solid #E5E5E5',
                  background: '#FFFFFF',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  flex: '1',
                  display: 'flex',
                  flexDirection: 'column',
                  minHeight: '260px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#0A0A0A';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#E5E5E5';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
              <h3 style={{
                fontSize: '18px',
                fontWeight: '600',
                color: '#0A0A0A',
                marginBottom: '12px',
                letterSpacing: '-0.5px'
              }}>
                BankBuddy
              </h3>
              <p style={{
                fontSize: '14px',
                lineHeight: '1.7',
                color: '#6B6B6B',
                marginBottom: '16px'
              }}>
                Personal finance assistant with conversational chat interface. Manage accounts, execute stock trades, and transfer funds using natural language.
              </p>
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '6px'
              }}>
                {['FastAPI', 'Gemini', 'React', 'PostgreSQL'].map((tech) => (
                  <span key={tech} style={{
                    padding: '4px 10px',
                    background: '#FAFAFA',
                    color: '#0A0A0A',
                    fontSize: '11px',
                    fontWeight: '500',
                    border: '1px solid #E5E5E5'
                  }}>
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            </a>

            {/* Project 2 - YouTube Sentiment */}
            <a
              href="https://github.com/Bostesa/youtube-sentiment-analysis"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: 'none', display: 'flex' }}
            >
              <div
                style={{
                  padding: '32px',
                  border: '1px solid #E5E5E5',
                  background: '#FFFFFF',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  flex: '1',
                  display: 'flex',
                  flexDirection: 'column',
                  minHeight: '260px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#0A0A0A';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#E5E5E5';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
              <h3 style={{
                fontSize: '18px',
                fontWeight: '600',
                color: '#0A0A0A',
                marginBottom: '12px',
                letterSpacing: '-0.5px'
              }}>
                YouTube Sentiment Analysis
              </h3>
              <p style={{
                fontSize: '14px',
                lineHeight: '1.7',
                color: '#6B6B6B',
                marginBottom: '16px'
              }}>
                Analyzes YouTube comments using Random Forest and TF-IDF vectorization. Provides sentiment insights for videos, channels, and trending content.
              </p>
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '6px'
              }}>
                {['Flask', 'React', 'scikit-learn', 'Docker'].map((tech) => (
                  <span key={tech} style={{
                    padding: '4px 10px',
                    background: '#FAFAFA',
                    color: '#0A0A0A',
                    fontSize: '11px',
                    fontWeight: '500',
                    border: '1px solid #E5E5E5'
                  }}>
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            </a>

            {/* Project 3 - AI Commerce Agent */}
            <a
              href="https://github.com/Bostesa/AI-commerce-agent"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: 'none', display: 'flex' }}
            >
              <div
                style={{
                  padding: '32px',
                  border: '1px solid #E5E5E5',
                  background: '#FFFFFF',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  flex: '1',
                  display: 'flex',
                  flexDirection: 'column',
                  minHeight: '260px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#0A0A0A';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#E5E5E5';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
              <h3 style={{
                fontSize: '18px',
                fontWeight: '600',
                color: '#0A0A0A',
                marginBottom: '12px',
                letterSpacing: '-0.5px'
              }}>
                AI Commerce Agent
              </h3>
              <p style={{
                fontSize: '14px',
                lineHeight: '1.7',
                color: '#6B6B6B',
                marginBottom: '16px'
              }}>
                Multi-modal e-commerce agent with CLIP-based image search and FAISS retrieval. Supports text, image, and combined product recommendations.
              </p>
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '6px'
              }}>
                {['FastAPI', 'Next.js', 'CLIP', 'FAISS'].map((tech) => (
                  <span key={tech} style={{
                    padding: '4px 10px',
                    background: '#FAFAFA',
                    color: '#0A0A0A',
                    fontSize: '11px',
                    fontWeight: '500',
                    border: '1px solid #E5E5E5'
                  }}>
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            </a>
          </div>

          {/* Research Section */}
          <h2 style={{
            fontSize: 'clamp(32px, 4vw, 48px)',
            fontWeight: '600',
            color: '#0A0A0A',
            marginBottom: '64px',
            letterSpacing: '-1px'
          }}>
            Research
          </h2>

          {/* Research Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '24px',
            maxWidth: '680px',
            alignItems: 'stretch'
          }}>
            {/* Research 1 - MQTT-DAP */}
            <div
              style={{
                padding: '32px',
                border: '1px solid #E5E5E5',
                background: '#FFFFFF',
                transition: 'all 0.3s ease',
                flex: '1',
                display: 'flex',
                flexDirection: 'column',
                minHeight: '260px'
              }}
            >
              <h3 style={{
                fontSize: '18px',
                fontWeight: '600',
                color: '#0A0A0A',
                marginBottom: '12px',
                letterSpacing: '-0.5px'
              }}>
                MQTT-DAP
              </h3>
              <p style={{
                fontSize: '14px',
                lineHeight: '1.7',
                color: '#6B6B6B',
                marginBottom: '16px'
              }}>
                Privacy-preserving MQTT extension for GDPR compliance. Purpose-based access control and consent mechanisms for IoT systems.
              </p>
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '6px',
                marginBottom: '16px'
              }}>
                {['C', 'MQTT', 'IoT', 'GDPR'].map((tech) => (
                  <span key={tech} style={{
                    padding: '4px 10px',
                    background: '#FAFAFA',
                    color: '#0A0A0A',
                    fontSize: '11px',
                    fontWeight: '500',
                    border: '1px solid #E5E5E5'
                  }}>
                    {tech}
                  </span>
                ))}
              </div>
              <div style={{
                display: 'flex',
                gap: '12px',
                marginTop: 'auto'
              }}>
                <a
                  href="https://github.com/DAMSlabUMBC/mqtt-dap-mosquitto"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontSize: '13px',
                    color: '#0A0A0A',
                    textDecoration: 'none',
                    fontWeight: '500',
                    borderBottom: '1px solid #0A0A0A',
                    paddingBottom: '2px',
                    transition: 'opacity 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.opacity = '0.6'}
                  onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                >
                  Broker →
                </a>
                <a
                  href="https://github.com/DAMSlabUMBC/Pub-Sub-Privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontSize: '13px',
                    color: '#0A0A0A',
                    textDecoration: 'none',
                    fontWeight: '500',
                    borderBottom: '1px solid #0A0A0A',
                    paddingBottom: '2px',
                    transition: 'opacity 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.opacity = '0.6'}
                  onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                >
                  Benchmark →
                </a>
              </div>
            </div>

            {/* Research 2 - PSMark */}
            <a
              href="https://github.com/DAMSlabUMBC/PS-Bench"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: 'none', display: 'flex' }}
            >
              <div
                style={{
                  padding: '32px',
                  border: '1px solid #E5E5E5',
                  background: '#FFFFFF',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  flex: '1',
                  display: 'flex',
                  flexDirection: 'column',
                  minHeight: '260px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#0A0A0A';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#E5E5E5';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
              <h3 style={{
                fontSize: '18px',
                fontWeight: '600',
                color: '#0A0A0A',
                marginBottom: '12px',
                letterSpacing: '-0.5px'
              }}>
                PSMark Benchmark
              </h3>
              <p style={{
                fontSize: '14px',
                lineHeight: '1.7',
                color: '#6B6B6B',
                marginBottom: '16px'
              }}>
                Distributed benchmarking framework for pub/sub systems. Orchestrates synthetic IoT workloads with MQTT and DDS protocol support.
              </p>
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '6px'
              }}>
                {['Erlang', 'C++', 'MQTT', 'DDS'].map((tech) => (
                  <span key={tech} style={{
                    padding: '4px 10px',
                    background: '#FAFAFA',
                    color: '#0A0A0A',
                    fontSize: '11px',
                    fontWeight: '500',
                    border: '1px solid #E5E5E5'
                  }}>
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            </a>
          </div>
        </div>
      </section>
    )
  }
}
