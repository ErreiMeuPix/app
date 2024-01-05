import "react-native-url-polyfill/auto";
import { createClient } from "@supabase/supabase-js";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const SupabaseClient = createClient(
  process.env.EXPO_PUBLIC_SUPABASE_URL,
  process.env.EXPO_PUBLIC_SUPABASE_KEY,
  {
    auth: {
      storage: AsyncStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  },
);

export const SupabaseGetPixKey = async (userId: string): Promise<string> => {
  const { data, error } = await SupabaseClient
    .from("pix_keys")
    .select("pix_key")
    .eq("user_id", userId);

  if (error) {
    throw error;
  }

  if (data) {
    return data[0]?.pix_key as unknown as string ?? "";
  }
};

export async function SupabaseUpdatePixKey(value: string) {
  await SupabaseClient.functions.invoke("update-pix-key", {
    body: { pixKey: value },
  });
}

export async function SupabaseCreatePixRequest(
  pixKey: string,
  pix_type: number,
  userId: string,
  userPixKey: string,
  amount: number,
) {
  const { data, error } = await SupabaseClient
    .from("pix_requests")
    .insert({
      user_id: userId,
      user_pix_key: userPixKey,
      end_pix_key: pixKey,
      pix_amount: amount,
      end_pix_key_type: pix_type,
    });

  if (error) {
    throw error;
  }
}
