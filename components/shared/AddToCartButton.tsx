"use client";

import { Button } from "@/components/ui/button";
import { ShoppingCart, PlusIcon, MinusIcon } from "lucide-react";
import { useCartContext } from "@/context/CartContext";
import type { Item } from "@/types/cart";

interface AddToCartButtonProps {
  item: Item;
}

export function AddToCartButton({ item }: AddToCartButtonProps) {
  const { isInCart, getCartItem, addToCart, increaseCount, decreaseCount } =
    useCartContext();

  if (item?.stock_quantity === 0) {
    return (
      <Button className="w-full uppercase" disabled>
        Out of Stock
      </Button>
    );
  }

  const inCart = isInCart(item?.id);
  const cartItem = getCartItem(item?.id);

  if (inCart && cartItem) {
    return (
      <div className="flex items-center justify-between gap-1 w-full">
        <Button
          size="icon"
          className="rounded-full"
          onClick={() => decreaseCount(item?.id)}
        >
          <MinusIcon />
        </Button>

        <span className="font-bold text-xl">{cartItem.count}</span>

        <Button
          size="icon"
          className="rounded-full"
          // disabled={cartItem.count >= item?.stock_quantity}
          onClick={() => increaseCount(item?.id)}
        >
          <PlusIcon />
        </Button>
      </div>
    );
  }

  return (
    <Button
      onClick={() => addToCart(item)}
      size="icon"
      className=" flex justify-between items-center gap-2 ml-auto w-fit px-3 shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all duration-300 hover:-translate-y-0.5"
    >
      <ShoppingCart className="h-4 w-4 text-white" />
      <span>Add to cart</span>
    </Button>
  );
}
