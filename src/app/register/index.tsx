import React, { useContext, useState } from 'react';
import { SafeAreaView, View, Image, Text, TouchableOpacity, Platform, StyleSheet } from 'react-native';
import { AuthContext } from '../../contexts/auth_context';
import { showFlash } from 'flash-notify'
import { NotifyColors } from '../../../assets/colors/notify-colors';
import { COLORS } from '../../../assets/colors/colors';
import * as AppleAuthentication from 'expo-apple-authentication';
import { Spinner } from '../../components/spinner';


const Register: React.FC = () => {

	const { signIn, signInApple } = useContext(AuthContext)
	const [loading, setLoading] = useState(false)

	async function onSignin(provider: 'apple' | 'google') {
		try {
			setLoading(true)
			if (provider == 'apple') {
				await signInApple()
			}

			if (provider == 'google') {
				await signIn()
			}

		} catch (error) {
			showFlash({ desc: 'Se o erro persistir, entre em contato em @erreimeupix.com.br', title: 'Não foi possível logar', customColors: NotifyColors.WARNING })
		} finally {
			setLoading(false)
		}
	}

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: COLORS.SECUNDARY, justifyContent: 'space-around', alignItems: 'center' }}>
			<Spinner loading={loading} />
			<View style={{ flex: 4, justifyContent: 'center' }}>
				<Image source={require('../../../assets/logo.png')} style={{ width: 200, height: 200 }} />
			</View>
			<View style={styles.rowContainer}>
				<TouchableOpacity onPress={() => onSignin("google")} style={styles.touchableContainer}>
					<Image source={require('../../../assets/google-icon.png')} style={styles.loginInputsSizes} />
				</TouchableOpacity>
				{
					Platform.OS == 'ios' &&
					<View style={styles.touchableContainer}>
						<AppleAuthentication.AppleAuthenticationButton
							buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
							buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
							cornerRadius={5}
							style={styles.loginInputsSizes}
							onPress={() => onSignin("apple")}
						/>
					</View>
				}
			</View>
			< View style={{ flex: 1, borderTopWidth: 2, borderColor: COLORS.SECUNDARY_LIGHT, justifyContent: 'center' }}>
				<Text style={{ color: COLORS.TEXT_GRAY }}>Vamos se cadastrar e resolver isso !</Text>
			</View>
		</SafeAreaView>

	);
}

const styles = StyleSheet.create({
	touchableContainer: { borderColor: COLORS.SECUNDARY_LIGHT, borderWidth: 2, padding: 10, borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginBottom: '5%' },
	loginInputsSizes: { width: 32, height: 32 },
	rowContainer: { flexDirection: 'row', justifyContent: 'center', gap: 50, width: '100%' }
});

export default Register;
