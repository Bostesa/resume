import React, { Component } from 'react'

export default class Footer extends Component {
  render() {
    return (
      <footer style={{
        padding: '100px 48px 60px',
        background: '#0a0a0a',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background gradient */}
        <div style={{
          position: 'absolute',
          bottom: '-50%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '800px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(80px)',
          pointerEvents: 'none'
        }} />

        <div style={{
          maxWidth: '1100px',
          margin: '0 auto',
          position: 'relative'
        }}>
          {/* CTA Section */}
          <div style={{
            textAlign: 'center',
            marginBottom: '80px'
          }}>
            <span style={{
              display: 'inline-block',
              fontSize: '13px',
              fontWeight: '600',
              color: '#6366f1',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              marginBottom: '24px'
            }}>
              Get in touch
            </span>
            <h3 style={{
              fontSize: 'clamp(32px, 5vw, 48px)',
              fontWeight: '700',
              color: '#FFFFFF',
              marginBottom: '24px',
              letterSpacing: '-1px'
            }}>
              Let's build something together
            </h3>
            <p style={{
              fontSize: '18px',
              color: 'rgba(255, 255, 255, 0.5)',
              marginBottom: '40px',
              maxWidth: '500px',
              margin: '0 auto 40px'
            }}>
              Always open to discussing new projects, opportunities, or collaborations
            </p>
            <a
              href="mailto:natestesa@gmail.com"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                padding: '18px 36px',
                background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                color: '#FFFFFF',
                textDecoration: 'none',
                fontSize: '15px',
                fontWeight: '600',
                borderRadius: '8px',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 20px rgba(99, 102, 241, 0.4)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 30px rgba(99, 102, 241, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(99, 102, 241, 0.4)';
              }}
            >
              Say Hello
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
          </div>

          {/* Footer Bottom */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: '40px',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            flexWrap: 'wrap',
            gap: '24px'
          }}>
            {/* Copyright */}
            <div>
              <p style={{
                fontSize: '14px',
                color: 'rgba(255, 255, 255, 0.4)',
                margin: 0
              }}>
                © {new Date().getFullYear()} Nathan Samson
              </p>
              <p style={{
                fontSize: '13px',
                color: 'rgba(255, 255, 255, 0.25)',
                margin: '8px 0 0 0'
              }}>
                Built with React
              </p>
            </div>

            {/* Social Links */}
            <div style={{
              display: 'flex',
              gap: '24px'
            }}>
              {[
                { label: 'LinkedIn', url: 'https://www.linkedin.com/in/nathan-samson-bostesa/' },
                { label: 'GitHub', url: 'https://github.com/Bostesa' },
                { label: 'Email', url: 'mailto:natestesa@gmail.com' }
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.url}
                  target={link.url.startsWith('mailto') ? undefined : '_blank'}
                  rel={link.url.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                  style={{
                    fontSize: '14px',
                    color: 'rgba(255, 255, 255, 0.4)',
                    textDecoration: 'none',
                    transition: 'color 0.2s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#FFFFFF'}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.4)'}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    )
  }
}
