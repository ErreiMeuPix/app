import { Stack, Tabs } from 'expo-router';
import AuthProvider from '../contexts/auth_context';
import FlashComponent from 'flash-notify'
import { StatusBar } from 'react-native';

export default function Layout() {
	return (
		<AuthProvider>
			<FlashComponent />
			<Stack
				initialRouteName='home'
				screenOptions={{
					headerShown: false
				}}
			>
				<StatusBar barStyle='dark-content' />
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
			</Stack>
		</AuthProvider>
	)
}
