import { createClient } from "@supabase/supabase-js";
import type { ExtendedDatabase } from "./../../types/db/extended";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error("Supabase credentials hasn't been found!");
}

export const supabase = createClient<ExtendedDatabase>(
  SUPABASE_URL,
  SUPABASE_ANON_KEY,
  {
    auth: { autoRefreshToken: true, detectSessionInUrl: true },
  },
);
