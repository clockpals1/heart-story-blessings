import { HeroSection } from "@/components/HeroSection";
import { BibleVerseSection } from "@/components/BibleVerseSection";
import { PuzzleSection } from "@/components/PuzzleSection";
import { AppreciationSection } from "@/components/AppreciationSection";
import { BlessingSection } from "@/components/BlessingSection";

const Index = () => {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <BibleVerseSection />
      <PuzzleSection />
      <AppreciationSection />
      <BlessingSection />
    </main>
  );
};

export default Index;
