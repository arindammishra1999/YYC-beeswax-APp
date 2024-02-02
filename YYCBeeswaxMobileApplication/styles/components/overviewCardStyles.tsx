import { StyleSheet } from "react-native";

import { colors } from "@/consts/styles";

export const overviewCardStyles = StyleSheet.create({
    cardContainer: {
        flex: 1,
        width: "90%",
        marginHorizontal: "5%",
        alignItems: "center",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        backgroundColor: colors.white,
        elevation: 3,
        marginRight: 20,
        borderRadius: 20,
        paddingBottom: 5,
    },
    header: {
        fontSize: 22,
        fontWeight: "bold",
    },
});
