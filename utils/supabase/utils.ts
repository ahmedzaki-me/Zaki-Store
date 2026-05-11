import { unstable_cache } from "next/cache";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";

const cookieStore = await cookies();
const supabase = createClient(cookieStore);

export const getCategories = unstable_cache(
  async () => {
    const { data } = await supabase.from("categories").select("id, name");
    return data;
  },
  ["categories-list"],
  { tags: ["categories-tag"] },
);

export const getItems = unstable_cache(
  async (categoryId) => {
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
