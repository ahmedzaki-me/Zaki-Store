"use client";
import { useRouter, usePathname } from "next/navigation";
import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Category = { id: string; name: string };

export default function CategoryFilters({
  categories,
  currentCategory,
}: {
  categories: Category[];
  currentCategory?: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  };

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    el?.addEventListener("scroll", checkScroll);
    window.addEventListener("resize", checkScroll);
    return () => {
      el?.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [categories]);

  const scroll = (dir: "left" | "right") => {
    scrollRef.current?.scrollBy({
      left: dir === "left" ? -200 : 200,
      behavior: "smooth",
    });
  };

  const handleFilter = (name: string) => {
    router.push(`${pathname}?category=${name}`, { scroll: false });
  };

  return (
    <div className="relative flex items-center justify-center my-5 w-full max-w-[600px] mx-auto">

      <Button
        variant="outline"
        size="icon"
        onClick={() => scroll("left")}
        className={cn(
          "absolute -left-10 z-10 h-8 w-8 rounded-full shadow-md transition-opacity",
          canScrollLeft ? "opacity-100" : "opacity-0 pointer-events-none",
        )}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>


      <Tabs value={currentCategory || "all"} className="w-full select-none text-sm">
        <TabsList
          ref={scrollRef}
          className="py-5 flex w-full justify-start overflow-x-auto overflow-y-hidden whitespace-nowrap rounded-lg bg-muted scrollbar-hide"
        >
          <TabsTrigger
            value="all"
            className="shrink-0 cursor-pointer"
            onClick={() => handleFilter("all")}
          >
            All
          </TabsTrigger>
          {categories.map((cat) => (
            <TabsTrigger
              key={cat.id}
              value={cat.id}
              className="shrink-0 cursor-pointer"
              onClick={() => handleFilter(cat.id)}
            >
              {cat.name}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>


      <Button
        variant="outline"
        size="icon"
        onClick={() => scroll("right")}
        className={cn(
          "absolute -right-10 z-10 h-8 w-8 rounded-full shadow-md transition-opacity",
          canScrollRight ? "opacity-100" : "opacity-0 pointer-events-none",
        )}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
