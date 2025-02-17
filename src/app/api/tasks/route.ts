import { NextRequest, NextResponse } from "next/server";
import { supabase } from "../supabase-client";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const topicIds = searchParams.get("topicIds")?.split(",") ?? null;
  const levelIds = searchParams.get("levelIds")?.split(",") ?? null;
  const typeIds = searchParams.get("typeIds")?.split(",") ?? null;
  const limit = Number(searchParams.get("lim")) || 10;

  const { data, error } = await supabase.rpc("get_random_tasks_test", {
    lim: limit,
    topic_ids: topicIds,
    level_ids: levelIds,
    type_ids: typeIds,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
