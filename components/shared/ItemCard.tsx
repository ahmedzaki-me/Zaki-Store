import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Star } from "lucide-react";

import Image from "next/image";
import { cn } from "@/lib/utils";

import { AddToCartButton } from "./AddToCartButton";
import { Item } from "@/types/cart";
interface ItemCardProps {
  className?: string;
  item: Item;
  haveDescription?: boolean;
}
export function ItemCard({
  className,
  item,
  haveDescription = true,
}: ItemCardProps) {
  return (
    <Card
      className={cn(
        className,
        "min-w-70 overflow-hidden rounded-2xl shadow-md hover:-translate-y-1 duration-300 group",
      )}
    >
      {/* Image and Star Rating Wrapper */}
      <div className="p-3 pb-0">
        <div className="relative h-44 w-full overflow-hidden rounded-2xl">
          {item?.image_url && (
            <Image
              src={item?.image_url}
              alt={item.name}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          )}

          <Badge
            variant="secondary"
            className="absolute left-2 top-2 flex items-center gap-1 rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-bold text-black shadow-sm border-none"
          >
            <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
            4.8
          </Badge>
          <Badge
            variant="secondary"
            className="absolute right-2 top-2 flex items-center gap-1 rounded-full bg-white/90 px-2 py-0.5 text-sm font-bold text-black shadow-sm border-none group-hover:text-primary duration-300"
          >
            {item?.price} EGP
          </Badge>
        </div>
      </div>

      <CardContent className="relative">
        <CardTitle>{item?.name}</CardTitle>
        {haveDescription && (
          <CardDescription className="min-h-[48px]">
            {item?.description}
          </CardDescription>
        )}

        <div className="flex items-center gap-2 mb-auto ">
          <AddToCartButton item={item} />
        </div>
      </CardContent>
    </Card>
  );
}
