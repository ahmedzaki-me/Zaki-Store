import { getCategories, getItems } from "@/utils/supabase/utils";
import MenuClient from "./shared/MenuClient";

export default async function Menu() {
  const [items, categories] = await Promise.all([getItems(), getCategories()]);

  return (
    <section
      className="container mx-auto mb-10 px-2 py-3 overflow-x-hidden"
      id="menu"
    >
      <div className="bg-background">
        <h2 className="container px-15 max-lg:px-0 py-5 text-2xl md:text-4xl font-bold">
          Special menu
          <span className="relative inline-block ml-2">
            for you
            <span
              className="absolute -bottom-2 left-0 w-full h-[3px] rounded-full bg-primary opacity-30"
              aria-hidden="true"
            />
          </span>
        </h2>

        <MenuClient items={items ?? []} categories={categories ?? []} />
      </div>
    </section>
  );
}
