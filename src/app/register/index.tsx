import React, { useContext } from 'react';
import { SafeAreaView, View, Image, Text, Button, TouchableOpacity, } from 'react-native';
import { AuthContext } from '../../contexts/auth_context';
import { showFlash } from 'flash-notify'
import { NotifyColors } from '../../../assets/colors/notify-colors';
import { COLORS } from '../../../assets/colors/colors';


const Register: React.FC = () => {

	const { signIn } = useContext(AuthContext)

	async function onSignin() {
		try {
			await signIn()
		} catch (error) {
			showFlash({ desc: 'Tente novamente mais tarde, por favor', title: 'Impossível fazer login', customColors: NotifyColors.WARNING })
		}
	}

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: COLORS.SECUNDARY, justifyContent: 'space-around', alignItems: 'center' }}>
			<View style={{ flex: 4, justifyContent: 'center' }}>
				<Image source={require('../../../assets/logo.png')} style={{ width: 200, height: 200 }} />
			</View>
			<TouchableOpacity onPress={onSignin} style={{ borderColor: COLORS.SECUNDARY_LIGHT, borderWidth: 2, padding: 10, borderRadius: 100, justifyContent: 'center', alignItems: 'center', marginBottom: '5%' }}>
				<Image source={require('../../../assets/google-icon.png')} style={{ width: 30, height: 30 }} />
			</TouchableOpacity>
			<View style={{ flex: 1, borderTopWidth: 2, borderColor: COLORS.SECUNDARY_LIGHT, justifyContent: 'center' }}>
				<Text style={{ color: COLORS.TEXT_GRAY }}>Vamos se cadastrar e resolver isso !</Text>
			</View>
		</SafeAreaView>

	);
}

export default Register;
