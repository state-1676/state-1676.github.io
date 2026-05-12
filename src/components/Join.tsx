'use client';

import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';
import { serverConfig } from '@/data';

const Join = () => {
  return (
    <section id="recruitment" className="py-20 bg-gradient-to-br from-[#101820] to-[#1e293b]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold">
          <span className="text-gradient">Interested in Joining or Transferring to 1676?</span>
        </h2>
        <p className="mt-4 text-gray-300 max-w-2xl mx-auto">
          Interested in joining or transferring to 1676? Join our Discord to chat with us directly.
        </p>
        <div className="mt-8 flex justify-center">
          <a
            href={serverConfig.recruitmentDiscordLink}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative px-8 py-4 bg-gradient-to-r from-[#00f0ff] to-[#8efff9] text-[#050d1c] rounded-lg font-bold text-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 inline-flex items-center space-x-3 animate-pulse-glow"
          >
            <span className="font-mono">1676 TRANSFER CHAT</span>
            <span className="sr-only">Opens Discord invite in a new tab</span>
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <Zap className="w-5 h-5" />
            </motion.div>
            <div className="absolute -top-1 -left-1 w-3 h-3 border-l-2 border-t-2 border-[#00f0ff]" />
            <div className="absolute -top-1 -right-1 w-3 h-3 border-r-2 border-t-2 border-[#00f0ff]" />
            <div className="absolute -bottom-1 -left-1 w-3 h-3 border-l-2 border-b-2 border-[#00f0ff]" />
            <div className="absolute -bottom-1 -right-1 w-3 h-3 border-r-2 border-b-2 border-[#00f0ff]" />
          </a>
        </div>
        <p className="mt-3 text-sm text-gray-400 max-w-xl mx-auto">
          Opens the <span className="text-gray-300">1676 Transfer Chat</span> Discord for join and transfer questions.
        </p>
      </div>
    </section>
  );
};

export default Join;