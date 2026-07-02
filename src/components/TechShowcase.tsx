/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Smartphone, Globe, Cpu } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { techShowcaseItems } from '../data';

// Definition of animation phases
type AnimationPhase =
  | 'init'
  | 'appear-android'
  | 'appear-web'
  | 'appear-automation'
  | 'floating'
  | 'beam-sweep'
  | 'dissolve'
  | 'complete';

export default function TechShowcase() {
  const [phase, setPhase] = useState<AnimationPhase>('init');
  const [highlightedIcon, setHighlightedIcon] = useState<string | null>(null);

  // Generate a list of randomized particles for the dissolve effect
  const particlesCount = 28;
  const particles = Array.from({ length: particlesCount }).map((_, i) => {
    const angle = (i / particlesCount) * 2 * Math.PI + (Math.random() - 0.5) * 0.4;
    const distance = 80 + Math.random() * 120;
    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance - 40; // Drifts upwards slightly
    return {
      id: i,
      x,
      y,
      size: 3 + Math.random() * 5,
      color: i % 3 === 0 ? '#00F0FF' : i % 3 === 1 ? '#FF007A' : '#ffffff',
      delay: Math.random() * 0.3,
    };
  });

  useEffect(() => {
    let timers: NodeJS.Timeout[] = [];

    const runSequence = () => {
      // 0. Initial hidden state
      setPhase('init');
      setHighlightedIcon(null);

      // 1. Android appears
      timers.push(
        setTimeout(() => {
          setPhase('appear-android');
        }, 300)
      );

      // 2. Web appears
      timers.push(
        setTimeout(() => {
          setPhase('appear-web');
        }, 1500)
      );

      // 3. Automation appears
      timers.push(
        setTimeout(() => {
          setPhase('appear-automation');
        }, 2700)
      );

      // 4. Stable Floating phase
      timers.push(
        setTimeout(() => {
          setPhase('floating');
        }, 4000)
      );

      // 5. Beam Sweep phase
      timers.push(
        setTimeout(() => {
          setPhase('beam-sweep');
        }, 6200)
      );

      // Individual sequential highlights during beam sweep (left-to-right pass)
      timers.push(
        setTimeout(() => {
          setHighlightedIcon('tech-android');
        }, 6400)
      );
      timers.push(
        setTimeout(() => {
          setHighlightedIcon('tech-web');
        }, 7000)
      );
      timers.push(
        setTimeout(() => {
          setHighlightedIcon('tech-automation');
        }, 7600)
      );

      // 6. Dissolve phase (particles ignite, icons scale down and fade out)
      timers.push(
        setTimeout(() => {
          setHighlightedIcon(null);
          setPhase('dissolve');
        }, 8600)
      );

      // 7. Complete phase (silence, reset)
      timers.push(
        setTimeout(() => {
          setPhase('complete');
        }, 10500)
      );
    };

    // Run first iteration immediately
    runSequence();

    // Loop sequence infinitely
    const interval = setInterval(runSequence, 11500);

    return () => {
      clearInterval(interval);
      timers.forEach((t) => clearTimeout(t));
    };
  }, []);

  // Determine visibility states for each icon based on the current phase
  const isVisible = (id: string) => {
    if (phase === 'init') return false;
    if (id === 'tech-android') {
      return ['appear-android', 'appear-web', 'appear-automation', 'floating', 'beam-sweep'].includes(phase);
    }
    if (id === 'tech-web') {
      return ['appear-web', 'appear-automation', 'floating', 'beam-sweep'].includes(phase);
    }
    if (id === 'tech-automation') {
      return ['appear-automation', 'floating', 'beam-sweep'].includes(phase);
    }
    return false;
  };

  const getLucideIcon = (name: string) => {
    switch (name) {
      case 'Smartphone':
        return <Smartphone className="w-10 h-10 md:w-12 md:h-12 text-white" />;
      case 'Globe':
        return <Globe className="w-10 h-10 md:w-12 md:h-12 text-white" />;
      case 'Cpu':
        return <Cpu className="w-10 h-10 md:w-12 md:h-12 text-white" />;
      default:
        return <Cpu className="w-10 h-10 md:w-12 md:h-12 text-white" />;
    }
  };

  return (
    <div
      id="tech-showcase-container"
      className="relative w-full max-w-5xl mx-auto py-24 min-h-[460px] flex flex-col items-center justify-center overflow-hidden rounded-3xl glass-panel border border-white/5 shadow-2xl bg-[#080d1a]/25"
    >
      {/* Decorative Cybernetic Grid lines */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

      {/* Dynamic Beam sweep line overlay */}
      {phase === 'beam-sweep' && (
        <motion.div
          id="cinematic-light-beam"
          initial={{ left: '-10%' }}
          animate={{ left: '110%' }}
          transition={{ duration: 2.2, ease: 'easeInOut' }}
          className="absolute top-0 bottom-0 w-24 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none z-20 flex items-center justify-center"
        >
          {/* Dual laser cores representing blue & pink theme */}
          <div className="w-[3px] h-full bg-gradient-to-b from-[#00F0FF] via-[#FF007A] to-[#0072FF] blur-[3px]" />
          <div className="absolute inset-0 w-12 bg-gradient-to-r from-[#0072FF]/20 via-[#FF007A]/20 to-transparent blur-xl" />
        </motion.div>
      )}

      {/* Main Grid Layout holding the three icons */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 max-w-4xl w-full px-8 relative z-10">
        {techShowcaseItems.map((item, idx) => {
          const shown = isVisible(item.id);
          const activeGlow = highlightedIcon === item.id;
          const isDissolving = phase === 'dissolve';

          return (
            <div
              key={item.id}
              id={`showcase-col-${item.id}`}
              className="flex flex-col items-center text-center relative min-h-[220px]"
            >
              {/* Particle explosion effect spawned strictly during dissolve */}
              <AnimatePresence>
                {isDissolving && (
                  <div className="absolute inset-0 pointer-events-none z-30 flex items-center justify-center">
                    {particles.map((p) => (
                      <motion.div
                        key={p.id}
                        initial={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                        animate={{
                          opacity: 0,
                          scale: 0,
                          x: p.x,
                          y: p.y,
                        }}
                        exit={{ opacity: 0 }}
                        // @ts-ignore
                        transition={{
                          duration: 1.6,
                          delay: p.delay,
                          ease: [0.25, 1, 0.50, 1],
                        }}
                        style={{
                          position: 'absolute',
                          width: p.size,
                          height: p.size,
                          borderRadius: '50%',
                          backgroundColor: p.color,
                          boxShadow: `0 0 10px ${p.color}`,
                        }}
                      />
                    ))}
                  </div>
                )}
              </AnimatePresence>

              {/* Glass Card Icon Bracket */}
              <div className="relative mb-6 w-24 h-24 flex items-center justify-center">
                <AnimatePresence>
                  {shown && !isDissolving && (
                    <motion.div
                      id={`icon-bracket-${item.id}`}
                      initial={{ opacity: 0, scale: 0.6, y: 15 }}
                      animate={{
                        opacity: 1,
                        scale: activeGlow ? 1.12 : 1,
                        y: [0, -6, 0],
                      }}
                      exit={{ opacity: 0, scale: 0.2, y: -10 }}
                      // @ts-ignore
                      transition={{
                        opacity: { duration: 0.8 },
                        scale: { duration: 0.4 },
                        y: {
                          duration: 3.5 + idx,
                          repeat: Infinity,
                          ease: 'easeInOut',
                          delay: idx * 0.3,
                        },
                      }}
                      className={`relative z-10 w-20 h-20 rounded-2xl bg-slate-950/60 border ${
                        activeGlow
                          ? 'border-[#00F0FF] shadow-[0_0_35px_rgba(0,240,255,0.45)]'
                          : 'border-white/10'
                      } flex items-center justify-center transition-all duration-300 backdrop-blur-md`}
                    >
                      {getLucideIcon(item.iconName)}

                      {/* Custom inner ambient light rings */}
                      <div className={`absolute -inset-1 rounded-2xl bg-gradient-to-r ${item.glowColor} opacity-15 blur-[6px] group-hover:opacity-30`} />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Solid glow light backing */}
                <div
                  className={`absolute w-12 h-12 rounded-full filter blur-2xl transition-all duration-700 ${
                    activeGlow
                      ? 'bg-[#00F0FF]/40 opacity-100 scale-150'
                      : shown && !isDissolving
                        ? 'bg-[#FF007A]/10 opacity-60'
                        : 'bg-transparent opacity-0'
                  }`}
                />
              </div>

              {/* Text Description */}
              <div className="h-28 flex flex-col justify-start">
                <AnimatePresence>
                  {shown && !isDissolving && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.6, delay: 0.1 }}
                    >
                      <h4 className="font-display font-semibold text-lg text-white mb-2 tracking-wide">
                        {item.name}
                      </h4>
                      <p className="text-gray-400 text-xs leading-relaxed max-w-xs mx-auto">
                        {item.description}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          );
        })}
      </div>

      {/* Real-time loop status indicator */}
      <div className="absolute bottom-4 right-6 flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-[#00FF87] animate-ping" />
        <span className="text-[9px] font-mono tracking-widest text-gray-500 uppercase">
          Showcase System Active • {phase.replace('-', ' ')}
        </span>
      </div>
    </div>
  );
}
