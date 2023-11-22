import {StatusBar} from 'expo-status-bar';
import {StyleSheet, Text, View} from 'react-native';
import useAuth from "@/firebase/hooks/useAuth";

export default function App() {
    const {user} = useAuth()

    return (
        <View style={styles.container}>
            <Text>Hello World</Text>
            <Text>{user?.uid || 'Not Logged In'}</Text>
            <StatusBar style="auto"/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
