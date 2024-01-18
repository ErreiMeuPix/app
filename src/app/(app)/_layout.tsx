import { Stack } from 'expo-router';
import React from 'react';

const AppLayout: React.FC = () => {
	return <Stack screenOptions={{
		headerShown: false
	}} >
		<Stack.Screen
			name="(drawer)"
			options={{ gestureEnabled: false }}
		/>
		<Stack.Screen
			name="success_request/index"
			options={{ gestureEnabled: false }}
		/>
	</Stack>;
}

export default AppLayout;
