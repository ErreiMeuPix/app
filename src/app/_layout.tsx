import React from 'react';
import { Slot } from 'expo-router';
import SessionProvider from '../contexts/auth_context';
import FlashComponent from 'flash-notify'
import { StatusBar } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();


export default function Layout() {

	let [fontsLoaded] = useFonts({
		Black: require('../../assets/fonts/Approach-Black.ttf'),
		Bold: require('../../assets/fonts/Approach-Bold.ttf'),
		Light: require('../../assets/fonts/Approach-Light.ttf'),
		Mediun: require('../../assets/fonts/Approach-Medium.ttf'),
		Regular: require('../../assets/fonts/Approach-Regular.ttf'),
		SemiBold: require('../../assets/fonts/Approach-SemiBold.ttf'),
	});

	if (!fontsLoaded) {
		return null;
	}


	return (
		<SessionProvider>
			<FlashComponent />
			<StatusBar barStyle='dark-content' />
			<Slot
				screenOptions={{
					headerShown: false
				}}
			/>
		</SessionProvider>
	)
}
