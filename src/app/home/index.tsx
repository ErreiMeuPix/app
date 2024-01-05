import React, { useContext, useEffect, useRef, useState } from 'react';
import { SafeAreaView, Text, TouchableOpacity, View, StyleSheet, TextInput, Keyboard, StatusBar } from 'react-native';
import Feathers from '@expo/vector-icons/Feather';
import { router } from 'expo-router'
import { AuthContext } from '../../contexts/auth_context';
import { SupabaseUpdatePixKey } from '../../utils/supabase'
import { showFlash } from 'flash-notify'
import { NotifyColors } from '../../../assets/colors/notify-colors';
import { Spinner } from '../../components/spinner';

const Home: React.FC = () => {
	const rootPixInputRef = useRef<TextInput>();
	const { user, refreshPix } = useContext(AuthContext)

	const [iconName, setIconName] = useState<'lock' | 'unlock'>('lock')
	const [valuePix, setValuePix] = useState<string>("")
	const [loading, setLoading] = useState(false)


	useEffect(() => {
		(async function refreshUserPix() {
			try {
				setLoading(true)
				await refreshPix()
			} catch (error) {
				showFlash({ desc: 'Não conseguimos recuperar sua chave PIX', title: 'Erro nos servidores', customColors: NotifyColors.WARNING })
			} finally {
				setLoading(false)
			}
		}
		)()

	}, [])

	useEffect(() => {
		if (user?.pixKey) {
			setValuePix(user?.pixKey)
		}
	}, [user])

	useEffect(() => {
		if (iconName == 'unlock') {
			rootPixInputRef.current.focus()
		}

	}, [iconName])

	function onSavePix() {
		router.push('recover_step_one')
	}

	async function onUpdatePixKey() {
		try {
			if (rootPixInputRef.current.isFocused()) {

				if (user?.pixKey?.localeCompare(valuePix, undefined, { sensitivity: 'accent' }) !== 0) {

					setLoading(true)

					await SupabaseUpdatePixKey(valuePix)
					refreshPix()
				} else {
					setValuePix(user.pixKey)
				}

				Keyboard.dismiss()

				setIconName('lock')

				showFlash({ desc: 'Chave PIX atualizada com sucesso', title: '', customColors: NotifyColors.SUCCESS })

				return
			}
			setIconName('unlock')
		} catch (error) {
			showFlash({ desc: 'Já já tudo volta ao normal', title: 'Ocorreu um erro', customColors: NotifyColors.DANGER })
		} finally {
			setLoading(false)
		}
	}

	return (
		<>
			<SafeAreaView style={{ flex: 0, backgroundColor: '#0DDF5F' }} />

			<SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
				<Spinner loading={loading} />
				<View style={styles.containerWrapper}>
					<View style={styles.containerTop}>
						<View style={styles.blankContainer}>
							<View >
								<TextInput
									editable={iconName == 'unlock'}
									onChangeText={(e: string) => setValuePix(e)}
									ref={rootPixInputRef}
									style={styles.pixText}
									value={valuePix}
									numberOfLines={1}
									placeholder='Cadastre sua chave'
									keyboardType='ascii-capable'
									blurOnSubmit={false}
								/>
								<Text style={styles.subtitlePix}>Enviaremos o seu dinheiro para essa chave PIX</Text>
							</View>
							<View>
								<TouchableOpacity
									onPress={onUpdatePixKey}
									activeOpacity={0.9}
									style={{
										backgroundColor: iconName == 'unlock' ? '#3B8959' : '#4B4B4B',
										height: 40,
										width: 40,
										justifyContent: 'center',
										alignItems: 'center',
										borderRadius: 50,
									}}
								>
									<Feathers
										name={iconName}
										color='#FFFFFF'
										size={18}
									/>
								</TouchableOpacity>
							</View>
							<TouchableOpacity
								onPress={onSavePix}
								activeOpacity={0.8}
								style={styles.saveMyPix}>
								<Feathers
									name='pocket'
									color='#FFFFFF'
									size={20}
									style={{ right: '50%' }}
								/>
								<Text style={styles.saveMyPixText}>
									ME SALVA AGORA
								</Text>

							</TouchableOpacity>
						</View>

					</View>
					<View style={styles.containerBottom}>
						<Text style={styles.requestsText}>Solicitações</Text>
					</View>
				</View>
			</SafeAreaView >
		</>

	);
}

const styles = StyleSheet.create({
	pixText: { color: '#737373', fontSize: 15, fontFamily: 'SemiBold' },
	requestsText: { backgroundColor: '#E8E8E8', paddingHorizontal: 10, paddingVertical: 5, marginTop: '2%', borderRadius: 5, color: '#A3A3A3', fontFamily: 'SemiBold' },
	subtitlePix: { color: '#C7C7C7', fontSize: 12, top: 5, fontFamily: 'Light' },
	containerWrapper: { backgroundColor: '#0DDF5F', flex: 1 },
	containerTop: { backgroundColor: '#0DDF5F', flex: 1, justifyContent: 'center', alignItems: 'center' },
	containerBottom: { backgroundColor: '#FFFFFF', flex: 1, borderTopLeftRadius: 25, borderTopRightRadius: 25, alignItems: 'center' },
	blankContainer: { borderRadius: 10, backgroundColor: '#FFFFFF', width: '90%', height: '50%', alignItems: 'center', flexDirection: 'row', justifyContent: 'space-evenly' },
	saveMyPixText: { color: '#FFFFFF', fontSize: 20, fontFamily: 'Bold' },
	saveMyPix: {
		backgroundColor: '#0DDF5F',
		borderRadius: 10,
		width: '80%',
		height: 50,
		top: '80%',
		left: '10%',
		position: 'absolute',
		shadowColor: '#3B8959',
		shadowOffset: { width: 0, height: 10 },
		shadowOpacity: 1,
		shadowRadius: 0,
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'row',
	},

});

export default Home;
