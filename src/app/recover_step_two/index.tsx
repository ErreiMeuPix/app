import React, { useState } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, TextInput } from 'react-native';


const RecoverSteptTwo: React.FC = () => {

    const [pixKey, setPixKey] = useState<string | null>(null)

    return (
        <View style={{ flex: 1, justifyContent: 'space-evenly', alignItems: 'flex-start', backgroundColor: '#0DDF5F', padding: 20 }}>

            <Text style={styles.subtitleOne}>FALTA MENOS QUE{'\n'}ANTES!</Text>

            <Text style={styles.subtitleTwo}>Para quem você enviou ?</Text>
            <TextInput onChangeText={setPixKey} value={pixKey} style={styles.inputValue} placeholder='A chave PIX que você digitou errado aqui ' keyboardType='ascii-capable' />

            <TouchableOpacity
                activeOpacity={0.8}
                style={styles.saveMyPix}>
                <Text style={styles.saveMyPixText}>
                    SALVA MEU PIX
                </Text>

            </TouchableOpacity>

        </View>
    );
}

const styles = StyleSheet.create({
    inputValue: { backgroundColor: 'white', width: '90%', alignSelf: 'center', height: 50, borderRadius: 5, fontFamily: 'Bold', paddingHorizontal: 10, color: '#5F5F5F', bottom: '10%' },
    subtitleOne: { color: 'white', fontSize: 35, fontFamily: 'Bold' },
    subtitleTwo: { color: 'white', fontSize: 25, fontFamily: 'Light', alignSelf: 'center' },
    saveMyPixText: { color: '#006F2B', fontSize: 15, fontFamily: 'Bold' },
    saveMyPix: {
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


export default RecoverSteptTwo;