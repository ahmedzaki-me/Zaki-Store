"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

import { ShoppingCart, CircleX, MinusIcon, PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";
import { useCartContext } from "@/context/CartContext";

export function CartDrawer() {
  const {
    cartItems,
    countOfItems,
    subTotal,
    increaseCount,
    decreaseCount,
    removeFromCart,
  } = useCartContext();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <ShoppingCart size={20} />
          {countOfItems > 0 && (
            <Badge className="absolute -top-2 -right-2 h-5 min-w-5 px-1 bg-primary text-[10px] font-bold text-primary-foreground border-0 rounded-full flex items-center justify-center">
              {countOfItems}
            </Badge>
          )}
        </Button>
      </SheetTrigger>

      <SheetContent className="flex flex-col w-80 sm:w-96 p-0">
        <SheetHeader className="px-4 py-3 border-b">
          <SheetTitle className="flex items-center gap-2">
            <ShoppingCart size={18} />
            Cart
            <Badge variant="secondary">{countOfItems} items</Badge>
          </SheetTitle>
        </SheetHeader>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-4 py-2 space-y-3">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full py-20 text-muted-foreground">
              <ShoppingCart size={48} className="mb-3 opacity-20" />
              <p>Your cart is empty</p>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="relative flex gap-3 p-3 rounded-xl border bg-card shadow-sm"
              >
                {item?.image_url && (
                  <Image
                    src={item.image_url}
                    alt={item.name}
                    className="w-14 h-12 rounded-md object-cover shrink-0"
                    width={56}
                    height={48}
                  />
                )}
                <div className="flex-1 min-w-0">
                  <p className="font-semibold truncate">{item.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {item.price} × {item.count} ={" "}
                    <span className="font-semibold text-foreground">
                      {(item.price * item.count).toFixed(2)} EGP
                    </span>
                  </p>

                  {item.notes && (
                    <p className="text-xs text-muted-foreground mt-0.5 truncate ">
                      📝 {item.notes}
                    </p>
                  )}

                  {/* Count Controls */}
                  <div className="flex items-center gap-2 mt-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-6 w-6 rounded-full"
                      onClick={() => decreaseCount(item.id)}
                    >
                      <MinusIcon className="h-3 w-3" />
                    </Button>
                    <span className="font-bold text-sm w-4 text-center">
                      {item.count}
                    </span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-6 w-6 rounded-full"
                      // disabled={item.count >= item.stock_quantity}
                      onClick={() => increaseCount(item.id)}
                    >
                      <PlusIcon className="h-3 w-3" />
                    </Button>
                  </div>
                </div>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="absolute top-2 right-2 text-muted-foreground hover:text-destructive transition-colors"
                >
                  <CircleX size={16} />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <SheetFooter>
            <Separator />
            <div className="px-4 py-4 space-y-3">
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>{subTotal.toFixed(2)} EGP</span>
              </div>

              <Link href="/checkout" onClick={() => setIsOpen(false)}>
                <Button className="w-full text-base font-semibold py-5">
                  Checkout
                </Button>
              </Link>
            </div>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
}
