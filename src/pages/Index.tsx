import { HeroSection } from "@/components/home/HeroSection";
import { TrendingSection } from "@/components/home/TrendingSection";
import { CategoriesSection } from "@/components/home/CategoriesSection";
import { DiscussionsPreview } from "@/components/home/DiscussionsPreview";
import { NewsSection } from "@/components/home/NewsSection";

const Index = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <HeroSection />
      <TrendingSection />
      <CategoriesSection />
      <DiscussionsPreview />
      <NewsSection />
    </div>
  );
};

export default Index;
