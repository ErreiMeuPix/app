import { supabaseClient } from "../_shared/supabaseClient.ts";
import { recoverUserId, ResponseHandler } from "../_shared/utils.ts";
import { PixKey } from "../_shared/entities/pixKey.ts";

Deno.serve(async (req) => {
  try {
    const { pixKey } = await req.json();

    const authorization = req.headers.get("Authorization")?.replace(
      "Bearer ",
      "",
    );

    if (!authorization) {
      throw new Error("Invalid auth format");
    }

    const userId = recoverUserId(authorization);

    const pix = new PixKey(pixKey);

    if (!pix.valid()) {
      throw new Error("Invalid pix formatt");
    }

    const { data } = await supabaseClient
      .from("pix_keys")
      .select()
      .eq("pix_key", pix.value);

    if (data && data.length > 0) {
      return ResponseHandler("Pix key is already being used", 422);
    }

    const { data: userDatabasePix } = await supabaseClient
      .from("pix_keys")
      .select()
      .eq("user_id", userId);

    if (userDatabasePix) {
      await supabaseClient
        .from("pix_keys")
        .update({ pix_key: pix.value })
        .eq("userId", userId);
    } else {
      await supabaseClient
        .from("pix_keys")
        .insert([
          {
            id: crypto.randomUUID(),
            created_at: Date.now(),
            user_id: userId,
            pix_key: pix.value,
          },
        ]);
    }

    return ResponseHandler(null, 200);
  } catch (error) {
    return error;
  }
});
