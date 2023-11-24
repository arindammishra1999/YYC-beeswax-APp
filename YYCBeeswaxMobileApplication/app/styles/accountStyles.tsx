import { StyleSheet } from 'react-native';
import Constants from "expo-constants";
import { colors } from '../consts/styles';

export const accountStyles = StyleSheet.create({
    container: {
        padding: 10,
        paddingTop: Constants.statusBarHeight
    },
    logo: {
        width: 80,
        height: 80,
        alignSelf: "center",
        marginTop: 50,
        marginBottom: 20,
    },
    header: {
        fontSize: 20,
        alignSelf: "center",
    },
    textInput: {
        fontSize: 18,
        color: colors.darkGrey,
        flex: 1,
    },
    inputContainer: {
        backgroundColor: colors.darkWhite,
        borderRadius: 25,
        flexDirection: "row",
        width: "100%",
        padding: 15,
        marginVertical: 10,
    },
    submitButton: {
        backgroundColor: colors.yellow,
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
        padding: 15,
        width: "100%",
        marginVertical: 10,
    },
    submitButtonText: {
        color: colors.black,
        fontSize: 18,
        textTransform: "uppercase",
        fontWeight: "bold",
    },
    error: {
        color: colors.red,
        alignSelf: 'center'
    }
});