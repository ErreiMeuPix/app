import React, { useContext, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View, Text, Alert } from 'react-native';
import { COLORS } from '../../../../../assets/colors/colors';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import { DrawerBack } from '../../../../components/drawerBack';
import { AuthContext } from '../../../../contexts/auth_context';
import { Spinner } from '../../../../components/spinner';

const Settings: React.FC = () => {

	const { logoutUser } = useContext(AuthContext)

	const [loading, setLoading] = useState(false)

	function onDeleteAccount() {
		Alert.alert('Deletar minha conta', 'Saiba que : \n - Iremos remover todos os seus dados \n - Não será mais possível logar com sua conta, a menos que entre em contato com nossos canais de atendimento @erreimeupix.com.br', [
			{
				text: 'Deletar',
				onPress: async () => {
					try {
						setLoading(true)
						await logoutUser()
					} finally {
						setLoading(false)
					}
				},
			},
			{
				text: 'Cancelar',
				onPress: () => { },
				style: 'cancel',
			}
		]);
	}

	return (
		<SafeAreaView style={styles.safeArea}>
			<DrawerBack />
			<Spinner loading={loading} />
			<ScrollView style={styles.scroll}>
				<CustomItem subtitle="Desejo deletar minha conta" title="Remover minha conta" onPress={onDeleteAccount} />
			</ScrollView>
		</SafeAreaView>
	);
}

const CustomItem: React.FC<{ title: string, subtitle: string, onPress: any }> = ({ title, subtitle, onPress }: { title: string, subtitle: string, onPress: any }) => {
	return (
		<TouchableOpacity activeOpacity={0.8} onPress={onPress} style={{
			flexDirection: 'row',
			justifyContent: 'space-between',
			alignItems: 'center',
			marginTop: 25,
			paddingBottom: 10,
			borderBottomWidth: 0.2,
			borderBottomColor: COLORS.SECUNDARY_LIGHT
		}}>
			<View style={{ flex: 0.4, alignItems: 'center' }}>
				<View style={{ backgroundColor: COLORS.BUTTON_HINT, padding: 10, borderRadius: 3 }}>
					<Feather name='trash-2' size={18} color={COLORS.PRIMARY} />
				</View>
			</View>

			<View style={{ flex: 1, alignItems: 'flex-start' }}>
				<Text style={styles.TitleItem}>{title}</Text>
				<Text style={styles.SubtitleItem}>{subtitle}</Text>
			</View>

			<View style={{ flex: 1, alignItems: 'flex-end' }}>
				<View style={{ backgroundColor: COLORS.BUTTON_HINT, padding: 10, borderRadius: 3 }}>
					<Feather name='chevron-right' size={12} color={COLORS.PRIMARY} />
				</View>
			</View>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	safeArea: { flex: 1, backgroundColor: COLORS.SECUNDARY },
	scroll: { padding: 20 },
	TitleItem: { color: COLORS.WHITE, fontSize: 15, fontFamily: 'SemiBold' },
	SubtitleItem: { color: COLORS.SECUNDARY_LIGHT, fontSize: 11, fontFamily: 'Regular' }

})

export default Settings;
