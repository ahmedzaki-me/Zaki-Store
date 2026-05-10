import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

import { Cart } from "./Cart";
import { MobileMenu } from "./MobileMenu";
const navLinks = [
  { label: "About", href: "#about" },
  { label: "Menu", href: "#menu" },
  { label: "Location", href: "#location" },
  { label: "Checkout", href: "/checkout" },
];

export default function Header() {
  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        "bg-background border-b border-border",
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* ─── Logo ─── */}
        <Link
          href="/"
          className="group flex items-center gap-2.5 shrink-0"
          aria-label="Zaki Store home"
        >
          <div className="relative size-9 overflow-hidden rounded-md ring-2 ring-primary/20 transition-all duration-200 group-hover:ring-primary/50">
            <Image
              src="/Logo.png"
              alt="Zaki Store logo"
              fill
              className="object-cover"
              priority
            />
          </div>
          <span className="text-[1.05rem] font-bold tracking-tight text-foreground transition-colors group-hover:text-primary">
            Zaki <span className="text-primary">Store</span>
          </span>
        </Link>

        {/* ─── Desktop Nav ─── */}
        <nav
          className="hidden md:flex items-center gap-1"
          aria-label="Main navigation"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "relative px-3.5 py-2 text-sm font-medium text-muted-foreground",
                "rounded-md transition-colors duration-150",
                "hover:text-white/90 hover:bg-primary duration-300",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* ─── Right Actions ─── */}
        <div className="flex items-center gap-2">
          {/* Cart */}
          <Cart />
          {/* Mobile hamburger */}
          <MobileMenu navLinks={navLinks} />
        </div>
      </div>
    </header>
  );
}
