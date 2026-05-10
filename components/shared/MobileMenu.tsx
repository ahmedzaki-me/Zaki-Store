"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

export function MobileMenu({
  navLinks,
}: {
  navLinks: Array<{ href: string; label: string }>;
}) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          aria-label="Open menu"
        >
          <Menu className="size-5" />
        </Button>
      </SheetTrigger>

      <SheetContent
        side="top"
        className="w-full pt-4 pb-8 px-6 border-b border-border bg-background/95 backdrop-blur-lg"
      >
        <SheetTitle className="sr-only">Navigation Menu</SheetTitle>

        {/* Mobile nav header */}
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="relative size-8 overflow-hidden rounded-md ring-2 ring-primary/20">
              <Image
                src="/Logo.png"
                alt="Zaki Store logo"
                fill
                className="object-cover"
              />
            </div>
            <span className="text-base font-semibold tracking-tight">
              Zaki <span className="text-primary">Store</span>
            </span>
          </Link>
        </div>

        {/* Mobile nav links */}
        <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
          {navLinks.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              style={{ animationDelay: `${i * 80}ms` }}
              className={cn(
                "flex items-center gap-3 rounded-lg px-4 py-3.5",
                "text-base font-medium text-muted-foreground",
                "hover:bg-accent hover:text-foreground",
                "transition-colors duration-150",
                "animate-in slide-in-from-top-2 fade-in duration-300",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
