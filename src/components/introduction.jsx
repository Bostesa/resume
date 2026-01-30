import { useState, useEffect, useRef, useMemo } from 'react'
import { useTheme, themes } from '../ThemeContext'

// ==================== THEME TOGGLE ====================
const ThemeToggle = ({ currentTheme, setTheme, isMobile }) => {
  const [isOpen, setIsOpen] = useState(false);
  const colors = themes[currentTheme];

  return (
    <div style={{
      position: 'fixed',
      bottom: 20,
      left: 20,
      zIndex: 1000
    }}>
      {/* Hint label */}
      <div style={{
        position: 'absolute',
        bottom: isMobile ? 48 : 52,
        left: 0,
        background: `rgba(0,0,0,0.9)`,
        backdropFilter: 'blur(10px)',
        padding: '8px 14px',
        borderRadius: 8,
        opacity: !isOpen ? 1 : 0,
        transform: !isOpen ? 'translateY(0)' : 'translateY(5px)',
        transition: 'all 0.3s ease',
        pointerEvents: 'none',
        whiteSpace: 'nowrap',
        border: `1px solid ${colors.primary}40`
      }}>
        <span style={{
          color: '#ffffff',
          fontSize: 11,
          fontWeight: 500,
          fontFamily: 'monospace',
          display: 'flex',
          alignItems: 'center',
          gap: 6
        }}>
          <span style={{ fontSize: 14 }}>🎨</span> Change theme
        </span>
        {/* Arrow pointing down */}
        <div style={{
          position: 'absolute',
          bottom: -6,
          left: 16,
          width: 0,
          height: 0,
          borderLeft: '6px solid transparent',
          borderRight: '6px solid transparent',
          borderTop: '6px solid rgba(0,0,0,0.9)'
        }} />
      </div>

      {/* Toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: isMobile ? 40 : 44,
          height: isMobile ? 40 : 44,
          borderRadius: '50%',
          border: `2px solid ${colors.primary}60`,
          background: `rgba(0,0,0,0.8)`,
          backdropFilter: 'blur(10px)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.3s ease',
          boxShadow: `0 4px 20px rgba(0,0,0,0.5)`
        }}
        title="Change color theme"
      >
        <div style={{
          width: 18,
          height: 18,
          borderRadius: '50%',
          background: `conic-gradient(${colors.primary}, ${colors.secondary}, ${colors.accent}, ${colors.primary})`,
          animation: 'spin 4s linear infinite'
        }} />
      </button>

      {/* Theme options */}
      <div style={{
        position: 'absolute',
        bottom: 52,
        left: 0,
        background: `rgba(0,0,0,0.9)`,
        backdropFilter: 'blur(15px)',
        borderRadius: 12,
        padding: isOpen ? 10 : 0,
        opacity: isOpen ? 1 : 0,
        transform: isOpen ? 'translateY(0) scale(1)' : 'translateY(10px) scale(0.9)',
        pointerEvents: isOpen ? 'auto' : 'none',
        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        border: `1px solid rgba(255,255,255,0.15)`,
        display: 'flex',
        flexDirection: 'column',
        gap: 6,
        minWidth: 130
      }}>
        {Object.entries(themes).map(([key, theme]) => (
          <button
            key={key}
            onClick={() => { setTheme(key); setIsOpen(false); }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '8px 12px',
              background: currentTheme === key ? `${theme.primary}30` : 'transparent',
              border: currentTheme === key ? `1px solid ${theme.primary}50` : '1px solid transparent',
              borderRadius: 8,
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            <div style={{
              width: 16,
              height: 16,
              borderRadius: '50%',
              background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`
            }} />
            <span style={{
              color: '#ffffff',
              fontSize: 12,
              fontWeight: currentTheme === key ? 600 : 400,
              fontFamily: 'monospace'
            }}>{theme.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

// Responsive hook
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

// ==================== NEURAL NETWORK CANVAS ====================
const NeuralNetwork = ({ mousePos, isMobile }) => {
  const { colors } = useTheme();
  const canvasRef = useRef(null);
  const nodesRef = useRef([]);
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const nodeCount = isMobile ? 35 : 70;
    const nodeColors = [colors.primary, colors.secondary, colors.accent, colors.warm];
    nodesRef.current = Array.from({ length: nodeCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * (isMobile ? 0.3 : 0.4),
      vy: (Math.random() - 0.5) * (isMobile ? 0.3 : 0.4),
      radius: Math.random() * 2 + 1,
      color: nodeColors[Math.floor(Math.random() * nodeColors.length)]
    }));

    const animate = () => {
      const bgColor = colors.bg || '#08081a';
      ctx.fillStyle = bgColor.replace(')', ', 0.12)').replace('rgb', 'rgba').replace('#', '');
      ctx.fillStyle = `rgba(${parseInt(bgColor.slice(1,3),16)}, ${parseInt(bgColor.slice(3,5),16)}, ${parseInt(bgColor.slice(5,7),16)}, 0.12)`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const nodes = nodesRef.current;
      const connectionDist = isMobile ? 100 : 130;
      const mouseDist = isMobile ? 120 : 180;

      nodes.forEach((node, i) => {
        if (!isMobile) {
          const dx = mousePos.x - node.x;
          const dy = mousePos.y - node.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouseDist) {
            const force = (mouseDist - dist) / mouseDist;
            node.vx += dx * force * 0.001;
            node.vy += dy * force * 0.001;
          }
        }

        node.x += node.vx;
        node.y += node.vy;
        node.vx *= 0.99;
        node.vy *= 0.99;

        if (node.x < 0) node.x = canvas.width;
        if (node.x > canvas.width) node.x = 0;
        if (node.y < 0) node.y = canvas.height;
        if (node.y > canvas.height) node.y = 0;

        nodes.slice(i + 1).forEach(other => {
          const odx = other.x - node.x;
          const ody = other.y - node.y;
          const odist = Math.sqrt(odx * odx + ody * ody);

          if (odist < connectionDist) {
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(other.x, other.y);
            const primaryRgb = hexToRgb(colors.primary);
            ctx.strokeStyle = `rgba(${primaryRgb}, ${(1 - odist / connectionDist) * 0.35})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        });

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.fill();

        const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, node.radius * 3);
        gradient.addColorStop(0, node.color + '50');
        gradient.addColorStop(1, 'transparent');
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * 3, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationRef.current);
    };
  }, [mousePos, isMobile, colors]);

  return <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.7 }} />;
};

// Helper function
const hexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : '255, 255, 255';
};

// ==================== CURSOR TRAIL ====================
const CursorTrail = ({ mousePos }) => {
  const { colors } = useTheme();
  const [trail, setTrail] = useState([]);
  const trailRef = useRef([]);

  useEffect(() => {
    trailRef.current = [{ x: mousePos.x, y: mousePos.y, id: Date.now() }, ...trailRef.current.slice(0, 12)];
    setTrail([...trailRef.current]);
  }, [mousePos]);

  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 9999 }}>
      {trail.map((point, i) => (
        <div
          key={point.id}
          style={{
            position: 'absolute',
            left: point.x,
            top: point.y,
            width: 14 - i * 0.9,
            height: 14 - i * 0.9,
            background: `radial-gradient(circle, ${i % 2 === 0 ? colors.primary : colors.secondary}, transparent)`,
            borderRadius: '50%',
            transform: 'translate(-50%, -50%)',
            opacity: 0.5 - i * 0.04
          }}
        />
      ))}
      <div style={{
        position: 'absolute',
        left: mousePos.x,
        top: mousePos.y,
        width: 36,
        height: 36,
        background: `radial-gradient(circle, ${colors.glow}50, transparent)`,
        borderRadius: '50%',
        transform: 'translate(-50%, -50%)',
        filter: 'blur(6px)'
      }} />
    </div>
  );
};

// ==================== FLOATING 3D SHAPES ====================
const FloatingShapes = ({ isMobile }) => {
  const { colors } = useTheme();
  const shapes = useMemo(() =>
    Array.from({ length: isMobile ? 6 : 12 }, (_, i) => ({
      id: i,
      x: 5 + Math.random() * 90,
      y: 5 + Math.random() * 90,
      size: isMobile ? 15 + Math.random() * 20 : 20 + Math.random() * 35,
      duration: 18 + Math.random() * 12,
      delay: Math.random() * -15,
      rotateSpeed: 12 + Math.random() * 18,
      colorIndex: i % 4
    })), [isMobile]);

  const colorArray = [colors.primary, colors.secondary, colors.accent, colors.warm];

  return (
    <div style={{ position: 'absolute', inset: 0, perspective: '1000px', pointerEvents: 'none' }}>
      {shapes.map(shape => (
        <div
          key={shape.id}
          style={{
            position: 'absolute',
            left: `${shape.x}%`,
            top: `${shape.y}%`,
            width: shape.size,
            height: shape.size,
            transformStyle: 'preserve-3d',
            animation: `float3d ${shape.duration}s ease-in-out infinite, spin3d ${shape.rotateSpeed}s linear infinite`,
            animationDelay: `${shape.delay}s`,
            opacity: 0.18
          }}
        >
          <div style={{
            width: '100%',
            height: '100%',
            border: `1px solid ${colorArray[shape.colorIndex]}`,
            boxShadow: `0 0 12px ${colorArray[shape.colorIndex]}35, inset 0 0 12px ${colorArray[shape.colorIndex]}15`
          }} />
        </div>
      ))}
    </div>
  );
};

// ==================== MATRIX RAIN ====================
const MatrixRain = ({ isMobile }) => {
  const { colors } = useTheme();
  const chars = 'NATHAN01アイウエオカキクケコ∞∑∂';
  const columns = isMobile ? 15 : 30;

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', opacity: 0.05 }}>
      {[...Array(columns)].map((_, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: `${(i * (100 / columns))}%`,
            top: '-100%',
            fontSize: isMobile ? '10px' : '12px',
            fontFamily: 'monospace',
            color: colors.accent,
            writingMode: 'vertical-rl',
            animation: `matrixFall ${7 + (i % 5) * 2}s linear infinite`,
            animationDelay: `${-i * 0.35}s`
          }}
        >
          {[...Array(isMobile ? 20 : 30)].map((_, j) => (
            <span key={j} style={{ opacity: 1 - j * 0.03 }}>
              {chars[Math.floor(Math.random() * chars.length)]}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
};

// ==================== LIGHTNING ====================
const Lightning = ({ isMobile }) => {
  const { colors } = useTheme();
  const [bolts, setBolts] = useState([]);

  useEffect(() => {
    if (isMobile) return;

    const createBolt = () => {
      const points = [];
      let x = Math.random() * window.innerWidth;
      let y = 0;
      while (y < window.innerHeight * 0.5) {
        points.push({ x, y });
        x += (Math.random() - 0.5) * 70;
        y += 15 + Math.random() * 25;
      }
      return { id: Date.now(), points, opacity: 1 };
    };

    const interval = setInterval(() => {
      if (Math.random() < 0.025) {
        setBolts(prev => [...prev.slice(-1), createBolt()]);
        setTimeout(() => setBolts(prev => prev.map(b => ({ ...b, opacity: 0 }))), 80);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <svg style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
      {bolts.map(bolt => (
        <g key={bolt.id} style={{ opacity: bolt.opacity, transition: 'opacity 0.2s' }}>
          <polyline
            points={bolt.points.map(p => `${p.x},${p.y}`).join(' ')}
            fill="none"
            stroke={colors.accent}
            strokeWidth="2"
            filter="url(#glow)"
          />
          <polyline
            points={bolt.points.map(p => `${p.x},${p.y}`).join(' ')}
            fill="none"
            stroke="white"
            strokeWidth="1"
          />
        </g>
      ))}
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>
    </svg>
  );
};

// ==================== AUDIO VISUALIZER ====================
const AudioVisualizer = ({ isMobile }) => {
  const { colors } = useTheme();
  const [bars, setBars] = useState(Array(isMobile ? 16 : 24).fill(0));

  useEffect(() => {
    const interval = setInterval(() => {
      setBars(prev => prev.map((_, i) => {
        const base = 12 + Math.sin(Date.now() / 300 + i * 0.4) * 10;
        return base + Math.random() * 12;
      }));
    }, 70);
    return () => clearInterval(interval);
  }, [isMobile]);

  return (
    <div style={{
      position: 'absolute',
      bottom: isMobile ? 40 : 80,
      left: '50%',
      transform: 'translateX(-50%)',
      display: 'flex',
      gap: isMobile ? 2 : 3,
      alignItems: 'flex-end',
      height: isMobile ? 35 : 50,
      opacity: 0.25
    }}>
      {bars.map((height, i) => (
        <div
          key={i}
          style={{
            width: isMobile ? 2 : 3,
            height: height * (isMobile ? 0.7 : 1),
            background: `linear-gradient(to top, ${colors.primary}, ${colors.secondary})`,
            borderRadius: 2,
            transition: 'height 0.07s ease'
          }}
        />
      ))}
    </div>
  );
};

// ==================== CYBER HUD ====================
const CyberHUD = ({ isMobile }) => {
  const { colors } = useTheme();
  const [time, setTime] = useState(new Date());
  const [stats, setStats] = useState({ cpu: 72 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
      setStats({ cpu: 65 + Math.random() * 25 });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <div style={{
        position: 'fixed',
        top: isMobile ? 12 : 20,
        left: isMobile ? 12 : 20,
        fontFamily: 'monospace',
        fontSize: isMobile ? '9px' : '10px',
        color: colors.success,
        opacity: 0.7,
        zIndex: 100
      }}>
        <div>[{time.toLocaleTimeString('en-US', { hour12: false })}]</div>
        {!isMobile && <div style={{ opacity: 0.8 }}>SYS.ACTIVE</div>}
      </div>

      {!isMobile && (
        <div style={{
          position: 'fixed', top: 20, right: 140,
          fontFamily: 'monospace', fontSize: '10px', color: colors.primary, opacity: 0.7, textAlign: 'right', zIndex: 100
        }}>
          <div>NEURAL.LINK</div>
          <div style={{ marginTop: 4, width: 80, height: 3, background: `${colors.primary}25`, borderRadius: 2 }}>
            <div style={{ width: `${stats.cpu}%`, height: '100%', background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})`, borderRadius: 2, transition: 'width 0.3s' }} />
          </div>
        </div>
      )}

      {!isMobile && [{ top: 0, left: 0 }, { top: 0, right: 0 }, { bottom: 0, left: 0 }, { bottom: 0, right: 0 }].map((pos, i) => (
        <div key={i} style={{
          position: 'fixed', ...pos, width: 25, height: 25,
          borderColor: `${colors.primary}30`, borderStyle: 'solid', borderWidth: 0,
          borderTopWidth: pos.top === 0 ? 1 : 0, borderBottomWidth: pos.bottom === 0 ? 1 : 0,
          borderLeftWidth: pos.left === 0 ? 1 : 0, borderRightWidth: pos.right === 0 ? 1 : 0,
          zIndex: 100
        }} />
      ))}
    </>
  );
};

// ==================== HOLOGRAPHIC PHOTO ====================
const HolographicPhoto = ({ mousePos, isMobile }) => {
  const { colors } = useTheme();
  const [glitch, setGlitch] = useState(false);
  const [scan, setScan] = useState(0);

  useEffect(() => {
    const glitchInt = setInterval(() => {
      if (Math.random() < 0.2) {
        setGlitch(true);
        setTimeout(() => setGlitch(false), 100);
      }
    }, 3000);
    const scanInt = setInterval(() => setScan(p => (p + 1) % 100), 40);
    return () => { clearInterval(glitchInt); clearInterval(scanInt); };
  }, []);

  const size = isMobile ? 200 : 280;
  const ringOffset = isMobile ? 16 : 22;
  const ringColors = [colors.primary, colors.secondary, colors.warm];

  return (
    <div style={{ position: 'relative', width: `${size}px`, height: `${size}px`, margin: `0 auto ${isMobile ? 30 : 50}px` }}>
      {[0, 1, 2].map(i => (
        <div key={i} style={{
          position: 'absolute',
          inset: `${-ringOffset - i * ringOffset}px`,
          border: `1px solid ${ringColors[i]}${isMobile ? '30' : '45'}`,
          borderRadius: '50%',
          animation: `orbitSpin ${12 + i * 6}s linear infinite ${i % 2 ? 'reverse' : ''}`
        }}>
          <div style={{
            position: 'absolute', top: '50%', left: '-4px',
            width: isMobile ? 6 : 10,
            height: isMobile ? 6 : 10,
            background: ringColors[i],
            borderRadius: '50%',
            boxShadow: `0 0 ${isMobile ? 12 : 20}px ${ringColors[i]}`,
            transform: 'translateY(-50%)'
          }} />
        </div>
      ))}

      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', borderRadius: '50%', zIndex: 5 }}>
        <div style={{
          position: 'absolute', width: '100%', height: '2px', top: `${scan}%`,
          background: `linear-gradient(90deg, transparent, ${colors.accent}, transparent)`,
          boxShadow: `0 0 20px ${colors.accent}`
        }} />
      </div>

      <div style={{
        position: 'relative', width: '100%', height: '100%', borderRadius: '50%', padding: '3px',
        background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary}, ${colors.warm})`,
        backgroundSize: '200% 200%', animation: 'gradientShift 5s ease infinite'
      }}>
        <div style={{
          width: '100%', height: '100%', borderRadius: '50%', overflow: 'hidden', background: colors.bg,
          transform: isMobile ? 'none' : `perspective(1000px) rotateY(${(mousePos.x - window.innerWidth / 2) * 0.01}deg) rotateX(${-(mousePos.y - window.innerHeight / 2) * 0.01}deg)`,
          transition: 'transform 0.15s ease-out'
        }}>
          <img
            src="/images/about.png"
            alt="Nathan Samson"
            style={{
              width: '100%', height: '100%', objectFit: 'cover',
              filter: glitch ? 'hue-rotate(50deg) saturate(1.3)' : 'none',
              transition: 'filter 0.1s'
            }}
          />
          <div style={{
            position: 'absolute', inset: 0,
            background: `linear-gradient(135deg, transparent 35%, ${colors.primary}20 50%, transparent 65%)`,
            animation: 'holographicShine 3s ease-in-out infinite'
          }} />
        </div>
      </div>

      {!isMobile && ['TL', 'BR'].map((pos, i) => (
        <div key={pos} style={{
          position: 'absolute',
          [pos.includes('T') ? 'top' : 'bottom']: '-38px',
          [pos.includes('L') ? 'left' : 'right']: '-38px',
          fontSize: '8px', fontFamily: 'monospace', color: colors.primary, opacity: 0.5
        }}>
          [{`0x${(i * 2749 + Date.now() % 100).toString(16).toUpperCase().slice(0, 4)}`}]
        </div>
      ))}

      {[0, 1, 2].map(i => (
        <div key={i} style={{
          position: 'absolute', inset: '-10px',
          border: `2px solid ${colors.glow}`,
          borderRadius: '50%',
          animation: `energyPulse 2.5s ease-out infinite`,
          animationDelay: `${i * 0.8}s`,
          opacity: 0
        }} />
      ))}
    </div>
  );
};

// ==================== GLITCH TEXT ====================
const GlitchText = ({ children, isMobile }) => {
  const { colors } = useTheme();
  const [text, setText] = useState(children);
  const [glitching, setGlitching] = useState(false);
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

  useEffect(() => {
    let iteration = 0;
    const decode = setInterval(() => {
      setText(children.split('').map((c, i) => c === ' ' ? ' ' : i < iteration ? children[i] : chars[Math.floor(Math.random() * chars.length)]).join(''));
      iteration += 0.7;
      if (iteration >= children.length) { clearInterval(decode); setText(children); }
    }, 35);

    const glitchInt = setInterval(() => {
      setGlitching(true);
      setTimeout(() => setGlitching(false), 100);
    }, 4500);

    return () => { clearInterval(decode); clearInterval(glitchInt); };
  }, [children]);

  const offset = isMobile ? 1.5 : 2;

  return (
    <span style={{ position: 'relative', display: 'inline-block' }}>
      {/* Colored shadow layers for glitch effect */}
      <span style={{
        position: 'absolute', left: glitching ? `${offset + 1}px` : `${offset}px`, top: 0,
        color: colors.highlight, opacity: glitching ? 0.6 : 0.3,
        clipPath: 'polygon(0 0, 100% 0, 100% 35%, 0 35%)',
        textShadow: 'none'
      }}>{text}</span>
      <span style={{
        position: 'absolute', left: glitching ? `-${offset + 1}px` : `-${offset}px`, top: 0,
        color: colors.accent, opacity: glitching ? 0.6 : 0.3,
        clipPath: 'polygon(0 65%, 100% 65%, 100% 100%, 0 100%)',
        textShadow: 'none'
      }}>{text}</span>
      {/* Main text - solid white with colored glow */}
      <span style={{
        color: '#ffffff',
        textShadow: `0 0 40px ${colors.primary}, 0 0 80px ${colors.secondary}40, 0 4px 20px rgba(0,0,0,0.8)`,
        position: 'relative'
      }}>{text}</span>
    </span>
  );
};

// ==================== TYPING EFFECT ====================
const TypingText = ({ texts }) => {
  const { colors } = useTheme();
  const [text, setText] = useState('');
  const [idx, setIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = texts[idx];
    const timeout = setTimeout(() => {
      if (!deleting && charIdx < current.length) {
        setText(current.substring(0, charIdx + 1));
        setCharIdx(charIdx + 1);
      } else if (deleting && charIdx > 0) {
        setText(current.substring(0, charIdx - 1));
        setCharIdx(charIdx - 1);
      } else if (!deleting && charIdx === current.length) {
        setTimeout(() => setDeleting(true), 2500);
      } else if (deleting && charIdx === 0) {
        setDeleting(false);
        setIdx((idx + 1) % texts.length);
      }
    }, deleting ? 25 : 55);
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, idx, texts]);

  return <span>{text}<span style={{ color: colors.primary, animation: 'blink 1s step-end infinite' }}>|</span></span>;
};

// ==================== ANIMATED COUNTER ====================
const AnimatedCounter = ({ end, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    let start;
    const endVal = parseInt(end);
    const anim = (t) => {
      if (!start) start = t;
      const p = Math.min((t - start) / 1500, 1);
      setCount(Math.floor((1 - Math.pow(1 - p, 3)) * endVal));
      if (p < 1) requestAnimationFrame(anim);
    };
    requestAnimationFrame(anim);
  }, [visible, end]);

  return <span ref={ref}>{count}{suffix}</span>;
};

// ==================== MAGNETIC BUTTON ====================
const MagneticButton = ({ children, href, primary, isMobile }) => {
  const { colors } = useTheme();
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  return (
    <a
      ref={ref}
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: isMobile ? '8px' : '10px',
        padding: isMobile ? '14px 24px' : '16px 32px',
        background: primary ? `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)` : `${colors.primary}10`,
        color: colors.text,
        textDecoration: 'none',
        fontSize: isMobile ? '13px' : '14px',
        fontWeight: '500',
        borderRadius: '12px',
        border: primary ? 'none' : `1px solid ${colors.primary}30`,
        cursor: 'pointer',
        transform: isMobile ? `scale(${hovered ? 1.02 : 1})` : `translate(${pos.x}px, ${pos.y}px) scale(${hovered ? 1.05 : 1})`,
        transition: 'transform 0.2s ease, box-shadow 0.3s ease',
        boxShadow: hovered ? (primary ? `0 15px 40px ${colors.primary}40` : `0 10px 30px ${colors.primary}15`) : 'none',
        minWidth: isMobile ? '140px' : 'auto',
        WebkitTapHighlightColor: 'transparent'
      }}
      onMouseMove={e => {
        if (isMobile) return;
        const r = ref.current.getBoundingClientRect();
        setPos({ x: (e.clientX - r.left - r.width / 2) * 0.25, y: (e.clientY - r.top - r.height / 2) * 0.25 });
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setPos({ x: 0, y: 0 }); setHovered(false); }}
      onTouchStart={() => setHovered(true)}
      onTouchEnd={() => setHovered(false)}
    >
      {children}
    </a>
  );
};

// ==================== MAIN COMPONENT ====================
export default function Introduction() {
  const isMobile = useIsMobile();
  const { colors, currentTheme, setTheme } = useTheme();
  const [mousePos, setMousePos] = useState({ x: typeof window !== 'undefined' ? window.innerWidth / 2 : 0, y: typeof window !== 'undefined' ? window.innerHeight / 2 : 0 });
  const [scrollY, setScrollY] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
    const onMouse = (e) => !isMobile && setMousePos({ x: e.clientX, y: e.clientY });
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener('mousemove', onMouse);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { window.removeEventListener('mousemove', onMouse); window.removeEventListener('scroll', onScroll); };
  }, [isMobile]);

  return (
      <section id="home" style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: colors.bgGradient,
        position: 'relative',
        overflow: 'hidden',
        transition: 'background 0.5s ease'
      }}>
        <ThemeToggle currentTheme={currentTheme} setTheme={setTheme} isMobile={isMobile} />

        <NeuralNetwork mousePos={mousePos} isMobile={isMobile} />
        <FloatingShapes isMobile={isMobile} />
        <MatrixRain isMobile={isMobile} />
        <Lightning isMobile={isMobile} />
        <AudioVisualizer isMobile={isMobile} />
        {!isMobile && <CursorTrail mousePos={mousePos} />}
        <CyberHUD isMobile={isMobile} />

        <div style={{
          position: 'absolute', inset: 0,
          background: `
            radial-gradient(ellipse 90% 60% at 50% -30%, ${colors.primary}25, transparent),
            radial-gradient(ellipse 70% 50% at 100% 100%, ${colors.secondary}18, transparent),
            radial-gradient(ellipse 50% 40% at 0% 50%, ${colors.accent}12, transparent)
          `,
          opacity: 1 - scrollY * 0.002,
          pointerEvents: 'none',
          transition: 'background 0.5s ease'
        }} />

        <div style={{ position: 'absolute', inset: 0, perspective: '800px', perspectiveOrigin: '50% 25%', pointerEvents: 'none' }}>
          <div style={{
            position: 'absolute', bottom: 0, left: '-50%', right: '-50%', height: '70%',
            backgroundImage: `linear-gradient(${colors.primary}12 1px, transparent 1px), linear-gradient(90deg, ${colors.primary}12 1px, transparent 1px)`,
            backgroundSize: isMobile ? '40px 40px' : '50px 50px',
            transform: 'rotateX(75deg)', transformOrigin: 'bottom center',
            maskImage: 'linear-gradient(to top, black 10%, transparent 50%)',
            WebkitMaskImage: 'linear-gradient(to top, black 10%, transparent 50%)'
          }} />
        </div>

        {/* Main content - split layout on desktop */}
        <div style={{
          maxWidth: '1300px',
          width: '100%',
          padding: isMobile ? '80px 20px 60px' : '40px 80px',
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: isMobile ? '20px' : '80px',
          position: 'relative',
          zIndex: 10
        }}>
          {/* Left side - Text content */}
          <div style={{
            flex: isMobile ? 'none' : '1',
            textAlign: isMobile ? 'center' : 'left',
            maxWidth: isMobile ? '100%' : '600px'
          }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: isMobile ? '8px' : '10px',
              padding: isMobile ? '10px 20px' : '12px 28px',
              background: `rgba(0,0,0,0.4)`, border: `1px solid ${colors.success}40`,
              borderRadius: '50px', marginBottom: isMobile ? '28px' : '36px',
              opacity: loaded ? 1 : 0, transform: loaded ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s',
              backdropFilter: 'blur(10px)'
            }}>
              <span style={{ width: 8, height: 8, background: colors.success, borderRadius: '50%', boxShadow: `0 0 15px ${colors.success}`, animation: 'pulse 2s ease-in-out infinite' }} />
              <span style={{ fontSize: isMobile ? '10px' : '12px', color: colors.success, fontWeight: '600', letterSpacing: '1.5px', fontFamily: 'monospace', textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
                {isMobile ? 'AVAILABLE' : 'AVAILABLE FOR OPPORTUNITIES'}
              </span>
            </div>

            <h1 style={{
              fontSize: isMobile ? 'clamp(32px, 10vw, 48px)' : 'clamp(44px, 8vw, 72px)',
              fontWeight: '800',
              color: '#ffffff',
              marginBottom: isMobile ? '16px' : '20px',
              lineHeight: '1.1',
              letterSpacing: isMobile ? '-1.5px' : '-2px',
              opacity: loaded ? 1 : 0, transform: loaded ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s',
              textShadow: '0 4px 30px rgba(0,0,0,0.8)'
            }}>
              <span style={{ color: 'rgba(255,255,255,0.6)', fontWeight: '400' }}>Hi, I'm </span>
              <GlitchText isMobile={isMobile}>Nathan Samson</GlitchText>
            </h1>

            <div style={{
              display: 'flex', justifyContent: isMobile ? 'center' : 'flex-start', gap: isMobile ? '6px' : '10px', marginBottom: isMobile ? '24px' : '28px', flexWrap: 'wrap',
              opacity: loaded ? 1 : 0, transform: loaded ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s'
            }}>
              {['Full-Stack Engineer', 'AI/ML Developer', 'Systems Architect'].map((role, i) => (
                <span key={role} style={{
                  padding: isMobile ? '6px 12px' : '8px 18px',
                  background: `rgba(0,0,0,0.4)`,
                  border: `1px solid ${colors.primary}40`,
                  borderRadius: '6px',
                  fontSize: isMobile ? '10px' : '12px',
                  fontWeight: '600',
                  letterSpacing: '0.5px',
                  color: [colors.primary, colors.secondary, colors.warm][i],
                  textShadow: '0 2px 10px rgba(0,0,0,0.5)'
                }}>{role}</span>
              ))}
            </div>

            <p style={{
              fontSize: isMobile ? '14px' : 'clamp(16px, 2vw, 18px)',
              color: 'rgba(255,255,255,0.7)',
              marginBottom: isMobile ? '36px' : '40px',
              lineHeight: '1.6',
              maxWidth: '500px',
              margin: isMobile ? '0 auto 36px' : '0 0 40px 0',
              padding: isMobile ? '0 10px' : 0,
              opacity: loaded ? 1 : 0, transform: loaded ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.4s',
              textShadow: '0 2px 10px rgba(0,0,0,0.5)'
            }}>
              <TypingText texts={['Building distributed systems that scale', 'Crafting AI-powered applications', 'Engineering elegant solutions', 'Turning ideas into reality']} />
            </p>

            <div style={{
              display: 'flex',
              justifyContent: isMobile ? 'center' : 'flex-start',
              gap: isMobile ? '30px' : '40px',
              marginBottom: isMobile ? '40px' : '40px',
              flexWrap: 'wrap',
              opacity: loaded ? 1 : 0, transform: loaded ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.5s'
            }}>
              {[{ value: '2', label: 'Publications', suffix: '' }, { value: '3', label: 'Internships', suffix: '' }, { value: '20', label: 'Data Points', suffix: 'M+' }].map((stat, i) => (
                <div key={i} style={{ textAlign: isMobile ? 'center' : 'left' }}>
                  <div style={{
                    fontSize: isMobile ? '32px' : '36px',
                    fontWeight: '700',
                    color: '#ffffff',
                    textShadow: `0 0 30px ${colors.primary}, 0 4px 15px rgba(0,0,0,0.6)`,
                    lineHeight: 1, fontFamily: 'monospace'
                  }}><AnimatedCounter end={stat.value} suffix={stat.suffix} /></div>
                  <div style={{
                    fontSize: isMobile ? '9px' : '10px',
                    color: 'rgba(255,255,255,0.6)',
                    marginTop: '8px',
                    letterSpacing: '1.5px',
                    textTransform: 'uppercase',
                    textShadow: '0 2px 10px rgba(0,0,0,0.5)'
                  }}>{stat.label}</div>
                </div>
              ))}
            </div>

            <div style={{
              display: 'flex',
              gap: isMobile ? '10px' : '14px',
              justifyContent: isMobile ? 'center' : 'flex-start',
              flexWrap: 'wrap',
              opacity: loaded ? 1 : 0, transform: loaded ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.6s'
            }}>
              <MagneticButton href="/images/res2.pdf" primary isMobile={isMobile}>
                View Resume
                <svg width={isMobile ? 14 : 16} height={isMobile ? 14 : 16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M17 7H7M17 7V17"/></svg>
              </MagneticButton>
              <MagneticButton href="https://github.com/Bostesa" isMobile={isMobile}>
                <svg width={isMobile ? 16 : 18} height={isMobile ? 16 : 18} viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                GitHub
              </MagneticButton>
              <MagneticButton href="https://www.linkedin.com/in/nathan-samson-bostesa/" isMobile={isMobile}>
                <svg width={isMobile ? 16 : 18} height={isMobile ? 16 : 18} viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                LinkedIn
              </MagneticButton>
            </div>
          </div>

          {/* Right side - Photo (on desktop) */}
          {!isMobile && (
            <div style={{
              flex: '0 0 auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: '40px',
              opacity: loaded ? 1 : 0,
              transform: loaded ? 'translateX(0)' : 'translateX(50px)',
              transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.3s'
            }}>
              <HolographicPhoto mousePos={mousePos} isMobile={isMobile} />
            </div>
          )}

          {/* Photo on mobile - show at top */}
          {isMobile && (
            <div style={{
              order: -1,
              marginBottom: 20,
              opacity: loaded ? 1 : 0,
              transform: loaded ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1)'
            }}>
              <HolographicPhoto mousePos={mousePos} isMobile={isMobile} />
            </div>
          )}
        </div>

        {/* Scroll indicator - desktop only */}
        {!isMobile && (
          <div style={{
            position: 'absolute',
            bottom: 40,
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px',
            opacity: Math.max(0, 0.6 - scrollY * 0.006),
            zIndex: 10
          }}>
            <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)', letterSpacing: '3px', textTransform: 'uppercase', fontFamily: 'monospace' }}>Scroll to explore</span>
            <div style={{ width: 24, height: 40, border: `2px solid ${colors.primary}35`, borderRadius: 12, position: 'relative' }}>
              <div style={{ position: 'absolute', left: '50%', top: 8, width: 4, height: 8, background: colors.primary, borderRadius: 2, transform: 'translateX(-50%)', animation: 'scrollBounce 2s ease-in-out infinite' }} />
            </div>
          </div>
        )}

        <style>{`
          @keyframes matrixFall { 0% { transform: translateY(-100%); } 100% { transform: translateY(100vh); } }
          @keyframes orbitSpin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
          @keyframes holographicShine { 0%, 100% { opacity: 0; transform: translateX(-100%); } 50% { opacity: 1; transform: translateX(100%); } }
          @keyframes gradientShift { 0%, 100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }
          @keyframes pulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.5; transform: scale(1.15); } }
          @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
          @keyframes scrollBounce { 0%, 100% { top: 8px; opacity: 1; } 50% { top: 18px; opacity: 0.3; } }
          @keyframes float3d { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-20px); } }
          @keyframes spin3d { from { transform: rotateX(0deg) rotateY(0deg); } to { transform: rotateX(360deg) rotateY(360deg); } }
          @keyframes energyPulse { 0% { transform: scale(1); opacity: 0.6; } 100% { transform: scale(2); opacity: 0; } }
          @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

          * { -webkit-tap-highlight-color: transparent; }
        `}</style>
      </section>
  );
}
