import { createClient } from '@supabase/supabase-js';
import { env } from 'hono/adapter';

export const supabase = createClient(
  process.env.SUPABASE_URI!,
  process.env.SUPABASE_KEY!,
);
