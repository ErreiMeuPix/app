import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { Drawer } from 'expo-router/drawer'

import { COLORS } from '../../../../assets/colors/colors';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { useRouter } from 'expo-router';
import { AuthContext } from '../../../contexts/auth_context';
import Register from '../../register';

const DrawerNavigation = () => {
	const router = useRouter();

	const { user } = useContext(AuthContext)

	function CustomDrawerContent(props: any) {
		return (
			<DrawerContentScrollView >
				<DrawerItem
					label="Início"
					labelStyle={styles.drawerItemsText}
					onPress={() => router.push('/')}
				/>
				<DrawerItem
					label="Configurações"
					labelStyle={styles.drawerItemsText}
					onPress={() => router.push('settings')}
				/>

			</DrawerContentScrollView>
		)
	}

	if (!user) {
		return <Register />;
	}

	return (
		<Drawer
			initialRouteName='/'
			drawerContent={CustomDrawerContent}
			screenOptions={{
				headerTransparent: true,
				headerShown: false,
				headerTitleStyle: { color: "transparent" },
				drawerType: 'front',
				headerTintColor: 'transparent',
				overlayColor: COLORS.PRIMARY,
				drawerStyle: {
					backgroundColor: COLORS.SECUNDARY,
					width: 300,
				}
			}}
		>
			{/* <Drawer.Screen
				name="/"
				options={{ gestureHandlerProps: false }}
			/> */}
		</Drawer>
	);
}

const styles = StyleSheet.create({
	drawerItemsText: { color: COLORS.WHITE, fontFamily: 'Regular', fontSize: 18, marginTop: 20 }
})

export default DrawerNavigation;
