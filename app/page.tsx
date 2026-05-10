import HeroSection from "@/components/HeroSection";
import SecondSection from "@/components/SecondSection";
import HowToUseSection from "@/components/HowToUseSection";
import Menu from "@/components/Menu";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  return (
    <>
      <HeroSection />
      <SecondSection />
      <HowToUseSection />
      <Menu searchParams={searchParams} />
    </>
  );
}
