import { StyleSheet } from "react-native";

import { colors } from "@/consts/styles";

export const itemCardStyles = StyleSheet.create({
    cardContainer: {
        width: 150,
        height: 150,
        alignItems: "center",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        backgroundColor: colors.white,
        elevation: 3,
        borderRadius: 20,
        marginRight: 20,
        marginTop: 5,
        justifyContent: "center",
    },
    image: {
        height: 120,
        width: 120,
        borderRadius: 5,
    },
});
