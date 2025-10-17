import React, { Component } from 'react'

export default class Navigation extends Component {
  render() {
    return (
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '70px',
        background: 'rgba(255, 255, 255, 0.98)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid #E5E5E5',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 48px'
      }}>
        {/* Logo/Name */}
        <div style={{
          fontSize: '18px',
          fontWeight: '600',
          color: '#0A0A0A',
          letterSpacing: '-0.5px'
        }}>
          Nathan Samson
        </div>

        {/* Navigation Links */}
        <div style={{
          display: 'flex',
          gap: '48px',
          alignItems: 'center'
        }}>
          <a
            href="#home"
            style={{
              color: '#0A0A0A',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: '500',
              transition: 'color 0.2s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#6B6B6B'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#0A0A0A'}
          >
            Home
          </a>
          <a
            href="#about"
            style={{
              color: '#0A0A0A',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: '500',
              transition: 'color 0.2s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#6B6B6B'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#0A0A0A'}
          >
            About
          </a>
          <a
            href="#experience"
            style={{
              color: '#0A0A0A',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: '500',
              transition: 'color 0.2s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#6B6B6B'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#0A0A0A'}
          >
            Experience
          </a>

          {/* Social Links */}
          <div style={{
            display: 'flex',
            gap: '24px',
            marginLeft: '24px'
          }}>
            <a
              href="https://www.linkedin.com/in/nathan-samson-bostesa/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: '#0A0A0A',
                textDecoration: 'none',
                fontSize: '14px',
                transition: 'color 0.2s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#6B6B6B'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#0A0A0A'}
            >
              <i className="icon-linkedin2" />
            </a>
            <a
              href="https://github.com/Bostesa"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: '#0A0A0A',
                textDecoration: 'none',
                fontSize: '14px',
                transition: 'color 0.2s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#6B6B6B'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#0A0A0A'}
            >
              <i className="icon-github" />
            </a>
          </div>
        </div>
      </nav>
    )
  }
}
