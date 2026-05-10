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
          If you want us to contact you about recruitment or future transfers, fill out our short form and we will reach out via in-game message. For questions and chatting with us, join the Discord below.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row flex-wrap gap-4 justify-center items-center">
          <a
            href={serverConfig.recruitmentFormUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative px-8 py-4 bg-gradient-to-r from-[#00f0ff] to-[#8efff9] text-[#050d1c] rounded-lg font-bold text-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 inline-flex items-center"
          >
            <span className="font-mono">REQUEST CONTACT</span>
            <span className="sr-only">Opens Google Form in a new tab</span>
            <div className="absolute -top-1 -left-1 w-3 h-3 border-l-2 border-t-2 border-[#00f0ff]" />
            <div className="absolute -top-1 -right-1 w-3 h-3 border-r-2 border-t-2 border-[#00f0ff]" />
            <div className="absolute -bottom-1 -left-1 w-3 h-3 border-l-2 border-b-2 border-[#00f0ff]" />
            <div className="absolute -bottom-1 -right-1 w-3 h-3 border-r-2 border-b-2 border-[#00f0ff]" />
          </a>
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
          The contact button opens a Google Form for player details and preferences. Discord opens{' '}
          <span className="text-gray-300">1676 Transfer Chat</span> for join and transfer questions.
        </p>
      </div>
    </section>
  );
};

export default Join;