import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/layout/Hero";
import FeatureShortcuts from "@/components/home/FeatureShortcuts";
import AudioWidget from "@/components/home/AudioWidget";
import DailyTips from "@/components/tips/DailyTips";
import { getTips } from "@/app/actions/cms";

export default async function Home() {
  const tips = await getTips();

  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />
      <Hero />
      <AudioWidget />
      <FeatureShortcuts />
      <DailyTips initialTips={tips} />
    </main>
  );
}
