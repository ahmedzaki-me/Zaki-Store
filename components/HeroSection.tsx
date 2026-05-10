import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Star } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

// Floating decorative burger ingredients
export const FloatingDeco = ({
  className,
  emoji,
  size = "text-2xl",
  rotate = "rotate-0",
  opacity = "opacity-30",
}: {
  className: string;
  emoji: string;
  size?: string;
  rotate?: string;
  opacity?: string;
}) => (
  <span
    className={`absolute select-none pointer-events-none ${className} ${size} ${rotate} ${opacity} animate-float`}
    aria-hidden="true"
  >
    {emoji}
  </span>
);

export default function HeroSection() {
  const divClasses =
    "absolute text-lg bg-background/95 rounded-full px-10 max-sm:px-6 py-2 backdrop-blur-md ring-6 ring-white/60 flex items-center gap-2";
  const spanClasses = "font-extrabold text-foreground whitespace-nowrap";

  return (
    <section className="relative overflow-hidden min-h-[calc(100vh-4rem)] flex items-start px-10 bg-primary/10">
      {/* Floating decorative food items */}
      <FloatingDeco
        className="top-[8%] left-[4%]"
        emoji="🌿"
        size="text-3xl"
        rotate="rotate-12"
        opacity="opacity-40"
      />
      <FloatingDeco
        className="top-[15%] left-[18%]"
        emoji="🧅"
        size="text-xl"
        rotate="-rotate-6"
        opacity="opacity-40"
      />
      <FloatingDeco
        className="top-[6%]  right-[22%]"
        emoji="🫙"
        size="text-2xl"
        rotate="rotate-6"
        opacity="opacity-40"
      />
      <FloatingDeco
        className="top-[10%] right-[8%]"
        emoji="🌶️"
        size="text-3xl"
        rotate="-rotate-12"
        opacity="opacity-40"
      />
      <FloatingDeco
        className="top-[40%] right-[3%]"
        emoji="🧀"
        size="text-2xl"
        rotate="rotate-12"
        opacity="opacity-40"
      />
      <FloatingDeco
        className="bottom-[18%] right-[14%]"
        emoji="🥬"
        size="text-2xl"
        rotate="-rotate-6"
        opacity="opacity-40"
      />
      <FloatingDeco
        className="bottom-[28%] left-[8%]"
        emoji="🍅"
        size="text-3xl"
        rotate="rotate-6"
        opacity="opacity-40"
      />
      <FloatingDeco
        className="bottom-[32%] left-[2%]"
        emoji="🥩"
        size="text-xl"
        rotate="-rotate-12"
        opacity="opacity-40"
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* ── LEFT: Text content ─────────────────────────────────── */}
          <div className="flex flex-col gap-6 order-2 lg:order-1 text-center lg:text-left">
            {/* Eyebrow badge */}
            <div className="flex justify-center lg:justify-start"></div>

            {/* Main heading */}
            <h1 className="text-4xl sm:text-5xl xl:text-6xl font-bold leading-[1.1] tracking-tight text-foreground">
              Taste the{" "}
              <span className="relative inline-block text-primary italic">
                Perfect
                <span
                  className="absolute -bottom-1 left-0 w-full h-[3px] rounded-full bg-primary opacity-30"
                  aria-hidden="true"
                />
              </span>
              <br />
              Food,{" "}
              <span className="text-muted-foreground font-light">
                every bite
              </span>
            </h1>

            {/* Sub-heading product name */}
            <p className="text-xl sm:text-2xl font-semibold text-foreground/80">
              BBQ Chicken Pizza - best seller
            </p>

            {/* Description */}
            <p className="text-base text-muted-foreground max-w-md mx-auto lg:mx-0 leading-relaxed">
              This is a virtual restaurant for display purposes only; you cannot
              actually order.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start pt-2">
              <Button
                asChild
                size="lg"
                className="group gap-2 text-base font-semibold px-7 py-5 rounded-full shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all duration-300 hover:-translate-y-0.5"
              >
                <Link href="#menu">
                  <ShoppingCart className="w-4 h-4 transition-transform group-hover:scale-110" />
                  Order Now
                </Link>
              </Button>

              <Button
                asChild
                size="lg"
                variant="outline"
                className="group gap-2 text-base font-semibold px-7 py-5 rounded-full hover:-translate-y-0.5 transition-all duration-300 hover:border-primary hover:text-primary"
              >
                <Link
                  href="https://chat.ahmedzaki.me"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Get Your Website Now
                </Link>
              </Button>
            </div>
          </div>

          {/* ── RIGHT: Image area ─────────────────────────────────── */}
          <div className="relative flex items-center justify-center order-1 lg:justify-end lg:order-2">
            {/* Circular backdrop */}
            <div className=" relative w-60 h-60 sm:w-80 sm:h-80 md:w-96 md:h-96 xl:w-[420px] xl:h-[420px] rounded-full flex items-center justify-center">
              {/* Main burger image */}
              <div className="w-full h-full relative drop-shadow-2xl border-6 rounded-full ">
                <Image
                  src="/pizza.png"
                  alt="BBQ Bacon Burger — Smoky BBQ sauce with crispy beef bacon and onion rings"
                  fill
                  priority
                  className="object-contain rounded-full"
                  sizes="(max-width: 640px) 288px, (max-width: 768px) 320px, (max-width: 1024px) 384px, 420px"
                />
              </div>
              {/* Floating chip — product name (top-left) */}
              <div
                className={cn(
                  "top-5 left-0 max-sm:-left-1/8 max-sm:text-sm drop-shadow-2xl",
                  divClasses,
                )}
              >
                <span className={spanClasses}>BBQ Chicken Pizza</span>
              </div>

              {/* Floating chip — rating (top-right) */}
              <div
                className={cn("top-1/3 max-sm:text-sm -right-8 ", divClasses)}
              >
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span className={spanClasses}>4.9</span>
              </div>
              {/* Floating chip — orders count (bottom) */}
              <div
                className={cn(
                  "bottom-8 left-1/5 -translate-x-1/2 max-sm:left-5 max-sm:text-sm",
                  divClasses,
                )}
              >
                <span className={spanClasses}>18K</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Inline keyframes for floating animation */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(var(--tw-rotate, 0deg)); }
          50%       { transform: translateY(-10px) rotate(var(--tw-rotate, 0deg)); }
        }
        .animate-float {
          animation: float 5s ease-in-out infinite;
        }
        .animate-float:nth-child(odd)  { animation-duration: 6s; animation-delay: 0.5s; }
        .animate-float:nth-child(even) { animation-duration: 4.5s; animation-delay: 1.2s; }
      `}</style>
    </section>
  );
}
