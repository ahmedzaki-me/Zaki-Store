"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { useCart } from "@/hooks/useCart";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Minus,
  Plus,
  Trash2,
  Pencil,
  Check,
  X,
  ShoppingCart,
  MessageCircle,
  User,
  Phone,
  ArrowLeft,
  ShoppingBag,
} from "lucide-react";
import Link from "next/link";

// ─── Types ────────────────────────────────────────────────────────────────────

interface CustomerInfo {
  name: string;
  phone: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const WHATSAPP_NUMBER = "201286113602"; // TODO: Replace with real number

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-EG", {
    style: "currency",
    currency: "EGP",
    minimumFractionDigits: 0,
  }).format(price);
}

function buildWhatsAppMessage(
  cartItems: ReturnType<typeof useCart>["cartItems"],
  customer: CustomerInfo,
  subTotal: number,
) {
  const lines = [
    `🛍️ *New Order*`,
    ``,
    `*Customer Info*`,
    `Name: ${customer.name}`,
    `Phone: ${customer.phone}`,
    ``,
    `*Order Items*`,
    ...cartItems.map(
      (item, i) =>
        `${i + 1}. ${item.name} × ${item.count} — ${formatPrice(item.price * item.count)}${item.notes ? `\n   📝 ${item.notes}` : ""}`,
    ),
    ``,
    `*Subtotal: ${formatPrice(subTotal)}*`,
  ];

  return encodeURIComponent(lines.join("\n"));
}

// ─── Cart Item Row ─────────────────────────────────────────────────────────────

function CartItemRow({
  item,
  onIncrease,
  onDecrease,
  onRemove,
  onAddNotes,
}: {
  item: ReturnType<typeof useCart>["cartItems"][number];
  onIncrease: (id: string) => void;
  onDecrease: (id: string) => void;
  onRemove: (id: string) => void;
  onAddNotes: (id: string, notes: string) => void;
}) {
  const [editingNotes, setEditingNotes] = useState(false);
  const [notesDraft, setNotesDraft] = useState(item.notes ?? "");

  const saveNotes = useCallback(() => {
    onAddNotes(item.id, notesDraft);
    setEditingNotes(false);
  }, [item.id, notesDraft, onAddNotes]);

  const cancelNotes = useCallback(() => {
    setNotesDraft(item.notes ?? "");
    setEditingNotes(false);
  }, [item.notes]);

  return (
    <div className="flex flex-col gap-3 py-4">
      {/* Main row */}
      <div className="flex gap-3 items-start">
        {/* Image */}
        <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0 border border-border bg-muted">
          {item.image_url ? (
            <Image
              src={item.image_url}
              alt={item.name}
              fill
              className="object-cover"
              sizes="64px"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <ShoppingBag
                size={24}
                className="text-muted-foreground opacity-40"
              />
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <p className="font-medium text-sm leading-snug truncate">
            {item.name}
          </p>
          <p className="text-muted-foreground text-xs mt-0.5">
            {formatPrice(item.price)} / item
          </p>
          <p className="text-primary font-semibold text-sm mt-1">
            {formatPrice(item.price * item.count)}
          </p>
        </div>

        {/* Quantity controls + delete */}
        <div className="flex flex-col items-end gap-2 shrink-0">
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 text-destructive hover:text-destructive hover:bg-destructive/10"
            onClick={() => onRemove(item.id)}
            aria-label="Remove item"
          >
            <Trash2 size={14} />
          </Button>

          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="icon"
              className="h-7 w-7"
              onClick={() => onDecrease(item.id)}
              disabled={item.count <= 1}
              aria-label="Decrease quantity"
            >
              <Minus size={12} />
            </Button>
            <span className="w-6 text-center text-sm font-medium tabular-nums">
              {item.count}
            </span>
            <Button
              variant="outline"
              size="icon"
              className="h-7 w-7"
              onClick={() => onIncrease(item.id)}
              aria-label="Increase quantity"
            >
              <Plus size={12} />
            </Button>
          </div>
        </div>
      </div>

      {/* Notes row */}
      <div className="ml-[76px]">
        {editingNotes ? (
          <div className="flex flex-col gap-2">
            <Textarea
              value={notesDraft}
              onChange={(e) => setNotesDraft(e.target.value)}
              placeholder="Add notes for this item (e.g. no onions, extra sauce...)"
              className="text-sm resize-none min-h-[70px]"
              autoFocus
            />
            <div className="flex gap-2">
              <Button
                size="sm"
                className="h-7 px-3 text-xs gap-1"
                onClick={saveNotes}
              >
                <Check size={12} />
                Save
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="h-7 px-3 text-xs gap-1"
                onClick={cancelNotes}
              >
                <X size={12} />
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <div
            className="flex items-start gap-2 group cursor-pointer"
            onClick={() => setEditingNotes(true)}
          >
            <div className="flex-1 min-h-[32px] px-3 py-1.5 rounded-md border border-border bg-muted/50 text-sm text-muted-foreground">
              {notesDraft ? (
                <span className="text-foreground">{notesDraft}</span>
              ) : (
                <span className="italic opacity-60">No notes</span>
              )}
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Edit notes"
              onClick={(e) => {
                e.stopPropagation();
                setEditingNotes(true);
              }}
            >
              <Pencil size={12} />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Empty State ──────────────────────────────────────────────────────────────

function EmptyCart() {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
      <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center">
        <ShoppingCart size={32} className="text-muted-foreground" />
      </div>

      <div>
        <p className="font-semibold text-lg">Your cart is empty</p>
        <p className="text-muted-foreground text-sm mt-1">
          Add items to your cart before checking out.
        </p>
      </div>

      <Button asChild className="mt-2">
        <Link href="/#menu">
          <ArrowLeft size={16} className="mr-2" />
          Back to Menu
        </Link>
      </Button>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Checkout() {
  const {
    cartItems,
    subTotal,
    increaseCount,
    decreaseCount,
    removeFromCart,
    addNotes,
  } = useCart();

  const [customer, setCustomer] = useState<CustomerInfo>({
    name: "",
    phone: "",
  });

  const [errors, setErrors] = useState<Partial<CustomerInfo>>({});

  const validate = () => {
    const newErrors: Partial<CustomerInfo> = {};
    if (!customer.name.trim()) newErrors.name = "Name is required";
    if (!customer.phone.trim()) newErrors.phone = "Phone number is required";
    else if (!/^[\d\s+\-()]{7,15}$/.test(customer.phone.trim()))
      newErrors.phone = "Enter a valid phone number";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCheckout = () => {
    if (!validate()) return;
    const message = buildWhatsAppMessage(cartItems, customer, subTotal);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank");
  };

  const isEmpty = cartItems.length === 0;

  return (
    <div className="bg-background">
      <div className="container mx-auto px-10 max-md:px-4 py-6 space-y-6 ">
        {isEmpty ? (
          <EmptyCart />
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* ── Cart Items ── */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center gap-2">
                    <ShoppingCart size={16} className="text-primary" />
                    Your Order
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-4 pb-0 divide-y divide-border">
                  {cartItems.map((item) => (
                    <CartItemRow
                      key={item.id}
                      item={item}
                      onIncrease={increaseCount}
                      onDecrease={decreaseCount}
                      onRemove={removeFromCart}
                      onAddNotes={addNotes}
                    />
                  ))}
                </CardContent>
                <CardFooter className="flex-col gap-3 pt-4">
                  <Separator />
                  <div className="w-full flex justify-between items-center">
                    <span className="text-muted-foreground text-sm">
                      Subtotal
                    </span>
                    <span className="font-semibold text-base">
                      {formatPrice(subTotal)}
                    </span>
                  </div>
                  <p className="w-full text-xs text-muted-foreground">
                    Delivery fees and taxes may apply and will be confirmed via
                    WhatsApp.
                  </p>
                </CardFooter>
              </Card>

              {/* ── Customer Info ── */}
              <div className="relative">
                <div className="space-y-4 sticky top-18">
                  <Card className="h-fit ">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base flex items-center gap-2">
                        <User size={16} className="text-primary" />
                        Your Details
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* Name */}
                      <div className="space-y-1.5">
                        <Label htmlFor="customer-name" className="text-sm">
                          Full Name
                        </Label>
                        <div className="relative">
                          <User
                            size={15}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
                          />
                          <Input
                            id="customer-name"
                            className="pl-9"
                            placeholder="e.g. Ahmed Zaki"
                            value={customer.name}
                            onChange={(e) => {
                              setCustomer((p) => ({
                                ...p,
                                name: e.target.value,
                              }));
                              if (errors.name)
                                setErrors((p) => ({ ...p, name: undefined }));
                            }}
                          />
                        </div>
                        {errors.name && (
                          <p className="text-destructive text-xs">
                            {errors.name}
                          </p>
                        )}
                      </div>

                      {/* Phone */}
                      <div className="space-y-1.5">
                        <Label htmlFor="customer-phone" className="text-sm">
                          Phone Number
                        </Label>
                        <div className="relative">
                          <Phone
                            size={15}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
                          />
                          <Input
                            id="customer-phone"
                            type="tel"
                            className="pl-9"
                            placeholder="e.g. 01012345678"
                            value={customer.phone}
                            onChange={(e) => {
                              setCustomer((p) => ({
                                ...p,
                                phone: e.target.value,
                              }));
                              if (errors.phone)
                                setErrors((p) => ({ ...p, phone: undefined }));
                            }}
                          />
                        </div>
                        {errors.phone && (
                          <p className="text-destructive text-xs">
                            {errors.phone}
                          </p>
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  {/* ── WhatsApp Notice ── */}
                  <div className="flex gap-3 p-3.5 rounded-lg bg-[oklch(0.96_0.003_325.6)] border border-border text-sm">
                    <MessageCircle
                      size={18}
                      className="text-primary shrink-0 mt-0.5"
                    />
                    <p className="text-muted-foreground leading-relaxed">
                      Your order will be confirmed via{" "}
                      <span className="font-medium text-foreground">
                        WhatsApp
                      </span>
                      . Tapping the button below will open a WhatsApp with your
                      order invoice ready for dispatch.
                    </p>
                  </div>

                  {/* ── Submit ── */}
                  <Button
                    size="lg"
                    className="w-full gap-2 text-base h-12"
                    onClick={handleCheckout}
                  >
                    <MessageCircle size={18} />
                    Place Order via WhatsApp
                  </Button>
                </div>
              </div>
            </div>
            <p className="text-center text-xs text-muted-foreground pb-4">
              By placing your order, you agree to our terms & conditions.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
