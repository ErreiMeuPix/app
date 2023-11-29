import React from 'react';
import { SafeAreaView, View, Image, Text, Button, TouchableOpacity, } from 'react-native';
import { SupabaseClient } from '../../utils/supabase'
import {
    GoogleSignin,
    statusCodes,
} from '@react-native-google-signin/google-signin';


GoogleSignin.configure({
    scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
    webClientId: '696135610397-fkuvhilff6sjhjn4747lvdho4rboib4j.apps.googleusercontent.com',
});

const Register: React.FC = () => {


    async function onSignin() {
        try {
            await GoogleSignin.hasPlayServices();

            const userInfo = await GoogleSignin.signIn();

            if (!userInfo.idToken) {
                //lanca mensagem de erro
                return
            }

            const { data, error } = await SupabaseClient.auth.signInWithIdToken({ provider: 'google', token: userInfo.idToken })

        } catch (error: any) {
            console.log(error)
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // user cancelled the login flow
            } else if (error.code === statusCodes.IN_PROGRESS) {
                // operation (e.g. sign in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                // play services not available or outdated
            } else {
                // some other error happened
            }
        }
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#2B2C31', justifyContent: 'space-around', alignItems: 'center' }}>
            <View style={{ flex: 4, justifyContent: 'center' }}>
                <Image source={require('../../../assets/logo.png')} style={{ width: 200, height: 200 }} />
                <View style={{ alignItems: 'center', marginTop: '10%' }}>
                    <Text style={{ fontSize: 15, color: '#FFFFFF', fontFamily: 'Bold' }}>ERREI MEU</Text>
                    <Text style={{ fontSize: 50, color: '#FFFFFF', fontFamily: 'Bold' }}>PIX</Text>
                </View>
            </View>
            <TouchableOpacity onPress={onSignin} style={{ borderColor: '#303134', borderWidth: 2, padding: 10, borderRadius: 100, justifyContent: 'center', alignItems: 'center', marginBottom: '5%' }}>
                <Image source={require('../../../assets/google-icon.png')} style={{ width: 30, height: 30 }} />
            </TouchableOpacity>
            <View style={{ flex: 1, borderTopWidth: 2, borderColor: '#303134', justifyContent: 'center' }}>
                <Text style={{ color: '#6A6A6A' }}>Vamos se cadastrar e resolver isso !</Text>
            </View>
        </SafeAreaView>

    );
}

export default Register;