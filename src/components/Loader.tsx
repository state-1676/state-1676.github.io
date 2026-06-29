'use client';

import { motion } from 'framer-motion';
import { Terminal } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(TextPlugin);
}

interface LoaderProps {
  onComplete: () => void;
}

const Loader = ({ onComplete }: LoaderProps) => {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('INITIALIZING SYSTEM...');
  
  const loaderRef = useRef<HTMLDivElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const linesRef = useRef<HTMLDivElement>(null);
  const lastMessageIndexRef = useRef<number>(-1);

  useEffect(() => {
    // Capture ref values for cleanup
    const terminalElement = terminalRef.current;
    const statusElement = statusRef.current;
    const loaderElement = loaderRef.current;
    
    // GSAP Loader Animation Timeline
    const tl = gsap.timeline();
    
    // Terminal entrance with glitch
    tl.fromTo(terminalRef.current,
      { scale: 0, rotation: -360, opacity: 0 },
      {
        scale: 1,
        rotation: 0,
        opacity: 1,
        duration: 1.5,
        ease: "back.out(1.7)"
      }
    );
    
    // Status text glitch entrance
    tl.fromTo(statusRef.current,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out"
      },
      "-=0.5"
    );
    
    // Progress bar entrance
    tl.fromTo(progressRef.current,
      { scaleX: 0, opacity: 0 },
      {
        scaleX: 1,
        opacity: 1,
        duration: 0.6,
        ease: "power2.out"
      },
      "-=0.3"
    );
    
    // Loading lines entrance
    tl.fromTo(linesRef.current?.children || [],
      { opacity: 0, x: -50 },
      {
        opacity: 1,
        x: 0,
        duration: 0.5,
        stagger: 0.2,
        ease: "power2.out"
      },
      "-=0.2"
    );
    
    // Continuous terminal glow
    gsap.to(terminalRef.current, {
      boxShadow: '0 0 30px #00f0ff, 0 0 60px #00f0ff, 0 0 90px #00f0ff',
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: 1
    });
    
    // Progress animation
    const duration = 5000; // 5 seconds
    const interval = 50; // Update every 50ms
    const steps = duration / interval;
    let currentStep = 0;
    
    const statusMessages = [
      'INITIALIZING SYSTEM...',
      'LOADING NAP3 DATABASE...',
              'CONNECTING TO STATE 1676...',
      'VERIFYING ALLIANCE DATA...',
      'FINALIZING CONNECTION...',
      'SYSTEM READY'
    ];

    const progressTimer = setInterval(() => {
      currentStep++;
      const newProgress = (currentStep / steps) * 100;
      setProgress(newProgress);

      // Update status with glitch effect
      const messageIndex = Math.floor((newProgress / 100) * (statusMessages.length - 1));
      const newMessage = statusMessages[messageIndex];
      
      // Check if we need to update the status
      if (lastMessageIndexRef.current !== messageIndex) {
        lastMessageIndexRef.current = messageIndex;
        
        // Glitch effect on status change
        gsap.to(statusRef.current, {
          duration: 0.1,
          skewX: 5,
          scale: 1.02,
          yoyo: true,
          repeat: 1,
          onComplete: () => {
            setStatusText(newMessage);
          }
        });
      }

      if (currentStep >= steps) {
        clearInterval(progressTimer);
        
        // Exit animation
        gsap.to(loaderRef.current, {
          opacity: 0,
          scale: 0.8,
          duration: 0.8,
          ease: "power2.in",
          delay: 0.5,
          onComplete: () => {
            onComplete();
          }
        });
      }
    }, interval);

    return () => {
      clearInterval(progressTimer);
      // Kill all GSAP animations on cleanup
      gsap.killTweensOf([terminalElement, statusElement, loaderElement]);
    };
  }, [onComplete]);

  return (
    <motion.div
      ref={loaderRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 bg-gradient-to-br from-[#050d1c] via-[#0f172a] to-[#050d1c] z-50 flex items-center justify-center"
    >
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(0, 240, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 240, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="relative z-10 text-center max-w-md mx-auto px-4">
        {/* Terminal Icon */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, type: 'spring' }}
          className="flex justify-center mb-8"
        >
          <div className="relative">
            <div ref={terminalRef} className="w-24 h-24 bg-gradient-to-br from-[#00f0ff] to-[#8efff9] rounded-lg flex items-center justify-center shadow-2xl panel-neon animate-pulse-glow">
              <Terminal className="w-12 h-12 text-[#050d1c]" />
            </div>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-3 border-2 border-[#00f0ff]/40 rounded-lg"
              style={{ boxShadow: '0 0 15px rgba(0, 240, 255, 0.3)' }}
            />
            {/* Corner accents */}
            <div className="absolute -top-1 -left-1 w-3 h-3 border-l-2 border-t-2 border-[#00f0ff]" />
            <div className="absolute -top-1 -right-1 w-3 h-3 border-r-2 border-t-2 border-[#00f0ff]" />
            <div className="absolute -bottom-1 -left-1 w-3 h-3 border-l-2 border-b-2 border-[#00f0ff]" />
            <div className="absolute -bottom-1 -right-1 w-3 h-3 border-r-2 border-b-2 border-[#00f0ff]" />
          </div>
        </motion.div>

        {/* Status Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mb-8"
        >
          <div ref={statusRef} className="text-[#8efff9] text-lg font-mono mb-4">
            &gt; {statusText}
          </div>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="relative"
        >
          <div ref={progressRef} className="w-full h-3 bg-[#0f172a] rounded-full overflow-hidden border border-[#00f0ff]/30">
            <motion.div
              className="h-full bg-gradient-to-r from-[#00f0ff] to-[#8efff9] rounded-full relative"
              style={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
            </motion.div>
          </div>
          <div className="text-[#00f0ff] text-sm font-mono mt-2">
            {Math.round(progress)}% COMPLETE
          </div>
        </motion.div>

        {/* Additional Loading Elements */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-8 space-y-2"
        >
          <div ref={linesRef}>
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="flex items-center space-x-2 text-[#8efff9]/60 text-xs font-mono"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2 + i * 0.2, duration: 0.4 }}
              >
                <div className="w-2 h-2 bg-[#00f0ff] rounded-full animate-pulse" />
                <span>
                  {i === 0 && 'Loading alliance data...'}
                  {i === 1 && 'Establishing secure connection...'}
                  {i === 2 && 'Preparing user interface...'}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Loader;