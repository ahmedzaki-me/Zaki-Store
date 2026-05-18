"use client";

import { useSyncExternalStore, useMemo, useCallback } from "react";
import type { CartItem, Item } from "@/types/cart";

const CART_KEY = "zaki-store-cart";

// ─── External store helpers ───────────────────────────────────────────────────

let cachedCart: CartItem[] = [];
let lastRawData: string | null = null;

function readStorage(): CartItem[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = localStorage.getItem(CART_KEY);

    if (raw === lastRawData) {
      return cachedCart;
    }

    lastRawData = raw;
    cachedCart = raw ? (JSON.parse(raw) as CartItem[]) : [];
    return cachedCart;
  } catch {
    return [];
  }
}

function writeStorage(items: CartItem[]) {
  const stringified = JSON.stringify(items);
  localStorage.setItem(CART_KEY, stringified);

  lastRawData = stringified;
  cachedCart = items;

  window.dispatchEvent(new StorageEvent("storage", { key: CART_KEY }));
}

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

const serverSnapshot: CartItem[] = [];

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useCart() {
  const cartItems = useSyncExternalStore(
    subscribe,
    readStorage,
    () => serverSnapshot,
  );

  const setCartItems = useCallback(
    (updater: (prev: CartItem[]) => CartItem[]) => {
      const currentItems = readStorage();
      const nextItems = updater(currentItems);
      writeStorage(nextItems);
    },
    [],
  );

  const countOfItems = useMemo(
    () => cartItems.reduce((total, item) => total + item.count, 0),
    [cartItems],
  );

  const subTotal = useMemo(
    () => cartItems.reduce((total, item) => total + item.price * item.count, 0),
    [cartItems],
  );

  const cartMap = useMemo(
    () => new Map(cartItems.map((i) => [i.id, i])),
    [cartItems],
  );

  const isInCart = useCallback((id: string) => cartMap.has(id), [cartMap]);
  const getCartItem = useCallback((id: string) => cartMap.get(id), [cartMap]);

  const addToCart = useCallback(
    (item: Item) => {
      setCartItems((prev) => [...prev, { ...item, count: 1, notes: "" }]);
    },
    [setCartItems],
  );

  const increaseCount = useCallback(
    (itemId: string) => {
      setCartItems((prev) =>
        prev.map((item) =>
          item.id === itemId ? { ...item, count: item.count + 1 } : item,
        ),
      );
    },
    [setCartItems],
  );

  const decreaseCount = useCallback(
    (itemId: string) => {
      setCartItems((prev) =>
        prev.map((item) =>
          item.id === itemId && item.count > 1
            ? { ...item, count: item.count - 1 }
            : item,
        ),
      );
    },
    [setCartItems],
  );

  const removeFromCart = useCallback(
    (itemId: string) => {
      setCartItems((prev) => prev.filter((item) => item.id !== itemId));
    },
    [setCartItems],
  );

  const addNotes = useCallback(
    (itemId: string, notes: string) => {
      setCartItems((prev) =>
        prev.map((item) => (item.id === itemId ? { ...item, notes } : item)),
      );
    },
    [setCartItems],
  );

  const clearCart = useCallback(() => {
    setCartItems(() => []);
  }, [setCartItems]);

  return {
    cartItems,
    countOfItems,
    subTotal,
    isInCart,
    getCartItem,
    addToCart,
    increaseCount,
    decreaseCount,
    removeFromCart,
    addNotes,
    clearCart,
  };
}
