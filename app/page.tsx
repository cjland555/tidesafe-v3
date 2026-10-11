import TopBar, { MobileCta } from "@/components/TopBar";
import TideGauge from "@/components/TideGauge";
import ScrollEngine from "@/components/ScrollEngine";
import Hero from "@/components/Hero";
import July22 from "@/components/July22";
import Forecast from "@/components/Forecast";
import FiveTides, { QuietLine } from "@/components/FiveTides";
import Story from "@/components/Story";
import Assessments from "@/components/Assessments";
import Questions from "@/components/Questions";
import RequestForm from "@/components/RequestForm";
import Colophon from "@/components/Colophon";

export default function Home() {
  return (
    <>
      <a href="#july-22" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-16 focus:z-50 focus:rounded focus:bg-fog focus:px-4 focus:py-2 focus:text-fog-ink">
        Skip to content
      </a>
      <TopBar />
      <TideGauge />
      <main>
        <Hero />
        <July22 />
        <Forecast />
        <QuietLine />
        <FiveTides />
        <Story />
        <Assessments />
        <Questions />
        <RequestForm />
      </main>
      <Colophon />
      <MobileCta />
      <ScrollEngine />
    </>
  );
}
