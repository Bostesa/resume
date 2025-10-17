import React, { Component } from 'react'

export default class About extends Component {
  render() {
    return (
      <section
        id="about"
        style={{
          padding: '120px 48px',
          background: '#FFFFFF'
        }}
      >
        <div style={{
          maxWidth: '1000px',
          margin: '0 auto'
        }}>
          {/* Section Title */}
          <h2 style={{
            fontSize: 'clamp(32px, 4vw, 48px)',
            fontWeight: '600',
            color: '#0A0A0A',
            marginBottom: '48px',
            letterSpacing: '-1px'
          }}>
            About
          </h2>

          {/* Bio */}
          <p style={{
            fontSize: '20px',
            lineHeight: '1.8',
            color: '#0A0A0A',
            marginBottom: '96px',
            maxWidth: '750px'
          }}>
            I'm a Computer Science student at UMBC who loves building software that solves real problems. Currently co-authoring IoT research and gained industry experience at Capital One and OmniSyncAI.
          </p>

          {/* Skills Section */}
          <div>
            <h3 style={{
              fontSize: '18px',
              fontWeight: '600',
              color: '#0A0A0A',
              marginBottom: '40px',
              letterSpacing: '-0.3px'
            }}>
              Skills
            </h3>

            {/* Skills List */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '32px'
            }}>
              {/* Languages */}
              <div>
                <div style={{
                  fontSize: '13px',
                  fontWeight: '600',
                  color: '#999',
                  marginBottom: '16px',
                  letterSpacing: '1px',
                  textTransform: 'uppercase'
                }}>
                  Languages
                </div>
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '12px'
                }}>
                  {['Python', 'Go', 'C/C++', 'Erlang', 'JavaScript', 'Java'].map((tech) => (
                    <span key={tech} style={{
                      padding: '8px 18px',
                      background: '#FAFAFA',
                      color: '#0A0A0A',
                      fontSize: '15px',
                      fontWeight: '500',
                      border: '1px solid #E5E5E5',
                      transition: 'all 0.2s ease',
                      cursor: 'default'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#0A0A0A';
                      e.currentTarget.style.color = '#FFFFFF';
                      e.currentTarget.style.borderColor = '#0A0A0A';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = '#FAFAFA';
                      e.currentTarget.style.color = '#0A0A0A';
                      e.currentTarget.style.borderColor = '#E5E5E5';
                    }}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Frameworks & Tools */}
              <div>
                <div style={{
                  fontSize: '13px',
                  fontWeight: '600',
                  color: '#999',
                  marginBottom: '16px',
                  letterSpacing: '1px',
                  textTransform: 'uppercase'
                }}>
                  Frameworks & Tools
                </div>
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '12px'
                }}>
                  {['React', 'FastAPI', 'Node.js', 'TensorFlow', 'PyTorch', 'Docker', 'PostgreSQL'].map((tech) => (
                    <span key={tech} style={{
                      padding: '8px 18px',
                      background: '#FAFAFA',
                      color: '#0A0A0A',
                      fontSize: '15px',
                      fontWeight: '500',
                      border: '1px solid #E5E5E5',
                      transition: 'all 0.2s ease',
                      cursor: 'default'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#0A0A0A';
                      e.currentTarget.style.color = '#FFFFFF';
                      e.currentTarget.style.borderColor = '#0A0A0A';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = '#FAFAFA';
                      e.currentTarget.style.color = '#0A0A0A';
                      e.currentTarget.style.borderColor = '#E5E5E5';
                    }}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Cloud & Infrastructure */}
              <div>
                <div style={{
                  fontSize: '13px',
                  fontWeight: '600',
                  color: '#999',
                  marginBottom: '16px',
                  letterSpacing: '1px',
                  textTransform: 'uppercase'
                }}>
                  Cloud & Infrastructure
                </div>
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '12px'
                }}>
                  {['AWS', 'Kubernetes', 'Lambda', 'New Relic', 'Linux', 'MQTT'].map((tech) => (
                    <span key={tech} style={{
                      padding: '8px 18px',
                      background: '#FAFAFA',
                      color: '#0A0A0A',
                      fontSize: '15px',
                      fontWeight: '500',
                      border: '1px solid #E5E5E5',
                      transition: 'all 0.2s ease',
                      cursor: 'default'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#0A0A0A';
                      e.currentTarget.style.color = '#FFFFFF';
                      e.currentTarget.style.borderColor = '#0A0A0A';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = '#FAFAFA';
                      e.currentTarget.style.color = '#0A0A0A';
                      e.currentTarget.style.borderColor = '#E5E5E5';
                    }}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
}
