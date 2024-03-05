import { StyleSheet } from "react-native";

import { colors, fonts } from "@/consts/styles";

export const eventCardStyles = StyleSheet.create({
    cardContainer: {
        width: "85%",
        height: 140,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        backgroundColor: colors.white,
        elevation: 3,
        borderRadius: 20,
        marginVertical: 10,
        alignSelf: "center",
        flexDirection: "row",
    },
    image: {
        height: "80%",
        width: "32%",
        borderRadius: 10,
        alignSelf: "center",
        marginHorizontal: 15,
    },
    textContainer: {
        alignSelf: "center",
        height: "85%",
        width: "55%",
        justifyContent: "space-between",
        flexWrap: "wrap",
    },
    description: { marginBottom: 20 },
    dateText: {
        color: colors.blue,
        fontSize: 14,
        flexShrink: 1,
        width: "100%",
        fontFamily: fonts.main,
    },
    nameText: {
        fontSize: 17,
        flexShrink: 1,
        width: "100%",
        fontFamily: fonts.main,
    },
    locationContainer: {
        flexDirection: "row",
    },
    icon: {
        paddingRight: 3,
        color: colors.grey,
        fontSize: 18,
    },
    locationText: {
        color: colors.grey,
        fontSize: 14,
        flexShrink: 1,
        width: "100%",
        fontFamily: fonts.main,
    },
});
