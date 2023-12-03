import React, { createContext, useState, useEffect } from "react";
import { SupabaseClient, SupabaseGetPixKey } from '../utils/supabase'

import {
    GoogleSignin,
    statusCodes,
} from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
    scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
    webClientId: '696135610397-fkuvhilff6sjhjn4747lvdho4rboib4j.apps.googleusercontent.com',
    iosClientId: "696135610397-5shrtht51rebc1i4936pi66edhn6g47k.apps.googleusercontent.com"
});

export type TUser = { id: string, name: string, accessToken: string, pixKey?: string }

export const AuthContext = createContext(
    {} as {
        signIn: () => Promise<void>;
        refreshPix: () => Promise<void>
        user: TUser
    }
);

export default function AuthProvider({ children }: any) {

    const [user, setUser] = useState<TUser>(null)

    const refreshPix = async () => {
        try {
            const valuePix = await SupabaseGetPixKey(user.id);

            setUser({ ...user, pixKey: valuePix })
        } catch (error) {
            // TODO: Ocorreu um erro ao recuperar a sua cahve PIX
        }

    }

    const signIn = async () => {
        try {
            await GoogleSignin.hasPlayServices();

            const userInfo = await GoogleSignin.signIn();

            if (!userInfo.idToken) {
                throw new Error("Invalid token");
            }

            const { data, error } = await SupabaseClient.auth.signInWithIdToken({ provider: 'google', token: userInfo.idToken })

            if (error) {
                throw error;
            }

            setUser({ name: userInfo.user.name, accessToken: data.session.access_token, id: data.user.id })

        } catch (error: any) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // user cancelled the login flow
            } else if (error.code === statusCodes.IN_PROGRESS) {
                // operation (e.g. sign in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                // play services not available or outdated
            } else {
                // some other error happened
            }

            throw error
        }
    };


    return (
        <AuthContext.Provider
            value={{
                signIn,
                refreshPix,
                user
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

// export default AuthProvider;
