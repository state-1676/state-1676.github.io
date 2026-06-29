'use client';

import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { Users, Sword } from 'lucide-react';
import { getAlliances, getTotalMembers, serverConfig } from '@/data';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
}

const Alliances = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  
  // Load alliance data from centralized data files
  const alliances = getAlliances();
  const totalMembers = getTotalMembers();
  
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
      { opacity: 0, y: 100, rotationY: -45, scale: 0.8 },
      {
        opacity: 1,
        y: 0,
        rotationY: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "back.out(1.7)"
      },
      "-=0.5"
    );
    
    // Add hover animations to cards
    const cards = cardsRef.current?.children;
    if (cards) {
      Array.from(cards).forEach((card) => {
        const handleMouseEnter = () => {
          gsap.to(card, {
            scale: 1.05,
            rotationY: 5,
            z: 50,
            duration: 0.3,
            ease: "power2.out"
          });
        };
        
        const handleMouseLeave = () => {
          gsap.to(card, {
            scale: 1,
            rotationY: 0,
            z: 0,
            duration: 0.3,
            ease: "power2.out"
          });
        };
        
        card.addEventListener('mouseenter', handleMouseEnter);
        card.addEventListener('mouseleave', handleMouseLeave);
      });
    }
  }, []);



  return (
    <section ref={sectionRef} id="alliances" className="py-20 bg-gradient-to-br from-[#050d1c] to-[#0f172a] relative overflow-hidden">
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
            &gt; ACCESSING_NAP3_DATABASE...
          </div>
          <h2 className="text-4xl sm:text-5xl font-heading font-bold text-gradient text-glow-cyan mb-6">
            NAP3 ALLIANCE NETWORK
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Three elite alliances united under the <span className="text-[#00f0ff]">NAP3 system</span> -
            the most strategic and coordinated alliance network in Whiteout Survival.
          </p>
          <div className="mt-6 text-[#8efff9] font-mono text-sm">
            &gt; STATUS: {serverConfig.status.operational ? 'FULLY_OPERATIONAL' : 'MAINTENANCE'} | MEMBERS: {totalMembers}+ | SVS_RECORD: {serverConfig.status.svsRecord}
          </div>
        </motion.div>

        {/* Alliances Grid */}
        <div ref={cardsRef} className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {alliances.map((alliance, index) => (
            <motion.div
              key={alliance.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className={`relative panel-neon bg-gradient-to-br ${alliance.bgGradient} backdrop-blur-sm rounded-lg p-6 hover:border-[#00f0ff]/40 transition-all duration-300 transform hover:-translate-y-2 group animate-pulse-glow h-full flex flex-col`}>
                {/* Corner Accents */}
                <div className="absolute -top-1 -left-1 w-3 h-3 border-l-2 border-t-2" style={{ borderColor: alliance.color }} />
                <div className="absolute -top-1 -right-1 w-3 h-3 border-r-2 border-t-2" style={{ borderColor: alliance.color }} />
                <div className="absolute -bottom-1 -left-1 w-3 h-3 border-l-2 border-b-2" style={{ borderColor: alliance.color }} />
                <div className="absolute -bottom-1 -right-1 w-3 h-3 border-r-2 border-b-2" style={{ borderColor: alliance.color }} />
                
                {/* Alliance Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-12 h-12 rounded-lg flex items-center justify-center text-[#050d1c] font-bold text-lg font-mono relative"
                      style={{ 
                        backgroundColor: alliance.color,
                        boxShadow: `0 0 10px ${alliance.color}`
                      }}
                    >
                      {alliance.name}
                      <div className="absolute inset-0 border border-white/20 rounded-lg" />
                    </div>
                    <div>
                      <h3 className="text-xl font-heading font-bold text-white">
                        {alliance.fullName}
                      </h3>
                      <p className="text-sm text-gray-400 font-mono">[{alliance.name}]</p>
                      {alliance.tagline && (
                        <p className="text-xs font-mono" style={{ color: alliance.color }}>
                          {alliance.tagline}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-[#00f0ff]" style={{ filter: 'drop-shadow(0 0 3px #00f0ff)' }} />
                    <span className="text-sm text-gray-300 font-mono">{alliance.members} MEMBERS</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Sword className="w-4 h-4 text-[#00f0ff]" style={{ filter: 'drop-shadow(0 0 3px #00f0ff)' }} />
                    <span className="text-sm text-gray-300 font-mono">{alliance.svsScore}</span>
                  </div>
                </div>

                {/* Description */}
                <div className="flex-grow">
                  <p className="text-gray-300 mb-4 leading-relaxed text-sm">
                    {alliance.description}
                  </p>
                </div>

                {/* Achievements Preview */}
                <div className="mb-4">
                  <div className="flex items-center space-x-1 flex-wrap gap-1">
                    {alliance.achievements.slice(0, 2).map((achievement, i) => (
                      <span 
                        key={i}
                        className="px-2 py-1 text-xs rounded font-mono border"
                        style={{ 
                          backgroundColor: `${alliance.color}20`,
                          borderColor: alliance.color,
                          color: alliance.color
                        }}
                      >
                        {achievement}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col space-y-2 mt-auto">
                  <button 
                    className="w-full py-2 px-4 rounded-lg font-semibold hover:shadow-lg transition-all duration-200 text-[#050d1c] text-sm border-2"
                    style={{ 
                      background: `linear-gradient(to right, ${alliance.color}, ${alliance.color}dd)`,
                      borderColor: alliance.color,
                      boxShadow: `0 0 10px ${alliance.color}40`
                    }}
                    onClick={() => {
                      // Get alliance-specific Discord link
                      const discordLinks = serverConfig.allianceDiscordLinks;
                      const allianceKey = alliance.id.toLowerCase();
                      const discordUrl = discordLinks[allianceKey as keyof typeof discordLinks] || serverConfig.discordLink;
                      
                      // Open Discord link in new tab
                      window.open(discordUrl, '_blank', 'noopener,noreferrer');
                    }}
                  >
                    Join {alliance.name} Discord
                  </button>
                  
                  <button 
                    className="w-full py-2 px-4 rounded-lg font-semibold hover:shadow-lg transition-all duration-200 text-sm border-2 bg-transparent hover:bg-white/10"
                    style={{ 
                      borderColor: alliance.color,
                      color: alliance.color
                    }}
                    onClick={(e) => {
                      // Add visual feedback
                      const button = e.currentTarget;
                      button.style.transform = 'scale(0.95)';
                      setTimeout(() => {
                        button.style.transform = '';
                      }, 150);
                      
                      // Custom smooth scroll function
                      const smoothScrollTo = (target: Element, duration: number = 1000) => {
                        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - 80;
                        const startPosition = window.pageYOffset;
                        const distance = targetPosition - startPosition;
                        let startTime: number | null = null;

                        const animation = (currentTime: number) => {
                          if (startTime === null) startTime = currentTime;
                          const timeElapsed = currentTime - startTime;
                          const run = ease(timeElapsed, startPosition, distance, duration);
                          window.scrollTo(0, run);
                          if (timeElapsed < duration) requestAnimationFrame(animation);
                        };

                        // Easing function for smooth animation
                        const ease = (t: number, b: number, c: number, d: number) => {
                          t /= d / 2;
                          if (t < 1) return c / 2 * t * t + b;
                          t--;
                          return -c / 2 * (t * (t - 2) - 1) + b;
                        };

                        requestAnimationFrame(animation);
                      };

                      const eventsSection = document.getElementById('events');
                      if (eventsSection) {
                        // Smooth scroll to events section
                        smoothScrollTo(eventsSection, 1000);
                        
                        // Highlight the specific alliance timeline after scrolling
                        setTimeout(() => {
                          const allianceTimeline = document.querySelector(`[data-alliance="${alliance.name}"]`);
                          if (allianceTimeline) {
                            smoothScrollTo(allianceTimeline, 800);
                            
                            // Add a temporary highlight effect
                            setTimeout(() => {
                              allianceTimeline.classList.add('animate-pulse');
                              setTimeout(() => {
                                allianceTimeline.classList.remove('animate-pulse');
                              }, 2000);
                            }, 800);
                          }
                        }, 1200);
                      }
                    }}
                  >
                    View Event Timings
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>


      </div>
    </section>
  );
};

export default Alliances;