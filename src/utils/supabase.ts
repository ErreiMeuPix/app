
import 'react-native-url-polyfill/auto'
import { createClient } from '@supabase/supabase-js'
import AsyncStorage from "@react-native-async-storage/async-storage";

export const SupabaseClient = createClient("", "", {
    auth: {
        storage: AsyncStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
    },
});


export const SupabaseGetPixKey = async (userId: string): Promise<string> => {
    const { data, error } = await SupabaseClient
        .from('pix_keys')
        .select('pix_key')
        .eq('user_id', userId)


    if (error) {
        throw error;
    }

    if (data) {
        console.log(data)
        return data[0].pix_key as unknown as string
    }

}