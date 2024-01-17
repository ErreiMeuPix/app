import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Drawer } from 'expo-router/drawer'

import { COLORS } from '../../../assets/colors/colors';
import { DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import { useRouter } from 'expo-router';

const DrawerNavigation = () => {
	const router = useRouter();

	function CustomDrawerContent(props: any) {
		return (
			<DrawerContentScrollView >
				<DrawerItem
					label="Início"
					labelStyle={styles.drawerItemsText}
					onPress={() => router.push('home')}
				/>
				<DrawerItem
					label="Configurações"
					labelStyle={styles.drawerItemsText}
					onPress={() => router.push('settings')}
				/>

			</DrawerContentScrollView>
		)
	}

	return (
		<Drawer
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
			<Drawer.Screen
				name="drawer" // This is the name of the page and must match the url from root
			/>
		</Drawer>
	);
}

const styles = StyleSheet.create({
	drawerItemsText: { color: COLORS.WHITE, fontFamily: 'Regular', fontSize: 18, marginTop: 20 }
})

export default DrawerNavigation;
