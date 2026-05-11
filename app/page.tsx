import HeroSection from "@/components/HeroSection";
import SecondSection from "@/components/SecondSection";
import HowToUseSection from "@/components/HowToUseSection";
import Menu from "@/components/Menu";
// import { CacheRevalidationProvider } from "@/components/cache-revalidation-provider";

export default async function Home() {
  return (
    <>
      {/* <CacheRevalidationProvider /> */}
      <HeroSection />
      <SecondSection />
      <HowToUseSection />
      <Menu />
    </>
  );
}
