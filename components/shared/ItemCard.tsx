import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { ShoppingCart, Star } from "lucide-react";

import Image from "next/image";
import { cn } from "@/lib/utils";

interface ItemCardProps {
  className?: string;
  name: string;
  imgSrc: string;
  description?: string;
  price: number;
}
export function ItemCard({
  className,
  name,
  imgSrc,
  description,
  price,
}: ItemCardProps) {
  return (
    <Card
      className={cn(
        className,
        "min-w-70 overflow-hidden rounded-2xl shadow-md hover:-translate-y-1 duration-300",
      )}
    >
      {/* Image and Star Rating Wrapper */}
      <div className="p-3 pb-0">
        <div className="relative h-44 w-full overflow-hidden rounded-2xl">
          <Image
            src={imgSrc}
            alt="Hazelnut Latte"
            fill
            priority
            className="object-cover"
          />
          <Badge
            variant="secondary"
            className="absolute left-2 top-2 flex items-center gap-1 rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-bold text-black shadow-sm border-none"
          >
            <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
            4.8
          </Badge>
          <Badge
            variant="secondary"
            className="absolute right-2 top-2 flex items-center gap-1 rounded-full bg-white/90 px-2 py-0.5 text-sm font-bold text-black shadow-sm border-none"
          >
            {price} EGP
          </Badge>
        </div>
      </div>

      <CardContent className="relative">
        <CardTitle>{name}</CardTitle>
        {description && (
          <CardDescription className="min-h-[48px]">
            {description}
          </CardDescription>
        )}

        <div className="flex items-center gap-2 mb-auto ">
          <Button
            size="icon"
            className=" flex justify-between items-center gap-2 ml-auto w-fit px-3 shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all duration-300 hover:-translate-y-0.5"
          >
            <ShoppingCart className="h-4 w-4 text-white" />
            <span>Add to cart</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
