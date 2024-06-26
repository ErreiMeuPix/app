import React, { useContext } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router'
import { COLORS } from '../../../../assets/colors/colors';
import { AuthContext } from '../../../contexts/auth_context';
import { showFlash } from 'flash-notify'
import { NotifyColors } from '../../../../assets/colors/notify-colors';

const RecoverStepOne: React.FC = () => {
	const { user } = useContext(AuthContext)
	const router = useRouter()

	return (
		<View style={{ flex: 1, justifyContent: 'space-evenly', alignItems: 'flex-start', backgroundColor: COLORS.PRIMARY, padding: 20 }}>

			<Text style={styles.subtitleOne}>O QUE VAI{'\n'}ACONTECER AGORA ?</Text>
			<Text style={styles.subtitleTwo}>Nós vamos entrar em{'\n'}contato com quem recebeu{'\n'}seu pix </Text>
			<Text style={styles.subtitleThree}>E iremos cobrar uma taxa de{'\n'}2.69% , SOMENTE se{'\n'}conseguirmos reaver o seu dinheiro ;)</Text>

			<TouchableOpacity
				onPress={() => {

					if (!user.pixKey) {
						showFlash({ desc: 'Para prosseguir cadastre sua chave PIX', title: 'Cadastre uma chave PIX', customColors: NotifyColors.WARNING })
						router.push('/')
						return
					}

					router.push('recover_step_two')
				}}
				activeOpacity={0.8}
				style={styles.agreeButton}>
				<Text style={styles.agreeText}>
					ESTOU DE ACORDO
				</Text>

			</TouchableOpacity>

		</View>
	);
}

const styles = StyleSheet.create({
	subtitleOne: { color: COLORS.WHITE, fontSize: 35, fontFamily: 'Bold' },
	subtitleTwo: { color: COLORS.WHITE, fontSize: 35, fontFamily: 'Light' },
	subtitleThree: { color: COLORS.WHITE, fontSize: 25, fontFamily: 'Light' },
	agreeText: { color: COLORS.BUTTON_HINT, fontSize: 15, fontFamily: 'Bold' },
	agreeButton: {
		backgroundColor: COLORS.PRIMARY_DARK,
		borderRadius: 10,
		width: '80%',
		height: 50,
		alignSelf: 'center',
		shadowColor: COLORS.BUTTON_HINT,
		shadowOffset: { width: 0, height: 5 },
		shadowOpacity: 1,
		shadowRadius: 0,
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'row',
	},

});

export default RecoverStepOne;
