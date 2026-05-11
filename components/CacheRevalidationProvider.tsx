"use client";

import { useCacheRevalidation } from "@/hooks/useCacheRevalidation";

export function CacheRevalidationProvider() {
  useCacheRevalidation();
  return null;
}
