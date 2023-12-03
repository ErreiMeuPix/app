import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.0';

const supUrl = Deno.env.get("_SUPABASE_URL") as string
const supKey = Deno.env.get("_SUPABASE_SERVICE_KEY") as string

export const supabaseClient = createClient(supUrl, supKey)