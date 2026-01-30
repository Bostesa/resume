import React, { useState, useRef, useEffect } from 'react'
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

// Infinite scrolling marquee
const Marquee = ({ children, direction = 'left', speed = 30 }) => {
  return (
    <div style={{
      display: 'flex',
      overflow: 'hidden',
      maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
      WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)'
    }}>
      <div style={{
        display: 'flex',
        animation: `marquee${direction === 'left' ? '' : 'Reverse'} ${speed}s linear infinite`,
        gap: '16px',
        paddingRight: '16px'
      }}>
        {children}
        {children}
      </div>
    </div>
  );
};

// Scroll reveal
const ScrollReveal = ({ children, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
        transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`
      }}
    >
      {children}
    </div>
  );
};

// Skill badge component
const SkillBadge = ({ skill, colors }) => (
  <div
    style={{
      padding: '14px 28px',
      background: 'rgba(255, 255, 255, 0.03)',
      color: '#FFFFFF',
      fontSize: '15px',
      fontWeight: '600',
      borderRadius: '50px',
      border: '1px solid rgba(255, 255, 255, 0.08)',
      whiteSpace: 'nowrap',
      transition: 'all 0.3s ease',
      cursor: 'default'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.background = `${colors.primary}25`;
      e.currentTarget.style.borderColor = `${colors.primary}50`;
      e.currentTarget.style.transform = 'scale(1.05)';
      e.currentTarget.style.boxShadow = `0 8px 24px ${colors.primary}20`;
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
      e.currentTarget.style.transform = 'scale(1)';
      e.currentTarget.style.boxShadow = 'none';
    }}
  >
    {skill.name}
  </div>
);

export default function About() {
  const { colors } = useTheme();
  const isMobile = useIsMobile();

  const allSkills = [
    { name: 'Python' },
    { name: 'Go' },
    { name: 'C/C++' },
    { name: 'Erlang' },
    { name: 'JavaScript' },
    { name: 'Java' },
    { name: 'React' },
    { name: 'FastAPI' },
    { name: 'Node.js' },
    { name: 'TensorFlow' },
    { name: 'PyTorch' },
    { name: 'Docker' },
    { name: 'AWS' },
    { name: 'Kubernetes' },
    { name: 'Lambda' },
    { name: 'New Relic' },
    { name: 'PostgreSQL' },
    { name: 'MQTT' },
  ];

  return (
    <section
      id="about"
      style={{
        padding: isMobile ? '80px 20px' : '140px 48px',
        background: colors.bgGradient,
        position: 'relative',
        overflow: 'hidden',
        transition: 'background 0.5s ease'
      }}
    >
      {/* Keyframes for marquee */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marqueeReverse {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>

      {/* Subtle accent */}
      <div style={{
        position: 'absolute',
        top: '20%',
        left: '-15%',
        width: '500px',
        height: '500px',
        background: `radial-gradient(circle, ${colors.primary}15 0%, transparent 70%)`,
        borderRadius: '50%',
        filter: 'blur(100px)',
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '20%',
        right: '-15%',
        width: '400px',
        height: '400px',
        background: `radial-gradient(circle, ${colors.secondary}12 0%, transparent 70%)`,
        borderRadius: '50%',
        filter: 'blur(100px)',
        pointerEvents: 'none'
      }} />

      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        position: 'relative'
      }}>
        {/* Section Title */}
        <ScrollReveal>
          <div style={{ marginBottom: '80px' }}>
            <span style={{
              display: 'inline-block',
              fontSize: '13px',
              fontWeight: '700',
              color: colors.primary,
              textTransform: 'uppercase',
              letterSpacing: '3px',
              marginBottom: '20px'
            }}>
              About
            </span>
            <h2 style={{
              fontSize: 'clamp(40px, 6vw, 64px)',
              fontWeight: '800',
              color: '#FFFFFF',
              letterSpacing: '-2px',
              lineHeight: '1.1'
            }}>
              A bit about me
            </h2>
          </div>
        </ScrollReveal>

        {/* Bio with highlighted text */}
        <ScrollReveal delay={0.1}>
          <p style={{
            fontSize: '22px',
            lineHeight: '1.8',
            color: 'rgba(255, 255, 255, 0.6)',
            marginBottom: '100px',
            maxWidth: '800px'
          }}>
            Computer Science student at{' '}
            <span style={{
              color: '#FFFFFF',
              fontWeight: '600',
              background: `linear-gradient(transparent 60%, ${colors.primary}30 60%)`
            }}>UMBC</span>{' '}
            passionate about building systems that handle{' '}
            <span style={{
              color: '#FFFFFF',
              fontWeight: '600',
              background: `linear-gradient(transparent 60%, ${colors.secondary}30 60%)`
            }}>millions of events</span>.
            Currently developing AI-powered data pipelines at{' '}
            <span style={{ color: colors.primary, fontWeight: '600' }}>Grassroot Analytics</span>,
            with experience building infrastructure at{' '}
            <span style={{ color: colors.secondary, fontWeight: '600' }}>Capital One</span> and{' '}
            <span style={{ color: colors.accent, fontWeight: '600' }}>OmniSyncAI</span>.
            Co-author on{' '}
            <span style={{
              color: '#FFFFFF',
              fontWeight: '600',
              background: `linear-gradient(transparent 60%, ${colors.success}30 60%)`
            }}>2 research papers</span>{' '}
            in IoT and distributed systems.
          </p>
        </ScrollReveal>

        {/* Skills Marquee Section */}
        <ScrollReveal delay={0.2}>
          <div style={{ marginBottom: '100px' }}>
            <h3 style={{
              fontSize: '14px',
              fontWeight: '700',
              color: 'rgba(255, 255, 255, 0.3)',
              marginBottom: '40px',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              textAlign: 'center'
            }}>
              Technologies I work with
            </h3>

            {/* First row - left to right */}
            <div style={{ marginBottom: '16px' }}>
              <Marquee direction="left" speed={40}>
                {allSkills.slice(0, 9).map((skill) => (
                  <SkillBadge key={skill.name} skill={skill} colors={colors} />
                ))}
              </Marquee>
            </div>

            {/* Second row - right to left */}
            <div>
              <Marquee direction="right" speed={35}>
                {allSkills.slice(9).map((skill) => (
                  <SkillBadge key={skill.name} skill={skill} colors={colors} />
                ))}
              </Marquee>
            </div>
          </div>
        </ScrollReveal>

        {/* Code snippet / What drives me */}
        <ScrollReveal delay={0.3}>
          <div style={{
            padding: '40px',
            background: 'rgba(255, 255, 255, 0.02)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '20px',
            fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, monospace',
            fontSize: '15px',
            lineHeight: '2',
            position: 'relative',
            overflow: 'hidden',
            maxWidth: '700px'
          }}>
            {/* Terminal dots */}
            <div style={{
              display: 'flex',
              gap: '8px',
              marginBottom: '24px'
            }}>
              <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f57' }} />
              <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#febc2e' }} />
              <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#28c840' }} />
            </div>

            <div style={{ color: 'rgba(255, 255, 255, 0.3)' }}>
              {'// What drives me'}
            </div>
            <div>
              <span style={{ color: colors.accent }}>const</span>{' '}
              <span style={{ color: '#FFFFFF' }}>passion</span>{' '}
              <span style={{ color: 'rgba(255, 255, 255, 0.5)' }}>=</span>{' '}
              <span style={{ color: colors.primary }}>{'{'}</span>
            </div>
            <div style={{ paddingLeft: '28px' }}>
              <span style={{ color: colors.success }}>building</span>
              <span style={{ color: 'rgba(255, 255, 255, 0.5)' }}>:</span>{' '}
              <span style={{ color: colors.warm }}>"systems that handle millions of events"</span>
              <span style={{ color: 'rgba(255, 255, 255, 0.5)' }}>,</span>
            </div>
            <div style={{ paddingLeft: '28px' }}>
              <span style={{ color: colors.success }}>researching</span>
              <span style={{ color: 'rgba(255, 255, 255, 0.5)' }}>:</span>{' '}
              <span style={{ color: colors.warm }}>"IoT privacy &amp; distributed protocols"</span>
              <span style={{ color: 'rgba(255, 255, 255, 0.5)' }}>,</span>
            </div>
            <div style={{ paddingLeft: '28px' }}>
              <span style={{ color: colors.success }}>solving</span>
              <span style={{ color: 'rgba(255, 255, 255, 0.5)' }}>:</span>{' '}
              <span style={{ color: colors.warm }}>"problems that matter at scale"</span>
            </div>
            <div>
              <span style={{ color: colors.primary }}>{'}'}</span>
              <span style={{ color: 'rgba(255, 255, 255, 0.5)' }}>;</span>
            </div>

            {/* Blinking cursor */}
            <span style={{
              display: 'inline-block',
              width: '10px',
              height: '20px',
              background: colors.primary,
              marginLeft: '4px',
              animation: 'blink 1s step-end infinite'
            }} />

            {/* Glow effect */}
            <div style={{
              position: 'absolute',
              top: '50%',
              right: '-50px',
              width: '200px',
              height: '200px',
              background: `radial-gradient(circle, ${colors.primary}15 0%, transparent 70%)`,
              borderRadius: '50%',
              filter: 'blur(40px)',
              pointerEvents: 'none'
            }} />
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
