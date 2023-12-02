import { supabaseClient } from "../shared/supabaseClient.ts";
import { recoverUserId, SuccessResponse } from "../shared/utils.ts";
import { PixKey } from '../shared/entities/pixKey.ts'

Deno.serve(async (req) => {

  const { pixKey, headers } = await req.json()

  const userId = recoverUserId(headers.get('Authorization'));

  const pix = new PixKey(pixKey)

  if (!pix.valid()) {
    throw new Error("Invalid pix formatt");
  }

  const { data } = await supabaseClient
    .from('pix_keys')
    .select('*')
    .eq('pix_key', pix.value);

  if (data && data[0].user_id !== userId) {
    throw new Error("Pix key is already being used");
  }

  await supabaseClient
    .from('pix_keys')
    .update({ pix_key: pixKey })
    .eq('userId', userId)

  return SuccessResponse(null, 200)
})

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/update-pix-key' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
