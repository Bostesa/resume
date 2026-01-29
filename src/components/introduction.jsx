import React, { useState, useEffect, useRef, useMemo } from 'react'

// ==================== NEURAL NETWORK CANVAS ====================
const NeuralNetwork = ({ mousePos }) => {
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

    // Initialize nodes
    const nodeCount = 80;
    nodesRef.current = Array.from({ length: nodeCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      radius: Math.random() * 3 + 1,
      pulsePhase: Math.random() * Math.PI * 2,
      color: ['#6366f1', '#8b5cf6', '#d946ef', '#22c55e', '#f43f5e'][Math.floor(Math.random() * 5)]
    }));

    const animate = () => {
      ctx.fillStyle = 'rgba(3, 3, 5, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const nodes = nodesRef.current;
      const mouse = mousePos;

      nodes.forEach((node, i) => {
        // Mouse attraction/repulsion
        const dx = mouse.x - node.x;
        const dy = mouse.y - node.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 200) {
          const force = (200 - dist) / 200;
          node.vx += dx * force * 0.001;
          node.vy += dy * force * 0.001;
        }

        // Update position
        node.x += node.vx;
        node.y += node.vy;
        node.vx *= 0.99;
        node.vy *= 0.99;
        node.pulsePhase += 0.05;

        // Wrap around edges
        if (node.x < 0) node.x = canvas.width;
        if (node.x > canvas.width) node.x = 0;
        if (node.y < 0) node.y = canvas.height;
        if (node.y > canvas.height) node.y = 0;

        // Draw connections
        nodes.slice(i + 1).forEach(other => {
          const odx = other.x - node.x;
          const ody = other.y - node.y;
          const odist = Math.sqrt(odx * odx + ody * ody);

          if (odist < 150) {
            const alpha = (1 - odist / 150) * 0.5;
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `rgba(99, 102, 241, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();

            // Data packet animation
            if (Math.random() < 0.002) {
              const packetX = node.x + odx * ((Date.now() % 1000) / 1000);
              const packetY = node.y + ody * ((Date.now() % 1000) / 1000);
              ctx.beginPath();
              ctx.arc(packetX, packetY, 2, 0, Math.PI * 2);
              ctx.fillStyle = '#22c55e';
              ctx.fill();
            }
          }
        });

        // Draw node with pulse
        const pulseRadius = node.radius + Math.sin(node.pulsePhase) * 1;
        ctx.beginPath();
        ctx.arc(node.x, node.y, pulseRadius, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.fill();

        // Glow effect
        const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, pulseRadius * 4);
        gradient.addColorStop(0, node.color + '40');
        gradient.addColorStop(1, 'transparent');
        ctx.beginPath();
        ctx.arc(node.x, node.y, pulseRadius * 4, 0, Math.PI * 2);
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
  }, [mousePos]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        opacity: 0.6
      }}
    />
  );
};

// ==================== CURSOR TRAIL ====================
const CursorTrail = ({ mousePos }) => {
  const [trail, setTrail] = useState([]);
  const trailRef = useRef([]);

  useEffect(() => {
    trailRef.current = [{ x: mousePos.x, y: mousePos.y, id: Date.now() }, ...trailRef.current.slice(0, 20)];
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
            width: 20 - i,
            height: 20 - i,
            background: `radial-gradient(circle, ${i % 2 === 0 ? '#6366f1' : '#d946ef'}, transparent)`,
            borderRadius: '50%',
            transform: 'translate(-50%, -50%)',
            opacity: 1 - i * 0.05,
            filter: 'blur(2px)'
          }}
        />
      ))}
      {/* Main cursor glow */}
      <div style={{
        position: 'absolute',
        left: mousePos.x,
        top: mousePos.y,
        width: 60,
        height: 60,
        background: 'radial-gradient(circle, rgba(99, 102, 241, 0.8), rgba(217, 70, 239, 0.4), transparent)',
        borderRadius: '50%',
        transform: 'translate(-50%, -50%)',
        filter: 'blur(10px)',
        mixBlendMode: 'screen'
      }} />
    </div>
  );
};

// ==================== BLACK HOLE EFFECT ====================
const BlackHole = ({ mousePos }) => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Initialize particles
    particlesRef.current = Array.from({ length: 200 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2 + 0.5,
      speedX: 0,
      speedY: 0,
      color: Math.random() > 0.5 ? '#6366f1' : '#d946ef'
    }));

    let animationId;
    const animate = () => {
      ctx.fillStyle = 'rgba(3, 3, 5, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach(p => {
        const dx = mousePos.x - p.x;
        const dy = mousePos.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Gravitational pull
        if (dist < 300 && dist > 30) {
          const force = 50 / (dist * dist);
          p.speedX += dx * force;
          p.speedY += dy * force;
        }

        // Event horizon - particles get sucked in and respawn
        if (dist < 30) {
          p.x = Math.random() * canvas.width;
          p.y = Math.random() * canvas.height;
          p.speedX = 0;
          p.speedY = 0;
        }

        p.x += p.speedX;
        p.y += p.speedY;
        p.speedX *= 0.98;
        p.speedY *= 0.98;

        // Draw particle trail
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      });

      // Draw accretion disk
      const gradient = ctx.createRadialGradient(mousePos.x, mousePos.y, 10, mousePos.x, mousePos.y, 100);
      gradient.addColorStop(0, 'rgba(0, 0, 0, 0.9)');
      gradient.addColorStop(0.3, 'rgba(99, 102, 241, 0.3)');
      gradient.addColorStop(0.6, 'rgba(217, 70, 239, 0.2)');
      gradient.addColorStop(1, 'transparent');
      ctx.beginPath();
      ctx.arc(mousePos.x, mousePos.y, 100, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      animationId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animationId);
  }, [mousePos]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        opacity: 0.4
      }}
    />
  );
};

// ==================== 3D FLOATING SHAPES ====================
const FloatingShapes = () => {
  const shapes = useMemo(() =>
    Array.from({ length: 15 }, (_, i) => ({
      id: i,
      type: ['cube', 'pyramid', 'octahedron'][i % 3],
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 30 + Math.random() * 40,
      duration: 15 + Math.random() * 10,
      delay: Math.random() * -20,
      rotateSpeed: 10 + Math.random() * 20
    })), []);

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
            opacity: 0.3
          }}
        >
          {/* Wireframe cube */}
          {shape.type === 'cube' && (
            <div style={{
              width: '100%',
              height: '100%',
              transformStyle: 'preserve-3d',
              position: 'relative'
            }}>
              {[
                { transform: 'translateZ(15px)', border: '#6366f1' },
                { transform: 'translateZ(-15px)', border: '#6366f1' },
                { transform: 'rotateY(90deg) translateZ(15px)', border: '#8b5cf6' },
                { transform: 'rotateY(-90deg) translateZ(15px)', border: '#8b5cf6' },
                { transform: 'rotateX(90deg) translateZ(15px)', border: '#d946ef' },
                { transform: 'rotateX(-90deg) translateZ(15px)', border: '#d946ef' }
              ].map((face, i) => (
                <div
                  key={i}
                  style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    border: `1px solid ${face.border}`,
                    transform: face.transform,
                    boxShadow: `0 0 10px ${face.border}, inset 0 0 10px ${face.border}40`
                  }}
                />
              ))}
            </div>
          )}
          {/* Wireframe pyramid */}
          {shape.type === 'pyramid' && (
            <div style={{
              width: 0,
              height: 0,
              borderLeft: `${shape.size/2}px solid transparent`,
              borderRight: `${shape.size/2}px solid transparent`,
              borderBottom: `${shape.size}px solid rgba(99, 102, 241, 0.3)`,
              filter: 'drop-shadow(0 0 10px #6366f1)'
            }} />
          )}
          {/* Octahedron */}
          {shape.type === 'octahedron' && (
            <div style={{
              width: '100%',
              height: '100%',
              background: 'linear-gradient(135deg, rgba(217, 70, 239, 0.2), rgba(99, 102, 241, 0.2))',
              clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
              boxShadow: '0 0 20px #d946ef'
            }} />
          )}
        </div>
      ))}
    </div>
  );
};

// ==================== SCREEN GLITCH EFFECT ====================
const ScreenGlitch = () => {
  const [glitching, setGlitching] = useState(false);

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      if (Math.random() < 0.1) {
        setGlitching(true);
        setTimeout(() => setGlitching(false), 150);
      }
    }, 2000);
    return () => clearInterval(glitchInterval);
  }, []);

  if (!glitching) return null;

  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 10000 }}>
      {/* RGB Split */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'rgba(255, 0, 0, 0.03)',
        transform: 'translateX(-5px)',
        mixBlendMode: 'screen'
      }} />
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'rgba(0, 255, 255, 0.03)',
        transform: 'translateX(5px)',
        mixBlendMode: 'screen'
      }} />
      {/* Horizontal glitch bars */}
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: `${Math.random() * 100}%`,
            height: `${Math.random() * 10 + 2}px`,
            background: `rgba(${Math.random() > 0.5 ? '99, 102, 241' : '217, 70, 239'}, 0.3)`,
            transform: `translateX(${(Math.random() - 0.5) * 20}px)`
          }}
        />
      ))}
    </div>
  );
};

// ==================== LIGHTNING EFFECT ====================
const Lightning = () => {
  const [bolts, setBolts] = useState([]);

  useEffect(() => {
    const createBolt = () => {
      const points = [];
      let x = Math.random() * window.innerWidth;
      let y = 0;

      while (y < window.innerHeight * 0.7) {
        points.push({ x, y });
        x += (Math.random() - 0.5) * 100;
        y += 20 + Math.random() * 30;

        // Branch
        if (Math.random() < 0.3) {
          const branchPoints = [];
          let bx = x;
          let by = y;
          for (let i = 0; i < 5; i++) {
            branchPoints.push({ x: bx, y: by });
            bx += (Math.random() - 0.5) * 60;
            by += 15 + Math.random() * 20;
          }
          points.push({ branch: branchPoints });
        }
      }
      return { id: Date.now(), points, opacity: 1 };
    };

    const interval = setInterval(() => {
      if (Math.random() < 0.05) {
        setBolts(prev => [...prev.slice(-2), createBolt()]);
        setTimeout(() => {
          setBolts(prev => prev.map(b => ({ ...b, opacity: 0 })));
        }, 100);
      }
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <svg style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'visible' }}>
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      {bolts.map(bolt => (
        <g key={bolt.id} style={{ opacity: bolt.opacity, transition: 'opacity 0.3s' }}>
          <polyline
            points={bolt.points.filter(p => !p.branch).map(p => `${p.x},${p.y}`).join(' ')}
            fill="none"
            stroke="#6366f1"
            strokeWidth="3"
            filter="url(#glow)"
          />
          <polyline
            points={bolt.points.filter(p => !p.branch).map(p => `${p.x},${p.y}`).join(' ')}
            fill="none"
            stroke="white"
            strokeWidth="1"
          />
        </g>
      ))}
    </svg>
  );
};

// ==================== CYBER HUD ====================
const CyberHUD = () => {
  const [time, setTime] = useState(new Date());
  const [systemStats, setSystemStats] = useState({ cpu: 73, mem: 45, net: 892 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
      setSystemStats({
        cpu: 70 + Math.random() * 20,
        mem: 40 + Math.random() * 30,
        net: 800 + Math.random() * 200
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      {/* Top left corner */}
      <div style={{
        position: 'fixed',
        top: 20,
        left: 20,
        fontFamily: 'monospace',
        fontSize: '10px',
        color: '#22c55e',
        textShadow: '0 0 10px #22c55e',
        zIndex: 100
      }}>
        <div style={{ marginBottom: 8 }}>
          [{time.toLocaleTimeString('en-US', { hour12: false })}]
        </div>
        <div style={{ opacity: 0.7 }}>SYS.STATUS: ONLINE</div>
        <div style={{ opacity: 0.7 }}>CPU: {systemStats.cpu.toFixed(1)}%</div>
        <div style={{ opacity: 0.7 }}>MEM: {systemStats.mem.toFixed(1)}%</div>
      </div>

      {/* Top right corner */}
      <div style={{
        position: 'fixed',
        top: 20,
        right: 20,
        fontFamily: 'monospace',
        fontSize: '10px',
        color: '#6366f1',
        textAlign: 'right',
        zIndex: 100
      }}>
        <div style={{ letterSpacing: '2px' }}>NEURAL.LINK.v3.7</div>
        <div style={{ opacity: 0.7 }}>BANDWIDTH: {systemStats.net.toFixed(0)} Mb/s</div>
        <div style={{
          width: 100,
          height: 4,
          background: 'rgba(99, 102, 241, 0.2)',
          marginTop: 4,
          marginLeft: 'auto'
        }}>
          <div style={{
            width: `${systemStats.cpu}%`,
            height: '100%',
            background: 'linear-gradient(90deg, #6366f1, #d946ef)',
            boxShadow: '0 0 10px #6366f1'
          }} />
        </div>
      </div>

      {/* Corner brackets */}
      {[
        { top: 0, left: 0, borderTop: true, borderLeft: true },
        { top: 0, right: 0, borderTop: true, borderRight: true },
        { bottom: 0, left: 0, borderBottom: true, borderLeft: true },
        { bottom: 0, right: 0, borderBottom: true, borderRight: true }
      ].map((corner, i) => (
        <div
          key={i}
          style={{
            position: 'fixed',
            width: 40,
            height: 40,
            borderColor: 'rgba(99, 102, 241, 0.3)',
            borderStyle: 'solid',
            borderWidth: 0,
            ...(corner.borderTop && { borderTopWidth: 2 }),
            ...(corner.borderBottom && { borderBottomWidth: 2 }),
            ...(corner.borderLeft && { borderLeftWidth: 2 }),
            ...(corner.borderRight && { borderRightWidth: 2 }),
            top: corner.top,
            bottom: corner.bottom,
            left: corner.left,
            right: corner.right,
            zIndex: 100
          }}
        />
      ))}
    </>
  );
};

// ==================== PORTAL VORTEX ====================
const PortalVortex = () => {
  return (
    <div style={{
      position: 'absolute',
      left: '50%',
      top: '30%',
      transform: 'translate(-50%, -50%)',
      width: 400,
      height: 400,
      pointerEvents: 'none'
    }}>
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            inset: `${i * 15}px`,
            border: `2px solid rgba(99, 102, 241, ${0.5 - i * 0.04})`,
            borderRadius: '50%',
            animation: `portalSpin ${3 + i * 0.5}s linear infinite ${i % 2 === 0 ? '' : 'reverse'}`,
            boxShadow: `0 0 ${20 - i}px rgba(99, 102, 241, ${0.3 - i * 0.02}), inset 0 0 ${20 - i}px rgba(217, 70, 239, ${0.2 - i * 0.015})`
          }}
        />
      ))}
      {/* Center glow */}
      <div style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        width: 50,
        height: 50,
        transform: 'translate(-50%, -50%)',
        background: 'radial-gradient(circle, rgba(217, 70, 239, 0.8), rgba(99, 102, 241, 0.4), transparent)',
        borderRadius: '50%',
        filter: 'blur(10px)',
        animation: 'portalPulse 2s ease-in-out infinite'
      }} />
    </div>
  );
};

// ==================== AUDIO VISUALIZER ====================
const AudioVisualizer = () => {
  const [bars, setBars] = useState(Array(32).fill(0));

  useEffect(() => {
    const interval = setInterval(() => {
      setBars(prev => prev.map((_, i) => {
        const baseHeight = 20 + Math.sin(Date.now() / 200 + i * 0.5) * 15;
        return baseHeight + Math.random() * 20;
      }));
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{
      position: 'absolute',
      bottom: 100,
      left: '50%',
      transform: 'translateX(-50%)',
      display: 'flex',
      gap: 3,
      alignItems: 'flex-end',
      height: 60,
      opacity: 0.4
    }}>
      {bars.map((height, i) => (
        <div
          key={i}
          style={{
            width: 4,
            height: height,
            background: `linear-gradient(to top, #6366f1, #d946ef)`,
            borderRadius: 2,
            boxShadow: '0 0 10px rgba(99, 102, 241, 0.5)',
            transition: 'height 0.05s ease'
          }}
        />
      ))}
    </div>
  );
};

// ==================== MATRIX CODE RAIN ====================
const MatrixRain = () => {
  const chars = 'NATHANSAMSON01アイウエオカキクケコサシスセソタチツテト∑∂∫≈≠∞';
  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      overflow: 'hidden',
      pointerEvents: 'none',
      opacity: 0.15
    }}>
      {[...Array(40)].map((_, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: `${(i * 43) % 100}%`,
            top: '-100%',
            fontSize: '14px',
            fontFamily: 'monospace',
            color: '#22c55e',
            textShadow: '0 0 10px #22c55e',
            writingMode: 'vertical-rl',
            animation: `matrixFall ${6 + (i % 5) * 2}s linear infinite`,
            animationDelay: `${-i * 0.3}s`
          }}
        >
          {[...Array(40)].map((_, j) => (
            <span key={j} style={{ opacity: 1 - j * 0.02 }}>
              {chars[Math.floor(Math.random() * chars.length)]}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
};

// ==================== HOLOGRAPHIC PHOTO ====================
const HolographicPhoto = ({ mousePos }) => {
  const [glitch, setGlitch] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 100 + Math.random() * 100);
    }, 2000 + Math.random() * 2000);

    const scanInterval = setInterval(() => {
      setScanProgress(p => (p + 1) % 100);
    }, 30);

    return () => {
      clearInterval(glitchInterval);
      clearInterval(scanInterval);
    };
  }, []);

  return (
    <div style={{
      position: 'relative',
      width: '300px',
      height: '300px',
      margin: '0 auto 60px',
      transformStyle: 'preserve-3d'
    }}>
      {/* Holographic rings */}
      {[0, 1, 2, 3, 4].map((i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            inset: `${-30 - i * 20}px`,
            border: `1px solid rgba(99, 102, 241, ${0.4 - i * 0.07})`,
            borderRadius: '50%',
            animation: `orbitSpin ${6 + i * 2}s linear infinite ${i % 2 === 0 ? '' : 'reverse'}`,
            transformStyle: 'preserve-3d',
            transform: `rotateX(${75 + i * 3}deg)`
          }}
        >
          {/* Orbiting particles */}
          {[0, 1, 2].map(j => (
            <div
              key={j}
              style={{
                position: 'absolute',
                top: '50%',
                left: `${j * 33}%`,
                width: 8,
                height: 8,
                background: ['#6366f1', '#d946ef', '#22c55e'][j],
                borderRadius: '50%',
                boxShadow: `0 0 20px ${['#6366f1', '#d946ef', '#22c55e'][j]}`,
                transform: 'translateY(-50%)'
              }}
            />
          ))}
        </div>
      ))}

      {/* DNA helix around photo */}
      <div style={{ position: 'absolute', inset: -60, pointerEvents: 'none' }}>
        {[...Array(24)].map((_, i) => {
          const angle = (i / 24) * Math.PI * 4;
          const radius = 170;
          const x = Math.cos(angle + Date.now() / 1000) * radius;
          const y = (i / 24) * 400 - 200;
          return (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                width: 8,
                height: 8,
                background: i % 2 === 0 ? '#6366f1' : '#d946ef',
                borderRadius: '50%',
                transform: `translate(${x}px, ${y}px)`,
                boxShadow: `0 0 15px ${i % 2 === 0 ? '#6366f1' : '#d946ef'}`,
                animation: `dnaFloat 3s ease-in-out infinite`,
                animationDelay: `${i * 0.1}s`,
                opacity: 0.7
              }}
            />
          );
        })}
      </div>

      {/* Scanning effect */}
      <div style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        borderRadius: '50%',
        zIndex: 10
      }}>
        <div style={{
          position: 'absolute',
          width: '100%',
          height: '4px',
          top: `${scanProgress}%`,
          background: 'linear-gradient(90deg, transparent, #22c55e, transparent)',
          boxShadow: '0 0 30px #22c55e, 0 0 60px #22c55e',
        }} />
      </div>

      {/* Glitch layers */}
      <div style={{
        position: 'absolute',
        inset: 0,
        borderRadius: '50%',
        overflow: 'hidden',
        zIndex: 1
      }}>
        <img
          src="/images/about.jpg"
          alt=""
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: 'hue-rotate(180deg)',
            opacity: glitch ? 0.7 : 0,
            transform: glitch ? 'translateX(-8px) skewX(-2deg)' : 'none',
            mixBlendMode: 'screen'
          }}
        />
        <img
          src="/images/about.jpg"
          alt=""
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: 'hue-rotate(-90deg)',
            opacity: glitch ? 0.7 : 0,
            transform: glitch ? 'translateX(8px) skewX(2deg)' : 'none',
            mixBlendMode: 'screen'
          }}
        />
      </div>

      {/* Main photo */}
      <div style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        padding: '5px',
        background: 'linear-gradient(135deg, #6366f1, #8b5cf6, #d946ef, #f43f5e, #22c55e, #6366f1)',
        backgroundSize: '600% 600%',
        animation: 'gradientShift 4s ease infinite'
      }}>
        <div style={{
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          overflow: 'hidden',
          position: 'relative',
          transform: `perspective(1000px) rotateY(${(mousePos.x - window.innerWidth / 2) * 0.02}deg) rotateX(${-(mousePos.y - window.innerHeight / 2) * 0.02}deg)`,
          transition: 'transform 0.1s ease-out'
        }}>
          <img
            src="/images/about.jpg"
            alt="Nathan Samson"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              filter: glitch ? 'hue-rotate(90deg) saturate(2) contrast(1.2)' : 'none',
              transition: 'filter 0.1s'
            }}
          />
          {/* Holographic shimmer */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: `linear-gradient(${135 + (mousePos.x / window.innerWidth) * 90}deg, transparent 30%, rgba(99, 102, 241, 0.3) 45%, rgba(217, 70, 239, 0.3) 55%, transparent 70%)`,
            animation: 'holographicShimmer 2s linear infinite'
          }} />
        </div>
      </div>

      {/* Data readouts */}
      {['TL', 'TR', 'BL', 'BR'].map((pos, i) => (
        <div
          key={pos}
          style={{
            position: 'absolute',
            [pos.includes('T') ? 'top' : 'bottom']: '-45px',
            [pos.includes('L') ? 'left' : 'right']: '-45px',
            fontSize: '8px',
            fontFamily: 'monospace',
            color: '#6366f1',
            opacity: 0.8,
            textShadow: '0 0 5px #6366f1'
          }}
        >
          <div>[{`0x${(i * 2137 + Date.now() % 1000).toString(16).toUpperCase().slice(0, 4)}`}]</div>
          <div style={{ opacity: 0.5 }}>{['INIT', 'SYNC', 'LOAD', 'EXEC'][i]}</div>
        </div>
      ))}

      {/* Energy pulses */}
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            inset: '-15px',
            border: '2px solid rgba(99, 102, 241, 0.6)',
            borderRadius: '50%',
            animation: `energyPulse 2.5s ease-out infinite`,
            animationDelay: `${i * 0.5}s`,
            opacity: 0
          }}
        />
      ))}
    </div>
  );
};

// ==================== GLITCH TEXT ====================
const GlitchText = ({ children }) => {
  const [glitchText, setGlitchText] = useState(children);
  const [isGlitching, setIsGlitching] = useState(false);
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*<>[]{}';

  useEffect(() => {
    // Initial decode animation
    let iteration = 0;
    const decodeInterval = setInterval(() => {
      setGlitchText(
        children.split('').map((_, i) => {
          if (i < iteration) return children[i];
          return chars[Math.floor(Math.random() * chars.length)];
        }).join('')
      );
      iteration += 0.5;
      if (iteration >= children.length) {
        clearInterval(decodeInterval);
        setGlitchText(children);
      }
    }, 30);

    // Periodic glitch
    const glitchInterval = setInterval(() => {
      setIsGlitching(true);
      let glitchIteration = 0;
      const glitchAnim = setInterval(() => {
        setGlitchText(
          children.split('').map((_, i) => {
            if (Math.random() > 0.3) return children[i];
            return chars[Math.floor(Math.random() * chars.length)];
          }).join('')
        );
        glitchIteration++;
        if (glitchIteration > 5) {
          clearInterval(glitchAnim);
          setGlitchText(children);
          setIsGlitching(false);
        }
      }, 50);
    }, 4000);

    return () => {
      clearInterval(decodeInterval);
      clearInterval(glitchInterval);
    };
  }, [children]);

  return (
    <span style={{ position: 'relative', display: 'inline-block' }}>
      {/* Glitch shadows */}
      <span style={{
        position: 'absolute',
        left: isGlitching ? '3px' : '2px',
        top: 0,
        color: '#ff0040',
        opacity: isGlitching ? 1 : 0.6,
        animation: 'glitchSkew 0.5s infinite linear alternate-reverse',
        clipPath: 'polygon(0 0, 100% 0, 100% 35%, 0 35%)'
      }}>{glitchText}</span>
      <span style={{
        position: 'absolute',
        left: isGlitching ? '-3px' : '-2px',
        top: 0,
        color: '#00ffff',
        opacity: isGlitching ? 1 : 0.6,
        animation: 'glitchSkew 0.4s infinite linear alternate-reverse',
        clipPath: 'polygon(0 65%, 100% 65%, 100% 100%, 0 100%)'
      }}>{glitchText}</span>
      {/* Main text */}
      <span style={{
        background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 25%, #d946ef 50%, #f43f5e 75%, #6366f1 100%)',
        backgroundSize: '400% 400%',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        animation: 'gradientShift 3s ease infinite'
      }}>{glitchText}</span>
    </span>
  );
};

// ==================== ANIMATED COUNTER ====================
const AnimatedCounter = ({ end, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    let startTime;
    const endValue = parseInt(end);
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / 2000, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * endValue));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [isVisible, end]);

  return <span ref={ref}>{count}{suffix}</span>;
};

// ==================== MAGNETIC BUTTON ====================
const MagneticButton = ({ children, href, style }) => {
  const buttonRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [ripples, setRipples] = useState([]);

  const handleMouseMove = (e) => {
    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setPosition({ x: x * 0.4, y: y * 0.4 });
  };

  const handleClick = (e) => {
    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setRipples(prev => [...prev, { x, y, id: Date.now() }]);
    setTimeout(() => setRipples(prev => prev.slice(1)), 1000);
  };

  return (
    <a
      ref={buttonRef}
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      style={{
        ...style,
        transform: `translate(${position.x}px, ${position.y}px) scale(${isHovered ? 1.1 : 1})`,
        transition: 'transform 0.2s cubic-bezier(0.23, 1, 0.32, 1)',
        position: 'relative',
        overflow: 'hidden'
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setPosition({ x: 0, y: 0 }); setIsHovered(false); }}
      onClick={handleClick}
    >
      {/* Ripple effects */}
      {ripples.map(ripple => (
        <span
          key={ripple.id}
          style={{
            position: 'absolute',
            left: ripple.x,
            top: ripple.y,
            width: 10,
            height: 10,
            background: 'rgba(255, 255, 255, 0.5)',
            borderRadius: '50%',
            transform: 'translate(-50%, -50%)',
            animation: 'rippleExpand 1s ease-out forwards',
            pointerEvents: 'none'
          }}
        />
      ))}
      {/* Shine effect */}
      {isHovered && (
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
          animation: 'buttonShine 0.5s ease'
        }} />
      )}
      {children}
    </a>
  );
};

// ==================== TYPING EFFECT ====================
const TypingText = ({ texts }) => {
  const [currentText, setCurrentText] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const text = texts[textIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting && charIndex < text.length) {
        setCurrentText(text.substring(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      } else if (isDeleting && charIndex > 0) {
        setCurrentText(text.substring(0, charIndex - 1));
        setCharIndex(charIndex - 1);
      } else if (!isDeleting && charIndex === text.length) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
        setTextIndex((textIndex + 1) % texts.length);
      }
    }, isDeleting ? 30 : 80);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, textIndex, texts]);

  return (
    <span>
      {currentText}
      <span style={{
        animation: 'blink 1s step-end infinite',
        color: '#6366f1'
      }}>|</span>
    </span>
  );
};

// ==================== MAIN COMPONENT ====================
export default function Introduction() {
  const [mousePos, setMousePos] = useState({
    x: typeof window !== 'undefined' ? window.innerWidth / 2 : 0,
    y: typeof window !== 'undefined' ? window.innerHeight / 2 : 0
  });
  const [scrollY, setScrollY] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
    const handleMouseMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section
      id="home"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(180deg, #030305 0%, #0a0a15 50%, #030305 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* SVG Filters */}
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
      </svg>

      {/* Background layers */}
      <NeuralNetwork mousePos={mousePos} />
      <BlackHole mousePos={mousePos} />
      <FloatingShapes />
      <MatrixRain />
      <Lightning />
      <PortalVortex />
      <AudioVisualizer />

      {/* Cursor effects */}
      <CursorTrail mousePos={mousePos} />

      {/* HUD Elements */}
      <CyberHUD />
      <ScreenGlitch />

      {/* Animated gradient overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: `
          radial-gradient(ellipse 120% 80% at 50% -30%, rgba(99, 102, 241, 0.3), transparent 60%),
          radial-gradient(ellipse 100% 60% at 100% 100%, rgba(217, 70, 239, 0.2), transparent 50%),
          radial-gradient(ellipse 80% 50% at 0% 50%, rgba(34, 197, 94, 0.15), transparent 40%)
        `,
        animation: 'bgPulse 8s ease-in-out infinite',
        opacity: 1 - scrollY * 0.002
      }} />

      {/* Noise overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        opacity: 0.05,
        background: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        pointerEvents: 'none',
        mixBlendMode: 'overlay',
        animation: 'noiseShift 0.5s steps(10) infinite'
      }} />

      {/* Scan lines */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 4px)',
        pointerEvents: 'none',
        opacity: 0.4
      }} />

      {/* Perspective grid floor */}
      <div style={{
        position: 'absolute',
        inset: 0,
        perspective: '800px',
        perspectiveOrigin: '50% 20%',
        pointerEvents: 'none'
      }}>
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: '-100%',
          right: '-100%',
          height: '100%',
          backgroundImage: `
            linear-gradient(rgba(99, 102, 241, 0.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99, 102, 241, 0.15) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
          transform: 'rotateX(80deg)',
          transformOrigin: 'bottom center',
          maskImage: 'linear-gradient(to top, black 10%, transparent 60%)',
          WebkitMaskImage: 'linear-gradient(to top, black 10%, transparent 60%)',
          animation: 'gridScroll 20s linear infinite'
        }} />
      </div>

      {/* Content */}
      <div style={{
        maxWidth: '1200px',
        padding: '120px 48px 0',
        textAlign: 'center',
        position: 'relative',
        zIndex: 10
      }}>
        {/* Holographic photo */}
        <div style={{
          opacity: loaded ? 1 : 0,
          transform: loaded ? 'translateY(0) scale(1)' : 'translateY(100px) scale(0.8)',
          transition: 'all 1.2s cubic-bezier(0.23, 1, 0.32, 1)'
        }}>
          <HolographicPhoto mousePos={mousePos} />
        </div>

        {/* Status badge */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '12px',
          padding: '14px 32px',
          background: 'rgba(34, 197, 94, 0.08)',
          border: '1px solid rgba(34, 197, 94, 0.4)',
          borderRadius: '60px',
          marginBottom: '40px',
          opacity: loaded ? 1 : 0,
          transform: loaded ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.8s cubic-bezier(0.23, 1, 0.32, 1) 0.3s',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 0 30px rgba(34, 197, 94, 0.2), inset 0 0 30px rgba(34, 197, 94, 0.05)'
        }}>
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(90deg, transparent, rgba(34, 197, 94, 0.15), transparent)',
            animation: 'badgeScan 2s linear infinite'
          }} />
          <span style={{
            width: '12px',
            height: '12px',
            background: '#22c55e',
            borderRadius: '50%',
            animation: 'pulse 1.5s ease-in-out infinite',
            boxShadow: '0 0 20px #22c55e, 0 0 40px #22c55e, 0 0 60px #22c55e'
          }} />
          <span style={{
            fontSize: '12px',
            color: '#22c55e',
            fontWeight: '600',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            fontFamily: 'monospace',
            textShadow: '0 0 10px #22c55e'
          }}>
            NEURAL.LINK ACTIVE // SEEKING NEW MISSIONS
          </span>
        </div>

        {/* Main heading */}
        <h1 style={{
          fontSize: 'clamp(52px, 14vw, 120px)',
          fontWeight: '900',
          color: '#FFFFFF',
          marginBottom: '24px',
          lineHeight: '1.05',
          letterSpacing: '-5px',
          opacity: loaded ? 1 : 0,
          transform: loaded ? 'translateY(0)' : 'translateY(50px)',
          transition: 'all 1s cubic-bezier(0.23, 1, 0.32, 1) 0.4s'
        }}>
          <span style={{ color: 'rgba(255,255,255,0.4)' }}>Hi, I'm </span>
          <span style={{
            display: 'inline-block',
            position: 'relative'
          }}>
            <GlitchText>Nathan Samson</GlitchText>
          </span>
        </h1>

        {/* Role badges with typing effect */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '12px',
          marginBottom: '32px',
          flexWrap: 'wrap',
          opacity: loaded ? 1 : 0,
          transform: loaded ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.8s cubic-bezier(0.23, 1, 0.32, 1) 0.5s'
        }}>
          {['FULL-STACK ENGINEER', 'AI/ML DEVELOPER', 'SYSTEMS ARCHITECT'].map((role, i) => (
            <span
              key={role}
              style={{
                padding: '10px 24px',
                background: 'rgba(99, 102, 241, 0.1)',
                border: '1px solid rgba(99, 102, 241, 0.4)',
                borderRadius: '4px',
                fontSize: '11px',
                fontWeight: '700',
                letterSpacing: '2px',
                color: '#6366f1',
                fontFamily: 'monospace',
                boxShadow: '0 0 20px rgba(99, 102, 241, 0.15), inset 0 0 20px rgba(99, 102, 241, 0.05)',
                animation: `fadeSlideIn 0.5s ease forwards`,
                animationDelay: `${0.6 + i * 0.1}s`,
                opacity: 0
              }}
            >
              {'>'} {role}
            </span>
          ))}
        </div>

        {/* Tagline with typing effect */}
        <p style={{
          fontSize: 'clamp(18px, 3vw, 24px)',
          color: 'rgba(255,255,255,0.5)',
          marginBottom: '60px',
          lineHeight: '1.6',
          maxWidth: '700px',
          margin: '0 auto 60px',
          fontWeight: '400',
          opacity: loaded ? 1 : 0,
          transform: loaded ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.8s cubic-bezier(0.23, 1, 0.32, 1) 0.6s',
          fontFamily: 'monospace'
        }}>
          <TypingText texts={[
            'Building distributed systems at scale',
            'Crafting AI-powered applications',
            'Engineering the future of technology',
            'Transforming ideas into reality'
          ]} />
        </p>

        {/* Stats */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '60px',
          marginBottom: '60px',
          flexWrap: 'wrap',
          opacity: loaded ? 1 : 0,
          transform: loaded ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.8s cubic-bezier(0.23, 1, 0.32, 1) 0.7s'
        }}>
          {[
            { value: '2', label: 'Publications', suffix: '', icon: '◈' },
            { value: '3', label: 'Internships', suffix: '', icon: '◇' },
            { value: '20', label: 'Data Points', suffix: 'M+', icon: '◆' }
          ].map((stat, i) => (
            <div
              key={i}
              style={{
                textAlign: 'center',
                position: 'relative',
                padding: '28px 36px',
                background: 'rgba(99, 102, 241, 0.05)',
                border: '1px solid rgba(99, 102, 241, 0.2)',
                borderRadius: '12px',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 0 30px rgba(99, 102, 241, 0.1), inset 0 0 30px rgba(99, 102, 241, 0.03)'
              }}
            >
              {/* Animated corner accents */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: 20,
                height: 20,
                borderTop: '2px solid #6366f1',
                borderLeft: '2px solid #6366f1',
                animation: 'cornerPulse 2s ease-in-out infinite'
              }} />
              <div style={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                width: 20,
                height: 20,
                borderBottom: '2px solid #d946ef',
                borderRight: '2px solid #d946ef',
                animation: 'cornerPulse 2s ease-in-out infinite 1s'
              }} />

              <div style={{
                fontSize: '56px',
                fontWeight: '900',
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6, #d946ef)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                lineHeight: 1,
                fontFamily: 'monospace',
                textShadow: '0 0 40px rgba(99, 102, 241, 0.5)'
              }}>
                <AnimatedCounter end={stat.value} suffix={stat.suffix} />
              </div>
              <div style={{
                fontSize: '11px',
                color: 'rgba(255,255,255,0.4)',
                textTransform: 'uppercase',
                letterSpacing: '3px',
                marginTop: '14px',
                fontWeight: '700',
                fontFamily: 'monospace'
              }}>
                {stat.icon} {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div style={{
          display: 'flex',
          gap: '20px',
          justifyContent: 'center',
          flexWrap: 'wrap',
          marginBottom: '100px',
          opacity: loaded ? 1 : 0,
          transform: loaded ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.8s cubic-bezier(0.23, 1, 0.32, 1) 0.8s'
        }}>
          <MagneticButton
            href="/images/res2.pdf"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              padding: '20px 40px',
              background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #d946ef 100%)',
              backgroundSize: '200% 200%',
              color: '#FFFFFF',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: '700',
              borderRadius: '12px',
              cursor: 'pointer',
              boxShadow: '0 0 40px rgba(99, 102, 241, 0.5), 0 0 80px rgba(99, 102, 241, 0.3), inset 0 1px 0 rgba(255,255,255,0.2)',
              fontFamily: 'monospace',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              animation: 'gradientShift 3s ease infinite'
            }}
          >
            <span style={{ opacity: 0.7 }}>{'>'}</span> View Resume
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M7 17L17 7M17 7H7M17 7V17"/>
            </svg>
          </MagneticButton>
          <MagneticButton
            href="https://github.com/Bostesa"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              padding: '20px 40px',
              background: 'rgba(99, 102, 241, 0.08)',
              color: '#FFFFFF',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: '600',
              borderRadius: '12px',
              border: '1px solid rgba(99, 102, 241, 0.4)',
              cursor: 'pointer',
              backdropFilter: 'blur(20px)',
              fontFamily: 'monospace',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              boxShadow: '0 0 30px rgba(99, 102, 241, 0.2), inset 0 0 30px rgba(99, 102, 241, 0.05)'
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            GitHub
          </MagneticButton>
          <MagneticButton
            href="https://www.linkedin.com/in/nathan-samson-bostesa/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              padding: '20px 40px',
              background: 'rgba(99, 102, 241, 0.08)',
              color: '#FFFFFF',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: '600',
              borderRadius: '12px',
              border: '1px solid rgba(99, 102, 241, 0.4)',
              cursor: 'pointer',
              backdropFilter: 'blur(20px)',
              fontFamily: 'monospace',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              boxShadow: '0 0 30px rgba(99, 102, 241, 0.2), inset 0 0 30px rgba(99, 102, 241, 0.05)'
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
            LinkedIn
          </MagneticButton>
        </div>

        {/* Scroll indicator */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '16px',
          opacity: Math.max(0, 1 - scrollY * 0.01),
          transform: loaded ? 'translateY(0)' : 'translateY(30px)',
          transition: 'transform 0.8s cubic-bezier(0.23, 1, 0.32, 1) 0.9s'
        }}>
          <span style={{
            fontSize: '10px',
            color: 'rgba(255,255,255,0.25)',
            letterSpacing: '4px',
            textTransform: 'uppercase',
            fontWeight: '700',
            fontFamily: 'monospace',
            animation: 'scrollTextPulse 2s ease-in-out infinite'
          }}>
            {'<< SCROLL TO EXPLORE >>'}
          </span>
          <div style={{
            width: '28px',
            height: '48px',
            border: '2px solid rgba(99, 102, 241, 0.4)',
            borderRadius: '14px',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 0 20px rgba(99, 102, 241, 0.2), inset 0 0 20px rgba(99, 102, 241, 0.1)'
          }}>
            <div style={{
              position: 'absolute',
              left: '50%',
              top: '8px',
              width: '6px',
              height: '10px',
              background: 'linear-gradient(to bottom, #6366f1, #d946ef)',
              borderRadius: '3px',
              transform: 'translateX(-50%)',
              animation: 'scrollBounce 1.5s ease-in-out infinite',
              boxShadow: '0 0 15px #6366f1, 0 0 30px #6366f1'
            }} />
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes matrixFall {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
        @keyframes orbitSpin {
          from { transform: rotateX(75deg) rotateZ(0deg); }
          to { transform: rotateX(75deg) rotateZ(360deg); }
        }
        @keyframes energyPulse {
          0% { transform: scale(1); opacity: 0.8; }
          100% { transform: scale(2.5); opacity: 0; }
        }
        @keyframes holographicShimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes glitchSkew {
          0% { transform: skew(0deg) translateX(0); }
          20% { transform: skew(-3deg) translateX(-2px); }
          40% { transform: skew(3deg) translateX(2px); }
          60% { transform: skew(0deg) translateX(0); }
          80% { transform: skew(2deg) translateX(1px); }
          100% { transform: skew(-2deg) translateX(-1px); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.2); }
        }
        @keyframes badgeScan {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes scrollBounce {
          0%, 100% { top: 8px; opacity: 1; }
          50% { top: 24px; opacity: 0.3; }
        }
        @keyframes float3d {
          0%, 100% { transform: translateY(0) translateZ(0); }
          50% { transform: translateY(-30px) translateZ(20px); }
        }
        @keyframes spin3d {
          from { transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg); }
          to { transform: rotateX(360deg) rotateY(360deg) rotateZ(360deg); }
        }
        @keyframes portalSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes portalPulse {
          0%, 100% { opacity: 0.8; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 1; transform: translate(-50%, -50%) scale(1.5); }
        }
        @keyframes bgPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        @keyframes noiseShift {
          0% { transform: translate(0, 0); }
          100% { transform: translate(-10px, -10px); }
        }
        @keyframes gridScroll {
          0% { background-position: 0 0; }
          100% { background-position: 80px 80px; }
        }
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes rippleExpand {
          from { transform: translate(-50%, -50%) scale(1); opacity: 1; }
          to { transform: translate(-50%, -50%) scale(50); opacity: 0; }
        }
        @keyframes buttonShine {
          from { transform: translateX(-100%); }
          to { transform: translateX(100%); }
        }
        @keyframes cornerPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        @keyframes scrollTextPulse {
          0%, 100% { opacity: 0.25; }
          50% { opacity: 0.5; }
        }
        @keyframes dnaFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </section>
  );
}
