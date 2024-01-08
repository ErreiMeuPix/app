import React, { useContext, useState } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { Validator } from '../../utils/validators';
import { SupabaseCreatePixRequest } from '../../utils/supabase';
import { AuthContext } from '../../contexts/auth_context';
import { TextInputMask } from 'react-native-masked-text';
import { showFlash } from 'flash-notify'
import { NotifyColors } from '../../../assets/colors/notify-colors';
import { Spinner } from '../../components/spinner';
import { router } from 'expo-router'
import { COLORS } from '../../../assets/colors/colors';

const RecoverSteptTwo: React.FC = () => {
	const { user } = useContext(AuthContext)

	const [pixKey, setPixKey] = useState<string | null>(null)
	const [amount, setAmount] = useState<string | null>(null)
	const [loading, setLoading] = useState(false)

	async function handleReqPixSave() {
		if (!pixKey || pixKey.trim() == '') {
			showFlash({ desc: 'Preencha a chave PIX', title: 'Chave inválida', customColors: NotifyColors.WARNING })
			return
		}

		const amountParsed = parseFloat(amount?.replace(/\./g, '').replace(',', '.'))

		if (!amountParsed || amountParsed < 1) {
			showFlash({ desc: 'O valor mínimo é de R$ 1,00', title: 'Valor mínimo', customColors: NotifyColors.WARNING })
			return
		}

		const validator = new Validator()

		const keyType = validator.pixKeyTypeWhenValid(pixKey)

		if (!keyType) {
			showFlash({ desc: 'Não é uma chave PIX válida', title: 'Tipo de chave inválido', customColors: NotifyColors.WARNING })
			return;
		}

		try {
			setLoading(true)

			await SupabaseCreatePixRequest(
				pixKey,
				keyType,
				user.id,
				user.pixKey,
				amountParsed
			)

			router.push('success_request')
		} catch (error) {
			if (error?.code == 23505) {
				showFlash({ desc: 'Sua solicitação já está em andamento', title: 'Solicitação em andamento', customColors: NotifyColors.WARNING })
				return
			}

			showFlash({ desc: 'Não conseguimos processar a sua solicitação', title: 'Ocorreu um erro', customColors: NotifyColors.DANGER })
		} finally {
			setLoading(false)
		}

	}
	function handleAmountChange(e: string) {
		if (e == '0,00') {
			setAmount(null)
			return
		}

		setAmount(e)
	}

	return (
		<View style={{ flex: 1, alignItems: 'flex-start', backgroundColor: COLORS.PRIMARY, padding: 20 }}>
			<Spinner loading={loading} />
			<KeyboardAvoidingView
				behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
				style={styles.keyboardAvoidingView}>
				<Text style={styles.subtitleOne}>FALTA MENOS QUE{'\n'}ANTES!</Text>

				<Text style={styles.subtitleTwo}>Qual chave PIX você fez o envio ?</Text>
				<Text style={styles.subtitlePixTypes}>São aceitos até o momento e-mail,telefone e CPF</Text>
				<TextInput onChangeText={setPixKey} value={pixKey} style={styles.inputValue} placeholderTextColor={COLORS.GRAY_LIGHT} placeholder='Cole aqui' keyboardType='ascii-capable' />
				<TextInputMask
					onChangeText={handleAmountChange}
					value={amount}
					style={styles.amountInput}
					placeholderTextColor={COLORS.PRIMARY_DARK}
					selectionColor={COLORS.WHITE}
					type='money'
					placeholder='R$ 0,00'
					returnKeyType='done'
					options={{
						precision: 2,
						separator: ',',
						delimiter: '.',
						unit: '',
						suffixUnit: '',
					}}
				/>
				<Text style={styles.subtitleAmount}>Valor enviado indevidamente</Text>

				<TouchableOpacity
					activeOpacity={0.8}
					style={styles.saveMyPix}
					onPress={handleReqPixSave}
				>
					<Text style={styles.saveMyPixText}>
						RECUPERAR MEU PIX
					</Text>

				</TouchableOpacity>
			</KeyboardAvoidingView>
		</View>
	);
}

const styles = StyleSheet.create({
	inputValue: { backgroundColor: COLORS.WHITE, width: '90%', alignSelf: 'center', height: 50, borderRadius: 5, fontFamily: 'Bold', paddingHorizontal: 10, color: COLORS.TEXT_GRAY, top: '40%', textAlign: 'center', fontSize: 18 },
	amountInput: { width: '90%', alignSelf: 'center', height: 50, borderRadius: 5, fontFamily: 'Bold', paddingHorizontal: 10, color: COLORS.BUTTON_HINT, top: '50%', textAlign: 'center', fontSize: 50 },
	keyboardAvoidingView: { flex: 1, width: '100%' },
	subtitleOne: { color: COLORS.WHITE, fontSize: 35, fontFamily: 'Bold', top: '10%' },
	subtitleTwo: { color: COLORS.WHITE, fontSize: 25, fontFamily: 'Light', alignSelf: 'center', top: '25%' },
	subtitlePixTypes: { color: COLORS.PRIMARY_DARK, fontSize: 12, fontFamily: 'SemiBold', alignSelf: 'center', top: '28%' },
	subtitleAmount: { color: COLORS.PRIMARY_DARK, fontSize: 12, fontFamily: 'SemiBold', alignSelf: 'center', top: '50%' },
	saveMyPixText: { color: COLORS.BUTTON_HINT, fontSize: 15, fontFamily: 'Bold' },
	saveMyPix: {
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
		flexDirection: 'row', top: '120%'
	}
});


export default RecoverSteptTwo;
