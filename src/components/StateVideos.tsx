'use client';

import { motion } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Play, Youtube, ExternalLink, ChevronDown } from 'lucide-react';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface Video {
  id: string;
  title: string;
  youtubeId: string;
  channel: string;
  date?: string;
}

interface StateVideosProps {
  videos: Video[];
  title?: string;
  description?: string;
}

const StateVideos = ({ 
  videos, 
  title = "STATE VIDEOS",
  description = "Watch our epic moments, battles, and community highlights"
}: StateVideosProps) => {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [thumbnailErrors, setThumbnailErrors] = useState<Set<string>>(new Set());
  const [thumbnailLoaded, setThumbnailLoaded] = useState<Set<string>>(new Set());
  const [visibleCount, setVisibleCount] = useState(6);
  
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  
  // Sort videos by date (latest first), fallback to original order if no date
  const sortedVideos = [...videos].sort((a, b) => {
    if (a.date && b.date) {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
    if (a.date) return -1;
    if (b.date) return 1;
    return 0; // Keep original order if no dates
  });
  
  // Get visible videos based on pagination
  const visibleVideos = sortedVideos.slice(0, visibleCount);
  const hasMore = sortedVideos.length > visibleCount;
  
  const loadMore = () => {
    setVisibleCount(prev => prev + 6);
  };

  useEffect(() => {
    // GSAP entrance animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        toggleActions: "play none none none"
      }
    });

    // Header animation
    tl.fromTo(headerRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Animate newly loaded videos
  useEffect(() => {
    if (cardsRef.current && visibleCount > 6) {
      const allCards = Array.from(cardsRef.current.children);
      const newCards = allCards.slice(visibleCount - 6, visibleCount);
      
      if (newCards.length > 0) {
        gsap.fromTo(newCards,
          { opacity: 0, y: 50, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out"
          }
        );
      }
    }
  }, [visibleCount]);

  const getYouTubeEmbedUrl = (videoId: string) => {
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;
  };

  const getYouTubeWatchUrl = (videoId: string) => {
    return `https://www.youtube.com/watch?v=${videoId}`;
  };

  const getThumbnailUrl = (videoId: string, quality: 'maxresdefault' | 'sddefault' | 'hqdefault' | 'mqdefault' | '0' = 'hqdefault') => {
    if (quality === '0') {
      return `https://img.youtube.com/vi/${videoId}/${quality}.jpg`;
    }
    return `https://img.youtube.com/vi/${videoId}/${quality}.jpg`;
  };

  const handleThumbnailError = (videoId: string, currentSrc: string) => {
    // Try different thumbnail qualities in order - hqdefault is most reliable
    if (currentSrc.includes('maxresdefault')) {
      return getThumbnailUrl(videoId, 'sddefault');
    } else if (currentSrc.includes('sddefault')) {
      return getThumbnailUrl(videoId, 'hqdefault');
    } else if (currentSrc.includes('hqdefault')) {
      return getThumbnailUrl(videoId, 'mqdefault');
    } else if (currentSrc.includes('mqdefault')) {
      return getThumbnailUrl(videoId, '0');
    } else {
      // All YouTube thumbnails failed, use placeholder
      return null;
    }
  };

  // Preload thumbnails for visible videos
  useEffect(() => {
    visibleVideos.forEach((video) => {
      if (!thumbnailLoaded.has(video.youtubeId) && !thumbnailErrors.has(video.youtubeId)) {
        const img = new Image();
        img.onload = () => {
          setThumbnailLoaded(prev => new Set(prev).add(video.youtubeId));
        };
        img.onerror = () => {
          // Try fallback
          const fallbackImg = new Image();
          fallbackImg.onload = () => {
            setThumbnailLoaded(prev => new Set(prev).add(video.youtubeId));
          };
          fallbackImg.onerror = () => {
            setThumbnailErrors(prev => new Set(prev).add(video.youtubeId));
          };
          fallbackImg.src = getThumbnailUrl(video.youtubeId, 'mqdefault');
        };
        img.src = getThumbnailUrl(video.youtubeId, 'hqdefault');
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visibleCount]);

  return (
    <>
      <section 
        ref={sectionRef} 
        id="videos" 
        className="py-20 bg-gradient-to-br from-[#050d1c]/70 to-[#0f172a]/70 relative overflow-hidden"
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

        {/* Animated background elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#00f0ff]/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#8efff9]/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        
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
              &gt; LOADING_VIDEO_ARCHIVE...
            </div>
            <h2 className="text-4xl sm:text-5xl font-heading font-bold text-gradient text-glow-cyan mb-6">
              {title}
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              {description}
            </p>
            <div className="mt-6 text-[#8efff9] font-mono text-sm">
              &gt; TOTAL_VIDEOS: {sortedVideos.length} | DISPLAYING: {visibleVideos.length} | STATUS: ACTIVE
            </div>
          </motion.div>

          {/* Video Grid */}
          <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleVideos.map((video, index) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="group relative"
              >
                <div className="panel-neon rounded-lg overflow-hidden hover:border-[#00f0ff]/60 transition-all duration-300 transform hover:scale-105">
                  {/* Video Thumbnail Container */}
                  <div className="relative aspect-video bg-[#0f172a] overflow-hidden">
                    {/* YouTube Thumbnail */}
                    {thumbnailErrors.has(video.youtubeId) ? (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#0f172a] to-[#050d1c] border border-[#00f0ff]/20">
                        <div className="text-center p-4">
                          <Youtube className="w-12 h-12 text-[#00f0ff]/50 mx-auto mb-2" />
                          <p className="text-sm text-gray-400 font-mono">{video.title}</p>
                        </div>
                      </div>
                    ) : (
                      <>
                        {/* Loading placeholder */}
                        {!thumbnailLoaded.has(video.youtubeId) && (
                          <div className="absolute inset-0 bg-gradient-to-br from-[#0f172a] to-[#050d1c] flex items-center justify-center">
                            <div className="text-center">
                              <div className="w-12 h-12 border-4 border-[#00f0ff]/30 border-t-[#00f0ff] rounded-full animate-spin mx-auto mb-2" />
                              <p className="text-xs text-gray-500 font-mono">Loading...</p>
                            </div>
                          </div>
                        )}
                        <img
                          key={`${video.youtubeId}-thumb`}
                          src={getThumbnailUrl(video.youtubeId, 'hqdefault')}
                          alt={video.title}
                          className={`w-full h-full object-cover transition-opacity duration-300 ${
                            thumbnailLoaded.has(video.youtubeId) ? 'opacity-100' : 'opacity-0'
                          }`}
                          loading={index < 6 ? "eager" : "lazy"}
                          decoding="async"
                          onError={(e) => {
                            const target = e.currentTarget;
                            const fallbackUrl = handleThumbnailError(video.youtubeId, target.src);
                            
                            if (fallbackUrl) {
                              // Try next quality
                              target.src = fallbackUrl;
                            } else {
                              // All thumbnails failed, show placeholder
                              setThumbnailErrors(prev => new Set(prev).add(video.youtubeId));
                              setThumbnailLoaded(prev => {
                                const newSet = new Set(prev);
                                newSet.delete(video.youtubeId);
                                return newSet;
                              });
                            }
                          }}
                          onLoad={(e) => {
                            setThumbnailLoaded(prev => new Set(prev).add(video.youtubeId));
                            
                            // If hqdefault loads successfully, try to upgrade to maxresdefault for better quality
                            if (!thumbnailErrors.has(video.youtubeId) && !e.currentTarget.src.includes('maxresdefault')) {
                              const img = e.currentTarget;
                              const maxResImg = new Image();
                              maxResImg.onload = () => {
                                img.src = getThumbnailUrl(video.youtubeId, 'maxresdefault');
                              };
                              maxResImg.onerror = () => {
                                // maxresdefault not available, keep hqdefault
                              };
                              maxResImg.src = getThumbnailUrl(video.youtubeId, 'maxresdefault');
                            }
                          }}
                        />
                      </>
                    )}
                    
                    {/* Overlay with Play Button */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-center justify-center group-hover:bg-black/40 transition-all duration-300">
                      <div className="relative">
                        <div className="absolute inset-0 bg-[#00f0ff]/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-300" />
                        <button
                          onClick={() => setSelectedVideo(video.youtubeId)}
                          className="relative z-10 w-20 h-20 bg-[#00f0ff]/90 rounded-full flex items-center justify-center transform group-hover:scale-110 transition-all duration-300 shadow-[0_0_30px_rgba(0,240,255,0.5)]"
                        >
                          <Play className="w-10 h-10 text-[#050d1c] ml-1" fill="currentColor" />
                        </button>
                      </div>
                    </div>

                    {/* Channel Badge */}
                    <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-[#00f0ff]/30">
                      <div className="flex items-center space-x-2">
                        <Youtube className="w-4 h-4 text-red-500" />
                        <span className="text-xs text-gray-300 font-mono">{video.channel}</span>
                      </div>
                    </div>
                  </div>

                  {/* Video Info */}
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-[#00f0ff] mb-2 font-mono group-hover:text-[#8efff9] transition-colors">
                      {video.title}
                    </h3>
                    <div className="flex items-center justify-end">
                      <a
                        href={getYouTubeWatchUrl(video.youtubeId)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-1 text-sm text-[#8efff9] hover:text-[#00f0ff] transition-colors font-mono"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <span>Watch on YouTube</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>

                  {/* Corner Accents */}
                  <div className="absolute top-0 left-0 w-4 h-4 border-l border-t border-[#00f0ff]/30 group-hover:border-[#00f0ff] transition-colors" />
                  <div className="absolute top-0 right-0 w-4 h-4 border-r border-t border-[#00f0ff]/30 group-hover:border-[#00f0ff] transition-colors" />
                  <div className="absolute bottom-0 left-0 w-4 h-4 border-l border-b border-[#00f0ff]/30 group-hover:border-[#00f0ff] transition-colors" />
                  <div className="absolute bottom-0 right-0 w-4 h-4 border-r border-b border-[#00f0ff]/30 group-hover:border-[#00f0ff] transition-colors" />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Load More Button */}
          {hasMore && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="flex justify-center mt-12"
            >
              <button
                onClick={loadMore}
                className="group relative px-8 py-4 bg-gradient-to-r from-[#00f0ff]/20 to-[#8efff9]/20 border border-[#00f0ff]/40 rounded-lg font-mono font-semibold text-[#00f0ff] hover:text-[#8efff9] transition-all duration-300 transform hover:scale-105 hover:border-[#00f0ff] hover:shadow-[0_0_30px_rgba(0,240,255,0.3)]"
              >
                <span className="flex items-center space-x-2">
                  <span>LOAD MORE</span>
                  <ChevronDown className="w-5 h-5 group-hover:translate-y-1 transition-transform duration-300" />
                </span>
                <div className="absolute -top-0.5 -left-0.5 w-2 h-2 border-l border-t border-[#00f0ff]/50 group-hover:border-[#00f0ff]" />
                <div className="absolute -top-0.5 -right-0.5 w-2 h-2 border-r border-t border-[#00f0ff]/50 group-hover:border-[#00f0ff]" />
                <div className="absolute -bottom-0.5 -left-0.5 w-2 h-2 border-l border-b border-[#00f0ff]/50 group-hover:border-[#00f0ff]" />
                <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 border-r border-b border-[#00f0ff]/50 group-hover:border-[#00f0ff]" />
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Video Modal */}
      {selectedVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
          onClick={() => setSelectedVideo(null)}
        >
          <div
            className="relative w-full max-w-5xl aspect-video bg-black rounded-lg overflow-hidden border-2 border-[#00f0ff]/50 shadow-[0_0_50px_rgba(0,240,255,0.3)]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/80 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-[#00f0ff] hover:text-black transition-all duration-200 border border-[#00f0ff]/30 hover:border-[#00f0ff]"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* YouTube Embed */}
            <iframe
              src={getYouTubeEmbedUrl(selectedVideo)}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="YouTube video player"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default StateVideos;

