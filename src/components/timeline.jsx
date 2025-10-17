import React, { Component } from 'react'

export default class Timeline extends Component {
  render() {
    return (
      <section
        id="experience"
        style={{
          minHeight: '100vh',
          padding: '120px 48px',
          background: '#FAFAFA'
        }}
      >
        <div style={{
          maxWidth: '1100px',
          margin: '0 auto'
        }}>
          {/* Section Title */}
          <h2 style={{
            fontSize: 'clamp(36px, 5vw, 56px)',
            fontWeight: '600',
            color: '#0A0A0A',
            marginBottom: '64px',
            letterSpacing: '-1px'
          }}>
            Experience
          </h2>

          {/* Experience Cards */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '32px'
          }}>
            {/* Capital One */}
            <div
              style={{
                padding: '32px',
                background: '#FFFFFF',
                border: '1px solid #E5E5E5',
                transition: 'border-color 0.2s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = '#0A0A0A'}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = '#E5E5E5'}
            >
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '12px',
                flexWrap: 'wrap',
                gap: '12px'
              }}>
                <div>
                  <h3 style={{
                    fontSize: '18px',
                    fontWeight: '600',
                    color: '#0A0A0A',
                    marginBottom: '4px',
                    letterSpacing: '-0.3px'
                  }}>
                    Software Engineer Intern
                  </h3>
                  <h4 style={{
                    fontSize: '15px',
                    fontWeight: '500',
                    color: '#6B6B6B',
                    margin: 0
                  }}>
                    Capital One
                  </h4>
                </div>
                <span style={{
                  fontSize: '13px',
                  color: '#6B6B6B',
                  fontWeight: '500'
                }}>
                  Jun - Aug 2025
                </span>
              </div>
              <p style={{
                fontSize: '15px',
                lineHeight: '1.7',
                color: '#6B6B6B',
                margin: 0
              }}>
                Built serverless monitoring solution with Python, AWS Lambda, and FastAPI. Implemented APM using New Relic.
              </p>
            </div>

            {/* UMBC Researcher */}
            <div
              style={{
                padding: '32px',
                background: '#FFFFFF',
                border: '1px solid #E5E5E5',
                transition: 'border-color 0.2s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = '#0A0A0A'}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = '#E5E5E5'}
            >
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '12px',
                flexWrap: 'wrap',
                gap: '12px'
              }}>
                <div>
                  <h3 style={{
                    fontSize: '18px',
                    fontWeight: '600',
                    color: '#0A0A0A',
                    marginBottom: '4px',
                    letterSpacing: '-0.3px'
                  }}>
                    Undergraduate Researcher
                  </h3>
                  <h4 style={{
                    fontSize: '15px',
                    fontWeight: '500',
                    color: '#6B6B6B',
                    margin: 0
                  }}>
                    UMBC
                  </h4>
                </div>
                <span style={{
                  fontSize: '13px',
                  color: '#6B6B6B',
                  fontWeight: '500'
                }}>
                  Sep 2023 - Present
                </span>
              </div>
              <p style={{
                fontSize: '15px',
                lineHeight: '1.7',
                color: '#6B6B6B',
                margin: 0
              }}>
                Co-authoring research on IoT protocols and distributed systems. Modified Eclipse Mosquitto (60K LOC) for GDPR compliance. Built Smart Campus ML prediction system with LiDAR sensors.
              </p>
            </div>

            {/* OmniSyncAI */}
            <div
              style={{
                padding: '32px',
                background: '#FFFFFF',
                border: '1px solid #E5E5E5',
                transition: 'border-color 0.2s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = '#0A0A0A'}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = '#E5E5E5'}
            >
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '12px',
                flexWrap: 'wrap',
                gap: '12px'
              }}>
                <div>
                  <h3 style={{
                    fontSize: '18px',
                    fontWeight: '600',
                    color: '#0A0A0A',
                    marginBottom: '4px',
                    letterSpacing: '-0.3px'
                  }}>
                    Software Engineer Intern
                  </h3>
                  <h4 style={{
                    fontSize: '15px',
                    fontWeight: '500',
                    color: '#6B6B6B',
                    margin: 0
                  }}>
                    OmniSyncAI
                  </h4>
                </div>
                <span style={{
                  fontSize: '13px',
                  color: '#6B6B6B',
                  fontWeight: '500'
                }}>
                  May - Jul 2024
                </span>
              </div>
              <p style={{
                fontSize: '15px',
                lineHeight: '1.7',
                color: '#6B6B6B',
                margin: 0
              }}>
                Engineered CRM account setup with Node.js, React, and PostgreSQL. Implemented AI-powered recommendations.
              </p>
            </div>
          </div>
        </div>
      </section>
    )
  }
}
