import { supabaseClient } from "../_shared/supabaseClient.ts";
import { recoverUserId, SuccessResponse } from "../_shared/utils.ts";
import { PixKey } from '../_shared/entities/pixKey.ts'

Deno.serve(async (req) => {
  try {
    const { pixKey } = await req.json()

    const userId = recoverUserId(req.headers.get('Authorization').replace('Bearer ', ''));

    const pix = new PixKey(pixKey)

    if (!pix.valid()) {
      throw new Error("Invalid pix formatt");
    }

    const { data } = await supabaseClient
      .from('pix_keys')
      .select()
      .eq('pix_key', pix.value);


    if (data[0] && data[0].user_id !== userId) {
      throw new Error("Pix key is already being used");
    }

    const isSameUser = data[0] && data[0].user_id === userId

    if (isSameUser) {
      await supabaseClient
        .from('pix_keys')
        .update({ pix_key: pix.value })
        .eq('userId', userId)
    } else {
      await supabaseClient
        .from('pix_keys')
        .insert([
          {
            id: crypto.randomUUID(),
            created_at: Date.now(),
            user_id: userId,
            pix_key: pix.value
          },
        ]);
    }

    return SuccessResponse(null, 200)
  } catch (error) {
    return error

  }
})
