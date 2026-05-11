import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

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
