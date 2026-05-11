"use client";
import { useState } from "react";
import { ItemCard } from "./ItemCard";
import CategoryFilters from "./CategoryFilters";

type Item = {
  id: string;
  name: string;
  image_url: string;
  description: string;
  price: number;
  category_id: string;
};

type Category = { id: string; name: string };

export default function MenuClient({
  items,
  categories,
}: {
  items: Item[];
  categories: Category[];
}) {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filtered =
    activeCategory === "all"
      ? items
      : items.filter((item) => item.category_id === activeCategory);

  return (
    <>
      <CategoryFilters
        categories={categories}
        currentCategory={activeCategory}
        onFilter={setActiveCategory}
      />

      <div className="relative grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] w-full gap-5 px-5 lg:px-13">
        {filtered.map((item) => (
          <ItemCard
            key={item.id}
            name={item.name}
            imgSrc={item.image_url}
            description={item.description}
            price={item.price}
          />
        ))}
      </div>
    </>
  );
}
