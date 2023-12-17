import { supabaseClient } from "../_shared/supabaseClient.ts";
import {
  ErrorHandler,
  HandlerDangerLogger,
  recoverUserId,
  ResponseHandler,
} from "../_shared/utils.ts";
import { PixKey } from "../_shared/entities/pixKey.ts";

Deno.serve(async (req) => {
  try {
    const { pixKey } = await req.json();

    const authorization = req.headers.get("Authorization")?.replace(
      "Bearer ",
      "",
    );

    if (!authorization) {
      console.error(
        HandlerDangerLogger({
          message: "Invalid auth detected",
          plusMessage: "Pix register",
          status: 400,
        }),
      );
      return ErrorHandler("", "", 400);
    }

    const userId = recoverUserId(authorization);

    const pix = new PixKey(pixKey);

    if (!pix.valid()) {
      return ErrorHandler("INVALID", "Invalid format", 422);
    }

    const { data } = await supabaseClient
      .from("pix_keys")
      .select()
      .eq("pix_key", pix.value);

    if (data && data.length > 0) {
      return ErrorHandler("SAME_KEY", "Pix key is already being used", 412);
    }

    const { data: userDatabasePix } = await supabaseClient
      .from("pix_keys")
      .select()
      .eq("user_id", userId);

    if (userDatabasePix && userDatabasePix.length > 0) {
      const { error } = await supabaseClient
        .from("pix_keys")
        .update({ pix_key: pix.value })
        .eq("user_id", userId);

      if (error) {
        console.error(
          HandlerDangerLogger({
            message: error.message,
            plusMessage: error.code,
            status: 500,
          }),
        );
        return ErrorHandler("UNEXPECTED", "Unexpected error ocurred", 500);
      }
    } else {
      const { error } = await supabaseClient
        .from("pix_keys")
        .insert([
          {
            id: crypto.randomUUID(),
            created_at: new Date(),
            user_id: userId,
            pix_key: pix.value,
          },
        ]);

      if (error) {
        console.error(
          HandlerDangerLogger({
            message: error.message,
            plusMessage: error.code,
            status: 500,
          }),
        );

        return ErrorHandler("UNEXPECTED", "Unexpected error ocurred", 500);
      }
    }

    return ResponseHandler(null, 200);
  } catch (error) {
    return error;
  }
});
