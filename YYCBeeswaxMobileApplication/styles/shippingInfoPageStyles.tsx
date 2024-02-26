import { StyleSheet } from "react-native";

import { colors } from "@/consts/styles";
import { viewportHeight } from "@/consts/viewport";

export const shippingInfoPageStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        justifyContent: "center",
    },
    button: {
        width: "65%",
        alignSelf: "center",
        marginVertical: 20,
    },
    image: {
        alignSelf: "center",
        width: 300,
        height: 70,
    },
    dropdown: {
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 15,
        paddingVertical: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "lightgray",
        height: 55,
        fontSize: 14,
    },
    dropdownContainer: {
        paddingHorizontal: 10,
    },
    dropdownLabel: {
        fontSize: 16,
        fontWeight: "bold",
        paddingBottom: 8,
    },
    dropdownSelectedText: {
        fontSize: 16,
        marginLeft: 8,
    },
    dropdownPlaceholder: {
        fontSize: 16,
    },
    dropdownImage: {
        width: 60,
        height: 35,
        borderRadius: 6,
    },
    dropdownArrowIcon: { width: 35, height: 35 },
    extraSpace: {
        height: viewportHeight * 0.3,
    },
});
