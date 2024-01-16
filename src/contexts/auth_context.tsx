import React, { createContext, useState, useEffect } from "react";
import { SupabaseClient, SupabaseGetPixKey } from '../utils/supabase'
import * as AppleAuthentication from 'expo-apple-authentication';

import {
	GoogleSignin,
} from '@react-native-google-signin/google-signin';
import { router } from "expo-router";

GoogleSignin.configure({
	scopes: ['https://www.googleapis.com/auth/drive.readonly'],
	webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
	iosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID,
});

export type TUser = { id: string, name: string, pixKey?: string }

export const AuthContext = createContext(
	{} as {
		signIn: () => Promise<void>;
		signInApple: () => Promise<void>;
		refreshPix: () => Promise<void>;
		logoutUser: () => Promise<void>;
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

			const { data, error } = await SupabaseClient.functions.invoke("login-users", { body: { provider: "google", id_token: userInfo.idToken } })

			if (error) {
				throw error;
			}

			await SupabaseClient.auth.setSession({ access_token: data.session.access_token, refresh_token: data.session.refresh_token })

			setUser({ name: data.name, id: data.id })

		} catch (error: any) {

			throw error
		}
	};

	async function signInApple() {
		try {

			const credential = await AppleAuthentication.signInAsync({
				requestedScopes: [
					AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
					AppleAuthentication.AppleAuthenticationScope.EMAIL,
				],
			});


			if (!credential.identityToken) {
				throw new Error('IDENTITY_TOKEN')
			}

			const { data, error } = await SupabaseClient.functions.invoke("login-users", { body: { provider: "apple", id_token: credential.identityToken } })

			if (error) {
				throw error;
			}

			await SupabaseClient.auth.setSession({ access_token: data.session.access_token, refresh_token: data.session.refresh_token })

			setUser({ name: data?.name, id: data.id })

		} catch (e) {
			throw e
		}
	}


	async function logoutUser() {
		await SupabaseClient.auth.updateUser({ data: { user_deleted: true } })
		setUser(null)
		await SupabaseClient.auth.signOut();
		router.push('register')
	}
console.log(router)

	return (
		<AuthContext.Provider
			value={{
				signIn,
				signInApple,
				refreshPix,
				logoutUser,
				user
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
