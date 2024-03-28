import { StyleSheet } from "react-native";

import { colors, fonts } from "@/consts/styles";

export const itemCardStyles = StyleSheet.create({
    cardContainer: {
        flex: 1,
        height: 220,
        width: 160,
        alignItems: "center",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        backgroundColor: colors.white,
        elevation: 3,
        marginRight: 10,
        marginLeft: 10,
        borderRadius: 20,
        paddingBottom: 5,
    },
    image: {
        flex: 1,
        alignSelf: "center",
        width: 160,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomEndRadius: 0,
        borderBottomStartRadius: 0,
    },
    invalidStock: {
        opacity: 0.5,
    },
    invalidText: {
        fontSize: 14,
        color: colors.red,
        marginVertical: 5,
        alignSelf: "center",
        fontFamily: fonts.mainBold,
    },
    title: {
        alignSelf: "center",
        marginTop: 5,
        textAlign: "center",
        fontFamily: fonts.mainBold,
    },
    price: {
        alignSelf: "center",
        fontWeight: "bold",
        marginVertical: 5,
        fontFamily: fonts.mainBold,
    },
});
