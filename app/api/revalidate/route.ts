import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  const secret = req.headers.get("x-webhook-secret");
  if (secret !== process.env.WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const table = body.table;

    if (table === "items") {
      revalidateTag("items-tag", { expire: 0 });
    } else if (table === "categories") {
      revalidateTag("categories-tag", { expire: 0 });
    }

    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    await fetch(
      `${process.env.NEXT_PUBLIC_SUPABASE_URL}/realtime/v1/api/broadcast`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: process.env.SUPABASE_SERVICE_ROLE_KEY!,
          Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY!}`,
        },
        body: JSON.stringify({
          messages: [
            {
              topic: "cache-control",
              event: "revalidated",
              payload: { table },
            },
          ],
        }),
      },
    );

    return NextResponse.json({
      revalidated: true,
      message: `Cache for ${table} cleared!`,
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "Error parsing body" },
      { status: 400 },
    );
  }
}
