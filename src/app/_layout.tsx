import { Stack } from 'expo-router';
import AuthProvider from '../contexts/auth_context';
import FlashComponent from 'flash-notify'
import { useFonts } from 'expo-font';


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
		<AuthProvider>
			<FlashComponent />
			<Stack
				initialRouteName='register'
				screenOptions={{
					headerShown: false
				}}
			/>
			{/* <StatusBar barStyle='dark-content' />
				<Stack.Screen
					name='register/index'
					options={{ gestureEnabled: false }}
				/>
				<Stack.Screen
					name='recover_step_one/index'
				/>
				<Stack.Screen
					name='recover_step_two/index'
				/>
				<Stack.Screen
					name='success_request/index'
					options={{ gestureEnabled: false }}
				/>
				<Stack.Screen
					name='drawer'
					options={{ gestureEnabled: false }}
				/> */}
			{/* </Stack> */}
		</AuthProvider>
	)
}
