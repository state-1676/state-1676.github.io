'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { Menu, X, Home, Users, Calendar, Camera, Scroll, Hammer, ExternalLink } from 'lucide-react';
import State1676Icon from './State1676Icon';
import { serverConfig } from '@/data';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const navItemsRef = useRef<HTMLDivElement>(null);

  const navItems = [
    { href: '#home', label: 'Home', icon: Home },
    { href: '#alliances', label: 'Alliances', icon: Users },
    { href: '#events', label: 'Events', icon: Calendar },
    { href: '#videos', label: 'Videos', icon: Camera },
    { href: '#rules', label: 'Rules', icon: Scroll },
  ];

  useEffect(() => {
    // GSAP Navigation entrance animation
    const tl = gsap.timeline({ delay: 0.5 });
    
    // Slide in navigation from top
    tl.fromTo(navRef.current,
      { y: -100, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 1,
        ease: "power3.out"
      }
    );
    
    // Logo glitch entrance
    tl.fromTo(logoRef.current,
      { scale: 0, rotation: -180 },
      {
        scale: 1,
        rotation: 0,
        duration: 0.8,
        ease: "back.out(1.7)"
      },
      "-=0.5"
    );
    
    // Stagger nav items
    tl.fromTo(navItemsRef.current?.children || [],
      { opacity: 0, x: -50 },
      {
        opacity: 1,
        x: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out"
      },
      "-=0.3"
    );
    
    // Continuous logo pulse
    gsap.to(logoRef.current, {
      scale: 1.1,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: 2
    });
    
    // Add hover animations to nav items
    const navLinks = navItemsRef.current?.querySelectorAll('a');
    navLinks?.forEach((link) => {
      const handleMouseEnter = () => {
        gsap.to(link, {
          scale: 1.05,
          textShadow: '0 0 10px #00f0ff',
          duration: 0.3,
          ease: "power2.out"
        });
        
        // Glitch effect
        gsap.to(link, {
          duration: 0.1,
          skewX: 2,
          yoyo: true,
          repeat: 1
        });
      };
      
      const handleMouseLeave = () => {
        gsap.to(link, {
          scale: 1,
          textShadow: 'none',
          skewX: 0,
          duration: 0.3,
          ease: "power2.out"
        });
      };
      
      link.addEventListener('mouseenter', handleMouseEnter);
      link.addEventListener('mouseleave', handleMouseLeave);
      
      return () => {
        link.removeEventListener('mouseenter', handleMouseEnter);
        link.removeEventListener('mouseleave', handleMouseLeave);
      };
    });
  }, []);

  return (
    <>
      {/* Desktop Navigation */}
      <nav ref={navRef} className="hidden lg:block fixed top-0 left-0 right-0 z-50 panel-neon backdrop-blur-md border-b border-[#00f0ff]/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            <div ref={logoRef} className="flex items-center space-x-3">
              <div className="relative">
                <State1676Icon 
                  size={32} 
                  style={{ filter: 'drop-shadow(0 0 5px #00f0ff)' }}
                />
                <div className="absolute -inset-1 border border-[#00f0ff]/30 rounded" />
              </div>
              <span className="font-mono font-bold text-xl text-[#00f0ff]">
                STATE_1676
              </span>
            </div>
            
            <div ref={navItemsRef} className="flex items-center space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="group flex items-center space-x-2 text-gray-300 hover:text-[#00f0ff] transition-all duration-200 font-mono text-sm relative"
                >
                  <item.icon className="w-4 h-4 group-hover:drop-shadow-[0_0_5px_#00f0ff]" />
                  <span className="font-medium">{item.label.toUpperCase()}</span>
                  <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#00f0ff] group-hover:w-full transition-all duration-300" style={{ boxShadow: '0 0 5px #00f0ff' }} />
                </a>
              ))}
              
              <a
                href={serverConfig.discordLink}
                target="_blank"
                rel="noopener noreferrer"
                className="relative bg-gradient-to-r from-[#00f0ff] to-[#8efff9] text-[#050d1c] px-6 py-2 rounded-lg font-semibold font-mono transition-all duration-200 transform hover:scale-105 animate-pulse-glow"
              >
                JOIN_DISCORD
                {/* Corner accents */}
                <div className="absolute -top-0.5 -left-0.5 w-2 h-2 border-l border-t border-[#00f0ff]" />
                <div className="absolute -top-0.5 -right-0.5 w-2 h-2 border-r border-t border-[#00f0ff]" />
                <div className="absolute -bottom-0.5 -left-0.5 w-2 h-2 border-l border-b border-[#00f0ff]" />
                <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 border-r border-b border-[#00f0ff]" />
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hanging "Foundry Planner" banner — desktop, aligned under JOIN_DISCORD */}
      <div className="hidden lg:block fixed top-20 left-0 right-0 z-40 pointer-events-none">
        <div className="max-w-7xl mx-auto px-6 flex justify-end">
          <motion.a
            href="https://wos-foundry-planner.co.uk/"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ y: -24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.6, duration: 0.6, ease: 'easeOut' }}
            className="group pointer-events-auto flex flex-col items-center"
          >
            {/* hanging strings */}
            <div className="flex gap-10">
              <span className="w-px h-5 bg-[#00f0ff]/60" style={{ boxShadow: '0 0 4px #00f0ff' }} />
              <span className="w-px h-5 bg-[#00f0ff]/60" style={{ boxShadow: '0 0 4px #00f0ff' }} />
            </div>
            {/* swinging sign */}
            <motion.div
              animate={{ rotate: [-2.5, 2.5, -2.5] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
              style={{ transformOrigin: 'top center' }}
              className="relative panel-neon backdrop-blur-md border border-[#00f0ff]/50 rounded-lg px-4 py-2 animate-pulse-glow"
            >
              {/* pins where the strings attach */}
              <span className="absolute -top-1 left-3 w-1.5 h-1.5 rounded-full bg-[#00f0ff]" style={{ boxShadow: '0 0 6px #00f0ff' }} />
              <span className="absolute -top-1 right-3 w-1.5 h-1.5 rounded-full bg-[#00f0ff]" style={{ boxShadow: '0 0 6px #00f0ff' }} />
              <div className="flex items-center gap-2">
                <Hammer className="w-4 h-4 text-[#00f0ff] shrink-0" style={{ filter: 'drop-shadow(0 0 4px #00f0ff)' }} />
                <span className="font-mono text-xs font-bold uppercase tracking-wide text-gradient whitespace-nowrap">
                  Try our Foundry Planner
                </span>
                <ExternalLink className="w-3.5 h-3.5 text-[#8efff9] shrink-0 transition-transform duration-300 group-hover:translate-x-0.5" />
              </div>
            </motion.div>
          </motion.a>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="lg:hidden">
        {/* Mobile Header */}
        <header className="fixed top-0 left-0 right-0 z-50 panel-neon backdrop-blur-md border-b border-[#00f0ff]/30">
          <div className="flex items-center justify-between px-4 h-16">
            <div className="flex items-center space-x-2">
              <State1676Icon 
                size={28} 
                style={{ filter: 'drop-shadow(0 0 3px #00f0ff)' }}
              />
              <span className="font-mono font-bold text-lg text-[#00f0ff]">STATE_1676</span>
            </div>
            
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-[#00f0ff] hover:text-[#8efff9] transition-colors relative"
              style={{ filter: 'drop-shadow(0 0 3px #00f0ff)' }}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              <div className="absolute inset-0 border border-[#00f0ff]/30 rounded" />
            </button>
          </div>
        </header>

        {/* Mobile Menu Overlay */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-[#050d1c]/80 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
        )}

        {/* Mobile Menu */}
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: isOpen ? 0 : '100%' }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          className="fixed top-16 right-0 bottom-0 z-50 w-80 panel-neon border-l border-[#00f0ff]/30"
          style={{ background: 'linear-gradient(135deg, #050d1c 0%, #0f172a 100%)' }}
        >
          <div className="p-6 space-y-4">
            <div className="text-[#8efff9] font-mono text-sm mb-6">
              &gt; NAVIGATION_MENU
            </div>
            {navItems.map((item, index) => (
              <motion.a
                key={item.href}
                href={item.href}
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setIsOpen(false)}
                className="flex items-center space-x-3 p-3 rounded-lg panel-neon hover:border-[#00f0ff]/40 transition-all duration-200 group"
              >
                <item.icon className="w-5 h-5 text-[#00f0ff] group-hover:drop-shadow-[0_0_5px_#00f0ff]" />
                <span className="text-gray-300 font-medium font-mono">{item.label.toUpperCase()}</span>
              </motion.a>
            ))}
            
            <motion.a
              href={serverConfig.discordLink}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: navItems.length * 0.1 }}
              onClick={() => setIsOpen(false)}
              className="relative block w-full mt-6 bg-gradient-to-r from-[#00f0ff] to-[#8efff9] text-[#050d1c] px-6 py-3 rounded-lg font-semibold text-center font-mono transition-all duration-200 animate-pulse-glow"
            >
              JOIN_DISCORD
              {/* Corner accents */}
              <div className="absolute -top-0.5 -left-0.5 w-2 h-2 border-l border-t border-[#00f0ff]" />
              <div className="absolute -top-0.5 -right-0.5 w-2 h-2 border-r border-t border-[#00f0ff]" />
              <div className="absolute -bottom-0.5 -left-0.5 w-2 h-2 border-l border-b border-[#00f0ff]" />
              <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 border-r border-b border-[#00f0ff]" />
            </motion.a>
          </div>
        </motion.div>

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 z-40 panel-neon backdrop-blur-md border-t border-[#00f0ff]/30 lg:hidden">
          <div className="flex items-center justify-around py-3">
            {navItems.slice(0, 5).map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="flex flex-col items-center p-2 text-gray-400 hover:text-[#00f0ff] transition-all duration-200 group"
              >
                <item.icon className="w-5 h-5 group-hover:drop-shadow-[0_0_3px_#00f0ff]" />
                <span className="text-xs mt-1 font-mono">{item.label.toUpperCase()}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;