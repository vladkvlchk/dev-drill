import { Database } from "@/utils/types/database";
import { createClient } from "@supabase/supabase-js";

export const supabase = createClient<Database>(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);
