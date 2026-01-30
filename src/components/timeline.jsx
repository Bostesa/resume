import React, { Component, useState, useEffect } from 'react'
import { useTheme } from '../ThemeContext'

// Mobile detection hook
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  return isMobile;
};

const experiences = [
  {
    title: 'AI Developer Intern',
    company: 'Grassroot Analytics',
    location: 'DC, USA',
    date: 'Jan - May 2026',
    bullets: [
      'Building event-driven news pipeline with Clipbook API for real-time donor outreach',
      'Designing data ingestion workflows across multiple news APIs',
      'Analyzing 20M+ donor dataset for demographic segmentation'
    ]
  },
  {
    title: 'Software Engineer Intern',
    company: 'Capital One',
    location: 'McLean, VA',
    date: 'Jun - Aug 2025',
    bullets: [
      'Built serverless synthetic monitoring with Lambda, Fargate, and FastAPI',
      'Implemented APM with New Relic and Dockerized deployments',
      'Created PagerDuty alerting and S3 incident reporting dashboard'
    ]
  },
  {
    title: 'Undergraduate Researcher',
    company: 'DAMS Lab @ UMBC',
    location: 'Baltimore, MD',
    date: 'Sep 2023 - Present',
    isResearch: true,
    bullets: [
      { label: 'PSMark', text: 'Erlang pub/sub benchmark — 5.4K publishers, 5.9K msg/sec', venue: 'IEEE PerCom 2026' },
      { label: 'MQTT-DAP', text: 'Privacy-preserving MQTT — 3K lines C, <2% overhead', venue: 'ACM SenSys 2026' },
      { label: 'SMART Campus', text: 'LiDAR occupancy prediction with HDBSCAN + SARIMAX' }
    ]
  },
  {
    title: 'Software Engineer Intern',
    company: 'OmniSyncAI',
    location: 'Remote',
    date: 'May - Jul 2024',
    bullets: [
      'Built CRM onboarding flow with AI-powered team recommendations',
      'Developed auth, team management, and provisioning APIs',
      'Designed multi-tenant PostgreSQL schema for scalability'
    ]
  }
];

// Functional wrapper component to use hooks
function TimelineContent() {
  const { colors } = useTheme();
  const isMobile = useIsMobile();

  // Assign colors based on index
  const getExpColor = (index) => {
    const colorKeys = [colors.primary, colors.secondary, colors.accent, colors.success];
    return colorKeys[index % colorKeys.length];
  };

  return (
    <section
      id="experience"
      style={{
        minHeight: '100vh',
        padding: isMobile ? '80px 20px' : '120px 48px',
        background: colors.bgGradient,
        position: 'relative',
        transition: 'background 0.5s ease'
      }}
    >
      {/* Subtle gradient accent */}
      <div style={{
        position: 'absolute',
        top: '20%',
        right: '-10%',
        width: '500px',
        height: '500px',
        background: `radial-gradient(circle, ${colors.primary}12 0%, transparent 70%)`,
        borderRadius: '50%',
        filter: 'blur(80px)',
        pointerEvents: 'none'
      }} />

      <div style={{
        maxWidth: '900px',
        margin: '0 auto',
        position: 'relative'
      }}>
        {/* Section Title */}
        <div style={{ marginBottom: '80px' }}>
          <span style={{
            display: 'inline-block',
            fontSize: '13px',
            fontWeight: '600',
            color: colors.primary,
            textTransform: 'uppercase',
            letterSpacing: '2px',
            marginBottom: '16px'
          }}>
            Experience
          </span>
          <h2 style={{
            fontSize: 'clamp(36px, 5vw, 56px)',
            fontWeight: '700',
            color: '#FFFFFF',
            letterSpacing: '-2px',
            lineHeight: '1.1'
          }}>
            Where I've worked
          </h2>
        </div>

        {/* Timeline */}
        <div style={{ position: 'relative' }}>
          {/* Vertical line */}
          <div style={{
            position: 'absolute',
            left: '11px',
            top: '8px',
            bottom: '8px',
            width: '2px',
            background: `linear-gradient(180deg, ${colors.primary} 0%, ${colors.secondary} 50%, ${colors.accent} 100%)`,
            borderRadius: '2px',
            opacity: 0.3
          }} />

          {/* Experience Cards */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '32px'
          }}>
            {experiences.map((exp, index) => {
              const expColor = getExpColor(index);
              return (
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    gap: '32px',
                    paddingLeft: '0'
                  }}
                >
                  {/* Timeline dot */}
                  <div style={{
                    flexShrink: 0,
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    background: expColor,
                    boxShadow: `0 0 20px ${expColor}50`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: '4px'
                  }}>
                    <div style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      background: '#FFFFFF'
                    }} />
                  </div>

                  {/* Card */}
                  <div
                    style={{
                      flex: 1,
                      padding: '28px 32px',
                      background: 'rgba(255, 255, 255, 0.02)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: '16px',
                      transition: 'all 0.3s ease',
                      cursor: 'default'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                      e.currentTarget.style.borderColor = `${expColor}40`;
                      e.currentTarget.style.transform = 'translateX(8px)';
                      e.currentTarget.style.boxShadow = `0 8px 32px ${expColor}15`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)';
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                      e.currentTarget.style.transform = 'translateX(0)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    {/* Header */}
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      marginBottom: '16px',
                      flexWrap: 'wrap',
                      gap: '12px'
                    }}>
                      <div>
                        <h3 style={{
                          fontSize: '20px',
                          fontWeight: '600',
                          color: '#FFFFFF',
                          marginBottom: '4px',
                          letterSpacing: '-0.5px'
                        }}>
                          {exp.title}
                        </h3>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px'
                        }}>
                          <span style={{
                            fontSize: '15px',
                            fontWeight: '500',
                            color: expColor
                          }}>
                            {exp.company}
                          </span>
                          <span style={{
                            fontSize: '14px',
                            color: 'rgba(255,255,255,0.4)'
                          }}>
                            {exp.location}
                          </span>
                        </div>
                      </div>
                      <span style={{
                        fontSize: '13px',
                        color: 'rgba(255,255,255,0.5)',
                        fontWeight: '500',
                        background: 'rgba(255,255,255,0.05)',
                        padding: '6px 12px',
                        borderRadius: '20px'
                      }}>
                        {exp.date}
                      </span>
                    </div>

                    {/* Bullets */}
                    <ul style={{
                      listStyle: 'none',
                      padding: 0,
                      margin: 0,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '10px'
                    }}>
                      {exp.bullets.map((bullet, i) => (
                        <li
                          key={i}
                          style={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: '12px',
                            fontSize: '14px',
                            lineHeight: '1.6',
                            color: 'rgba(255,255,255,0.7)'
                          }}
                        >
                          <span style={{
                            width: '4px',
                            height: '4px',
                            borderRadius: '50%',
                            background: expColor,
                            marginTop: '8px',
                            flexShrink: 0
                          }} />
                          {exp.isResearch && typeof bullet === 'object' ? (
                            <span>
                              <strong style={{ color: '#FFFFFF' }}>{bullet.label}:</strong>{' '}
                              {bullet.text}
                              {bullet.venue && (
                                <span style={{
                                  display: 'inline-flex',
                                  marginLeft: '8px',
                                  padding: '2px 8px',
                                  background: `${expColor}20`,
                                  color: expColor,
                                  fontSize: '11px',
                                  fontWeight: '600',
                                  borderRadius: '4px'
                                }}>
                                  {bullet.venue}
                                </span>
                              )}
                            </span>
                          ) : (
                            <span>{bullet}</span>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default class Timeline extends Component {
  render() {
    return <TimelineContent />;
  }
}
