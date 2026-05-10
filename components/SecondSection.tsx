import { ItemCard } from "./shared/ItemCard";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export default async function SecondSection() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data } = await supabase
    .from("items")
    .select("*")
    .order("price", { ascending: false })
    .limit(3);

  const itemCards = data?.map((item) => {
    return (
      <ItemCard imgSrc={item?.image_url} key={item.id} price={item.price} />
    );
  });

  return (
    <section className="container mx-auto px-2 lg:-mb-50">
      <div className="bg-background">
        <h2 className="lg:-translate-y-85 container px-15 max-lg:px-0 py-5 text-2xl md:text-4xl font-bold ">
          Popular
          <span className="relative inline-block ml-2">
            Now
            <span
              className="absolute -bottom-1 left-0 w-full h-1 rounded-full bg-primary opacity-30"
              aria-hidden="true"
            />
          </span>
        </h2>
        <div className="relative flex justify-center items-center gap-8 flex-wrap lg:-translate-y-80 ">
          {itemCards}
          <span className="lg:block hidden absolute w-252 h-65 bg-[#7A1888] top-1/3 left-1/2 -translate-x-1/2 -z-1 rounded-[50px] scale-x-110 scale-y-90" />
        </div>
      </div>
    </section>
  );
}
