import { Stack } from 'expo-router';
import AuthProvider from '../contexts/auth_context';

export default function Layout() {
    return (
        <AuthProvider>
            <Stack
                screenOptions={{
                    headerShown: false
                }}
            >
                <Stack.Screen
                    name='register/index'
                />
                <Stack.Screen
                    name='home/index'
                />
                <Stack.Screen
                    name='recover_step_one/index'
                />'
                <Stack.Screen
                    name='recover_step_two/index'
                />'
            </Stack>
        </AuthProvider>
    )
}