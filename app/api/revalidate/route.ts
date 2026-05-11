import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const secret = req.headers.get("x-webhook-secret");
  if (secret !== process.env.WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: { table?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ message: "Invalid JSON body" }, { status: 400 });
  }

  const table = body.table;
  const tagMap: Record<string, string> = {
    items: "items-tag",
    categories: "categories-tag",
  };

  const tag = table ? tagMap[table] : undefined;
  if (!tag) {
    return NextResponse.json(
      { message: `Unknown table: "${table}"` },
      { status: 400 },
    );
  }

  revalidateTag(tag, { expire: 0 });

  try {
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
  } catch (err) {
    console.error("Broadcast failed:", err);
  }

  return NextResponse.json({
    revalidated: true,
    message: `Cache for ${table} cleared!`,
  });
}
