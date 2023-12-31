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
        paddingVertical: 5,
        elevation: 3,
        borderRadius: 20,
        paddingTop: 10,
        marginRight: 20,
        marginTop: 5,
    },
    image: {
        marginTop: 5,
        height: 115,
        width: 115,
        borderRadius: 5,
    },
    text: {
        fontSize: 12,
        paddingTop: 3,
        alignSelf: "center",
    },
});
