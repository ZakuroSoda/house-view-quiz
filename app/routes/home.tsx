import type { Route } from "./+types/home";
import Hero from "~/home/hero";
import FeaturesSection from "~/home/featuresSection";
import StatsSection from "~/home/statsSection";
export function meta({ }: Route.MetaArgs) {
  return [
    { title: "The House View Quiz" },
    { name: "description", content: "A finance quiz infused with risk management principles" },
  ];
}

export default function Home() {
  return <div className="min-h-screen w-full">
    <Hero />
    <FeaturesSection />
    <StatsSection />
  </div>
}
