import HeroSection from "@/components/HeroSection";
import SecondSection from "@/components/SecondSection";
import HowToUseSection from "@/components/HowToUseSection";
import Menu from "@/components/Menu";
import RealtimeRefresher from "@/hooks/RealtimeRefresher";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  RealtimeRefresher();
  return (
    <>
      <HeroSection />
      <SecondSection />
      <HowToUseSection />
      <Menu searchParams={searchParams} />
    </>
  );
}
