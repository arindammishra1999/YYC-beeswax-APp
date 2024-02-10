import { StyleSheet } from "react-native";

import { colors } from "@/consts/styles";

export const cartProductCardStyles = StyleSheet.create({
    cardContainer: {
        flex: 1,
        width: "90%",
        padding: 20,
        marginBottom: 10,
        borderRadius: 10,
        marginTop: 10,
        backgroundColor: colors.white,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.5,
        shadowRadius: 4.65,
        elevation: 10,
        alignSelf: "center",
    },
    image: {
        height: 120,
        width: 120,
        contentFit: "cover",
        marginRight: 15,
    },
    title: {
        width: "60%",
        flex: 1,
        fontSize: 18,
        fontWeight: "bold",
        color: colors.darkGrey,
        position: "absolute",
        top: 10,
        left: 140,
        flexWrap: "wrap",
    },
    price: {
        fontSize: 18,
        fontWeight: "bold",
        color: colors.black,
        position: "absolute",
        top: 90,
        left: 140,
    },
    productQuantitySection: {
        alignSelf: "flex-end",
        flexDirection: "row",
        gap: 12,
    },
    productQuantity: {
        fontSize: 18,
        alignSelf: "center",
    },
    quantityButton: {
        backgroundColor: colors.yellow,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        width: 35,
        height: 35,
    },
    quantityButtonText: {
        color: colors.black,
        fontSize: 18,
    },
});
