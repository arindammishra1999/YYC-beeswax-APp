import {StatusBar} from 'expo-status-bar';
import { Text, View } from 'react-native';
import { styles } from './styles/mainStyles';
import useAuth from "@/firebase/hooks/useAuth";
import Navbar from './components/navbar';

export default function App() {
    const {user} = useAuth()

    return (
        <View style={styles.container}>
            <Text>Hello World</Text>
            <Text>{user?.uid || 'Not Logged In'}</Text>
            <StatusBar style="auto"/>
            <Navbar/>
        </View>
    );
}
