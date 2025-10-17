import React, { Component } from 'react'

export default class Achievements extends Component {
  render() {
    return (
      <section
        style={{
          padding: '80px 48px',
          background: '#FFFFFF'
        }}
      >
        <div style={{
          maxWidth: '1100px',
          margin: '0 auto'
        }}>
          {/* Section Title */}
          <h2 style={{
            fontSize: 'clamp(28px, 4vw, 36px)',
            fontWeight: '600',
            color: '#0A0A0A',
            marginBottom: '48px',
            letterSpacing: '-0.5px',
            textAlign: 'center'
          }}>
            Recognition & Achievements
          </h2>

          {/* Achievements Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px'
          }}>
            {/* Award 1 */}
            <div
              style={{
                padding: '32px',
                background: '#FAFAFA',
                border: '1px solid #E5E5E5',
                transition: 'all 0.3s ease',
                textAlign: 'center'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#0A0A0A';
                e.currentTarget.style.background = '#FFFFFF';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#E5E5E5';
                e.currentTarget.style.background = '#FAFAFA';
              }}
            >
              <div style={{
                width: '60px',
                height: '60px',
                margin: '0 auto 20px',
                background: '#0A0A0A',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '28px'
              }}>
                🏆
              </div>
              <h3 style={{
                fontSize: '16px',
                fontWeight: '600',
                color: '#0A0A0A',
                marginBottom: '8px',
                letterSpacing: '-0.3px'
              }}>
                Best Poster Award
              </h3>
              <p style={{
                fontSize: '14px',
                color: '#6B6B6B',
                lineHeight: '1.6',
                margin: 0
              }}>
                UMBC CSEE Research Day 2024
              </p>
            </div>

            {/* Award 2 */}
            <div
              style={{
                padding: '32px',
                background: '#FAFAFA',
                border: '1px solid #E5E5E5',
                transition: 'all 0.3s ease',
                textAlign: 'center'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#0A0A0A';
                e.currentTarget.style.background = '#FFFFFF';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#E5E5E5';
                e.currentTarget.style.background = '#FAFAFA';
              }}
            >
              <div style={{
                width: '60px',
                height: '60px',
                margin: '0 auto 20px',
                background: '#0A0A0A',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '28px'
              }}>
                💡
              </div>
              <h3 style={{
                fontSize: '16px',
                fontWeight: '600',
                color: '#0A0A0A',
                marginBottom: '8px',
                letterSpacing: '-0.3px'
              }}>
                NVIDIA Summer Bridge
              </h3>
              <p style={{
                fontSize: '14px',
                color: '#6B6B6B',
                lineHeight: '1.6',
                margin: 0
              }}>
                Program Participant
              </p>
            </div>

            {/* Award 3 */}
            <div
              style={{
                padding: '32px',
                background: '#FAFAFA',
                border: '1px solid #E5E5E5',
                transition: 'all 0.3s ease',
                textAlign: 'center'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#0A0A0A';
                e.currentTarget.style.background = '#FFFFFF';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#E5E5E5';
                e.currentTarget.style.background = '#FAFAFA';
              }}
            >
              <div style={{
                width: '60px',
                height: '60px',
                margin: '0 auto 20px',
                background: '#0A0A0A',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '28px'
              }}>
                🚀
              </div>
              <h3 style={{
                fontSize: '16px',
                fontWeight: '600',
                color: '#0A0A0A',
                marginBottom: '8px',
                letterSpacing: '-0.3px'
              }}>
                Capital One Tech Summit
              </h3>
              <p style={{
                fontSize: '14px',
                color: '#6B6B6B',
                lineHeight: '1.6',
                margin: 0
              }}>
                Participant
              </p>
            </div>
          </div>
        </div>
      </section>
    )
  }
}
