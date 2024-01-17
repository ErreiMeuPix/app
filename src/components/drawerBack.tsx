import React from 'react';
import { Feather } from '@expo/vector-icons';
import { COLORS } from '../../assets/colors/colors';
import { DrawerActions } from '@react-navigation/native'
import { useNavigation } from 'expo-router';
import { Platform } from 'react-native';

export const DrawerBack: React.FC = () => {
	const navigation = useNavigation()

	function handlePress() {
		navigation.dispatch(DrawerActions.openDrawer());
	}


	return <Feather
		name='align-left'
		size={25}
		color={COLORS.WHITE}
		onPress={handlePress}
		style={
			{ marginLeft: '5%', marginTop: Platform.OS == 'android' ? '15%' : 0 }
		}
	/>;
}
