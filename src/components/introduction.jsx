import React, { Component } from 'react'

export default class Introduction extends Component {
  render() {
    return (
      <section
        id="home"
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#FFFFFF',
          paddingTop: '70px',
          position: 'relative'
        }}
      >
        {/* Subtle background decoration */}
        <div style={{
          position: 'absolute',
          top: '20%',
          right: '10%',
          width: '300px',
          height: '300px',
          background: 'linear-gradient(135deg, #f5f5f5 0%, #fafafa 100%)',
          borderRadius: '50%',
          opacity: 0.5,
          zIndex: 0
        }} />

        <div style={{
          maxWidth: '1000px',
          padding: '0 48px',
          textAlign: 'center',
          position: 'relative',
          zIndex: 1
        }}>
          {/* Profile Photo */}
          <div style={{
            width: '140px',
            height: '140px',
            margin: '0 auto 32px',
            borderRadius: '50%',
            background: '#F5F5F5',
            border: '3px solid #0A0A0A',
            backgroundImage: 'url(images/about.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            boxShadow: '0 8px 24px rgba(0,0,0,0.1)'
          }} />

          {/* Main Heading */}
          <h1 style={{
            fontSize: 'clamp(48px, 8vw, 72px)',
            fontWeight: '600',
            color: '#0A0A0A',
            marginBottom: '24px',
            lineHeight: '1.1',
            letterSpacing: '-2px'
          }}>
            Nathan Samson
          </h1>

          {/* Tagline */}
          <p style={{
            fontSize: 'clamp(18px, 2.5vw, 22px)',
            color: '#6B6B6B',
            marginBottom: '16px',
            lineHeight: '1.6',
            maxWidth: '600px',
            margin: '0 auto 16px'
          }}>
            Building intelligent systems that matter
          </p>

          {/* Location & School */}
          <p style={{
            fontSize: '15px',
            color: '#999',
            marginBottom: '48px'
          }}>
            University of Maryland, Baltimore County
          </p>

          {/* CTA Buttons */}
          <div style={{
            display: 'flex',
            gap: '16px',
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginBottom: '120px'
          }}>
            <a
              href="/images/res2.pdf"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-block',
                padding: '16px 40px',
                background: '#0A0A0A',
                color: '#FFFFFF',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: '500',
                border: 'none',
                transition: 'all 0.2s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#2C2C2C'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#0A0A0A'
              }}
            >
              View Resume
            </a>
            <a
              href="https://github.com/Bostesa"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-block',
                padding: '16px 40px',
                background: 'transparent',
                color: '#0A0A0A',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: '500',
                border: '1px solid #E5E5E5',
                transition: 'all 0.2s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#0A0A0A'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#E5E5E5'
              }}
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/nathan-samson-bostesa/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-block',
                padding: '16px 40px',
                background: 'transparent',
                color: '#0A0A0A',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: '500',
                border: '1px solid #E5E5E5',
                transition: 'all 0.2s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#0A0A0A'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#E5E5E5'
              }}
            >
              LinkedIn
            </a>
          </div>

          {/* Scroll Indicator */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '12px'
          }}>
            <span style={{
              fontSize: '12px',
              color: '#6B6B6B',
              letterSpacing: '1px',
              textTransform: 'uppercase'
            }}>
              Scroll
            </span>
            <div style={{
              width: '1px',
              height: '40px',
              background: '#E5E5E5'
            }} />
          </div>
        </div>
      </section>
    )
  }
}
