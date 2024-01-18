import React, { createContext, useState, useContext, useEffect } from "react";
import { SupabaseClient, SupabaseGetPixKey } from '../utils/supabase'
import * as AppleAuthentication from 'expo-apple-authentication';
import { router } from "expo-router";
import {
	GoogleSignin,
} from '@react-native-google-signin/google-signin';
import { Spinner } from "../components/spinner";

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

export function useSession() {
	const value = useContext(AuthContext);

	return value;
}

export default function SessionProvider({ children }: React.PropsWithChildren) {
	const [user, setUser] = useState<TUser>(null)
	const [loading, setLoading] = useState(false)

	useEffect(() => {

		//Manter o loading desta forma, um erro esta ocasionando ao adicionar no finally
		if (loading) {
			setLoading(false)
		}

	}, [user])

	async function refreshPix() {
		const valuePix = await SupabaseGetPixKey(user.id);

		setUser({ ...user, pixKey: valuePix })
	}

	async function signIn() {
		try {
			setLoading(true)
			await GoogleSignin.hasPlayServices();

			const userInfo = await GoogleSignin.signIn();

			if (!userInfo.idToken) {
				throw new Error("Invalid token");
			}

			const { data, error } = await SupabaseClient.functions.invoke("login-users", { body: { provider: "google", id_token: userInfo.idToken } })

			if (error) {
				throw new Error();
			}

			await SupabaseClient.auth.setSession({ access_token: data.session.access_token, refresh_token: data.session.refresh_token })

			setUser({ name: data.name, id: data.id })

		} catch (error: any) {

			throw error
		}
	};

	async function signInApple() {
		try {
			setLoading(true)
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
		await SupabaseClient.auth.signOut();
		setUser(null)
		router.replace('register')
	}

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
			<Spinner loading={loading} />

			{children}
		</AuthContext.Provider>
	);
};
