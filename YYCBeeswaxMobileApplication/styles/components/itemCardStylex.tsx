import { StyleSheet } from "react-native";

import { colors } from "@/consts/styles";

export const itemCardStyles = StyleSheet.create({
    cardContainer: {
        flex: 1,
        height: 220,
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
    image: {
        flex: 1,
        width: "100%",
        aspectRatio: 1,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    title: {
        alignSelf: "center",
        fontWeight: "bold",
        marginTop: 5,
    },
    price: {
        alignSelf: "center",
        fontWeight: "bold",
        marginVertical: 5,
    },
});
