import {StatusBar} from 'expo-status-bar';
import { Text, View } from 'react-native';
import { styles } from './styles/mainStyles';

export default function App() {
    return (
        <View style={styles.container}>
            <Text>Hello World</Text>
            <StatusBar style="auto"/>
        </View>
    );
}
