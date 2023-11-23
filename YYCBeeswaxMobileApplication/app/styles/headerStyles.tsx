import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: '10%',
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 30,
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#333',
        letterSpacing: 1,
    },
    backButton: {
        position: 'absolute',
        left: 20,
    }
});
