import { unstable_cache } from "next/cache";
import { createPublicClient } from "./public";

export const getCategories = unstable_cache(
  async () => {
    const supabase = createPublicClient();
    const { data } = await supabase
      .from("categories")
      .select("id, name")
      .order("id", { ascending: true });
    return data;
  },
  ["categories-list"],
  { tags: ["categories-tag"] },
);

export const getItems = unstable_cache(
  async (categoryId) => {
    const supabase = createPublicClient();
    let query = supabase.from("items").select("*");

    if (categoryId && categoryId !== "all") {
      query = query.eq("category_id", categoryId);
    }

    const { data } = await query;
    return data;
  },
  ["items-list"],
  { tags: ["items-tag"] },
);
