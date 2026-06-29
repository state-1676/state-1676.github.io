import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import Alliances from '@/components/Alliances';
import Events from '@/components/Events';
import StateVideos from '@/components/StateVideos';
import Rules from '@/components/Rules';
import Join from '@/components/Join';
import { getVideos } from '@/data';

export default function Home() {
  const videos = getVideos();
  
  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero />
      {/* <ServerBanner /> */}
      <Join />
      <Alliances />
      <Events />
      <StateVideos videos={videos} />
      <Rules />
    </main>
  );
}
