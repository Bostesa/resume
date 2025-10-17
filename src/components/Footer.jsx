import React, { Component } from 'react'

export default class Footer extends Component {
  render() {
    return (
      <footer style={{
        padding: '80px 48px 48px',
        background: '#FFFFFF',
        borderTop: '1px solid #E5E5E5'
      }}>
        <div style={{
          maxWidth: '1100px',
          margin: '0 auto'
        }}>
          {/* CTA Section */}
          <div style={{
            textAlign: 'center',
            marginBottom: '64px'
          }}>
            <h3 style={{
              fontSize: 'clamp(24px, 4vw, 36px)',
              fontWeight: '600',
              color: '#0A0A0A',
              marginBottom: '24px',
              letterSpacing: '-0.5px'
            }}>
              Let's Connect
            </h3>
            <p style={{
              fontSize: '16px',
              color: '#6B6B6B',
              marginBottom: '32px'
            }}>
              Feel free to reach out for collaborations or just a friendly chat
            </p>
            <a
              href="mailto:natestesa@gmail.com"
              style={{
                display: 'inline-block',
                padding: '16px 40px',
                background: '#0A0A0A',
                color: '#FFFFFF',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: '500',
                transition: 'background 0.2s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = '#2C2C2C'}
              onMouseLeave={(e) => e.currentTarget.style.background = '#0A0A0A'}
            >
              Get in Touch
            </a>
          </div>

          {/* Footer Bottom */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: '32px',
            borderTop: '1px solid #E5E5E5',
            flexWrap: 'wrap',
            gap: '24px'
          }}>
            {/* Copyright */}
            <p style={{
              fontSize: '14px',
              color: '#6B6B6B',
              margin: 0
            }}>
              © {new Date().getFullYear()} Nathan Samson.
            </p>

            {/* Social Links */}
            <div style={{
              display: 'flex',
              gap: '32px'
            }}>
              <a
                href="https://www.linkedin.com/in/nathan-samson-bostesa/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontSize: '14px',
                  color: '#6B6B6B',
                  textDecoration: 'none',
                  transition: 'color 0.2s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#0A0A0A'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#6B6B6B'}
              >
                LinkedIn
              </a>
              <a
                href="https://github.com/Bostesa"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontSize: '14px',
                  color: '#6B6B6B',
                  textDecoration: 'none',
                  transition: 'color 0.2s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#0A0A0A'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#6B6B6B'}
              >
                GitHub
              </a>
              <a
                href="mailto:natestesa@gmail.com"
                style={{
                  fontSize: '14px',
                  color: '#6B6B6B',
                  textDecoration: 'none',
                  transition: 'color 0.2s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#0A0A0A'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#6B6B6B'}
              >
                Email
              </a>
            </div>
          </div>

          {/* Status */}
          <p style={{
            fontSize: '13px',
            color: '#6B6B6B',
            textAlign: 'center',
            marginTop: '32px',
            marginBottom: 0
          }}>
            Currently Undergrad Researcher at UMBC
          </p>
        </div>
      </footer>
    )
  }
}
