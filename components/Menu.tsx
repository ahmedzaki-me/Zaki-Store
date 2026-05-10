// app/menu/page.tsx
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { ItemCard } from "./shared/ItemCard";
import CategoryFilters from "./shared/CategoryFilters";

export default async function Menu({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { category } = (await searchParams) ?? {};

  const [{ data: items }, { data: categories }] = await Promise.all([
    supabase
      .from("items")
      .select("*")
      .match(category && category !== "all" ? { category_id: category } : {}),
    supabase.from("categories").select("id, name"),
  ]);
  console.log(items);
  return (
    <section
      className="container mx-auto mb-10 px-2 py-3 overflow-x-hidden "
      id="menu"
    >
      <div className="bg-background">
        <h2 className="container px-15 max-lg:px-0 py-5 text-2xl md:text-4xl font-bold">
          Special menu
          <span className="relative inline-block ml-2">
            for you
            <span
              className="absolute -bottom-1 left-0 w-full h-1 rounded-full bg-primary opacity-30"
              aria-hidden="true"
            />
          </span>
        </h2>

        <CategoryFilters
          categories={categories ?? []}
          currentCategory={category}
        />

        <div className="relative grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] w-full gap-5 px-5 lg:px-13">
          {items?.map((item) => (
            <ItemCard
              key={item.id}
              imgSrc={item.image_url}
              description={item.description}
              price={item.price}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
