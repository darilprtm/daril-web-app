import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/layout/Hero";
import FeatureShortcuts from "@/components/home/FeatureShortcuts";
import DashboardWidgets from "@/components/home/DashboardWidgets";
import DailyTips from "@/components/tips/DailyTips";
import { getTips } from "@/app/actions/cms";

export default async function Home() {
  const tips = await getTips();

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <DashboardWidgets />
      <FeatureShortcuts />
      <DailyTips initialTips={tips} />
    </main>
  );
}
