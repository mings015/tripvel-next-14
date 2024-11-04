import Layout from "@/components/Layout";
import ActivitySection from "@/components/views/Home/ActivitySection";
import BannerSection from "@/components/views/Home/BannerSection";
import CategorySection from "@/components/views/Home/CategorySection";
import HeroSection from "@/components/views/Home/HeroSection";
import PromoSection from "@/components/views/Home/PromoSection";
import WhySection from "@/components/views/Home/WhySection";

export default function Home() {
  return (
    <Layout>
      <HeroSection />
      <PromoSection />
      <BannerSection />
      <CategorySection />
      <ActivitySection />
      <WhySection />
    </Layout>
  );
}
