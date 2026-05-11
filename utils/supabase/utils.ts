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
  { tags: ["categories-tag"], revalidate: false },
);

export const getItems = unstable_cache(
  async () => {
    const supabase = createPublicClient();
    const { data } = await supabase.from("items").select("*");
    return data;
  },
  ["items-list"],
  { tags: ["items-tag"], revalidate: false },
);
