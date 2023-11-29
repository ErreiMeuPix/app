import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { router } from 'expo-router'

// import { Container } from './styles';

const RecoverStepOne: React.FC = () => {
    return (
        <View style={{ flex: 1, justifyContent: 'space-evenly', alignItems: 'flex-start', backgroundColor: '#0DDF5F', padding: 20 }}>

            <Text style={styles.subtitleOne}>O QUE VAI{'\n'}ACONTECER AGORA ?</Text>
            <Text style={styles.subtitleTwo}>Nós vamos entrar em{'\n'}contato com quem recebeu{'\n'}seu pix </Text>
            <Text style={styles.subtitleThree}>E iremos cobrar uma taxa de{'\n'}1.5% , SOMENTE se{'\n'}conseguirmos reaver o seu dinheiro ;)</Text>

            <TouchableOpacity
                onPress={() => router.push('recover_step_two')}
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
    subtitleOne: { color: 'white', fontSize: 35, fontFamily: 'Bold' },
    subtitleTwo: { color: 'white', fontSize: 35, fontFamily: 'Light' },
    subtitleThree: { color: 'white', fontSize: 25, fontFamily: 'Light' },
    agreeText: { color: '#006F2B', fontSize: 15, fontFamily: 'Bold' },
    agreeButton: {
        backgroundColor: '#00993C',
        borderRadius: 10,
        width: '80%',
        height: 50,
        alignSelf: 'center',
        shadowColor: '#006F2B',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 1,
        shadowRadius: 0,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },

});

export default RecoverStepOne;