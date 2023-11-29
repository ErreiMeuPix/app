import { Stack } from 'expo-router';

export default function Layout() {
    return (
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
    )
}