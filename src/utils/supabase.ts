
import 'react-native-url-polyfill/auto'
import { createClient } from '@supabase/supabase-js'
import AsyncStorage from "@react-native-async-storage/async-storage";

export const SupabaseClient = createClient("http://127.0.0.1:54321", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0", {
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

    console.log(userId, data, error)

    if (error) {
        throw error;
    }

    if (data) {
        console.log(data)
        return data[0] as unknown as string
    }

}