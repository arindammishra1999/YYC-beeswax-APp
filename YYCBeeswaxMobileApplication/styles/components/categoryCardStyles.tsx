import { StyleSheet } from "react-native";

import { colors } from "@/consts/styles";

export const categoryCardStyles = StyleSheet.create({
    cardContainer: {
        width: 105,
        height: 105,
        alignItems: "center",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        backgroundColor: colors.white,
        paddingVertical: 5,
        elevation: 3,
        borderRadius: 20,
        justifyContent: "center",
        marginRight: 5,
        marginTop: 5,
        marginBottom: 15,
        marginLeft: 10,
    },
    icon: {
        fontSize: 45,
        alignSelf: "center",
    },
    text: {
        paddingTop: 5,
        fontSize: 12,
        alignSelf: "center",
    },
});
