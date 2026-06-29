'use client';

import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Shield, 
  Users, 
  Trophy, 
  Target, 
  MessageCircle, 
  Zap,
  Crown,
  Swords
} from 'lucide-react';
import { serverConfig } from '@/data';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const ServerBanner = () => {
  const bannerRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const features = [
    {
      icon: Trophy,
      text: "NEVER LOST A PREPARATION PHASE IN SVS",
      color: "#FFD700"
    },
    {
      icon: Shield,
      text: "NAP3: TOP 3 ALLIANCES WORKING TOGETHER",
      color: "#00f0ff"
    },
    {
      icon: Crown,
      text: "FAIR AND ORGANIZED PRESIDENCY ROTATION",
      color: "#bf00ff"
    },
    {
      icon: Users,
      text: "COEXISTENCE WITH SMALL ALLIANCES + INTERNAL WAR EVENTS",
      color: "#8efff9"
    },
    {
      icon: Swords,
      text: "2 FULL ALLIANCES TRANSFERRED IN JUST 4 ROUNDS!",
      color: "#ff004f"
    },
    {
      icon: MessageCircle,
      text: "COORDINATION VIA DISCORD (ACTIVE VOICE CHANNELS)",
      color: "#fbbf24"
    }
  ];

  useEffect(() => {
    // GSAP entrance animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: bannerRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    });
    
    // Title entrance with neon glow
    tl.fromTo(titleRef.current,
      { opacity: 0, y: 50, scale: 0.8 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.2,
        ease: "power3.out"
      }
    );
    
    // Subtitle slide in
    tl.fromTo(subtitleRef.current,
      { opacity: 0, x: -100 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: "power2.out"
      },
      "-=0.6"
    );
    
    // Features stagger entrance
    tl.fromTo(featuresRef.current?.children || [],
      { opacity: 0, x: -50, rotationY: -45 },
      {
        opacity: 1,
        x: 0,
        rotationY: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "back.out(1.7)"
      },
      "-=0.4"
    );
    
    // CTA entrance
    tl.fromTo(ctaRef.current,
      { opacity: 0, y: 30, scale: 0.9 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: "elastic.out(1, 0.8)"
      },
      "-=0.3"
    );

    // Continuous glow pulse on main title
    gsap.to(titleRef.current, {
      textShadow: '0 0 20px #fbbf24, 0 0 40px #fbbf24, 0 0 60px #fbbf24',
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: 2
    });
  }, []);

  return (
    <section 
      ref={bannerRef}
      className="py-20 bg-gradient-to-br from-[#0a1828] via-[#1e3a5f] to-[#0f172a] relative overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        {/* Animated Grid */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(255, 191, 36, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 191, 36, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }} />
        </div>
        
        {/* Floating Particles */}
        <div className="absolute inset-0">
          {Array.from({ length: 12 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-[#fbbf24] rounded-full opacity-60"
              style={{ 
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                boxShadow: '0 0 10px #fbbf24'
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.6, 1, 0.6],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2
              }}
            />
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header Section */}
        <div className="text-center mb-16">
          {/* Game Title */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-mono font-bold text-gray-300 mb-2 tracking-widest">
              WHITEOUT
            </h1>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-mono font-bold text-gray-300 tracking-widest">
              SURVIVAL
            </h2>
          </motion.div>

          {/* Server Title */}
          <motion.div
            ref={titleRef}
            className="mb-8"
          >
            <h1 className="text-5xl sm:text-6xl lg:text-8xl xl:text-9xl font-heading font-black text-[#fbbf24] mb-4 tracking-wider"
              style={{
                textShadow: '0 0 20px #fbbf24, 0 0 40px #fbbf24',
                filter: 'drop-shadow(0 0 30px #fbbf24)'
              }}
            >
              STATE 1676
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.div
            ref={subtitleRef}
            className="mb-12"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold text-[#8efff9] mb-4">
              Strategy, Harmony, and
            </h2>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold text-[#8efff9]">
              Real Community!
            </h2>
          </motion.div>
        </div>

        {/* Features Grid */}
        <div ref={featuresRef} className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="flex items-center space-x-4 p-6 panel-neon rounded-lg bg-gradient-to-r from-black/20 to-black/10 backdrop-blur-sm hover:border-[#fbbf24]/40 transition-all duration-300 group"
              whileHover={{ scale: 1.02 }}
            >
              <div 
                className="w-12 h-12 rounded-lg flex items-center justify-center relative flex-shrink-0"
                style={{ 
                  backgroundColor: `${feature.color}20`,
                  boxShadow: `0 0 15px ${feature.color}40`
                }}
              >
                <feature.icon 
                  className="w-6 h-6" 
                  style={{ 
                    color: feature.color,
                    filter: `drop-shadow(0 0 5px ${feature.color})`
                  }} 
                />
                <div className="absolute inset-0 border border-white/20 rounded-lg" />
              </div>
              <div className="flex-1">
                <p 
                  className="font-mono font-bold text-lg leading-tight group-hover:text-[#fbbf24] transition-colors duration-300"
                  style={{ color: feature.color }}
                >
                  {feature.text}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          ref={ctaRef}
          className="text-center"
        >
          <div className="panel-neon bg-gradient-to-r from-[#fbbf24]/20 to-[#ff8c00]/20 rounded-2xl p-8 mb-8">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold text-[#fbbf24] mb-4">
              IF YOU WANT A STABLE, COMPETITIVE,
            </h3>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold text-[#fbbf24] mb-8">
              AND HUMAN SERVER...
            </h3>
            
            <motion.h2
              className="text-4xl sm:text-5xl lg:text-6xl font-heading font-black text-[#00f0ff] mb-8"
              style={{
                textShadow: '0 0 20px #00f0ff, 0 0 40px #00f0ff',
                filter: 'drop-shadow(0 0 30px #00f0ff)'
              }}
              animate={{
                scale: [1, 1.05, 1],
                textShadow: [
                  '0 0 20px #00f0ff, 0 0 40px #00f0ff',
                  '0 0 30px #00f0ff, 0 0 60px #00f0ff',
                  '0 0 20px #00f0ff, 0 0 40px #00f0ff'
                ]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              1676 IS YOUR NEW HOME!
            </motion.h2>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <motion.a
                href={serverConfig.discordLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative px-10 py-4 bg-gradient-to-r from-[#fbbf24] to-[#ff8c00] text-[#050d1c] rounded-lg font-bold text-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 inline-flex items-center space-x-3 animate-pulse-glow"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="font-mono">JOIN DISCORD NOW</span>
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <Zap className="w-6 h-6" />
                </motion.div>
                {/* Corner accents */}
                <div className="absolute -top-1 -left-1 w-4 h-4 border-l-2 border-t-2 border-[#fbbf24]" />
                <div className="absolute -top-1 -right-1 w-4 h-4 border-r-2 border-t-2 border-[#fbbf24]" />
                <div className="absolute -bottom-1 -left-1 w-4 h-4 border-l-2 border-b-2 border-[#fbbf24]" />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 border-r-2 border-b-2 border-[#fbbf24]" />
              </motion.a>
              
              <motion.a
                href="#alliances"
                className="group relative px-10 py-4 panel-neon text-[#00f0ff] rounded-lg font-semibold text-xl font-mono transition-all duration-300 transform hover:scale-105 inline-flex items-center space-x-3"
                whileHover={{ scale: 1.05 }}
              >
                <span>EXPLORE NAP3</span>
                <Target className="w-6 h-6" />
              </motion.a>
            </div>
          </div>

          <div className="text-[#8efff9] font-mono text-sm">
            &gt; VICTORY_GUARANTEED | COMMUNITY_FIRST | STRATEGIC_EXCELLENCE
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServerBanner;