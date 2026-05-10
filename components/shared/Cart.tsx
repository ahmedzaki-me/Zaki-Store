"use client";

import { Button } from "../ui/button";
import { ShoppingCart } from "lucide-react";

export function Cart() {
  return (
    <Button
      variant="ghost"
      size="icon"
      className="relative"
      aria-label="Open cart"
      type="button"
    >
      <ShoppingCart className="size-5 text-foreground" />
      <span className="absolute -top-0.5 -right-0.5 flex size-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
        0
      </span>
    </Button>
  );
}
