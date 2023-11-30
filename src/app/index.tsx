import React, { useCallback, useContext, useEffect, useState } from 'react';
import { SafeAreaView, View, Image, Text, Button } from 'react-native';
import Home from './home';
import Register from './register';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { AuthContext } from '../contexts/auth_context';
import { SupabaseClient } from '../utils/supabase';

SplashScreen.preventAutoHideAsync();

const App: React.FC = () => {

    const { user } = useContext(AuthContext)


    let [fontsLoaded] = useFonts({
        Black: require('../../assets/fonts/Approach-Black.ttf'),
        Bold: require('../../assets/fonts/Approach-Bold.ttf'),
        Light: require('../../assets/fonts/Approach-Light.ttf'),
        Mediun: require('../../assets/fonts/Approach-Medium.ttf'),
        Regular: require('../../assets/fonts/Approach-Regular.ttf'),
        SemiBold: require('../../assets/fonts/Approach-SemiBold.ttf'),
    });

    if (!fontsLoaded) {
        return null;
    }

    if (user) {
        return <Home />
    }

    return (
        <Register />
    );
}

export default App;