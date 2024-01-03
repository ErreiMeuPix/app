import { BlurView } from 'expo-blur';
import React from 'react';
import { ActivityIndicator, Modal, StyleSheet, View } from 'react-native';

const Spinner: React.FC<{ loading: boolean }> = (props) => {
    return (
        <Modal
            animationType={'none'}
            visible={props.loading}
            transparent={true}
        >
            <View style={styles.container}>
                <ActivityIndicator
                    color={'white'}
                    size={'large'}
                    animating
                    style={{ zIndex: 10 }}
                />
                <BlurView
                    tint="dark"
                    intensity={60}
                    style={StyleSheet.absoluteFill}
                />
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: { position: 'absolute', alignItems: 'center', justifyContent: 'center', bottom: 0, left: 0, top: 0, right: 0, zIndex: 100 },
});

export { Spinner };
