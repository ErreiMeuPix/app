import React from 'react';
import { SafeAreaView, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Feathers from '@expo/vector-icons/Feather';
import { router } from 'expo-router'
import { COLORS } from '../../../assets/colors/colors';


const SuccessRequest: React.FC = () => {

    return (
        <SafeAreaView style={styles.safeAreaWrapper}>
            <TouchableOpacity
                onPress={() => router.push('home')}
                style={styles.viewTouch}>
                <View style={styles.circle} >
                    <Feathers
                        name={'check-circle'}
                        color='white'
                        size={60}
                    />
                </View>

                <Text style={styles.subtitle}>AGORA É COM A GENTE !</Text>
                <Text style={styles.secondSubtitle}>Você pode acompanhar todos os passos aqui pelo app.</Text>
            </TouchableOpacity>
            <View style={{ justifyContent: 'space-evenly', alignItems: 'center', flex: 1 }}>
                <Feathers
                    name={'alert-octagon'}
                    color={COLORS.BUTTON_HINT}
                    size={35}
                />

                <Text style={styles.alertSubtitle}>Nossos únicos canais de atendimento
                    são com o domínio <Text style={styles.bold}>@erreimeupix.com.br</Text>
                </Text>

                <Text style={styles.secondSecondSubtitle}>Errei Meu Pix é uma empresa gerida por klubbs Desenvolvimento de Software  43.741.221/0001-23</Text>
            </View>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    safeAreaWrapper: { flex: 1, backgroundColor: COLORS.PRIMARY, padding: 10 },
    subtitle: { color: COLORS.WHITE, fontSize: 25, fontFamily: 'Bold', marginTop: '5%' },
    secondSubtitle: { color: COLORS.WHITE, fontSize: 13, fontFamily: 'Light', marginTop: '2%' },
    alertSubtitle: { color: COLORS.BUTTON_HINT, fontSize: 15, fontFamily: 'Regular', textAlign: 'center' },
    secondSecondSubtitle: { color: COLORS.BUTTON_HINT, fontSize: 13, fontFamily: 'Light', textAlign: 'center' },
    bold: { fontFamily: 'Bold' },
    circle: { borderColor: COLORS.PRIMARY_DARK, borderWidth: 10, width: 300, height: 300, borderRadius: 150, justifyContent: 'center', alignItems: 'center' },
    viewTouch: { justifyContent: 'center', alignItems: 'center', flex: 2.5 }
});

export default SuccessRequest
