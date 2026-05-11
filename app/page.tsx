import HeroSection from "@/components/HeroSection";
import SecondSection from "@/components/SecondSection";
import HowToUseSection from "@/components/HowToUseSection";
import Menu from "@/components/Menu";
import { CacheRevalidationProvider } from "@/components/cache-revalidation-provider";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  return (
    <>
      <CacheRevalidationProvider />
      <HeroSection />
      <SecondSection />
      <HowToUseSection />
      <Menu searchParams={searchParams} />
    </>
  );
}
