import React, { useState, useRef, useEffect } from 'react'

const projects = [
  {
    title: 'BankBuddy',
    description: 'AI finance assistant with natural language trading, transfers, and portfolio management',
    tech: ['FastAPI', 'Gemini', 'React', 'PostgreSQL'],
    link: 'https://github.com/Bostesa/BankBuddy',
    gradient: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
    number: '01'
  },
  {
    title: 'YouTube Sentiment',
    description: 'ML-powered comment analyzer using Random Forest and TF-IDF for video sentiment insights',
    tech: ['Flask', 'React', 'scikit-learn', 'Docker'],
    link: 'https://github.com/Bostesa/youtube-sentiment-analysis',
    gradient: 'linear-gradient(135deg, #8b5cf6, #d946ef)',
    number: '02'
  },
  {
    title: 'AI Commerce Agent',
    description: 'Multi-modal product search using CLIP embeddings and FAISS vector retrieval',
    tech: ['FastAPI', 'Next.js', 'CLIP', 'FAISS'],
    link: 'https://github.com/Bostesa/AI-commerce-agent',
    gradient: 'linear-gradient(135deg, #d946ef, #f43f5e)',
    number: '03'
  }
];

const research = [
  {
    title: 'MQTT-DAP',
    description: 'Privacy-preserving MQTT extension enabling GDPR compliance with purpose-based access control',
    tech: ['C', 'MQTT', 'IoT', 'GDPR'],
    links: [
      { label: 'Broker', url: 'https://github.com/DAMSlabUMBC/mqtt-dap-mosquitto' },
      { label: 'Benchmark', url: 'https://github.com/DAMSlabUMBC/Pub-Sub-Privacy' }
    ],
    gradient: 'linear-gradient(135deg, #22c55e, #10b981)',
    number: '01'
  },
  {
    title: 'PSMark Benchmark',
    description: 'Distributed pub/sub benchmarking framework with synthetic IoT workloads',
    tech: ['Erlang', 'C++', 'MQTT', 'DDS'],
    link: 'https://github.com/DAMSlabUMBC/PS-Bench',
    gradient: 'linear-gradient(135deg, #10b981, #06b6d4)',
    number: '02'
  }
];

// Text scramble effect
const useTextScramble = (text, isHovered) => {
  const [displayText, setDisplayText] = useState(text);
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*';

  useEffect(() => {
    if (!isHovered) {
      setDisplayText(text);
      return;
    }

    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(prev =>
        text.split('').map((char, i) => {
          if (i < iteration) return text[i];
          if (char === ' ') return ' ';
          return chars[Math.floor(Math.random() * chars.length)];
        }).join('')
      );

      if (iteration >= text.length) {
        clearInterval(interval);
      }
      iteration += 1 / 2;
    }, 30);

    return () => clearInterval(interval);
  }, [isHovered, text]);

  return displayText;
};

// 3D Tilt Card with scramble effect
const TiltCard = ({ children, gradient }) => {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const tiltX = (y - centerY) / centerY * -12;
    const tiltY = (x - centerX) / centerX * 12;

    setTilt({ x: tiltX, y: tiltY });
    setGlare({ x: (x / rect.width) * 100, y: (y / rect.height) * 100 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        position: 'relative',
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${isHovered ? 1.02 : 1})`,
        transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)',
        transformStyle: 'preserve-3d',
        height: '100%'
      }}
    >
      {/* Animated gradient border */}
      <div style={{
        position: 'absolute',
        inset: '-3px',
        background: gradient,
        borderRadius: '28px',
        opacity: isHovered ? 1 : 0,
        transition: 'opacity 0.4s ease',
        filter: 'blur(12px)',
        zIndex: -1,
        animation: isHovered ? 'pulse 2s ease-in-out infinite' : 'none'
      }} />

      {/* Glare effect */}
      <div style={{
        position: 'absolute',
        inset: 0,
        borderRadius: '24px',
        background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.2) 0%, transparent 50%)`,
        opacity: isHovered ? 1 : 0,
        transition: 'opacity 0.3s ease',
        pointerEvents: 'none',
        zIndex: 10
      }} />

      {/* Scan line effect */}
      {isHovered && (
        <div style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '24px',
          overflow: 'hidden',
          pointerEvents: 'none',
          zIndex: 11
        }}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '2px',
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)',
            animation: 'scanline 2s linear infinite'
          }} />
        </div>
      )}

      {children}
    </div>
  );
};

// Scroll reveal with stagger
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
        transform: isVisible ? 'translateY(0) rotateX(0)' : 'translateY(60px) rotateX(-10deg)',
        transition: `all 0.8s cubic-bezier(0.23, 1, 0.32, 1) ${delay}s`,
        transformOrigin: 'top center'
      }}
    >
      {children}
    </div>
  );
};

const ProjectCard = ({ project, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const scrambledTitle = useTextScramble(project.title, isHovered);

  return (
    <ScrollReveal delay={index * 0.15}>
      <TiltCard gradient={project.gradient}>
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: 'none', display: 'block', height: '100%' }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div style={{
            position: 'relative',
            padding: '40px',
            background: 'rgba(255, 255, 255, 0.02)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '24px',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden'
          }}>
            {/* Large number */}
            <div style={{
              position: 'absolute',
              top: '-20px',
              right: '20px',
              fontSize: '120px',
              fontWeight: '900',
              color: 'rgba(255, 255, 255, 0.03)',
              lineHeight: 1,
              pointerEvents: 'none',
              transition: 'all 0.5s ease',
              transform: isHovered ? 'scale(1.1) translateY(-10px)' : 'scale(1)',
              background: isHovered ? project.gradient : 'none',
              WebkitBackgroundClip: isHovered ? 'text' : 'none',
              WebkitTextFillColor: isHovered ? 'transparent' : 'rgba(255, 255, 255, 0.03)'
            }}>
              {project.number}
            </div>

            {/* Arrow */}
            <div style={{
              position: 'absolute',
              top: '32px',
              right: '32px',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: isHovered ? 'rgba(255,255,255,0.1)' : 'transparent',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.3s ease',
              transform: isHovered ? 'rotate(45deg)' : 'rotate(0)'
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ color: '#FFFFFF' }}>
                <path d="M7 17L17 7M17 7H7M17 7V17"/>
              </svg>
            </div>

            {/* Title with scramble effect */}
            <h3 style={{
              fontSize: '28px',
              fontWeight: '800',
              color: '#FFFFFF',
              marginBottom: '16px',
              letterSpacing: '-1px',
              fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, monospace',
              marginTop: '20px'
            }}>
              {scrambledTitle}
            </h3>

            <p style={{
              fontSize: '15px',
              lineHeight: '1.7',
              color: 'rgba(255, 255, 255, 0.5)',
              marginBottom: '28px',
              flex: 1
            }}>
              {project.description}
            </p>

            {/* Tech stack with animated underline */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '12px'
            }}>
              {project.tech.map((tech, i) => (
                <span
                  key={tech}
                  style={{
                    padding: '10px 18px',
                    background: isHovered ? `rgba(255, 255, 255, 0.08)` : 'rgba(255, 255, 255, 0.03)',
                    color: 'rgba(255, 255, 255, 0.9)',
                    fontSize: '12px',
                    fontWeight: '600',
                    borderRadius: '8px',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    transition: `all 0.3s ease ${i * 0.05}s`,
                    transform: isHovered ? 'translateY(-2px)' : 'translateY(0)'
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </a>
      </TiltCard>
    </ScrollReveal>
  );
};

const ResearchCard = ({ project, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const scrambledTitle = useTextScramble(project.title, isHovered);

  return (
    <ScrollReveal delay={index * 0.15}>
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          position: 'relative',
          padding: '40px',
          background: 'rgba(255, 255, 255, 0.02)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '24px',
          transition: 'all 0.5s cubic-bezier(0.23, 1, 0.32, 1)',
          overflow: 'hidden',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
          boxShadow: isHovered ? '0 30px 60px rgba(34, 197, 94, 0.2)' : 'none'
        }}
      >
        {/* Large number */}
        <div style={{
          position: 'absolute',
          top: '-20px',
          right: '20px',
          fontSize: '120px',
          fontWeight: '900',
          color: 'rgba(34, 197, 94, 0.05)',
          lineHeight: 1,
          pointerEvents: 'none',
          transition: 'all 0.5s ease',
          transform: isHovered ? 'scale(1.1)' : 'scale(1)'
        }}>
          {project.number}
        </div>

        {/* Research badge */}
        <div style={{
          position: 'absolute',
          top: '32px',
          right: '32px',
          padding: '8px 16px',
          background: isHovered ? 'rgba(34, 197, 94, 0.2)' : 'rgba(34, 197, 94, 0.1)',
          color: '#22c55e',
          fontSize: '11px',
          fontWeight: '700',
          borderRadius: '6px',
          textTransform: 'uppercase',
          letterSpacing: '1.5px',
          transition: 'all 0.3s ease'
        }}>
          Research
        </div>

        <h3 style={{
          fontSize: '28px',
          fontWeight: '800',
          color: '#FFFFFF',
          marginBottom: '16px',
          letterSpacing: '-1px',
          fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, monospace',
          marginTop: '20px'
        }}>
          {scrambledTitle}
        </h3>

        <p style={{
          fontSize: '15px',
          lineHeight: '1.7',
          color: 'rgba(255, 255, 255, 0.5)',
          marginBottom: '28px',
          flex: 1
        }}>
          {project.description}
        </p>

        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '12px',
          marginBottom: '28px'
        }}>
          {project.tech.map((tech, i) => (
            <span
              key={tech}
              style={{
                padding: '10px 18px',
                background: 'rgba(34, 197, 94, 0.1)',
                color: '#22c55e',
                fontSize: '12px',
                fontWeight: '600',
                borderRadius: '8px',
                border: '1px solid rgba(34, 197, 94, 0.2)',
                transition: `all 0.3s ease ${i * 0.05}s`,
                transform: isHovered ? 'translateY(-2px)' : 'translateY(0)'
              }}
            >
              {tech}
            </span>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
          {project.links ? project.links.map((link) => (
            <a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '14px',
                color: '#FFFFFF',
                textDecoration: 'none',
                fontWeight: '600',
                transition: 'all 0.3s ease',
                padding: '8px 0',
                borderBottom: '2px solid transparent'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#22c55e';
                e.currentTarget.style.borderColor = '#22c55e';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#FFFFFF';
                e.currentTarget.style.borderColor = 'transparent';
              }}
            >
              {link.label}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M7 17L17 7M17 7H7M17 7V17"/>
              </svg>
            </a>
          )) : (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '14px',
                color: '#FFFFFF',
                textDecoration: 'none',
                fontWeight: '600',
                transition: 'all 0.3s ease',
                padding: '8px 0',
                borderBottom: '2px solid transparent'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#22c55e';
                e.currentTarget.style.borderColor = '#22c55e';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#FFFFFF';
                e.currentTarget.style.borderColor = 'transparent';
              }}
            >
              View Project
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M7 17L17 7M17 7H7M17 7V17"/>
              </svg>
            </a>
          )}
        </div>
      </div>
    </ScrollReveal>
  );
};

// Animated section title with split text
const SectionTitle = ({ label, title, color }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} style={{ marginBottom: '100px' }}>
      <span style={{
        display: 'inline-block',
        fontSize: '13px',
        fontWeight: '700',
        color: color,
        textTransform: 'uppercase',
        letterSpacing: '4px',
        marginBottom: '24px',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        transition: 'all 0.6s ease'
      }}>
        {label}
      </span>
      <h2 style={{
        fontSize: 'clamp(48px, 8vw, 80px)',
        fontWeight: '900',
        color: '#FFFFFF',
        letterSpacing: '-3px',
        lineHeight: '1',
        overflow: 'hidden'
      }}>
        {title.split('').map((char, i) => (
          <span
            key={i}
            style={{
              display: 'inline-block',
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0) rotateX(0)' : 'translateY(100%) rotateX(-90deg)',
              transition: `all 0.5s cubic-bezier(0.23, 1, 0.32, 1) ${i * 0.03}s`,
              transformOrigin: 'bottom center'
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </h2>
    </div>
  );
};

export default function Projects() {
  return (
    <section
      id="projects"
      style={{
        padding: '160px 48px',
        background: 'linear-gradient(180deg, #0a0a0a 0%, #0f0f23 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Scanline animation keyframes */}
      <style>{`
        @keyframes scanline {
          0% { top: -10%; }
          100% { top: 110%; }
        }
      `}</style>

      {/* Animated grid background */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `
          linear-gradient(rgba(99, 102, 241, 0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(99, 102, 241, 0.03) 1px, transparent 1px)
        `,
        backgroundSize: '100px 100px',
        maskImage: 'radial-gradient(ellipse at 50% 0%, black 20%, transparent 70%)',
        WebkitMaskImage: 'radial-gradient(ellipse at 50% 0%, black 20%, transparent 70%)',
        pointerEvents: 'none'
      }} />

      {/* Floating orbs */}
      <div style={{
        position: 'absolute',
        top: '5%',
        left: '5%',
        width: '600px',
        height: '600px',
        background: 'radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, transparent 60%)',
        borderRadius: '50%',
        filter: 'blur(100px)',
        animation: 'float 20s ease-in-out infinite',
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '10%',
        right: '5%',
        width: '500px',
        height: '500px',
        background: 'radial-gradient(circle, rgba(34, 197, 94, 0.08) 0%, transparent 60%)',
        borderRadius: '50%',
        filter: 'blur(100px)',
        animation: 'float 25s ease-in-out infinite reverse',
        pointerEvents: 'none'
      }} />

      <div style={{
        maxWidth: '1300px',
        margin: '0 auto',
        position: 'relative'
      }}>
        <SectionTitle label="Projects" title="Featured work" color="#8b5cf6" />

        {/* Projects Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))',
          gap: '32px',
          marginBottom: '160px'
        }}>
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>

        <SectionTitle label="Research" title="Academic work" color="#22c55e" />

        {/* Research Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))',
          gap: '32px',
          maxWidth: '820px'
        }}>
          {research.map((project, index) => (
            <ResearchCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
