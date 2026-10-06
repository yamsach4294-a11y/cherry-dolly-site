import Header from "@/components/Header";
import Hero from "@/components/Hero";
import LineupSection from "@/components/LineupSection";
import FeaturedSection from "@/components/FeaturedSection";
import BiteInteraction from "@/components/BiteInteraction";
import BrandMessage from "@/components/BrandMessage";
import Footer from "@/components/Footer";
import MotionProvider from "@/components/ui/MotionProvider";

export default function Home() {
  return (
    <MotionProvider>
      <a className="skip-link" href="#main-content">メインコンテンツへ移動</a>
      <Header />
      <main id="main-content">
        <Hero />
        <LineupSection />
        <FeaturedSection />
        <BiteInteraction />
        <BrandMessage />
      </main>
      <Footer />
    </MotionProvider>
  );
}
