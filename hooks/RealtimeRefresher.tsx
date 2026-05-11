// "use client";

// import { useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { createClient } from "@/utils/supabase/client";

// export default function useCacheRevalidation() {
//   const router = useRouter();

//   useEffect(() => {
//     const supabase = createClient();

//     const channel = supabase
//       .channel("cache-control")
//       .on("broadcast", { event: "revalidated" }, () => {
//         router.refresh();
//       })
//       .subscribe();

//     return () => {
//       supabase.removeChannel(channel);
//     };
//   }, [router]);
// }
