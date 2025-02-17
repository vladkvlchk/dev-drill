import { NextResponse } from "next/server";

import { supabase } from "../supabase-client";

export async function GET() {
  const { data, error } = await supabase.rpc("get_filters");

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
