'use client';

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
            className="px-8 py-4 rounded-lg font-bold text-lg border-2 border-[#5865f2]/80 text-[#c9d8ff] bg-[#5865f2]/15 hover:bg-[#5865f2]/25 hover:border-[#5865f2] transition-all duration-300 transform hover:scale-105 inline-flex items-center justify-center font-mono"
          >
            1676 Transfer Chat (Discord)
            <span className="sr-only">Opens Discord invite in a new tab</span>
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