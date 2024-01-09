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
        paddingTop: 10,
        justifyContent: "center",
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
