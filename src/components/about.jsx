import React, { useState, useRef, useEffect } from 'react'

const allSkills = [
  { name: 'Python', color: '#6366f1' },
  { name: 'Go', color: '#6366f1' },
  { name: 'C/C++', color: '#6366f1' },
  { name: 'Erlang', color: '#6366f1' },
  { name: 'JavaScript', color: '#6366f1' },
  { name: 'Java', color: '#6366f1' },
  { name: 'React', color: '#8b5cf6' },
  { name: 'FastAPI', color: '#8b5cf6' },
  { name: 'Node.js', color: '#8b5cf6' },
  { name: 'TensorFlow', color: '#8b5cf6' },
  { name: 'PyTorch', color: '#8b5cf6' },
  { name: 'Docker', color: '#8b5cf6' },
  { name: 'AWS', color: '#d946ef' },
  { name: 'Kubernetes', color: '#d946ef' },
  { name: 'Lambda', color: '#d946ef' },
  { name: 'New Relic', color: '#d946ef' },
  { name: 'PostgreSQL', color: '#d946ef' },
  { name: 'MQTT', color: '#d946ef' },
];

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
const SkillBadge = ({ skill }) => (
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
      e.currentTarget.style.background = `${skill.color}25`;
      e.currentTarget.style.borderColor = `${skill.color}50`;
      e.currentTarget.style.transform = 'scale(1.05)';
      e.currentTarget.style.boxShadow = `0 8px 24px ${skill.color}20`;
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
  return (
    <section
      id="about"
      style={{
        padding: '140px 48px',
        background: 'linear-gradient(180deg, #0a0a0a 0%, #0a0a0a 100%)',
        position: 'relative',
        overflow: 'hidden'
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
      `}</style>

      {/* Subtle accent */}
      <div style={{
        position: 'absolute',
        top: '20%',
        left: '-15%',
        width: '500px',
        height: '500px',
        background: 'radial-gradient(circle, rgba(99, 102, 241, 0.06) 0%, transparent 70%)',
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
        background: 'radial-gradient(circle, rgba(217, 70, 239, 0.05) 0%, transparent 70%)',
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
              color: '#6366f1',
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
              background: 'linear-gradient(transparent 60%, rgba(99, 102, 241, 0.3) 60%)'
            }}>UMBC</span>{' '}
            passionate about building systems that handle{' '}
            <span style={{
              color: '#FFFFFF',
              fontWeight: '600',
              background: 'linear-gradient(transparent 60%, rgba(139, 92, 246, 0.3) 60%)'
            }}>millions of events</span>.
            Currently developing AI-powered data pipelines at{' '}
            <span style={{ color: '#6366f1', fontWeight: '600' }}>Grassroot Analytics</span>,
            with experience building infrastructure at{' '}
            <span style={{ color: '#8b5cf6', fontWeight: '600' }}>Capital One</span> and{' '}
            <span style={{ color: '#d946ef', fontWeight: '600' }}>OmniSyncAI</span>.
            Co-author on{' '}
            <span style={{
              color: '#FFFFFF',
              fontWeight: '600',
              background: 'linear-gradient(transparent 60%, rgba(34, 197, 94, 0.3) 60%)'
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
                  <SkillBadge key={skill.name} skill={skill} />
                ))}
              </Marquee>
            </div>

            {/* Second row - right to left */}
            <div>
              <Marquee direction="right" speed={35}>
                {allSkills.slice(9).map((skill) => (
                  <SkillBadge key={skill.name} skill={skill} />
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
              <span style={{ color: '#d946ef' }}>const</span>{' '}
              <span style={{ color: '#FFFFFF' }}>passion</span>{' '}
              <span style={{ color: 'rgba(255, 255, 255, 0.5)' }}>=</span>{' '}
              <span style={{ color: '#6366f1' }}>{'{'}</span>
            </div>
            <div style={{ paddingLeft: '28px' }}>
              <span style={{ color: '#22c55e' }}>building</span>
              <span style={{ color: 'rgba(255, 255, 255, 0.5)' }}>:</span>{' '}
              <span style={{ color: '#f59e0b' }}>"systems that handle millions of events"</span>
              <span style={{ color: 'rgba(255, 255, 255, 0.5)' }}>,</span>
            </div>
            <div style={{ paddingLeft: '28px' }}>
              <span style={{ color: '#22c55e' }}>researching</span>
              <span style={{ color: 'rgba(255, 255, 255, 0.5)' }}>:</span>{' '}
              <span style={{ color: '#f59e0b' }}>"IoT privacy &amp; distributed protocols"</span>
              <span style={{ color: 'rgba(255, 255, 255, 0.5)' }}>,</span>
            </div>
            <div style={{ paddingLeft: '28px' }}>
              <span style={{ color: '#22c55e' }}>solving</span>
              <span style={{ color: 'rgba(255, 255, 255, 0.5)' }}>:</span>{' '}
              <span style={{ color: '#f59e0b' }}>"problems that matter at scale"</span>
            </div>
            <div>
              <span style={{ color: '#6366f1' }}>{'}'}</span>
              <span style={{ color: 'rgba(255, 255, 255, 0.5)' }}>;</span>
            </div>

            {/* Blinking cursor */}
            <span style={{
              display: 'inline-block',
              width: '10px',
              height: '20px',
              background: '#6366f1',
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
              background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)',
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
