import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { SafeAreaView, Text, TouchableOpacity, View, StyleSheet, TextInput, Keyboard } from 'react-native';
import Feathers from '@expo/vector-icons/Feather';
import { router } from 'expo-router'
import { AuthContext } from '../../contexts/auth_context';
import { SupabaseClient, SupabaseUpdatePixKey } from '../../utils/supabase'

const Home: React.FC = () => {
    const rootPixInputRef = useRef<TextInput>();
    const { user, refreshPix } = useContext(AuthContext)

    const [iconName, setIconName] = useState<'lock' | 'unlock'>('lock')
    const [valuePix, setValuePix] = useState<string>(user.pixKey ?? "")

    useEffect(() => {
        refreshPix()
    }, [])

    function onSavePix() {
        router.push('recover_step_one')
    }

    async function onUpdatePixKey() {
        try {
            if (rootPixInputRef.current.isFocused()) {

                if (user?.pixKey.localeCompare(valuePix, undefined, { sensitivity: 'accent' }) !== 0) {
                    await SupabaseUpdatePixKey(valuePix)

                    refreshPix()
                    // TODO: Notificar chave pix atualizada com sucesso
                } else {
                    setValuePix(user.pixKey)
                    //TODO: Notificar que a chave PIX é igual
                }

                Keyboard.dismiss()

                setIconName('lock')


                return
            }

            rootPixInputRef.current.focus()

            setIconName('unlock')
        } catch (error) {
        }
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
            <View style={styles.containerWrapper}>
                <View style={styles.containerTop}>
                    <View style={styles.blankContainer}>
                        <View >
                            <TextInput onChangeText={(e: string) => setValuePix(e)} ref={rootPixInputRef} style={styles.pixText} value={valuePix} numberOfLines={1} keyboardType='ascii-capable' blurOnSubmit={false}
                            />
                            <Text style={styles.subtitlePix}>Enviaremos o seu dinheiro para essa chave PIX</Text>
                        </View>
                        <View>
                            <TouchableOpacity
                                onPress={onUpdatePixKey}
                                activeOpacity={0.9}
                                style={{ backgroundColor: '#4B4B4B', height: 40, width: 40, justifyContent: 'center', alignItems: 'center', borderRadius: 50, }}
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
                <View style={styles.containerBottom}></View>
            </View>
        </SafeAreaView >
    );
}

const styles = StyleSheet.create({
    pixText: { color: '#737373', fontSize: 15, fontFamily: 'SemiBold' },
    subtitlePix: { color: '#C7C7C7', fontSize: 12, top: 5, fontFamily: 'Light' },
    containerWrapper: { backgroundColor: '#0DDF5F', flex: 1 },
    containerTop: { backgroundColor: '#0DDF5F', flex: 1, justifyContent: 'center', alignItems: 'center' },
    containerBottom: { backgroundColor: '#FFFFFF', flex: 1, borderTopLeftRadius: 25, borderTopRightRadius: 25 },
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