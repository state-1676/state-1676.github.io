'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  ChevronDown, 
  ChevronUp, 
  Trophy, 
  Target, 
  Calendar,
  Award,
  Eye,
  X,
  Download,
  Share2
} from 'lucide-react';
import { SVSPrepData } from '@/data/svs-prep-types';
import { serverConfig } from '@/data';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface SVSPrepTrackerProps {
  preps: SVSPrepData[];
  title?: string;
  description?: string;
}

const SVSPrepTracker = ({ 
  preps, 
  title = "SVS PREP DOMINATION",
  description = "Complete documentation of our undefeated SVS preparation victories"
}: SVSPrepTrackerProps) => {
  const [expandedPrep, setExpandedPrep] = useState<string | null>(null);
  const [selectedScreenshot, setSelectedScreenshot] = useState<string | null>(null);
  const [screenshotError, setScreenshotError] = useState<Set<string>>(new Set());
  
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // GSAP entrance animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    });
    
    // Header entrance
    tl.fromTo(headerRef.current,
      { opacity: 0, y: 50, rotationX: -45 },
      {
        opacity: 1,
        y: 0,
        rotationX: 0,
        duration: 1,
        ease: "power3.out"
      }
    );
    
    // Cards stagger entrance
    tl.fromTo(cardsRef.current?.children || [],
      { opacity: 0, y: 100, scale: 0.8 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "back.out(1.7)"
      },
      "-=0.5"
    );
  }, []);

  const handleImageError = (url: string) => {
    setScreenshotError(prev => new Set([...prev, url]));
  };

  const getPlacementColor = (placement: number) => {
    switch (placement) {
      case 1: return '#FFD700'; // Gold
      case 2: return '#C0C0C0'; // Silver  
      case 3: return '#CD7F32'; // Bronze
      default: return '#8efff9'; // Default cyan
    }
  };

  const getPlacementIcon = (placement: number) => {
    switch (placement) {
      case 1: return '🥇';
      case 2: return '🥈';
      case 3: return '🥉';
      default: return '🏆';
    }
  };

  return (
    <>
      <section 
        ref={sectionRef} 
        id="svs-prep" 
        className="py-20 bg-gradient-to-br from-[#050d1c] to-[#0f172a] relative overflow-hidden"
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
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Section Header */}
          <motion.div
            ref={headerRef}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="text-[#8efff9] font-mono text-sm mb-4">
              &gt; ACCESSING_SVS_ARCHIVE...
            </div>
            <h2 className="text-4xl sm:text-5xl font-heading font-bold text-gradient text-glow-cyan mb-6">
              {title}
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              {description}
            </p>
            <div className="mt-6 text-[#8efff9] font-mono text-sm">
              &gt; VICTORY_RATE: {Math.round((serverConfig.status.svsPrepWins / (serverConfig.status.svsPrepWins + serverConfig.status.svsPrepLosses)) * 100)}% | RECORD: {serverConfig.status.svsPrepWins}–{serverConfig.status.svsPrepLosses} | TOTAL_PREPS: {serverConfig.status.svsPrepWins + serverConfig.status.svsPrepLosses}
            </div>
          </motion.div>

          {/* SVS Prep Cards */}
          <div ref={cardsRef} className="space-y-6">
            {preps.map((prep, index) => (
              <motion.div
                key={prep.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative group"
              >
                <div className={`relative panel-neon bg-gradient-to-br ${
                  prep.victory 
                    ? 'from-[#00f0ff]/20 to-[#8efff9]/20' 
                    : 'from-[#ff004f]/20 to-[#bf00ff]/20'
                } backdrop-blur-sm rounded-lg transition-all duration-300 animate-pulse-glow`}>
                  
                  {/* Prep Header */}
                  <div 
                    className="flex items-center justify-between p-6 cursor-pointer hover:bg-white/5 transition-colors rounded-t-lg"
                    onClick={() => setExpandedPrep(
                      expandedPrep === prep.id ? null : prep.id
                    )}
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-2xl relative`}
                        style={{ 
                          backgroundColor: prep.victory ? '#00f0ff' : '#ff004f',
                          boxShadow: `0 0 10px ${prep.victory ? '#00f0ff' : '#ff004f'}`
                        }}
                      >
                        {prep.victory ? '🏆' : '⚔️'}
                        <div className="absolute inset-0 border border-white/20 rounded-lg" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-heading font-bold text-white flex items-center space-x-2">
                          <span>{prep.title}</span>
                          {prep.victory && <Trophy className="w-6 h-6 text-[#FFD700]" />}
                        </h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-400 font-mono">
                          <span className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>{prep.dateRange}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Target className="w-4 h-4" />
                            <span>Final: #{prep.overall.finalPlacement}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Award className="w-4 h-4" />
                            <span>{prep.overall.totalPoints.toLocaleString()} pts</span>
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <motion.div
                      animate={{ rotate: expandedPrep === prep.id ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown className="w-6 h-6 text-[#00f0ff]" />
                    </motion.div>
                  </div>

                  {/* Expanded Content */}
                  <AnimatePresence>
                    {expandedPrep === prep.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 space-y-4">
                          {/* Daily Results Grid */}
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {prep.days.map((day, dayIndex) => (
                              <motion.div
                                key={dayIndex}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: dayIndex * 0.1 }}
                                className="panel-neon p-4 rounded-lg hover:border-[#00f0ff]/40 transition-all duration-300 group/day"
                              >
                                <div className="flex items-center justify-between mb-3">
                                  <div className="flex items-center space-x-2">
                                    <span className="text-2xl">{day.icon}</span>
                                    <div>
                                      <h4 className="font-semibold text-white">{day.name}</h4>
                                      <p className="text-xs text-gray-400">{day.description}</p>
                                    </div>
                                  </div>
                                  <div className="text-right">
                                    <div className="flex items-center space-x-1">
                                      <span className="text-lg">{getPlacementIcon(day.placement || 1)}</span>
                                      <span 
                                        className="font-bold text-sm"
                                        style={{ color: getPlacementColor(day.placement || 1) }}
                                      >
                                        #{day.placement || 1}
                                      </span>
                                    </div>
                                    <div className="text-xs text-[#8efff9] font-mono">
                                      {day.points?.toLocaleString()} pts
                                    </div>
                                  </div>
                                </div>
                                
                                {/* Screenshot Preview */}
                                <div className="relative aspect-video bg-gray-800 rounded overflow-hidden group/screenshot">
                                  {screenshotError.has(day.screenshotUrl) ? (
                                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                                      <div className="text-center">
                                        <div className="text-4xl mb-2">📸</div>
                                        <div className="text-sm">Screenshot Coming Soon</div>
                                      </div>
                                    </div>
                                  ) : (
                                    <img
                                      src={day.screenshotUrl}
                                      alt={`${prep.title} - ${day.name}`}
                                      className="w-full h-full object-cover transition-transform duration-300 group-hover/screenshot:scale-105"
                                      onError={() => handleImageError(day.screenshotUrl)}
                                    />
                                  )}
                                  <div className="absolute inset-0 bg-black/0 group-hover/screenshot:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover/screenshot:opacity-100">
                                    <button
                                      onClick={() => setSelectedScreenshot(day.screenshotUrl)}
                                      className="bg-[#00f0ff] text-[#050d1c] p-2 rounded-full transform scale-75 group-hover/screenshot:scale-100 transition-transform duration-300"
                                    >
                                      <Eye className="w-5 h-5" />
                                    </button>
                                  </div>
                                </div>
                              </motion.div>
                            ))}
                          </div>

                          {/* Overall Results */}
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="panel-neon p-6 rounded-lg bg-gradient-to-r from-[#FFD700]/10 to-[#FFA500]/10 border-[#FFD700]/30"
                          >
                            <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center space-x-3">
                                <div className="text-3xl">🏆</div>
                                <div>
                                  <h4 className="text-xl font-bold text-[#FFD700]">{prep.overall.name}</h4>
                                  <p className="text-gray-300 text-sm">{prep.overall.description}</p>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-2xl font-bold text-[#FFD700]">
                                  #{prep.overall.finalPlacement}
                                </div>
                                <div className="text-[#FFD700] font-mono text-sm">
                                  {prep.overall.totalPoints.toLocaleString()} pts
                                </div>
                              </div>
                            </div>
                            
                            {/* Overall Screenshot */}
                            <div className="relative aspect-video bg-gray-800 rounded overflow-hidden group/overall">
                              {screenshotError.has(prep.overall.screenshotUrl) ? (
                                <div className="w-full h-full flex items-center justify-center text-gray-400">
                                  <div className="text-center">
                                    <div className="text-4xl mb-2">🏆</div>
                                    <div className="text-sm">Overall Screenshot Coming Soon</div>
                                  </div>
                                </div>
                              ) : (
                                <img
                                  src={prep.overall.screenshotUrl}
                                  alt={`${prep.title} - Overall Results`}
                                  className="w-full h-full object-cover"
                                  onError={() => handleImageError(prep.overall.screenshotUrl)}
                                />
                              )}
                              <div className="absolute inset-0 bg-black/0 group-hover/overall:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover/overall:opacity-100">
                                <button
                                  onClick={() => setSelectedScreenshot(prep.overall.screenshotUrl)}
                                  className="bg-[#FFD700] text-[#050d1c] p-3 rounded-full transform scale-75 group-hover/overall:scale-100 transition-transform duration-300"
                                >
                                  <Eye className="w-6 h-6" />
                                </button>
                              </div>
                            </div>
                          </motion.div>

                          {/* Highlights */}
                          {prep.highlights && prep.highlights.length > 0 && (
                            <motion.div
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.8 }}
                              className="panel-neon p-4 rounded-lg"
                            >
                              <h4 className="font-semibold text-[#00f0ff] mb-3 flex items-center space-x-2">
                                <Award className="w-4 h-4" />
                                <span>Key Highlights</span>
                              </h4>
                              <div className="space-y-2">
                                {prep.highlights.map((highlight, i) => (
                                  <div key={i} className="flex items-center space-x-2">
                                    <div className="w-2 h-2 bg-[#00f0ff] rounded-full"></div>
                                    <span className="text-gray-300 text-sm">{highlight}</span>
                                  </div>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Screenshot Modal */}
      <AnimatePresence>
        {selectedScreenshot && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedScreenshot(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-6xl max-h-[90vh] w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative panel-neon rounded-lg overflow-hidden">
                <img
                  src={selectedScreenshot}
                  alt="SVS Prep Screenshot"
                  className="w-full h-auto max-h-[80vh] object-contain"
                />
                <div className="absolute top-4 right-4 flex space-x-2">
                  <button className="bg-[#00f0ff] text-[#050d1c] p-2 rounded-full hover:bg-[#8efff9] transition-colors">
                    <Download className="w-5 h-5" />
                  </button>
                  <button className="bg-[#00f0ff] text-[#050d1c] p-2 rounded-full hover:bg-[#8efff9] transition-colors">
                    <Share2 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setSelectedScreenshot(null)}
                    className="bg-[#ff004f] text-white p-2 rounded-full hover:bg-[#bf00ff] transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SVSPrepTracker;