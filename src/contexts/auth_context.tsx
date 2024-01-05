import React, { createContext, useState, useEffect } from "react";
import { SupabaseClient, SupabaseGetPixKey } from '../utils/supabase'

import {
	GoogleSignin,
	statusCodes,
} from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
	scopes: ['https://www.googleapis.com/auth/drive.readonly'],
	webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
	iosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID,
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
		const valuePix = await SupabaseGetPixKey(user.id);

		setUser({ ...user, pixKey: valuePix })
	}

	const signIn = async () => {
		try {
			await GoogleSignin.hasPlayServices();

			const userInfo = await GoogleSignin.signIn();

			if (!userInfo.idToken) {
				throw new Error("Invalid token");
			}

			const { data, error } = await SupabaseClient.auth.signInWithIdToken({
				provider: 'google', token: userInfo.idToken,
			})

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
