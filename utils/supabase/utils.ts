// import { unstable_cache } from "next/cache";
// import { createPublicClient } from "./public";

// export const getCategories = unstable_cache(
//   async () => {
//     const supabase = createPublicClient();
//     const { data } = await supabase
//       .from("categories")
//       .select("id, name")
//       .order("id", { ascending: true });
//     return data;
//   },
//   ["categories-list"],
//   { tags: ["categories-tag"], revalidate: false },
// );

// export const getItems = unstable_cache(
//   async () => {
//     const supabase = createPublicClient();
//     const { data } = await supabase.from("items").select("*");
//     return data;
//   },
//   ["items-list"],
//   { tags: ["items-tag"], revalidate: false },
// );
export async function getCategories() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/categories?select=id,name&order=id.asc`,
    {
      headers: {
        apikey: process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!}`,
      },
      next: { tags: ["categories-tag"], revalidate: false },
    },
  );
  return res.json() as Promise<{ id: number; name: string }[]>;
}

export async function getItems() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/items?select=*`,
    {
      headers: {
        apikey: process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!}`,
      },
      next: { tags: ["items-tag"], revalidate: false },
    },
  );
  return res.json();
}
