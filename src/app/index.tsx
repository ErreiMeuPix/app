import React, { useContext } from 'react';
// import Home from './(drawer)/home';
import Register from './register';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { AuthContext } from '../contexts/auth_context';
import { Redirect } from 'expo-router';

SplashScreen.preventAutoHideAsync();

const App: React.FC = () => {

	const { user } = useContext(AuthContext)

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

	if (user) {
		return <Redirect href={"/(drawer)/home"} />
	}

	return (
		<Register />
	);
}

export default App;
